import User, { IUser } from "../models/user.model";

// ─── Types ────────────────────────────────────────────────────
export interface CreateUserInput {
  fullName: string;
  firstName?: string;
  lastName?: string;
  gender?: 'Male' | 'Female' | 'Other';
  mobileNumber?: string;
  email: string;
  password: string;
}

// ─── Find user by email ───────────────────────────────────────
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

// ─── Find user by mobile number ───────────────────────────────
export const findUserByMobileNumber = async (mobileNumber: string): Promise<IUser | null> => {
  return await User.findOne({ mobileNumber });
};

// ─── Find user by email OR mobile number ──────────────────────
export const findUserByEmailOrMobile = async (identifier: string): Promise<IUser | null> => {
  return await User.findOne({
    $or: [{ email: identifier }, { mobileNumber: identifier }]
  });
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
    { returnDocument: 'after' }
  );
};

// ─── Add a Cart ID to user ────────────────────────────────────
export const addCartId = async (userId: string, cartId: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    userId,
    { $push: { cartIds: cartId } },
    { returnDocument: 'after' }
  );
};

// ─── Remove an Order ID from user ────────────────────────────
export const removeOrderId = async (userId: string, orderId: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { orderIds: orderId } },
    { returnDocument: 'after' }
  );
};

// ─── Remove a Cart ID from user ───────────────────────────────
export const removeCartId = async (userId: string, cartId: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { cartIds: cartId } },
    { returnDocument: 'after' }
  );
};

// ─── Update user details ─────────────────────────────────────
export const updateUser = async (userId: string, data: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(userId, data, { returnDocument: 'after' }).select("-password");
};
// ─── Find user by reset token ─────────────────────────────────
export const findUserByResetToken = async (token: string): Promise<IUser | null> => {
  return await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });
};

// ─── Reset user password ──────────────────────────────────────
export const resetUserPassword = async (userId: string, hashedPassword: string): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    userId,
    {
      password: hashedPassword,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    },
    { returnDocument: 'after' }
  );
};
