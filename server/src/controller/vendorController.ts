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
    const { search, status, sortBy, sortOrder, page = 1, limit = 10, startDate, endDate } = req.query;
    let query: any = { vendorId };

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate as string);
      if (endDate) {
        const end = new Date(endDate as string);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    let sort: any = { createdAt: -1 };
    if (sortBy) {
      sort = { [sortBy as string]: sortOrder === "desc" ? -1 : 1 };
    }

    const total = await Order.countDocuments(query);
    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find(query)
      .populate("userId", "fullName email")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    let processedOrders = orders;
    if (search) {
      const searchStr = (search as string).toLowerCase();
      processedOrders = orders.filter(o => 
        o._id.toString().toLowerCase().includes(searchStr) ||
        (o.userId as any)?.fullName?.toLowerCase().includes(searchStr) ||
        (o.userId as any)?.email?.toLowerCase().includes(searchStr)
      );
    }

    res.status(200).json({ 
      orders: processedOrders, 
      total, 
      page: Number(page), 
      pages: Math.ceil(total / Number(limit)) 
    });
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
