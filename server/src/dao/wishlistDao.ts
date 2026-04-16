import Wishlist, { IWishlist } from "../models/wishlist.model";

export const getWishlistByUserId = async (userId: string): Promise<IWishlist | null> => {
  return await Wishlist.findOne({ userId }).populate("productIds");
};

export const createWishlist = async (userId: string): Promise<IWishlist> => {
  return await Wishlist.create({ userId, productIds: [] });
};

export const addProductToWishlist = async (userId: string, productId: string): Promise<IWishlist | null> => {
  return await Wishlist.findOneAndUpdate(
    { userId },
    { $addToSet: { productIds: productId } },
    { new: true, upsert: true }
  ).populate("productIds");
};

export const removeProductFromWishlist = async (userId: string, productId: string): Promise<IWishlist | null> => {
  return await Wishlist.findOneAndUpdate(
    { userId },
    { $pull: { productIds: productId } },
    { new: true }
  ).populate("productIds");
};
