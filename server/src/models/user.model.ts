// src/models/user.model.ts
export interface User {
  id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  gender?: 'Male' | 'Female' | 'Other';
  mobileNumber?: string;
  email: string;
  password: string;
  // IMPORTANT: Use lowercase to match old MongoDB
  role: 'user' | 'vendor' | 'admin';
  isBlocked: boolean;
  orderIds: string[];
  cartIds: string[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'orderIds' | 'cartIds' | 'isBlocked'> & {
  role?: 'user' | 'vendor' | 'admin';
};

export type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>;