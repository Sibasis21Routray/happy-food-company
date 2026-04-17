import { Router } from "express";
import { createCoupon, applyCoupon, listCoupons } from "../controller/couponController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Admin — create / list coupons (add admin middleware here if needed)
router.post("/",       createCoupon);
router.get("/",        listCoupons);

// Protected — validate + apply coupon (user must be logged in)
router.post("/apply",  protect, applyCoupon);

export default router;
