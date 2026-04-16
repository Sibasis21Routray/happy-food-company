import Coupon, { ICoupon } from "../models/coupon.model";

export const createCoupon = async (data: Partial<ICoupon>): Promise<ICoupon> => {
  return await Coupon.create(data);
};

export const findCouponByCode = async (code: string): Promise<ICoupon | null> => {
  return await Coupon.findOne({ code: code.toUpperCase() });
};

export const incrementCouponUse = async (code: string): Promise<void> => {
  await Coupon.findOneAndUpdate({ code: code.toUpperCase() }, { $inc: { usedCount: 1 } });
};

export const getAllCoupons = async (): Promise<ICoupon[]> => {
  return await Coupon.find();
};
