import { Response } from "express";
import Order from "../models/order.model";
import { AuthRequest } from "../middleware/authMiddleware";

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const vendorId = req.userId;
    const { startDate, endDate } = req.query;

    let query: any = { vendorId };

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }

    const orders = await Order.find(query);
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === "delivered").length;
    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const processingOrders = orders.filter(o => o.status === "confirmed" || o.status === "shipped").length;

    // Revenue from finalized orders
    const totalRevenue = orders
      .filter(o => o.status === "delivered" || o.status === "shipped" || o.status === "confirmed")
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Total value of all assigned orders
    const totalSalesValue = orders
      .filter(o => o.status !== "cancelled")
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.status(200).json({ 
      totalOrders, 
      completedOrders, 
      pendingOrders, 
      processingOrders,
      totalRevenue,
      totalSalesValue
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendor stats", error });
  }
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const vendorId = req.userId;
    const orders = await Order.find({ vendorId })
      .populate("userId", "fullName email")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendor orders", error });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const vendorId = req.userId;

    const order = await Order.findOneAndUpdate(
      { _id: id, vendorId },
      { status },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ message: "Order not found or not assigned to you" });
      return;
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};
