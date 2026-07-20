import { query } from '../config/database';
import { Product, CreateProductInput, UpdateProductInput } from '../models/product.model';
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

// ─── Helper to parse product images ──────────────────────────
const parseProductImages = (product: any): any => {
  if (product && product.images) {
    if (typeof product.images === 'string') {
      try {
        product.images = JSON.parse(product.images);
      } catch (e) {
        product.images = [];
      }
    } else if (!Array.isArray(product.images)) {
      product.images = [];
    }
  } else {
    product.images = [];
  }
  return product;
};

// ─── Create product ────────────────────────────────────────────
export const createProduct = async (data: CreateProductInput): Promise<Product> => {
  const result = await query<ResultSetHeader>(
    `INSERT INTO products (
      heading, slug, title, subtitle, product_heading, product_description,
      stock_details, category, price, images, is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.heading,
      data.slug,
      data.title,
      data.subtitle,
      data.productHeading,
      data.productDescription,
      data.stockDetails,
      data.category,
      data.price,
      JSON.stringify(data.images || []),
      true
    ]
  );
  
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE id = ?',
    [result.insertId]
  );
  
  return parseProductImages(toCamelCase(rows[0]));
};

// ─── Get all active products ──────────────────────────────────
export const getAllProducts = async (): Promise<Product[]> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC'
  );
  return rows.map(row => parseProductImages(toCamelCase(row)));
};

// ─── Get all products (including inactive - admin only) ──────
export const getAllProductsAdmin = async (): Promise<Product[]> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products ORDER BY created_at DESC'
  );
  return rows.map(row => parseProductImages(toCamelCase(row)));
};

// ─── Get product by ID ─────────────────────────────────────────
export const getProductById = async (id: string): Promise<Product | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE id = ?',
    [id]
  );
  return rows.length ? parseProductImages(toCamelCase(rows[0])) : null;
};

// ─── Get active product by ID ──────────────────────────────────
export const getActiveProductById = async (id: string): Promise<Product | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE id = ? AND is_active = TRUE',
    [id]
  );
  return rows.length ? parseProductImages(toCamelCase(rows[0])) : null;
};

// ─── Get product by slug ───────────────────────────────────────
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE slug = ? AND is_active = TRUE',
    [slug]
  );
  return rows.length ? parseProductImages(toCamelCase(rows[0])) : null;
};

// ─── Get product by slug (including inactive - admin) ─────────
export const getProductBySlugAdmin = async (slug: string): Promise<Product | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE slug = ?',
    [slug]
  );
  return rows.length ? parseProductImages(toCamelCase(rows[0])) : null;
};

// ─── Update product ────────────────────────────────────────────
export const updateProduct = async (
  id: string,
  data: Partial<CreateProductInput & { isActive: boolean }>
): Promise<Product | null> => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.heading !== undefined) { fields.push('heading = ?'); values.push(data.heading); }
  if (data.slug !== undefined) { fields.push('slug = ?'); values.push(data.slug); }
  if (data.title !== undefined) { fields.push('title = ?'); values.push(data.title); }
  if (data.subtitle !== undefined) { fields.push('subtitle = ?'); values.push(data.subtitle); }
  if (data.productHeading !== undefined) { fields.push('product_heading = ?'); values.push(data.productHeading); }
  if (data.productDescription !== undefined) { fields.push('product_description = ?'); values.push(data.productDescription); }
  if (data.stockDetails !== undefined) { fields.push('stock_details = ?'); values.push(data.stockDetails); }
  if (data.category !== undefined) { fields.push('category = ?'); values.push(data.category); }
  if (data.price !== undefined) { fields.push('price = ?'); values.push(data.price); }
  if (data.images !== undefined) { fields.push('images = ?'); values.push(JSON.stringify(data.images)); }
  if (data.isActive !== undefined) { fields.push('is_active = ?'); values.push(data.isActive); }

  if (fields.length === 0) return await getProductById(id);

  values.push(id);
  await query(
    `UPDATE products SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  
  return await getProductById(id);
};

// ─── Delete product (soft delete) ─────────────────────────────
export const deleteProduct = async (id: string): Promise<Product | null> => {
  await query(
    'UPDATE products SET is_active = FALSE WHERE id = ?',
    [id]
  );
  return await getProductById(id);
};

// ─── Activate product ──────────────────────────────────────────
export const activateProduct = async (id: string): Promise<Product | null> => {
  await query(
    'UPDATE products SET is_active = TRUE WHERE id = ?',
    [id]
  );
  return await getProductById(id);
};

// ─── Hard delete product (permanent) ──────────────────────────
export const hardDeleteProduct = async (id: string): Promise<boolean> => {
  const result = await query<ResultSetHeader>(
    'DELETE FROM products WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
};

// ─── Get products by category ──────────────────────────────────
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE category = ? AND is_active = TRUE ORDER BY created_at DESC',
    [category]
  );
  return rows.map(row => parseProductImages(toCamelCase(row)));
};

// ─── Get products by categories (multiple) ────────────────────
export const getProductsByCategories = async (categories: string[]): Promise<Product[]> => {
  if (!categories.length) return [];
  
  const placeholders = categories.map(() => '?').join(',');
  const rows = await query<RowDataPacket[]>(
    `SELECT * FROM products WHERE category IN (${placeholders}) AND is_active = TRUE ORDER BY created_at DESC`,
    categories
  );
  return rows.map(row => parseProductImages(toCamelCase(row)));
};

// ─── Search products ──────────────────────────────────────────
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  const searchPattern = `%${searchTerm}%`;
  const rows = await query<RowDataPacket[]>(
    `SELECT * FROM products 
     WHERE is_active = TRUE 
     AND (heading LIKE ? OR title LIKE ? OR subtitle LIKE ? OR 
          product_heading LIKE ? OR product_description LIKE ? OR category LIKE ?)
     ORDER BY created_at DESC`,
    [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern]
  );
  return rows.map(row => parseProductImages(toCamelCase(row)));
};

// ─── Get products with pagination ─────────────────────────────
export const getProductsPaginated = async (
  page: number = 1,
  limit: number = 10,
  category?: string,
  searchTerm?: string
): Promise<{ products: Product[]; total: number; totalPages: number }> => {
  const offset = (page - 1) * limit;
  
  let whereClause = 'WHERE is_active = TRUE';
  const params: any[] = [];
  
  if (category) {
    whereClause += ' AND category = ?';
    params.push(category);
  }
  
  if (searchTerm) {
    const searchPattern = `%${searchTerm}%`;
    whereClause += ` AND (heading LIKE ? OR title LIKE ? OR product_description LIKE ?)`;
    params.push(searchPattern, searchPattern, searchPattern);
  }
  
  // Get total count
  const countRows = await query<RowDataPacket[]>(
    `SELECT COUNT(*) as total FROM products ${whereClause}`,
    params
  );
  const total = countRows[0].total;
  
  // Get paginated results
  const rows = await query<RowDataPacket[]>(
    `SELECT * FROM products ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  
  return {
    products: rows.map(row => parseProductImages(toCamelCase(row))),
    total,
    totalPages: Math.ceil(total / limit)
  };
};

// ─── Get featured products ────────────────────────────────────
export const getFeaturedProducts = async (limit: number = 10): Promise<Product[]> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC LIMIT ?',
    [limit]
  );
  return rows.map(row => parseProductImages(toCamelCase(row)));
};

// ─── Get product count ────────────────────────────────────────
export const getProductCount = async (activeOnly: boolean = true): Promise<number> => {
  const whereClause = activeOnly ? 'WHERE is_active = TRUE' : '';
  const rows = await query<RowDataPacket[]>(
    `SELECT COUNT(*) as count FROM products ${whereClause}`
  );
  return rows[0].count;
};

// ─── Get products by price range ──────────────────────────────
export const getProductsByPriceRange = async (
  minPrice: number,
  maxPrice: number
): Promise<Product[]> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE is_active = TRUE AND price >= ? AND price <= ? ORDER BY price ASC',
    [minPrice, maxPrice]
  );
  return rows.map(row => parseProductImages(toCamelCase(row)));
};

// ─── Update product images ────────────────────────────────────
export const updateProductImages = async (
  id: string,
  images: string[]
): Promise<Product | null> => {
  await query(
    'UPDATE products SET images = ? WHERE id = ?',
    [JSON.stringify(images), id]
  );
  return await getProductById(id);
};

// ─── Add image to product ─────────────────────────────────────
export const addProductImage = async (
  id: string,
  imageUrl: string
): Promise<Product | null> => {
  const product = await getProductById(id);
  if (!product) return null;
  
  const currentImages = product.images || [];
  const updatedImages = [...currentImages, imageUrl];
  
  await query(
    'UPDATE products SET images = ? WHERE id = ?',
    [JSON.stringify(updatedImages), id]
  );
  return await getProductById(id);
};

// ─── Remove image from product ────────────────────────────────
export const removeProductImage = async (
  id: string,
  imageUrl: string
): Promise<Product | null> => {
  const product = await getProductById(id);
  if (!product) return null;
  
  const currentImages = product.images || [];
  const updatedImages = currentImages.filter((img: string) => img !== imageUrl);
  
  await query(
    'UPDATE products SET images = ? WHERE id = ?',
    [JSON.stringify(updatedImages), id]
  );
  return await getProductById(id);
};

// ─── Check if product exists ──────────────────────────────────
export const productExists = async (id: string): Promise<boolean> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT COUNT(*) as count FROM products WHERE id = ?',
    [id]
  );
  return rows[0].count > 0;
};

// ─── Check if slug exists ─────────────────────────────────────
export const slugExists = async (slug: string, excludeId?: string): Promise<boolean> => {
  let sql = 'SELECT COUNT(*) as count FROM products WHERE slug = ?';
  const params: any[] = [slug];
  
  if (excludeId) {
    sql += ' AND id != ?';
    params.push(excludeId);
  }
  
  const rows = await query<RowDataPacket[]>(sql, params);
  return rows[0].count > 0;
};

// ─── Get random products ──────────────────────────────────────
export const getRandomProducts = async (limit: number = 5): Promise<Product[]> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE is_active = TRUE ORDER BY RAND() LIMIT ?',
    [limit]
  );
  return rows.map(row => parseProductImages(toCamelCase(row)));
};

// ─── Get related products ─────────────────────────────────────
export const getRelatedProducts = async (
  productId: string,
  category: string,
  limit: number = 5
): Promise<Product[]> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM products WHERE is_active = TRUE AND category = ? AND id != ? ORDER BY created_at DESC LIMIT ?',
    [category, productId, limit]
  );
  return rows.map(row => parseProductImages(toCamelCase(row)));
};

// ─── Update product stock ─────────────────────────────────────
export const updateProductStock = async (productId: string, quantity: number): Promise<Product | null> => {
  await query(
    'UPDATE products SET stock_details = ? WHERE id = ?',
    [`Stock: ${quantity}`, productId]
  );
  return await getProductById(productId);
};

// ─── Decrement product stock ──────────────────────────────────
export const decrementProductStock = async (productId: string, quantity: number): Promise<Product | null> => {
  const product = await getProductById(productId);
  if (!product) return null;
  
  const stockMatch = product.stockDetails?.match(/\d+/);
  const currentStock = stockMatch ? parseInt(stockMatch[0]) : 0;
  const newStock = Math.max(0, currentStock - quantity);
  
  const newStockDetails = product.stockDetails?.replace(/\d+/, newStock.toString()) || `Stock: ${newStock}`;
  
  await query(
    'UPDATE products SET stock_details = ? WHERE id = ?',
    [newStockDetails, productId]
  );
  return await getProductById(productId);
};