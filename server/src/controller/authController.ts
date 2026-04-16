import { Request, Response } from "express";
import * as authService from "../services/authService";
import * as userDao from "../dao/userDao";
import { AuthRequest } from "../middleware/authMiddleware";

// ─── REGISTER ─────────────────────────────────────────────────
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;
    const result = await authService.registerService({ fullName, email, password });
    
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
    const { email, password } = req.body;
    const result = await authService.loginService({ email, password });
    
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