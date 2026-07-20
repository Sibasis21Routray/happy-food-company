import * as productDao from "../dao/productDao";
import { Product } from "../models/product.model";

// ─── Types ────────────────────────────────────────────────────
// Define the type here instead of importing from dao
export interface CreateProductInput {
  heading: string;
  slug: string;
  title: string;
  subtitle: string;
  productHeading: string;
  productDescription: string;
  stockDetails: string;
  category: string;
  price: number;
  images?: string[];
  isActive?: boolean;
}

// ─── Add Product ──────────────────────────────────────────────
export const addProduct = async (data: CreateProductInput): Promise<Product> => {
  // Check if slug already exists
  const slugExists = await productDao.slugExists(data.slug);
  if (slugExists) {
    throw new Error("Product with this slug already exists");
  }

  // Validate price
  if (data.price <= 0) {
    throw new Error("Price must be greater than 0");
  }

  return await productDao.createProduct(data);
};

// ─── List Products ─────────────────────────────────────────────
export const listProducts = async (): Promise<Product[]> => {
  return await productDao.getAllProducts();
};

// ─── Fetch Product by ID ──────────────────────────────────────
export const fetchProductById = async (id: string): Promise<Product> => {
  const product = await productDao.getProductById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

// ─── Edit Product ─────────────────────────────────────────────
export const editProduct = async (
  id: string,
  data: Partial<CreateProductInput>
): Promise<Product> => {
  // Check if product exists
  const existingProduct = await productDao.getProductById(id);
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  // If slug is being updated, check if it already exists
  if (data.slug && data.slug !== existingProduct.slug) {
    const slugExists = await productDao.slugExists(data.slug, id);
    if (slugExists) {
      throw new Error("Product with this slug already exists");
    }
  }

  // Validate price if being updated
  if (data.price !== undefined && data.price <= 0) {
    throw new Error("Price must be greater than 0");
  }

  const updatedProduct = await productDao.updateProduct(id, data);
  if (!updatedProduct) {
    throw new Error("Failed to update product");
  }
  return updatedProduct;
};

// ─── Remove Product ────────────────────────────────────────────
export const removeProduct = async (id: string): Promise<void> => {
  const product = await productDao.deleteProduct(id);
  if (!product) {
    throw new Error("Product not found");
  }
};

// ─── Activate Product ──────────────────────────────────────────
export const activateProduct = async (id: string): Promise<Product> => {
  const product = await productDao.activateProduct(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};