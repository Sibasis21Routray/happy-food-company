import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  firstName?: string;
  lastName?: string;
  gender?: 'Male' | 'Female' | 'Other';
  mobileNumber?: string;
  email: string;
  password: string;
  orderIds: string[]; 
  cartIds: string[];   
  addresses: any[];
  role: 'user' | 'vendor' | 'admin';
  isBlocked: boolean;
}

const UserSchema: Schema = new Schema(
  {
    fullName:     { type: String, required: true, trim: true },
    firstName:    { type: String, trim: true },
    lastName:     { type: String, trim: true },
    gender:       { type: String, enum: ['Male', 'Female', 'Other'] },
    mobileNumber: { type: String, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true },
    password:     { type: String, required: true, minlength: 6 },
    orderIds:     { type: [String], default: [] },
    cartIds:      { type: [String], default: [] },
    addresses:    { type: [Schema.Types.Mixed], default: [] },
    role:         { type: String, enum: ['user', 'vendor', 'admin'], default: 'user' },
    isBlocked:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);