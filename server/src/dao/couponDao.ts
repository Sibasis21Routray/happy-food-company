import { query } from '../config/database';
import { Coupon, CreateCouponInput } from '../models/coupon.model';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// ─── Helper to convert snake_case to camelCase ──────────────
const toCamelCase = (row: any): any => {
  const result: any = {};
  for (const key in row) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = row[key];
  }
  return result;
};

// ─── Create coupon ──────────────────────────────────────────────
export const createCoupon = async (data: Partial<Coupon>): Promise<Coupon> => {
  const result = await query<ResultSetHeader>(
    `INSERT INTO coupons (
      code, discount_percent, min_order_amount, max_uses, expires_at, is_active, used_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.code?.toUpperCase(),
      data.discountPercent,
      data.minOrderAmount || 0,
      data.maxUses || 0,
      data.expiresAt,
      data.isActive !== undefined ? data.isActive : true,
      0
    ]
  );
  
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM coupons WHERE id = ?',
    [result.insertId]
  );
  
  return toCamelCase(rows[0]);
};

// ─── Find coupon by code ───────────────────────────────────────
export const findCouponByCode = async (code: string): Promise<Coupon | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM coupons WHERE code = ?',
    [code.toUpperCase()]
  );
  return rows.length ? toCamelCase(rows[0]) : null;
};

// ─── Increment coupon use count ────────────────────────────────
export const incrementCouponUse = async (code: string): Promise<void> => {
  await query(
    'UPDATE coupons SET used_count = used_count + 1 WHERE code = ?',
    [code.toUpperCase()]
  );
};

// ─── Get all coupons ────────────────────────────────────────────
export const getAllCoupons = async (): Promise<Coupon[]> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM coupons ORDER BY created_at DESC'
  );
  return rows.map(row => toCamelCase(row));
};