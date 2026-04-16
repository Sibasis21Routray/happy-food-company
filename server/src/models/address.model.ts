import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAddress extends Document {
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

const AddressSchema: Schema = new Schema(
  {
    userId:        { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName:     { type: String, required: true, trim: true },
    lastName:      { type: String, required: true, trim: true },
    email:         { type: String, required: true, lowercase: true, trim: true },
    phone:         { type: String, required: true, trim: true },
    streetAddress: { type: String, required: true, trim: true },
    city:          { type: String, required: true, trim: true },
    state:         { type: String, required: true, trim: true },
    country:       { type: String, required: true, trim: true },
    pinCode:       { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAddress>("Address", AddressSchema);
