import * as wishlistDao from "../dao/wishlistDao";
import { Wishlist } from "../models/wishlist.model";

export const getWishlist = async (userId: string): Promise<Wishlist> => {
  let wishlist = await wishlistDao.getWishlistByUserId(userId);
  if (!wishlist) {
    wishlist = await wishlistDao.createWishlist(userId);
  }
  return wishlist;
};

export const addToWishlist = async (userId: string, productId: string): Promise<Wishlist | null> => {
  return await wishlistDao.addProductToWishlist(userId, productId);
};

export const removeFromWishlist = async (userId: string, productId: string): Promise<Wishlist | null> => {
  return await wishlistDao.removeProductFromWishlist(userId, productId);
};