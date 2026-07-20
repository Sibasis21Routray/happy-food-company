import { query } from '../config/database';
import { Address, CreateAddressInput, UpdateAddressInput } from '../models/address.model';
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

// ─── Create address ──────────────────────────────────────────────
export const createAddress = async (data: CreateAddressInput): Promise<Address> => {
  const result = await query<ResultSetHeader>(
    `INSERT INTO addresses (
      user_id, name, email, phone, street_address, locality, city,
      state, country, pin_code, landmark, alternate_phone, type, is_saved
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.userId,
      data.name,
      data.email,
      data.phone,
      data.streetAddress,
      data.locality,
      data.city,
      data.state,
      data.country,
      data.pinCode,
      data.landmark || null,
      data.alternatePhone || null,
      data.type || 'Home',
      data.isSaved !== undefined ? data.isSaved : true
    ]
  );
  
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM addresses WHERE id = ?',
    [result.insertId]
  );
  
  return toCamelCase(rows[0]);
};

// ─── Get addresses by user ID ──────────────────────────────────
export const getAddressesByUserId = async (userId: string): Promise<Address[]> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM addresses WHERE user_id = ? AND is_saved = TRUE ORDER BY created_at DESC',
    [userId]
  );
  return rows.map(row => toCamelCase(row));
};

// ─── Get address by ID ──────────────────────────────────────────
export const getAddressById = async (id: string): Promise<Address | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM addresses WHERE id = ?',
    [id]
  );
  return rows.length ? toCamelCase(rows[0]) : null;
};

// ─── Update address by ID ──────────────────────────────────────
export const updateAddress = async (
  addressId: string,
  userId: string,
  updateData: Partial<UpdateAddressInput>
): Promise<Address | null> => {
  const fields: string[] = [];
  const values: any[] = [];

  if (updateData.name !== undefined) { fields.push('name = ?'); values.push(updateData.name); }
  if (updateData.email !== undefined) { fields.push('email = ?'); values.push(updateData.email); }
  if (updateData.phone !== undefined) { fields.push('phone = ?'); values.push(updateData.phone); }
  if (updateData.streetAddress !== undefined) { fields.push('street_address = ?'); values.push(updateData.streetAddress); }
  if (updateData.locality !== undefined) { fields.push('locality = ?'); values.push(updateData.locality); }
  if (updateData.city !== undefined) { fields.push('city = ?'); values.push(updateData.city); }
  if (updateData.state !== undefined) { fields.push('state = ?'); values.push(updateData.state); }
  if (updateData.country !== undefined) { fields.push('country = ?'); values.push(updateData.country); }
  if (updateData.pinCode !== undefined) { fields.push('pin_code = ?'); values.push(updateData.pinCode); }
  if (updateData.landmark !== undefined) { fields.push('landmark = ?'); values.push(updateData.landmark); }
  if (updateData.alternatePhone !== undefined) { fields.push('alternate_phone = ?'); values.push(updateData.alternatePhone); }
  if (updateData.type !== undefined) { fields.push('type = ?'); values.push(updateData.type); }
  if (updateData.isSaved !== undefined) { fields.push('is_saved = ?'); values.push(updateData.isSaved); }

  if (fields.length === 0) return await getAddressById(addressId);

  // Check if address belongs to user
  const address = await getAddressById(addressId);
  if (!address || address.userId !== userId) {
    return null;
  }

  values.push(addressId);
  await query(
    `UPDATE addresses SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  
  return await getAddressById(addressId);
};

// ─── Delete address by ID ──────────────────────────────────────
export const deleteAddress = async (addressId: string, userId: string): Promise<Address | null> => {
  // Check if address exists and belongs to user
  const address = await getAddressById(addressId);
  if (!address || address.userId !== userId) {
    return null;
  }
  
  // Delete the address
  await query(
    'DELETE FROM addresses WHERE id = ? AND user_id = ?',
    [addressId, userId]
  );
  
  return address;
};