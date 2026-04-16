import Order, { IOrder } from "../models/order.model";

export const createOrder = async (data: Partial<IOrder>): Promise<IOrder> => {
  return await Order.create(data);
};

export const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
  return await Order.find({ userId })
    .populate("billingAddressId")
    .populate("shippingAddressId")
    .populate("items.productId", "title images");
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id)
    .populate("billingAddressId")
    .populate("shippingAddressId")
    .populate("items.productId", "title images");
};
