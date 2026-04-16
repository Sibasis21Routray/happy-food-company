import { Request, Response } from "express";
import * as productService from "../services/productService";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.addProduct(req.body);
    res.status(201).json({ message: "Product created", product });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.listProducts();
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.fetchProductById(req.params.id as string);
    res.status(200).json({ product });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.editProduct(req.params.id as string, req.body);
    res.status(200).json({ message: "Product updated", product });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    await productService.removeProduct(req.params.id as string);
    res.status(200).json({ message: "Product deactivated" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const activateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.activateProduct(req.params.id as string);
    res.status(200).json({ message: "Product activated", product });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
