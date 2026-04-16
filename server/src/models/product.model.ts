import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  heading: string;
  title: string;
  subtitle: string;
  productHeading: string;
  productDescription: string;
  stockDetails: string;
  category: string;
  price: number;
  images: string[];
  isActive: boolean;
}

const ProductSchema: Schema = new Schema(
  {
    heading:            { type: String, required: true, trim: true },
    title:              { type: String, required: true, trim: true },
    subtitle:           { type: String, required: true, trim: true },
    productHeading:     { type: String, required: true },
    productDescription: { type: String, required: true },
    stockDetails:       { type: String, required: true },
    category:           { type: String, required: true, trim: true },
    price:              { type: Number, required: true, min: 0 },
    images:             { type: [String], default: [] },
    isActive:           { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
