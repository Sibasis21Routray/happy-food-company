import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAddress extends Document {
  userId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  landmark?: string;
  alternatePhone?: string;
  type: 'Home' | 'Work';
}

const AddressSchema: Schema = new Schema(
  {
    userId:         { type: Schema.Types.ObjectId, ref: "User", required: true },
    name:           { type: String, required: true, trim: true },
    email:          { type: String, required: true, lowercase: true, trim: true },
    phone:          { type: String, required: true, trim: true },
    streetAddress:  { type: String, required: true, trim: true },
    locality:       { type: String, required: true, trim: true },
    city:           { type: String, required: true, trim: true },
    state:          { type: String, required: true, trim: true },
    country:        { type: String, required: true, trim: true },
    pinCode:        { type: String, required: true, trim: true },
    landmark:       { type: String, trim: true },
    alternatePhone: { type: String, trim: true },
    type:           { type: String, enum: ['Home', 'Work'], default: 'Home' },
  },
  { timestamps: true }
);

export default mongoose.model<IAddress>("Address", AddressSchema);
