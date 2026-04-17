import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as wishlistService from "../services/wishlistService";

export const getWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const wishlist = await wishlistService.getWishlist(req.userId!);
    res.status(200).json({ wishlist });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.body;
    const wishlist = await wishlistService.addToWishlist(req.userId!, productId);
    res.status(200).json({ message: "Added to wishlist", wishlist });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const wishlist = await wishlistService.removeFromWishlist(req.userId!, productId as string);
    res.status(200).json({ message: "Removed from wishlist", wishlist });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
