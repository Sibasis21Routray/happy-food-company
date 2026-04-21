import { Router } from "express";
import { protect, isAdmin } from "../middleware/authMiddleware";
import * as adminController from "../controller/adminController";

const router = Router();

router.use(protect, isAdmin);

router.get("/dashboard", adminController.getDashboardStats);
router.get("/vendors", adminController.getVendors);
router.post("/vendors", adminController.createVendor);
router.delete("/vendors/:id", adminController.deleteVendor);
router.put("/vendors/:id/block", adminController.blockVendor);
router.get("/users", adminController.getUsers);
router.put("/users/:id/block", adminController.blockUser);
router.get("/orders", adminController.getAllOrders);
router.put("/orders/:id/vendor", adminController.reassignVendor);

export default router;

