import Cart, { ICart } from "../models/cart.model";
import { Types } from "mongoose";

export const getCartByUserId = async (userId: string): Promise<ICart | null> => {
  return await Cart.findOne({ userId }).populate("items.productId", "title images price stockDetails");
};

export const upsertCart = async (userId: string, cart: Partial<ICart>): Promise<ICart> => {
  return await Cart.findOneAndUpdate(
    { userId },
    cart,
    { new: true, upsert: true }
  );
};

export const clearCart = async (userId: string): Promise<void> => {
  await Cart.findOneAndUpdate({ userId }, { items: [], totalAmount: 0 });
};
