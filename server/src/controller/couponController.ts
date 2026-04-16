import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as couponService from "../services/couponService";

// ─── Create coupon (admin) ────────────────────────────────────
export const createCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const coupon = await couponService.createCoupon(req.body);
    res.status(201).json({ message: "Coupon created", coupon });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── Apply / validate coupon ──────────────────────────────────
export const applyCoupon = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { code, cartTotal } = req.body;
    if (!code || cartTotal === undefined) {
      res.status(400).json({ message: "code and cartTotal are required" });
      return;
    }
    const result = await couponService.applyCoupon(code, Number(cartTotal));
    res.status(200).json({
      message: "Coupon applied successfully",
      discountPercent: result.discountPercent,
      discountAmount:  result.discountAmount,
      finalAmount:     result.finalAmount,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── List all coupons (admin) ─────────────────────────────────
export const listCoupons = async (_req: Request, res: Response): Promise<void> => {
  try {
    const coupons = await couponService.listCoupons();
    res.status(200).json({ coupons });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
