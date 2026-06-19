import Address, { IAddress } from "../models/address.model";

export interface CreateAddressInput {
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
  isSaved?: boolean;
}

export const createAddress = async (data: CreateAddressInput): Promise<IAddress> => {
  return await Address.create(data);
};

export const getAddressesByUserId = async (userId: string): Promise<IAddress[]> => {
  return await Address.find({ userId, isSaved: true });
};

export const getAddressById = async (id: string): Promise<IAddress | null> => {
  return await Address.findById(id);
};


// ─── Update address by ID ───────────────────────────────────────
export const updateAddress = async (
  addressId: string,
  userId: string,
  updateData: any
) => {
  const address = await Address.findOneAndUpdate(
    { _id: addressId, userId: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
  return address;
};

// ─── Delete address by ID ───────────────────────────────────────
export const deleteAddress = async (addressId: string, userId: string) => {
  const result = await Address.findOneAndDelete({ _id: addressId, userId: userId });
  return result;
};