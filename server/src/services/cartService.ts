import * as cartDao from "../dao/cartDao";
import * as productDao from "../dao/productDao";
import { ICart } from "../models/cart.model";

// ─── Recalculate total from items ─────────────────────────────
const calcTotal = (items: { price: number; quantity: number }[]): number =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

// ─── Get cart (create empty if not exists) ────────────────────
export const getCart = async (userId: string): Promise<ICart> => {
  let cart = await cartDao.getCartByUserId(userId);
  if (!cart) {
    cart = await cartDao.upsertCart(userId, { userId: userId as any, items: [], totalAmount: 0 });
  }
  return cart;
};

// ─── Add item to cart ─────────────────────────────────────────
export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<ICart> => {
  const product = await productDao.getProductById(productId);
  if (!product || !product.isActive) throw new Error("Product not found");

  let cart = await cartDao.getCartByUserId(userId);
  const items = cart ? [...cart.items] : [];

  const existingIndex = items.findIndex(
    (i) => i.productId.toString() === productId
  );

  if (existingIndex >= 0) {
    items[existingIndex].quantity += quantity;
  } else {
    items.push({ productId: product._id as any, quantity, price: product.price });
  }

  const totalAmount = calcTotal(items);
  return await cartDao.upsertCart(userId, { userId: userId as any, items, totalAmount });
};

// ─── Update quantity ──────────────────────────────────────────
export const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<ICart> => {
  const cart = await cartDao.getCartByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  const items = cart.items.map((i) => ({
    productId: i.productId,
    quantity: i.productId.toString() === productId ? quantity : i.quantity,
    price: i.price,
  }));

  const filteredItems = items.filter((i) => i.quantity > 0);
  const totalAmount = calcTotal(filteredItems);
  return await cartDao.upsertCart(userId, { userId: userId as any, items: filteredItems, totalAmount });
};

// ─── Remove item from cart ────────────────────────────────────
export const removeFromCart = async (userId: string, productId: string): Promise<ICart> => {
  const cart = await cartDao.getCartByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  const items = cart.items.filter((i) => i.productId.toString() !== productId);
  const totalAmount = calcTotal(items);
  return await cartDao.upsertCart(userId, { userId: userId as any, items, totalAmount });
};

// ─── Clear cart ───────────────────────────────────────────────
export const clearCart = async (userId: string): Promise<void> => {
  await cartDao.clearCart(userId);
};
