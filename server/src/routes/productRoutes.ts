import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController";

const router = Router();

// Public product routes
router.get("/",        getProducts);
router.get("/:id",     getProduct);

// Admin routes (add auth middleware here if needed later)
router.post("/",       createProduct);
router.put("/:id",     updateProduct);
router.delete("/:id",  deleteProduct); //product is active is set to false instead of deleting the product from database.

export default router;
