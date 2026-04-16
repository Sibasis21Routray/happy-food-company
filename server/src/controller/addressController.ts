import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as addressDao from "../dao/addressDao";

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
