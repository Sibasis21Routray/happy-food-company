import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as addressDao from "../dao/addressDao";
import { Request } from "express";

interface AddressParams {
  addressId: string;
}

// ─── Save a new address ───────────────────────────────────────
export const saveAddress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const address = await addressDao.createAddress({ userId: req.userId!, ...req.body });
    res.status(201).json({ message: "Address saved", address });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── Get all addresses for logged-in user ─────────────────────
export const getMyAddresses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const addresses = await addressDao.getAddressesByUserId(req.userId!);
    res.status(200).json({ addresses });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



// addressController.ts - Add these functions

// ─── Update an existing address ───────────────────────────────────────
export const updateAddress = async (
  req: AuthRequest & Request<AddressParams>,
  res: Response
): Promise<void> => {
  try {
    const { addressId } = req.params;

    const updatedAddress = await addressDao.updateAddress(
      addressId,
      req.userId!,
      req.body
    );

    if (!updatedAddress) {
      res.status(404).json({ message: "Address not found" });
      return;
    }

    res.status(200).json({
      message: "Address updated",
      address: updatedAddress,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


// ─── Delete an address ───────────────────────────────────────
export const deleteAddress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { addressId } = req.params;

    if (Array.isArray(addressId)) {
  res.status(400).json({ message: "Invalid address ID" });
  return;
}

   const deleted = await addressDao.deleteAddress(
  addressId,
  req.userId!
);
    
    if (!deleted) {
      res.status(404).json({ message: "Address not found" });
      return;
    }
    
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
