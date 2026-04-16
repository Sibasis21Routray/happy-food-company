import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as orderService from "../services/orderService";

// ─── Place order ──────────────────────────────────────────────
export const placeOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { couponCode, billingAddress, shippingAddress } = req.body;

    if (!billingAddress) {
      res.status(400).json({ message: "billingAddress is required" });
      return;
    }

    const result = await orderService.placeOrder({
      userId: req.userId!,
      couponCode,
      billingAddress,
      shippingAddress,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order:           result.order,
      billingAddress:  result.billingAddress,
      shippingAddress: result.shippingAddress,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── Get my orders ────────────────────────────────────────────
export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await orderService.getUserOrders(req.userId!);
    res.status(200).json({ orders });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Get single order ─────────────────────────────────────────
export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await orderService.getOrderDetail(req.params.id as string, req.userId!);
    res.status(200).json({ order });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
