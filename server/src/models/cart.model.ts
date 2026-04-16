import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;      // snapshot of price at time of adding
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
  totalAmount: number;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity:  { type: Number, required: true, min: 1, default: 1 },
    price:     { type: Number, required: true },
  },
  { _id: false }
);

const CartSchema: Schema = new Schema(
  {
    userId:      { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items:       { type: [CartItemSchema], default: [] },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", CartSchema);
