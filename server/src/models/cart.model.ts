// src/models/cart.model.ts
import { Product } from './product.model';

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface CartWithProducts extends Omit<Cart, 'items'> {
  items: CartItemWithProduct[];
}

export type CreateCartItemInput = Omit<CartItem, 'id'>;
export type UpdateCartItemInput = Partial<Omit<CartItem, 'productId'>> & {
  productId: string;
};

export type CartItemInput = {
  productId: string;
  quantity: number;
};

export type CreateCartInput = Omit<Cart, 'id' | 'createdAt' | 'updatedAt' | 'items' | 'totalAmount'>;
export type UpdateCartInput = Partial<Omit<Cart, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>;