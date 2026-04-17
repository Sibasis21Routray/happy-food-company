import * as couponDao from "../dao/couponDao";
import { ICoupon } from "../models/coupon.model";

export interface ApplyCouponResult {
  discountPercent: number;
  discountAmount: number;
  finalAmount: number;
  coupon: ICoupon;
}

// ─── Create coupon (admin) ────────────────────────────────────
export const createCoupon = async (data: Partial<ICoupon>): Promise<ICoupon> => {
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
  if (coupon.expiresAt && coupon.expiresAt < new Date())
    throw new Error("Coupon has expired");
  if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses)
    throw new Error("Coupon usage limit reached");
  if (cartTotal < coupon.minOrderAmount)
    throw new Error(
      `Minimum order amount of ₹${coupon.minOrderAmount} required to use this coupon`
    );

  const discountAmount = parseFloat(
    ((cartTotal * coupon.discountPercent) / 100).toFixed(2)
  );
  const finalAmount = parseFloat((cartTotal - discountAmount).toFixed(2));

  return { discountPercent: coupon.discountPercent, discountAmount, finalAmount, coupon };
};

// ─── List all coupons (admin) ─────────────────────────────────
export const listCoupons = async (): Promise<ICoupon[]> => {
  return await couponDao.getAllCoupons();
};
