import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as cartService from "../services/cartService";

// ─── Helper to convert params to string ──────────────────────
const getParamId = (id: string | string[] | undefined): string | null => {
  if (!id) return null;
  return Array.isArray(id) ? id[0] : id;
};

// ─── Get Cart ──────────────────────────────────────────────────
export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const cart = await cartService.getCart(req.userId);
    res.status(200).json({ cart });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Add to Cart ──────────────────────────────────────────────
export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    // Allow negative quantities (for decrementing)
    // But don't allow if it would go below 0
    if (quantity === 0) {
      // Remove the item
      const cart = await cartService.removeFromCart(req.userId, productId);
      res.status(200).json({ 
        message: "Item removed from cart", 
        cart 
      });
      return;
    }

    // If quantity is negative, we're reducing quantity
    // Let the service handle it
    const cart = await cartService.addToCart(req.userId, productId, quantity);
    res.status(200).json({ 
      message: quantity > 0 ? "Item added to cart" : "Item removed from cart", 
      cart 
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── Update Cart Item ─────────────────────────────────────────
export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { productId, quantity } = req.body;

    if (!productId) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    if (quantity === undefined || quantity < 0) {
      res.status(400).json({ message: "Valid quantity is required" });
      return;
    }

    const cart = await cartService.updateCartItem(req.userId, productId, quantity);
    res.status(200).json({ 
      message: quantity === 0 ? "Item removed from cart" : "Cart updated", 
      cart 
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── Remove from Cart ─────────────────────────────────────────
export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { productId } = req.params;
    const productIdStr = getParamId(productId);

    if (!productIdStr) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    const cart = await cartService.removeFromCart(req.userId, productIdStr);
    res.status(200).json({ 
      message: "Item removed from cart", 
      cart 
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── Clear Cart ───────────────────────────────────────────────
export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    await cartService.clearCart(req.userId);
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};