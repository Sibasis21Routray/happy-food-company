import { Request, Response } from "express";
import * as authService from "../services/authService";
import * as userDao from "../dao/userDao";
import { AuthRequest } from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../services/mailService";

// ─── REGISTER ─────────────────────────────────────────────────
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, gender, mobileNumber } = req.body;
    const result = await authService.registerService({ fullName, email, password, gender, mobileNumber });
    
    res.status(201).json({
      message: "User registered and auto-logged in",
      ...result
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── LOGIN ────────────────────────────────────────────────────
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;
    const result = await authService.loginService({ identifier, password });
    
    res.status(200).json({
      message: "Login successful",
      ...result
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── GET PROFILE (protected) ──────────────────────────────────
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // DAO: find by ID
    const user = await userDao.findUserById(req.userId as string);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ─── ADD ORDER ID (protected) ─────────────────────────────────
export const addOrderId = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId } = req.body;

    const user = await userDao.addOrderId(req.userId as string, orderId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Order ID added", orderIds: user.orderIds });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ─── ADD CART ID (protected) ──────────────────────────────────
export const addCartId = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { cartId } = req.body;

    const user = await userDao.addCartId(req.userId as string, cartId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Cart ID added", cartIds: user.cartIds });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ─── UPDATE PROFILE (protected) ───────────────────────────────
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { fullName, firstName, lastName, gender, mobileNumber, email, password } = req.body;
    
    // Check if new email is already taken
    if (email) {
      const existingUser = await userDao.findUserByEmail(email);
      if (existingUser && existingUser._id.toString() !== req.userId) {
        res.status(400).json({ message: "Email already in use" });
        return;
      }
    }
    const updateData: any = { 
      fullName, firstName, lastName, gender, mobileNumber, email 
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userDao.updateUser(req.userId as string, updateData);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// ─── FORGOT PASSWORD ──────────────────────────────────────────
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await userDao.findUserByEmail(email);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    await userDao.updateUser(user._id.toString(), {
      resetPasswordToken: resetToken,
      resetPasswordExpires,
    } as any);

    // Send email
    await sendResetPasswordEmail(email, resetToken);

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ─── RESET PASSWORD ───────────────────────────────────────────
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;

    const user = await userDao.findUserByResetToken(token);
    if (!user) {
      res.status(400).json({ message: "Invalid or expired reset token" });
      return;
    }

    // Update password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Clear reset token and set new password using DAO
    await userDao.resetUserPassword(user._id.toString(), hashedPassword);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
