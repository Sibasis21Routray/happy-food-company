import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controller/cartController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// All cart routes are protected
router.get("/",                    protect, getCart);
router.post("/add",                protect, addToCart);
router.put("/update",              protect, updateCartItem);
router.delete("/clear",            protect, clearCart);
router.delete("/:productId",       protect, removeFromCart);

export default router;
