import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  orderIds: string[]; 
  cartIds: string[];   
}

const UserSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    orderIds: { type: [String], default: [] },
    cartIds:  { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);