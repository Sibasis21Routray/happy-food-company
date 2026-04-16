import mongoose, { Document, Schema, Types } from "mongoose";

export interface IWishlist extends Document {
  userId: Types.ObjectId;
  productIds: Types.ObjectId[];
}

const WishlistSchema: Schema = new Schema(
  {
    userId:     { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    productIds: { type: [Schema.Types.ObjectId], ref: "Product", default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IWishlist>("Wishlist", WishlistSchema);
