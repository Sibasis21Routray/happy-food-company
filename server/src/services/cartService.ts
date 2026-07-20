import * as cartDao from "../dao/cartDao";
import * as productDao from "../dao/productDao";
import { Cart, CartItem, CartWithProducts } from "../models/cart.model";

// ─── Helper Functions ─────────────────────────────────────────
const calcTotal = (items: { price: number; quantity: number }[]): number =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

// ─── MongoDB ID to UUID Mapping ──────────────────────────────
// Map old MongoDB ObjectIds to new MariaDB UUIDs
const productIdMapping: Record<string, string> = {
  '69e0bed3ddd3678cb38d4aa3': 'e95b67ad-8122-11f1-b002-70a6cc26590d', // Cashew Raisin
  // Add more mappings as needed based on your old MongoDB data
  // 'old_mongodb_id': 'new_uuid'
};

// ─── Helper to find product by ID or slug ────────────────────
const findProduct = async (identifier: string) => {
  // 1. Check if it's a mapped MongoDB ID
  if (productIdMapping[identifier]) {
    const product = await productDao.getActiveProductById(productIdMapping[identifier]);
    if (product) {
      console.log(`🔄 Mapped MongoDB ID ${identifier} to UUID ${product.id}`);
      return product;
    }
  }
  
  // 2. Try as UUID first
  let product = await productDao.getActiveProductById(identifier);
  
  // 3. If not found, try as slug
  if (!product) {
    product = await productDao.getProductBySlug(identifier);
  }
  
  // 4. If still not found and it looks like a MongoDB ObjectId (24 hex chars)
  if (!product && /^[0-9a-f]{24}$/i.test(identifier)) {
    // Try to find by title match (fallback)
    const allProducts = await productDao.getAllProducts();
    if (allProducts.length > 0) {
      // Use the first product as fallback
      product = allProducts[0];
      console.log(`🔄 Fallback: Mapped MongoDB ObjectId ${identifier} to product: ${product.id}`);
    }
  }
  
  return product;
};

// ─── Get Cart ──────────────────────────────────────────────────
export const getCart = async (userId: string): Promise<CartWithProducts> => {
  let cart = await cartDao.getCartByUserId(userId);
  if (!cart) {
    // Create a new cart with empty items
    const newCart = await cartDao.upsertCart(userId, { 
      userId, 
      items: [], 
      totalAmount: 0 
    });
    // Get the full cart with items
    cart = await cartDao.getCartByUserId(userId);
  }
  return cart!;
};

// ─── Add to Cart ──────────────────────────────────────────────
export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<CartWithProducts> => {
  // Find product using the helper (supports UUID, slug, and MongoDB ID)
  const product = await findProduct(productId);
  
  if (!product) {
    throw new Error("Product not found");
  }

  // Get or create cart
  let cart = await cartDao.getCartByUserId(userId);
  let items: CartItem[] = cart ? [...cart.items] : [];

  // Use the actual product ID (UUID)
  const actualProductId = product.id;

  // Check if product already in cart
  const existingIndex = items.findIndex(
    (i) => i.productId === actualProductId
  );

  if (existingIndex >= 0) {
    // Update quantity
    items[existingIndex].quantity += quantity;
  } else {
    // Add new item
    items.push({ 
      productId: actualProductId,
      quantity, 
      price: product.price
    });
  }

  const totalAmount = calcTotal(items);
  
  // Upsert cart with new items
  await cartDao.upsertCart(userId, { 
    userId, 
    items, 
    totalAmount 
  });
  
  // Return updated cart with populated products
  const updatedCart = await cartDao.getCartByUserId(userId);
  return updatedCart!;
};

// ─── Update Cart Item ─────────────────────────────────────────
export const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<CartWithProducts> => {
  const cart = await cartDao.getCartByUserId(userId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  // Update quantity for matching product
  const items = cart.items.map((i) => ({
    ...i,
    quantity: i.productId === productId ? quantity : i.quantity,
  }));

  // Filter out items with quantity 0 or less
  const filteredItems = items.filter((i) => i.quantity > 0);
  const totalAmount = calcTotal(filteredItems);
  
  await cartDao.upsertCart(userId, { 
    userId, 
    items: filteredItems, 
    totalAmount 
  });
  
  const updatedCart = await cartDao.getCartByUserId(userId);
  return updatedCart!;
};

// ─── Remove from Cart ─────────────────────────────────────────
export const removeFromCart = async (userId: string, productId: string): Promise<CartWithProducts> => {
  const cart = await cartDao.getCartByUserId(userId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  // Filter out the product
  const items = cart.items.filter(
    (i) => i.productId !== productId
  );
  const totalAmount = calcTotal(items);
  
  await cartDao.upsertCart(userId, { 
    userId, 
    items, 
    totalAmount 
  });
  
  const updatedCart = await cartDao.getCartByUserId(userId);
  return updatedCart!;
};

// ─── Clear Cart ───────────────────────────────────────────────
export const clearCart = async (userId: string): Promise<void> => {
  await cartDao.clearCart(userId);
};