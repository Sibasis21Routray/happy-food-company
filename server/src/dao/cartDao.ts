import { query } from '../config/database';
import { Cart, CartItem, CartWithProducts } from '../models/cart.model';
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

// ─── Helper to safely parse images ────────────────────────────
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

// ─── Get cart by user ID with populated products ──────────────
export const getCartByUserId = async (userId: string): Promise<CartWithProducts | null> => {
  // Get cart
  const cartRows = await query<RowDataPacket[]>(
    'SELECT * FROM carts WHERE user_id = ?',
    [userId]
  );
  
  if (!cartRows.length) return null;
  
  const cart = toCamelCase(cartRows[0]);
  
  // Get cart items with product details
  const items = await query<RowDataPacket[]>(
    `SELECT ci.*, 
            p.id as product_id, p.title, p.images, p.price as product_price, 
            p.stock_details, p.heading, p.subtitle, p.is_active
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id = ?
     ORDER BY ci.created_at ASC`,
    [cart.id]
  );
  
  cart.items = items.map((item: any) => ({
    id: item.id,
    cartId: item.cart_id,
    productId: item.product_id,
    quantity: item.quantity,
    price: item.price,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    product: {
      id: item.product_id,
      title: item.title,
      images: parseImages(item.images),
      price: item.product_price,
      stockDetails: item.stock_details,
      heading: item.heading,
      subtitle: item.subtitle,
      isActive: item.is_active === 1
    }
  }));
  
  return cart;
};

// ─── Upsert cart (create or update) ────────────────────────────
export const upsertCart = async (userId: string, cartData: Partial<Cart>): Promise<Cart> => {
  // Check if cart exists
  const existingCart = await query<RowDataPacket[]>(
    'SELECT * FROM carts WHERE user_id = ?',
    [userId]
  );
  
  let cartId: string;
  
  if (!existingCart.length) {
    // Create new cart
    const result = await query<ResultSetHeader>(
      'INSERT INTO carts (user_id, total_amount) VALUES (?, ?)',
      [userId, cartData.totalAmount || 0]
    );
    cartId = result.insertId.toString();
  } else {
    cartId = existingCart[0].id;
    
    // Update total amount if provided
    if (cartData.totalAmount !== undefined) {
      await query(
        'UPDATE carts SET total_amount = ? WHERE id = ?',
        [cartData.totalAmount, cartId]
      );
    }
  }
  
  // Handle items if provided
  if (cartData.items !== undefined) {
    // Delete existing items
    await query(
      'DELETE FROM cart_items WHERE cart_id = ?',
      [cartId]
    );
    
    // Insert new items
    for (const item of cartData.items) {
      // Get product price if not provided
      let price = (item as any).price;
      if (!price) {
        const productRows = await query<RowDataPacket[]>(
          'SELECT price FROM products WHERE id = ?',
          [(item as any).productId]
        );
        if (productRows.length) {
          price = productRows[0].price;
        }
      }
      
      await query(
        `INSERT INTO cart_items (cart_id, product_id, quantity, price) 
         VALUES (?, ?, ?, ?)`,
        [cartId, (item as any).productId, (item as any).quantity, price || 0]
      );
    }
  }
  
  // Get updated cart
  const updatedCart = await query<RowDataPacket[]>(
    'SELECT * FROM carts WHERE id = ?',
    [cartId]
  );
  
  return toCamelCase(updatedCart[0]);
};

// ─── Clear cart ─────────────────────────────────────────────────
export const clearCart = async (userId: string): Promise<void> => {
  // Get cart
  const cartRows = await query<RowDataPacket[]>(
    'SELECT id FROM carts WHERE user_id = ?',
    [userId]
  );
  
  if (!cartRows.length) return;
  
  const cartId = cartRows[0].id;
  
  // Delete all cart items
  await query(
    'DELETE FROM cart_items WHERE cart_id = ?',
    [cartId]
  );
  
  // Update total amount to 0
  await query(
    'UPDATE carts SET total_amount = 0 WHERE id = ?',
    [cartId]
  );
};