import { Router } from "express";
import { placeOrder, getMyOrders, getOrderById } from "../controller/orderController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// All order routes are protected
router.post("/place",  protect, placeOrder);
router.get("/",         protect, getMyOrders);
router.get("/:id",      protect, getOrderById);

export default router;
