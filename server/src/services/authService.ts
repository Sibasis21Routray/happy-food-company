import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userDao from "../dao/userDao";
import User from "../models/user.model";

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    orderIds: string[];
    cartIds: string[];
  };
  token: string;
}

// ─── REGISTER SERVICE ──────────────────────────────────────────
export const registerService = async (data: RegisterInput): Promise<AuthResponse> => {
  const { fullName, email, password } = data;

  // Check if user exists
  const existing = await userDao.findUserByEmail(email);
  if (existing) {
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await userDao.createUser({ fullName, email, password: hashedPassword });

  // Generate JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user._id!.toString(),  // Fix: ObjectId → string
      fullName: user.fullName,
      email: user.email,
      orderIds: user.orderIds,
      cartIds: user.cartIds,
    },
    token
  };
};

// ─── LOGIN SERVICE ────────────────────────────────────────────
export const loginService = async (data: LoginInput): Promise<AuthResponse> => {
  const { email, password } = data;

  const user = await userDao.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user._id!.toString(),  // Fix: ObjectId → string
      fullName: user.fullName,
      email: user.email,
      orderIds: user.orderIds,
      cartIds: user.cartIds,
    },
    token
  };
};

