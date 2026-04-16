import * as orderDao from "../dao/orderDao";
import * as addressDao from "../dao/addressDao";
import * as couponDao from "../dao/couponDao";
import * as cartDao from "../dao/cartDao";
import * as couponService from "./couponService";
import * as cartService from "./cartService";
import * as productDao from "../dao/productDao";
import { IOrder } from "../models/order.model";
import { IAddress } from "../models/address.model";

const getProductIdString = (productId: any): string => {
  if (!productId) return '';
  if (typeof productId === 'string') return productId.trim().toLowerCase();
  if (productId._id) return productId._id.toString().trim().toLowerCase();
  return productId.toString().trim().toLowerCase();
};

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
}

export interface PlaceOrderResult {
  order: IOrder;
  billingAddress: IAddress;
  shippingAddress: IAddress;
}

export const placeOrder = async (input: PlaceOrderInput): Promise<PlaceOrderResult> => {
  const { userId, productIds, couponCode, billingAddress, shippingAddress } = input;

  const cart = await cartService.getCart(userId);
  if (!cart.items.length) throw new Error("Cart is empty");

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
      const product = await productDao.getProductById(productIdStr);
      if (!product || !product.isActive) throw new Error(`Product no longer available`);
      return {
        productId: item.productId,
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

  const savedBilling = await addressDao.createAddress({ userId, ...billingAddress });

  const savedShipping = shippingAddress
    ? await addressDao.createAddress({ userId, ...shippingAddress })
    : savedBilling;

  const order = await orderDao.createOrder({
    userId: userId as any,
    items: orderItems as any,
    subtotal,
    couponCode: couponCode || null,
    discountPercent,
    discountAmount,
    totalAmount,
    billingAddressId: savedBilling._id as any,
    shippingAddressId: savedShipping._id as any,
  });

  if (productIds && productIds.length > 0) {
    const normalizedProductIds = productIds.map(id => id.trim().toLowerCase());
    const productIdSet = new Set(normalizedProductIds);
    const remainingItems = cart.items.filter((item) => {
      const itemProductId = getProductIdString(item.productId);
      return !productIdSet.has(itemProductId);
    });
    const remainingTotal = remainingItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cartDao.upsertCart(userId, { userId: userId as any, items: remainingItems, totalAmount: remainingTotal });
  } else {
    await cartService.clearCart(userId);
  }

  return { order, billingAddress: savedBilling, shippingAddress: savedShipping };
};

export const getUserOrders = async (userId: string): Promise<IOrder[]> => {
  return await orderDao.getOrdersByUserId(userId);
};

export const getOrderDetail = async (orderId: string, userId: string): Promise<IOrder> => {
  const order = await orderDao.getOrderById(orderId);
  if (!order) throw new Error("Order not found");
  if (order.userId.toString() !== userId) throw new Error("Unauthorized");
  return order;
};
