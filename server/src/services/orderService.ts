import * as orderDao from "../dao/orderDao";
import * as addressDao from "../dao/addressDao";
import * as couponDao from "../dao/couponDao";
import * as couponService from "./couponService";
import * as cartService from "./cartService";
import * as productDao from "../dao/productDao";
import { IOrder } from "../models/order.model";
import { IAddress } from "../models/address.model";

export interface AddressInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

export interface PlaceOrderInput {
  userId: string;
  couponCode?: string;
  billingAddress: AddressInput;
  // if shippingAddress omitted, billing address is reused
  shippingAddress?: AddressInput;
}

export interface PlaceOrderResult {
  order: IOrder;
  billingAddress: IAddress;
  shippingAddress: IAddress;
}

export const placeOrder = async (input: PlaceOrderInput): Promise<PlaceOrderResult> => {
  const { userId, couponCode, billingAddress, shippingAddress } = input;

  // 1. Fetch cart
  const cart = await cartService.getCart(userId);
  if (!cart.items.length) throw new Error("Cart is empty");

  // 2. Verify stock & build order items
  const orderItems = await Promise.all(
    cart.items.map(async (item) => {
      const product = await productDao.getProductById(item.productId.toString());
      if (!product || !product.isActive) throw new Error(`Product no longer available`);
      // Removed numerical stock check as stock is now a string detail
      return {
        productId: item.productId,
        title: product.title,
        quantity: item.quantity,
        price: item.price,
      };
    })
  );

  const subtotal = cart.totalAmount;

  // 3. Apply coupon if provided
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

  // 4. Save billing address
  const savedBilling = await addressDao.createAddress({ userId, ...billingAddress });

  // 5. Save shipping address (reuse billing if not provided)
  const savedShipping = shippingAddress
    ? await addressDao.createAddress({ userId, ...shippingAddress })
    : savedBilling;

  // 6. Create order
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

  // 7. Deduct stock has been removed as stock is now a descriptive string.

  // 8. Clear cart
  await cartService.clearCart(userId);

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
