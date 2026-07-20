import * as couponDao from "../dao/couponDao";
import { Coupon } from "../models/coupon.model";

export interface ApplyCouponResult {
  discountPercent: number;
  discountAmount: number;
  finalAmount: number;
  coupon: Coupon;
}

// ─── Create coupon (admin) ────────────────────────────────────
export const createCoupon = async (data: Partial<Coupon>): Promise<Coupon> => {
  return await couponDao.createCoupon(data);
};

// ─── Validate and apply coupon ────────────────────────────────
export const applyCoupon = async (
  code: string,
  cartTotal: number
): Promise<ApplyCouponResult> => {
  const coupon = await couponDao.findCouponByCode(code);
  if (!coupon) throw new Error("Invalid coupon code");
  if (!coupon.isActive) throw new Error("Coupon is no longer active");
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date())
    throw new Error("Coupon has expired");
  
  // Check usage limit - using maxUses (not usageLimit)
  if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses)
    throw new Error("Coupon usage limit reached");
  
  // Check minimum order amount - using minOrderAmount (not minAmount)
  if (cartTotal < coupon.minOrderAmount)
    throw new Error(
      `Minimum order amount of ₹${coupon.minOrderAmount} required to use this coupon`
    );

  // Calculate discount - using discountPercent (not discount)
  const discountAmount = parseFloat(
    ((cartTotal * coupon.discountPercent) / 100).toFixed(2)
  );
  const finalAmount = parseFloat((cartTotal - discountAmount).toFixed(2));

  return { 
    discountPercent: coupon.discountPercent, 
    discountAmount, 
    finalAmount, 
    coupon 
  };
};

// ─── List all coupons (admin) ─────────────────────────────────
export const listCoupons = async (): Promise<Coupon[]> => {
  return await couponDao.getAllCoupons();
};