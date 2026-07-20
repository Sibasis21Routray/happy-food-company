import { Request, Response } from "express";
import * as productService from "../services/productService";

// ─── Helper to convert params to string ──────────────────────
const getParamId = (id: string | string[] | undefined): string | null => {
  if (!id) return null;
  return Array.isArray(id) ? id[0] : id;
};

// ─── Create Product ────────────────────────────────────────────
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      heading,
      slug,
      title,
      subtitle,
      productHeading,
      productDescription,
      stockDetails,
      category,
      price,
      images
    } = req.body;

    if (!heading || !slug || !title || !subtitle || !productHeading || 
        !productDescription || !stockDetails || !category || !price) {
      res.status(400).json({
        message: "All required fields must be provided"
      });
      return;
    }

    const product = await productService.addProduct({
      heading,
      slug,
      title,
      subtitle,
      productHeading,
      productDescription,
      stockDetails,
      category,
      price: Number(price),
      images: images || []
    });

    res.status(201).json({
      message: "Product created",
      product
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};

// ─── Get Products ──────────────────────────────────────────────
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.listProducts();
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ─── Get Product by ID ─────────────────────────────────────────
export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const productId = getParamId(id);
    
    if (!productId) {
      res.status(400).json({
        message: "Product ID is required"
      });
      return;
    }

    const product = await productService.fetchProductById(productId);
    res.status(200).json({ product });
  } catch (error: any) {
    res.status(404).json({
      message: error.message
    });
  }
};

// ─── Update Product ────────────────────────────────────────────
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const productId = getParamId(id);
    
    if (!productId) {
      res.status(400).json({
        message: "Product ID is required"
      });
      return;
    }

    const product = await productService.editProduct(productId, req.body);
    res.status(200).json({
      message: "Product updated",
      product
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};

// ─── Delete Product (soft delete) ─────────────────────────────
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const productId = getParamId(id);
    
    if (!productId) {
      res.status(400).json({
        message: "Product ID is required"
      });
      return;
    }

    await productService.removeProduct(productId);
    res.status(200).json({
      message: "Product deactivated"
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};

// ─── Activate Product ──────────────────────────────────────────
export const activateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const productId = getParamId(id);
    
    if (!productId) {
      res.status(400).json({
        message: "Product ID is required"
      });
      return;
    }

    const product = await productService.activateProduct(productId);
    res.status(200).json({
      message: "Product activated",
      product
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};