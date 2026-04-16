import mongoose, { Document, Schema } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountPercent: number;      // e.g. 10 means 10% off
  minOrderAmount: number;       // minimum cart total to apply coupon
  maxUses: number;              // 0 = unlimited
  usedCount: number;
  expiresAt: Date | null;
  isActive: boolean;
}

const CouponSchema: Schema = new Schema(
  {
    code:            { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountPercent: { type: Number, required: true, min: 1, max: 100 },
    minOrderAmount:  { type: Number, default: 0 },
    maxUses:         { type: Number, default: 0 },
    usedCount:       { type: Number, default: 0 },
    expiresAt:       { type: Date, default: null },
    isActive:        { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICoupon>("Coupon", CouponSchema);
