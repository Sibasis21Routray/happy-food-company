import { Request, Response } from "express";
import * as authService from "../services/authService";
import * as userDao from "../dao/userDao";
import { AuthRequest } from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../services/mailService";

// ─── Helper to convert params to string ──────────────────────
const getParamId = (id: string | string[] | undefined): string | null => {
  if (!id) return null;
  return Array.isArray(id) ? id[0] : id;
};

// ─── REGISTER ─────────────────────────────────────────────────
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, gender, mobileNumber } = req.body;
    const result = await authService.registerService({ 
      fullName, 
      email, 
      password, 
      gender, 
      mobileNumber 
    });
    
    res.status(201).json({
      message: "User registered and auto-logged in",
      user: result.user,
      token: result.token
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
      user: result.user,
      token: result.token
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── GET PROFILE (protected) ──────────────────────────────────
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const user = await userDao.findUserById(req.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// ─── ADD ORDER ID (protected) ─────────────────────────────────
export const addOrderId = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { orderId } = req.body;

    if (!orderId) {
      res.status(400).json({ message: "Order ID is required" });
      return;
    }

    const user = await userDao.addOrderId(req.userId, orderId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ 
      message: "Order ID added", 
      orderIds: user.orderIds 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// ─── ADD CART ID (protected) ──────────────────────────────────
export const addCartId = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { cartId } = req.body;

    if (!cartId) {
      res.status(400).json({ message: "Cart ID is required" });
      return;
    }

    const user = await userDao.addCartId(req.userId, cartId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ 
      message: "Cart ID added", 
      cartIds: user.cartIds 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// ─── UPDATE PROFILE (protected) ───────────────────────────────
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { fullName, firstName, lastName, gender, mobileNumber, email, password } = req.body;
    
    if (email) {
      const existingUser = await userDao.findUserByEmail(email);
      if (existingUser && existingUser.id !== req.userId) {
        res.status(400).json({ message: "Email already in use" });
        return;
      }
    }
    
    const updateData: any = { 
      fullName, 
      firstName, 
      lastName, 
      gender, 
      mobileNumber, 
      email 
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userDao.updateUser(req.userId, updateData);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// ─── FORGOT PASSWORD ──────────────────────────────────────────
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await userDao.findUserByEmail(email);

    if (!user) {
      res.status(200).json({ 
        message: "If an account exists with this email, a reset link will be sent." 
      });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = new Date(Date.now() + 3600000);

    await userDao.updateUser(user.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetPasswordExpires,
    });

    try {
      await sendResetPasswordEmail(email, resetToken);
      res.status(200).json({ 
        message: "Password reset link sent to your email" 
      });
    } catch (emailError) {
      await userDao.updateUser(user.id, {
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
      });
      
      console.error('Failed to send reset email:', emailError);
      res.status(500).json({ 
        message: "Failed to send reset email. Please try again later." 
      });
    }
  } catch (error: any) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      message: error.message || "Internal server error" 
    });
  }
};

// ─── RESET PASSWORD ───────────────────────────────────────────
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;

    if (!token) {
      res.status(400).json({ message: "Reset token is required" });
      return;
    }

    if (!password) {
      res.status(400).json({ message: "New password is required" });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ 
        message: "Password must be at least 8 characters long" 
      });
      return;
    }

    const user = await userDao.findUserByResetToken(token);
    if (!user) {
      res.status(400).json({ 
        message: "Invalid or expired reset token" 
      });
      return;
    }

    if (user.resetPasswordExpires && new Date() > new Date(user.resetPasswordExpires)) {
      res.status(400).json({ 
        message: "Reset token has expired. Please request a new one." 
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userDao.resetUserPassword(user.id, hashedPassword);

    res.status(200).json({ 
      message: "Password reset successful. You can now login with your new password." 
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    res.status(500).json({ 
      message: error.message || "Internal server error" 
    });
  }
};