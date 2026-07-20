// src/models/coupon.model.ts
export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;      // e.g. 10 means 10% off
  minOrderAmount: number;       // minimum cart total to apply coupon
  maxUses: number;              // 0 = unlimited
  usedCount: number;
  expiresAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCouponInput = Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'usedCount' | 'isActive'> & {
  isActive?: boolean;
};

export type UpdateCouponInput = Partial<Omit<Coupon, 'id' | 'createdAt' | 'updatedAt'>>;

export type CouponFilters = {
  isActive?: boolean;
  code?: string;
  minAmount?: number;
  expiresBefore?: Date;
  expiresAfter?: Date;
};