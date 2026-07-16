import mongoose, { Document, Schema, Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  title: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "pending" | "confirmed" | "shipped" | "out for delivery" | "delivered" | "cancelled";

export interface IOrder extends Document {
  orderNumber: number;
  userId: Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  couponCode: string | null;
  discountPercent: number;
  discountAmount: number;
  totalAmount: number;
  billingAddressId: Types.ObjectId;
  shippingAddressId: Types.ObjectId;
  status: OrderStatus;
  vendorId?: Types.ObjectId;
  paymentMethod: "COD" | "Online";
  paymentStatus: "Pending" | "Completed" | "Failed";
  razorpayDetails?: {
    orderId: string;
    paymentId: string;
    signature: string;
  };
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    title:     { type: String, required: true },
    quantity:  { type: Number, required: true, min: 1 },
    price:     { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema: Schema = new Schema(
  {
    orderNumber:       { type: Number, unique: true },
    userId:            { type: Schema.Types.ObjectId, ref: "User", required: true },
    items:             { type: [OrderItemSchema], required: true },
    subtotal:          { type: Number, required: true },
    couponCode:        { type: String, default: null },
    discountPercent:   { type: Number, default: 0 },
    discountAmount:    { type: Number, default: 0 },
    totalAmount:       { type: Number, required: true },
    billingAddressId:  { type: Schema.Types.ObjectId, ref: "Address", required: true },
    shippingAddressId: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    status:            { type: String, enum: ["pending","confirmed","shipped","out for delivery","delivered","cancelled"], default: "pending" },
    vendorId:          { type: Schema.Types.ObjectId, ref: "User", default: null },
    paymentMethod:     { type: String, enum: ["COD", "Online"], default: "COD" },
    paymentStatus:     { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
    razorpayDetails:   {
      orderId: String,
      paymentId: String,
      signature: String
    }
  },
  { timestamps: true }
);

OrderSchema.pre("save", async function () {
  if (this.isNew) {
    const lastOrder = await mongoose.model("Order").findOne({}, {}, { sort: { orderNumber: -1 } });
    if (lastOrder && lastOrder.orderNumber) {
      this.orderNumber = lastOrder.orderNumber + 1;
    } else {
      this.orderNumber = 1;
    }
  }
});

export default mongoose.model<IOrder>("Order", OrderSchema);
