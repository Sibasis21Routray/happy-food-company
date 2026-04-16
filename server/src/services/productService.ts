import * as productDao from "../dao/productDao";
import { IProduct } from "../models/product.model";

export const addProduct = async (data: productDao.CreateProductInput): Promise<IProduct> => {
  return await productDao.createProduct(data);
};

export const listProducts = async (): Promise<IProduct[]> => {
  return await productDao.getAllProducts();
};

export const fetchProductById = async (id: string): Promise<IProduct> => {
  const product = await productDao.getProductById(id);
  if (!product) throw new Error("Product not found");
  return product;
};

export const editProduct = async (
  id: string,
  data: Partial<productDao.CreateProductInput>
): Promise<IProduct> => {
  const product = await productDao.updateProduct(id, data);
  if (!product) throw new Error("Product not found");
  return product;
};

export const removeProduct = async (id: string): Promise<void> => {
  const product = await productDao.deleteProduct(id);
  if (!product) throw new Error("Product not found");
};
