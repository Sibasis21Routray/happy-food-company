import { Response } from "express";
import mongoose from "mongoose";
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

    const vId = new mongoose.Types.ObjectId(vendorId as string);
    const revenueAggregate = await Order.aggregate([
      { $match: { vendorId: vId, status: { $in: ["delivered", "shipped", "confirmed"] } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueAggregate.length > 0 ? revenueAggregate[0].total : 0;

    const salesValueAggregate = await Order.aggregate([
      { $match: { vendorId: vId, status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalSalesValue = salesValueAggregate.length > 0 ? salesValueAggregate[0].total : 0;


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

    // Calculate total revenue for the filtered results (All except Cancelled)
    let revQuery = { ...query };
    if (revQuery.vendorId) {
      revQuery.vendorId = new mongoose.Types.ObjectId(revQuery.vendorId as string);
    }
    
    if (!status || status === 'all') {
      revQuery.status = { $ne: "cancelled" };
    }
    
    const revenueStats = await Order.aggregate([
      { $match: revQuery },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueStats.length > 0 ? revenueStats[0].total : 0;

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
      totalRevenue,
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
