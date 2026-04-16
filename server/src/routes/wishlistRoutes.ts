import { Router } from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controller/wishlistController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/",                    protect, getWishlist);
router.post("/add",                protect, addToWishlist);
router.delete("/:productId",       protect, removeFromWishlist);

export default router;
