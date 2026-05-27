import { Router } from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  addOrderId,
  addCartId,
} from "../controller/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login",    login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes (require JWT token)
router.get ("/profile",       protect, getProfile);
router.put ("/profile",       protect, updateProfile);
router.put ("/update-profile", protect, updateProfile);
router.post("/add-order",     protect, addOrderId);
router.post("/add-cart",      protect, addCartId);

export default router;