// src/models/address.model.ts
export interface Address {
  id: string;
  userId: string;
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
  isSaved: boolean;
  // REMOVED: isDefault: boolean;  ← Not in old MongoDB
  createdAt: Date;
  updatedAt: Date;
}

export type CreateAddressInput = Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'isSaved'> & {
  isSaved?: boolean;
};

export type UpdateAddressInput = Partial<Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>;

export type AddressFilters = {
  userId?: string;
  type?: 'Home' | 'Work';
  isSaved?: boolean;
};