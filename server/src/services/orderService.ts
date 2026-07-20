import * as orderDao from "../dao/orderDao";
import * as addressDao from "../dao/addressDao";
import * as couponDao from "../dao/couponDao";
import * as cartDao from "../dao/cartDao";
import * as couponService from "./couponService";
import * as cartService from "./cartService";
import * as productDao from "../dao/productDao";
import { Order } from "../models/order.model";
import { Address } from "../models/address.model";
import * as userDao from "../dao/userDao";
import { sendOrderEmails } from "../utils/emailService";
import crypto from "crypto";


// ─── Helper Functions ─────────────────────────────────────────
const getProductIdString = (productId: any): string => {
  if (!productId) return '';
  if (typeof productId === 'string') return productId.trim().toLowerCase();
  if (productId.id) return productId.id.toString().trim().toLowerCase();
  return productId.toString().trim().toLowerCase();
};

// ─── Types ────────────────────────────────────────────────────
export interface AddressInput {
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  type: 'Home' | 'Work';
}

export interface PlaceOrderInput {
  userId: string;
  productIds?: string[];
  couponCode?: string;
  billingAddress: AddressInput;
  shippingAddress?: AddressInput;
  paymentMethod?: "COD" | "Online";
  razorpayDetails?: {
    orderId: string;
    paymentId: string;
    signature: string;
  };
}

export interface PlaceOrderResult {
  order: Order;
  billingAddress: Address;
  shippingAddress: Address;
}

// ─── Helper to find vendor ────────────────────────────────────
const findVendor = async (): Promise<string | undefined> => {
  try {
    // Try to find vendor named "vendor1" first
    const vendors = await userDao.getUsersByRole('vendor');
    
    // Look for vendor with name containing "vendor1"
    const vendor1 = vendors.find(v => 
      v.fullName?.toLowerCase().includes('vendor1')
    );
    
    if (vendor1) {
      return vendor1.id;
    }
    
    // Fall back to any active vendor
    if (vendors.length > 0) {
      return vendors[0].id;
    }
    
    return undefined;
  } catch (error) {
    console.error('Error finding vendor:', error);
    return undefined;
  }
};

// ─── Place Order ──────────────────────────────────────────────
export const placeOrder = async (input: PlaceOrderInput): Promise<PlaceOrderResult> => {
  const { userId, productIds, couponCode, billingAddress, shippingAddress, paymentMethod, razorpayDetails } = input;

  const cart = await cartService.getCart(userId);
  if (!cart.items || !cart.items.length) throw new Error("Cart is empty");

  let cartItems = cart.items;
  
  if (productIds && productIds.length > 0) {
    const normalizedProductIds = productIds.map(id => id.trim().toLowerCase());
    const productIdSet = new Set(normalizedProductIds);
    cartItems = cartItems.filter((item) => {
      const itemProductId = getProductIdString(item.productId).trim().toLowerCase();
      return productIdSet.has(itemProductId);
    });
    if (!cartItems.length) throw new Error("No matching items found in cart");
  }

  const orderItems = await Promise.all(
    cartItems.map(async (item) => {
      const productIdStr = getProductIdString(item.productId);
      const product = await productDao.getActiveProductById(productIdStr);
      if (!product) throw new Error(`Product no longer available`);
      return {
        productId: product.id,
        title: product.title,
        quantity: item.quantity,
        price: item.price,
      };
    })
  );

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountPercent = 0;
  let discountAmount = 0;
  let totalAmount = subtotal;

  if (couponCode) {
    const couponResult = await couponService.applyCoupon(couponCode, subtotal);
    discountPercent = couponResult.discountPercent;
    discountAmount = couponResult.discountAmount;
    totalAmount = couponResult.finalAmount;
    await couponDao.incrementCouponUse(couponCode);
  }

  const savedBilling = await addressDao.createAddress({ 
    userId, 
    ...billingAddress, 
    isSaved: false 
  });

  const savedShipping = shippingAddress
    ? await addressDao.createAddress({ 
        userId, 
        ...shippingAddress, 
        isSaved: false 
      })
    : savedBilling;

  // Find vendor
  const vendorId = await findVendor();

  // Create order with lowercase status values
  const order = await orderDao.createOrder({
    userId,
    vendorId: vendorId ?? null,
    items: orderItems,
    subtotal,
    couponCode: couponCode || null,
    discountPercent,
    discountAmount,
    totalAmount,
    billingAddressId: savedBilling.id,
    shippingAddressId: savedShipping.id,
    paymentMethod: paymentMethod || "COD",
    paymentStatus: paymentMethod === "Online" ? "Completed" : "Pending",  // ← lowercase format
    status: "confirmed",  // ← lowercase
    razorpayDetails
  });

  // Verify Razorpay payment
  if (paymentMethod === "Online" && razorpayDetails) {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) throw new Error("Razorpay secret not configured");

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpayDetails.orderId}|${razorpayDetails.paymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpayDetails.signature) {
      // Update order status to failed
      await orderDao.updateOrder(order.id, {
        status: "cancelled",  // ← lowercase
        paymentStatus: "Failed"
      });
      throw new Error("Invalid Razorpay signature");
    }

    // Update payment status to completed
    await orderDao.updatePaymentStatus(order.id, "Completed", razorpayDetails.paymentId);
  }

  // Update cart - remove ordered items
  if (productIds && productIds.length > 0) {
    const normalizedProductIds = productIds.map(id => id.trim().toLowerCase());
    const productIdSet = new Set(normalizedProductIds);
    const remainingItems = cart.items.filter((item) => {
      const itemProductId = getProductIdString(item.productId);
      return !productIdSet.has(itemProductId);
    });
    
    if (remainingItems.length === 0) {
      await cartDao.clearCart(userId);
    } else {
      const remainingTotal = remainingItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      await cartDao.upsertCart(userId, { 
        userId, 
        items: remainingItems, 
        totalAmount: remainingTotal 
      });
    }
  } else {
    await cartService.clearCart(userId);
  }
console.log("📧 Triggering order emails...");

  // Send transactional emails asynchronously
  sendOrderEmails(
    order, 
    savedBilling, 
    savedShipping, 
    billingAddress.name, 
    billingAddress.email
  ).catch(err => {
    console.error("Failed to send order emails during placeOrder:", err);
  });

  // Get complete order with relations
  const completeOrder = await orderDao.getOrderById(order.id);

  return { 
    order: completeOrder || order, 
    billingAddress: savedBilling, 
    shippingAddress: savedShipping 
  };
};

// ─── Get User Orders ──────────────────────────────────────────
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  return await orderDao.getOrdersByUserId(userId);
};

// ─── Get Order Detail ─────────────────────────────────────────
export const getOrderDetail = async (orderId: string, userId: string): Promise<Order> => {
  const order = await orderDao.getOrderById(orderId);
  if (!order) throw new Error("Order not found");
  if (order.userId !== userId) throw new Error("Unauthorized");
  return order;
};