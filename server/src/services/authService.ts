import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userDao from "../dao/userDao";
import User from "../models/user.model";

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  gender?: 'Male' | 'Female' | 'Other';
  mobileNumber?: string;
}

export interface LoginInput {
  identifier: string; // email or mobile
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    mobileNumber?: string;
    gender?: 'Male' | 'Female' | 'Other';
    orderIds: string[];
    cartIds: string[];
  };
  token: string;
}

// ─── REGISTER SERVICE ──────────────────────────────────────────
export const registerService = async (data: RegisterInput): Promise<AuthResponse> => {
  const { fullName, email, password, gender, mobileNumber } = data;

  // Check if email exists
  const existingEmail = await userDao.findUserByEmail(email);
  if (existingEmail) {
    throw new Error("Email already registered");
  }

  // Check if mobile exists
  if (mobileNumber) {
    const existingMobile = await userDao.findUserByMobileNumber(mobileNumber);
    if (existingMobile) {
      throw new Error("Mobile number already registered");
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await userDao.createUser({ 
    fullName, email, password: hashedPassword, gender, mobileNumber 
  });

  // Generate JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user._id!.toString(),
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      gender: user.gender,
      orderIds: user.orderIds,
      cartIds: user.cartIds,
    },
    token
  };
};

// ─── LOGIN SERVICE ────────────────────────────────────────────
export const loginService = async (data: LoginInput): Promise<AuthResponse> => {
  const { identifier, password } = data;

  const user = await userDao.findUserByEmailOrMobile(identifier);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user._id!.toString(),
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      gender: user.gender,
      orderIds: user.orderIds,
      cartIds: user.cartIds,
    },
    token
  };
};

