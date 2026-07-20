import { query } from '../config/database';
import { Wishlist, WishlistItem } from '../models/wishlist.model';
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

// ─── Helper to safely parse images ──────────────────────────
const parseImages = (images: any): string[] => {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  return [];
};

// ─── Get wishlist by user ID with products ────────────────────
export const getWishlistByUserId = async (userId: string): Promise<any | null> => {
  // Get wishlist
  const wishlistRows = await query<RowDataPacket[]>(
    'SELECT * FROM wishlists WHERE user_id = ?',
    [userId]
  );
  
  if (!wishlistRows.length) return null;
  
  const wishlist = toCamelCase(wishlistRows[0]);
  
  // Get wishlist items with product details
  const items = await query<RowDataPacket[]>(
    `SELECT wi.*, 
            p.id as product_id, p.heading, p.title, p.subtitle, 
            p.price, p.images, p.slug, p.is_active,
            p.product_description, p.stock_details, p.category
     FROM wishlist_items wi
     JOIN products p ON wi.product_id = p.id
     WHERE wi.wishlist_id = ?
     ORDER BY wi.created_at DESC`,
    [wishlist.id]
  );
  
  wishlist.items = items.map((item: any) => ({
    id: item.id,
    wishlistId: item.wishlist_id,
    productId: item.product_id,
    createdAt: item.created_at,
    product: {
      id: item.product_id,
      heading: item.heading,
      title: item.title,
      subtitle: item.subtitle,
      price: item.price,
      images: parseImages(item.images),
      slug: item.slug,
      isActive: item.is_active === 1,
      productDescription: item.product_description,
      stockDetails: item.stock_details,
      category: item.category
    }
  }));
  
  return wishlist;
};

// ─── Get wishlist product IDs only ────────────────────────────
export const getWishlistProductIds = async (userId: string): Promise<string[]> => {
  const wishlist = await query<RowDataPacket[]>(
    `SELECT wi.product_id 
     FROM wishlists w
     JOIN wishlist_items wi ON w.id = wi.wishlist_id
     WHERE w.user_id = ?`,
    [userId]
  );
  
  return wishlist.map(row => row.product_id);
};

// ─── Create wishlist for user ─────────────────────────────────
export const createWishlist = async (userId: string): Promise<any> => {
  const result = await query<ResultSetHeader>(
    'INSERT INTO wishlists (user_id) VALUES (?)',
    [userId]
  );
  
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM wishlists WHERE id = ?',
    [result.insertId]
  );
  
  return toCamelCase(rows[0]);
};

// ─── Get or create wishlist ───────────────────────────────────
export const getOrCreateWishlist = async (userId: string): Promise<any> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM wishlists WHERE user_id = ?',
    [userId]
  );
  
  if (rows.length) {
    return toCamelCase(rows[0]);
  }
  
  return await createWishlist(userId);
};

// ─── Add product to wishlist ──────────────────────────────────
export const addProductToWishlist = async (userId: string, productId: string): Promise<any | null> => {
  // Get or create wishlist
  let wishlistRows = await query<RowDataPacket[]>(
    'SELECT * FROM wishlists WHERE user_id = ?',
    [userId]
  );
  
  let wishlistId: string;
  
  if (!wishlistRows.length) {
    const result = await query<ResultSetHeader>(
      'INSERT INTO wishlists (user_id) VALUES (?)',
      [userId]
    );
    wishlistId = result.insertId.toString();
  } else {
    wishlistId = wishlistRows[0].id;
  }
  
  // Check if product exists and is active
  const productRows = await query<RowDataPacket[]>(
    'SELECT id FROM products WHERE id = ? AND is_active = TRUE',
    [productId]
  );
  
  if (!productRows.length) {
    throw new Error('Product not found or not active');
  }
  
  // Check if product already in wishlist
  const existingRows = await query<RowDataPacket[]>(
    'SELECT id FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?',
    [wishlistId, productId]
  );
  
  // If not exists, add it
  if (!existingRows.length) {
    await query(
      'INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (?, ?)',
      [wishlistId, productId]
    );
  }
  
  // Return updated wishlist
  return await getWishlistByUserId(userId);
};

// ─── Remove product from wishlist ─────────────────────────────
export const removeProductFromWishlist = async (userId: string, productId: string): Promise<any | null> => {
  // Get wishlist
  const wishlistRows = await query<RowDataPacket[]>(
    'SELECT id FROM wishlists WHERE user_id = ?',
    [userId]
  );
  
  if (!wishlistRows.length) {
    return null;
  }
  
  const wishlistId = wishlistRows[0].id;
  
  // Remove product from wishlist
  await query(
    'DELETE FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?',
    [wishlistId, productId]
  );
  
  // Return updated wishlist
  return await getWishlistByUserId(userId);
};

// ─── Check if product is in wishlist ──────────────────────────
export const isProductInWishlist = async (userId: string, productId: string): Promise<boolean> => {
  const rows = await query<RowDataPacket[]>(
    `SELECT wi.id 
     FROM wishlists w
     JOIN wishlist_items wi ON w.id = wi.wishlist_id
     WHERE w.user_id = ? AND wi.product_id = ?`,
    [userId, productId]
  );
  
  return rows.length > 0;
};

// ─── Get wishlist count ──────────────────────────────────────
export const getWishlistCount = async (userId: string): Promise<number> => {
  const rows = await query<RowDataPacket[]>(
    `SELECT COUNT(*) as count 
     FROM wishlists w
     JOIN wishlist_items wi ON w.id = wi.wishlist_id
     WHERE w.user_id = ?`,
    [userId]
  );
  
  return rows[0].count;
};

// ─── Clear wishlist ────────────────────────────────────────────
export const clearWishlist = async (userId: string): Promise<void> => {
  const wishlistRows = await query<RowDataPacket[]>(
    'SELECT id FROM wishlists WHERE user_id = ?',
    [userId]
  );
  
  if (wishlistRows.length) {
    await query(
      'DELETE FROM wishlist_items WHERE wishlist_id = ?',
      [wishlistRows[0].id]
    );
  }
};

// ─── Delete wishlist ───────────────────────────────────────────
export const deleteWishlist = async (userId: string): Promise<boolean> => {
  const wishlistRows = await query<RowDataPacket[]>(
    'SELECT id FROM wishlists WHERE user_id = ?',
    [userId]
  );
  
  if (!wishlistRows.length) return false;
  
  const wishlistId = wishlistRows[0].id;
  
  // Delete all wishlist items first
  await query(
    'DELETE FROM wishlist_items WHERE wishlist_id = ?',
    [wishlistId]
  );
  
  // Delete wishlist
  const result = await query<ResultSetHeader>(
    'DELETE FROM wishlists WHERE id = ?',
    [wishlistId]
  );
  
  return result.affectedRows > 0;
};