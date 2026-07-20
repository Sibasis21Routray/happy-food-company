// src/models/wishlist.model.ts
export interface WishlistItem {
  id: string;
  wishlistId: string;
  productId: string;
  createdAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateWishlistInput = Omit<Wishlist, 'id' | 'createdAt' | 'updatedAt' | 'items'>;
export type AddWishlistItemInput = {
  userId: string;
  productId: string;
};
export type RemoveWishlistItemInput = {
  userId: string;
  productId: string;
};