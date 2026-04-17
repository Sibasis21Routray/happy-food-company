import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as cartService from "../services/cartService";

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const cart = await cartService.getCart(req.userId!);
    res.status(200).json({ cart });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity = 1 } = req.body;
    const cart = await cartService.addToCart(req.userId!, productId, quantity);
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.updateCartItem(req.userId!, productId, quantity);
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const cart = await cartService.removeFromCart(req.userId!, req.params.productId as string);
    res.status(200).json({ message: "Item removed", cart });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await cartService.clearCart(req.userId!);
    res.status(200).json({ message: "Cart cleared" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
