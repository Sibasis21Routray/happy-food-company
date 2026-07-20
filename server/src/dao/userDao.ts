import { query } from '../config/database';
import { User, CreateUserInput, UpdateUserInput } from '../models/user.model';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import crypto from 'crypto';

// ─── Helper to convert snake_case to camelCase ──────────────
const toCamelCase = (row: any): any => {
  const result: any = {};
  for (const key in row) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = row[key];
  }
  return result;
};

// ─── Helper to convert camelCase to snake_case ──────────────
const toSnakeCase = (data: any): any => {
  const result: any = {};
  for (const key in data) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    result[snakeKey] = data[key];
  }
  return result;
};

// ─── Find user by email ───────────────────────────────────────
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM users WHERE email = ? AND deleted_at IS NULL',
    [email]
  );
  return rows.length ? toCamelCase(rows[0]) : null;
};

// ─── Find user by mobile number ───────────────────────────────
export const findUserByMobileNumber = async (mobileNumber: string): Promise<User | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM users WHERE mobile_number = ? AND deleted_at IS NULL',
    [mobileNumber]
  );
  return rows.length ? toCamelCase(rows[0]) : null;
};

// ─── Find user by email OR mobile number ──────────────────────
export const findUserByEmailOrMobile = async (identifier: string): Promise<User | null> => {
  const rows = await query<RowDataPacket[]>(
    `SELECT * FROM users 
     WHERE (email = ? OR mobile_number = ?) 
     AND deleted_at IS NULL`,
    [identifier, identifier]
  );
  return rows.length ? toCamelCase(rows[0]) : null;
};

// ─── Find user by ID ──────────────────────────────────────────
export const findUserById = async (id: string): Promise<Omit<User, 'password'> | null> => {
  const rows = await query<RowDataPacket[]>(
    `SELECT id, full_name, first_name, last_name, gender, mobile_number, email, 
            role, is_blocked, order_ids, cart_ids, reset_password_token, 
            reset_password_expires, created_at, updated_at 
     FROM users WHERE id = ? AND deleted_at IS NULL`,
    [id]
  );
  
  if (!rows.length) {
    return null;
  }
  
  return toCamelCase(rows[0]);
};

// ─── Find user by ID with password (for auth) ─────────────────
export const findUserByIdWithPassword = async (id: string): Promise<User | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM users WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
  return rows.length ? toCamelCase(rows[0]) : null;
};

// ─── Create new user ──────────────────────────────────────────
export const createUser = async (data: CreateUserInput & { role?: string }): Promise<User> => {
  try {
    // Generate a UUID for the new user
    const userId = crypto.randomUUID();
    
    const result = await query<ResultSetHeader>(
      `INSERT INTO users (
        id, full_name, first_name, last_name, gender, mobile_number, email, password, role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        data.fullName,
        data.firstName || null,
        data.lastName || null,
        data.gender || null,
        data.mobileNumber || null,
        data.email,
        data.password,
        data.role || 'user'  // ← lowercase default
      ]
    );
    
    // Check if insert was successful
    if (result.affectedRows === 0) {
      throw new Error("Failed to create user: No rows affected");
    }
    
    // Get the created user by the generated UUID
    const user = await findUserById(userId);
    
    // Make sure user exists
    if (!user) {
      throw new Error("Failed to create user: User not found after creation");
    }
    
    return user as User;
  } catch (error: any) {
    // Check for duplicate entry error
    if (error.code === 'ER_DUP_ENTRY' || error.message?.includes('Duplicate entry')) {
      if (error.message?.includes('email')) {
        throw new Error("Email already registered");
      } else if (error.message?.includes('mobile_number')) {
        throw new Error("Mobile number already registered");
      }
    }
    throw error;
  }
};

// ─── Add an Order ID to user ──────────────────────────────────
export const addOrderId = async (userId: string, orderId: string): Promise<User | null> => {
  // Get current order_ids
  const user = await query<RowDataPacket[]>(
    'SELECT order_ids FROM users WHERE id = ? AND deleted_at IS NULL',
    [userId]
  );
  
  if (!user.length) return null;
  
  let orderIds = user[0].order_ids || [];
  if (typeof orderIds === 'string') {
    orderIds = JSON.parse(orderIds);
  }
  
  if (!orderIds.includes(orderId)) {
    orderIds.push(orderId);
  }
  
  await query(
    'UPDATE users SET order_ids = ? WHERE id = ? AND deleted_at IS NULL',
    [JSON.stringify(orderIds), userId]
  );
  
  return await findUserById(userId) as User;
};

// ─── Add a Cart ID to user ────────────────────────────────────
export const addCartId = async (userId: string, cartId: string): Promise<User | null> => {
  // Get current cart_ids
  const user = await query<RowDataPacket[]>(
    'SELECT cart_ids FROM users WHERE id = ? AND deleted_at IS NULL',
    [userId]
  );
  
  if (!user.length) return null;
  
  let cartIds = user[0].cart_ids || [];
  if (typeof cartIds === 'string') {
    cartIds = JSON.parse(cartIds);
  }
  
  if (!cartIds.includes(cartId)) {
    cartIds.push(cartId);
  }
  
  await query(
    'UPDATE users SET cart_ids = ? WHERE id = ? AND deleted_at IS NULL',
    [JSON.stringify(cartIds), userId]
  );
  
  return await findUserById(userId) as User;
};

// ─── Remove an Order ID from user ────────────────────────────
export const removeOrderId = async (userId: string, orderId: string): Promise<User | null> => {
  // Get current order_ids
  const user = await query<RowDataPacket[]>(
    'SELECT order_ids FROM users WHERE id = ? AND deleted_at IS NULL',
    [userId]
  );
  
  if (!user.length) return null;
  
  let orderIds = user[0].order_ids || [];
  if (typeof orderIds === 'string') {
    orderIds = JSON.parse(orderIds);
  }
  
  orderIds = orderIds.filter((id: string) => id !== orderId);
  
  await query(
    'UPDATE users SET order_ids = ? WHERE id = ? AND deleted_at IS NULL',
    [JSON.stringify(orderIds), userId]
  );
  
  return await findUserById(userId) as User;
};

// ─── Remove a Cart ID from user ───────────────────────────────
export const removeCartId = async (userId: string, cartId: string): Promise<User | null> => {
  // Get current cart_ids
  const user = await query<RowDataPacket[]>(
    'SELECT cart_ids FROM users WHERE id = ? AND deleted_at IS NULL',
    [userId]
  );
  
  if (!user.length) return null;
  
  let cartIds = user[0].cart_ids || [];
  if (typeof cartIds === 'string') {
    cartIds = JSON.parse(cartIds);
  }
  
  cartIds = cartIds.filter((id: string) => id !== cartId);
  
  await query(
    'UPDATE users SET cart_ids = ? WHERE id = ? AND deleted_at IS NULL',
    [JSON.stringify(cartIds), userId]
  );
  
  return await findUserById(userId) as User;
};

// ─── Update user details ─────────────────────────────────────
export const updateUser = async (userId: string, data: Partial<CreateUserInput>): Promise<Omit<User, 'password'> | null> => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.fullName !== undefined) { fields.push('full_name = ?'); values.push(data.fullName); }
  if (data.firstName !== undefined) { fields.push('first_name = ?'); values.push(data.firstName); }
  if (data.lastName !== undefined) { fields.push('last_name = ?'); values.push(data.lastName); }
  if (data.gender !== undefined) { fields.push('gender = ?'); values.push(data.gender); }
  if (data.mobileNumber !== undefined) { fields.push('mobile_number = ?'); values.push(data.mobileNumber); }
  if (data.password !== undefined) { fields.push('password = ?'); values.push(data.password); }

  if (fields.length === 0) return await findUserById(userId);

  values.push(userId);
  await query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ? AND deleted_at IS NULL`,
    values
  );
  
  return await findUserById(userId);
};

// ─── Update user role (admin only) ───────────────────────────
export const updateUserRole = async (userId: string, role: 'user' | 'vendor' | 'admin'): Promise<Omit<User, 'password'> | null> => {
  await query(
    'UPDATE users SET role = ? WHERE id = ? AND deleted_at IS NULL',
    [role, userId]
  );
  return await findUserById(userId);
};

// ─── Block/Unblock user ──────────────────────────────────────
export const toggleUserBlock = async (userId: string, isBlocked: boolean): Promise<Omit<User, 'password'> | null> => {
  await query(
    'UPDATE users SET is_blocked = ? WHERE id = ? AND deleted_at IS NULL',
    [isBlocked, userId]
  );
  return await findUserById(userId);
};

// ─── Find user by reset token ─────────────────────────────────
export const findUserByResetToken = async (token: string): Promise<User | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > NOW() AND deleted_at IS NULL',
    [token]
  );
  return rows.length ? toCamelCase(rows[0]) : null;
};

// ─── Reset user password ──────────────────────────────────────
export const resetUserPassword = async (userId: string, hashedPassword: string): Promise<User | null> => {
  await query(
    `UPDATE users 
     SET password = ?, reset_password_token = NULL, reset_password_expires = NULL 
     WHERE id = ? AND deleted_at IS NULL`,
    [hashedPassword, userId]
  );
  return await findUserById(userId) as User;
};

// ─── Get all users (admin only) ──────────────────────────────
export const getAllUsers = async (): Promise<Omit<User, 'password'>[]> => {
  const rows = await query<RowDataPacket[]>(
    `SELECT id, full_name, first_name, last_name, gender, mobile_number, email, 
            role, is_blocked, order_ids, cart_ids, created_at, updated_at 
     FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC`
  );
  return rows.map(row => toCamelCase(row));
};

// ─── Delete user (soft delete) ────────────────────────────────
export const deleteUser = async (userId: string): Promise<boolean> => {
  const result = await query<ResultSetHeader>(
    'UPDATE users SET deleted_at = NOW() WHERE id = ?',
    [userId]
  );
  return result.affectedRows > 0;
};

// ─── Get user count ───────────────────────────────────────────
export const getUserCount = async (): Promise<number> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT COUNT(*) as count FROM users WHERE deleted_at IS NULL'
  );
  return rows[0].count;
};

// ─── Get users by role ────────────────────────────────────────
export const getUsersByRole = async (role: 'user' | 'vendor' | 'admin'): Promise<Omit<User, 'password'>[]> => {
  const rows = await query<RowDataPacket[]>(
    `SELECT id, full_name, first_name, last_name, gender, mobile_number, email, 
            role, is_blocked, order_ids, cart_ids, created_at, updated_at 
     FROM users WHERE role = ? AND deleted_at IS NULL ORDER BY created_at DESC`,
    [role]
  );
  return rows.map(row => toCamelCase(row));
};

// ─── Check if user exists ─────────────────────────────────────
export const userExists = async (email?: string, mobileNumber?: string): Promise<boolean> => {
  let sql = 'SELECT COUNT(*) as count FROM users WHERE deleted_at IS NULL';
  const params: any[] = [];
  
  if (email && mobileNumber) {
    sql += ' AND (email = ? OR mobile_number = ?)';
    params.push(email, mobileNumber);
  } else if (email) {
    sql += ' AND email = ?';
    params.push(email);
  } else if (mobileNumber) {
    sql += ' AND mobile_number = ?';
    params.push(mobileNumber);
  }
  
  const rows = await query<RowDataPacket[]>(sql, params);
  return rows[0].count > 0;
};