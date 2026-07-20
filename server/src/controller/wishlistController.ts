import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as wishlistService from "../services/wishlistService";

// ─── Helper to convert params to string ──────────────────────
const getParamId = (id: string | string[] | undefined): string | null => {
  if (!id) return null;
  return Array.isArray(id) ? id[0] : id;
};

// ─── Get Wishlist ──────────────────────────────────────────────
export const getWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const wishlist = await wishlistService.getWishlist(req.userId);
    res.status(200).json({ wishlist });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Add to Wishlist ──────────────────────────────────────────
export const addToWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    const wishlist = await wishlistService.addToWishlist(req.userId, productId);
    res.status(200).json({ 
      message: "Added to wishlist", 
      wishlist 
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── Remove from Wishlist ─────────────────────────────────────
export const removeFromWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const wishlist = await wishlistService.removeFromWishlist(req.userId, productIdStr);
    res.status(200).json({ 
      message: "Removed from wishlist", 
      wishlist 
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};