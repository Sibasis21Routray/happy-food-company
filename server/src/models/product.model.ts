// src/models/product.model.ts
export interface Product {
  id: string;
  heading: string;
  slug: string;
  title: string;
  subtitle: string;
  productHeading: string;
  productDescription: string;
  stockDetails: string;
  category: string;
  price: number;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'images' | 'isActive'> & {
  images?: string[];
  isActive?: boolean;
};

export type UpdateProductInput = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;

export type ProductFilters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  search?: string;
};