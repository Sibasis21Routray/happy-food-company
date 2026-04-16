import User, { IUser } from "../models/user.model";

// ─── Types ────────────────────────────────────────────────────
export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
}

// ─── Find user by email ───────────────────────────────────────
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

// ─── Find user by ID ──────────────────────────────────────────
export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).select("-password");
};

// ─── Create new user ──────────────────────────────────────────
export const createUser = async (data: CreateUserInput): Promise<IUser> => {
  return await User.create(data);
};

// ─── Add an Order ID to user ──────────────────────────────────
export const addOrderId = async (userId: string, orderId: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    userId,
    { $push: { orderIds: orderId } },
    { new: true }
  );
};

// ─── Add a Cart ID to user ────────────────────────────────────
export const addCartId = async (userId: string, cartId: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    userId,
    { $push: { cartIds: cartId } },
    { new: true }
  );
};

// ─── Remove an Order ID from user ────────────────────────────
export const removeOrderId = async (userId: string, orderId: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { orderIds: orderId } },
    { new: true }
  );
};

// ─── Remove a Cart ID from user ───────────────────────────────
export const removeCartId = async (userId: string, cartId: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { cartIds: cartId } },
    { new: true }
  );
};