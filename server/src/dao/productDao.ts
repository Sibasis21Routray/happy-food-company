import Product, { IProduct } from "../models/product.model";

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
}

export const createProduct = async (data: CreateProductInput): Promise<IProduct> => {
  return await Product.create(data);
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find({ isActive: true });
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id);
};

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  return await Product.findOne({ slug, isActive: true });
};

export const updateProduct = async (
  id: string,
  data: Partial<CreateProductInput & { isActive: boolean }>
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

export const activateProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, { isActive: true }, { new: true });
};
