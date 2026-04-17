import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  activateProduct,
} from "../controller/productController";

const router = Router();

// Public product routes
router.get("/",        getProducts);
router.get("/:id",     getProduct);

// Admin routes (add auth middleware here if needed later)
router.post("/",       createProduct);
router.put("/:id",     updateProduct);
router.delete("/:id",  deleteProduct); //deactivate product instead of deleting
router.patch("/:id/activate", activateProduct);

export default router;
