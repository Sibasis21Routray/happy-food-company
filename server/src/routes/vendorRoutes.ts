import { Router } from "express";
import { protect, isVendor } from "../middleware/authMiddleware";
import * as vendorController from "../controller/vendorController";

const router = Router();

router.use(protect, isVendor);

router.get("/dashboard", vendorController.getDashboardStats);
router.get("/orders", vendorController.getOrders);
router.put("/orders/:id/status", vendorController.updateOrderStatus);

export default router;
