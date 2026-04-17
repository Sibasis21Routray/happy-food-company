import { Types } from "mongoose";
import * as cartDao from "../dao/cartDao";
import * as productDao from "../dao/productDao";
import { ICart, ICartItem } from "../models/cart.model";

const calcTotal = (items: { price: number; quantity: number }[]): number =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

const getProductIdString = (productId: any): string => {
  if (!productId) return '';
  if (typeof productId === 'string') return productId.trim().toLowerCase();
  if (productId._id) return productId._id.toString().trim().toLowerCase();
  return productId.toString().trim().toLowerCase();
};

export const getCart = async (userId: string): Promise<ICart> => {
  let cart = await cartDao.getCartByUserId(userId);
  if (!cart) {
    cart = await cartDao.upsertCart(userId, { userId: userId as any, items: [], totalAmount: 0 });
  }
  return cart;
};

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
    (i) => getProductIdString(i.productId) === productId
  );

  if (existingIndex >= 0) {
    items[existingIndex].quantity += quantity;
  } else {
    items.push({ productId: product._id as any, quantity, price: product.price });
  }

  const totalAmount = calcTotal(items);
  return await cartDao.upsertCart(userId, { userId: userId as any, items, totalAmount });
};

export const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<ICart> => {
  const cart = await cartDao.getCartByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  const items = cart.items.map((i) => ({
    productId: i.productId,
    quantity: getProductIdString(i.productId) === productId ? quantity : i.quantity,
    price: i.price,
  }));

  const filteredItems = items.filter((i) => i.quantity > 0);
  const totalAmount = calcTotal(filteredItems);
  return await cartDao.upsertCart(userId, { userId: userId as any, items: filteredItems, totalAmount });
};

export const removeFromCart = async (userId: string, productId: string): Promise<ICart> => {
  const cart = await cartDao.getCartByUserId(userId);
  if (!cart) throw new Error("Cart not found");

  const items = cart.items.filter(
    (i) => getProductIdString(i.productId) !== productId
  );
  const totalAmount = calcTotal(items);
  return await cartDao.upsertCart(userId, { userId: userId as any, items, totalAmount });
};

export const clearCart = async (userId: string): Promise<void> => {
  await cartDao.clearCart(userId);
};
