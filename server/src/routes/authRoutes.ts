import { Router } from "express";
import {
  register,
  login,
  getProfile,
  addOrderId,
  addCartId,
} from "../controller/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login",    login);

// Protected routes (require JWT token)
router.get ("/profile",       protect, getProfile);
router.post("/add-order",     protect, addOrderId);
router.post("/add-cart",      protect, addCartId);

export default router;