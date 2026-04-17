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
}

export const createAddress = async (data: CreateAddressInput): Promise<IAddress> => {
  return await Address.create(data);
};

export const getAddressesByUserId = async (userId: string): Promise<IAddress[]> => {
  return await Address.find({ userId });
};

export const getAddressById = async (id: string): Promise<IAddress | null> => {
  return await Address.findById(id);
};
