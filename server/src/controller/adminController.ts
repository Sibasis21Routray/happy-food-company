import { Request, Response } from "express";
import User from "../models/user.model";
import Order from "../models/order.model";
import bcrypt from "bcryptjs";

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalVendors = await User.countDocuments({ role: "vendor" });
    const totalUsers = await User.countDocuments({ role: { $nin: ["admin", "vendor"] } });
    const totalOrders = await Order.countDocuments();
    const completedOrders = await Order.countDocuments({ status: "delivered" });

    // Calculate total revenue
    const orders = await Order.find({ status: { $ne: "cancelled" } });
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.status(200).json({ totalVendors, totalUsers, totalOrders, totalRevenue, completedOrders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};

export const getVendors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, sortBy, sortOrder, filter, page = 1, limit = 10 } = req.query;
    let query: any = { role: "vendor" };

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobileNumber: { $regex: search, $options: "i" } }
      ];
    }

    if (filter === "blocked") query.isBlocked = true;
    if (filter === "active") query.isBlocked = false;

    let sort: any = { createdAt: -1 };
    if (sortBy) {
      sort = { [sortBy as string]: sortOrder === "desc" ? -1 : 1 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const vendors = await User.find(query)
      .select("-password")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.status(200).json({ vendors, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors", error });
  }
};

export const createVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, mobileNumber } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = await User.create({
      fullName, email, password: hashedPassword, mobileNumber, role: "vendor"
    });
    res.status(201).json({ message: "Vendor created", vendor });
  } catch (error) {
    res.status(500).json({ message: "Error creating vendor", error });
  }
};

export const deleteVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Vendor deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vendor", error });
  }
};

export const blockVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isBlocked } = req.body;
    await User.findByIdAndUpdate(req.params.id, { isBlocked });
    res.status(200).json({ message: `Vendor ${isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (error) {
    res.status(500).json({ message: "Error blocking vendor", error });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, sortBy, sortOrder, filter, page = 1, limit = 10 } = req.query;
    let query: any = { role: { $nin: ["admin", "vendor"] } };

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobileNumber: { $regex: search, $options: "i" } }
      ];
    }

    if (filter === "blocked") query.isBlocked = true;
    if (filter === "active") query.isBlocked = false;

    let sort: any = { createdAt: -1 };
    if (sortBy) {
      sort = { [sortBy as string]: sortOrder === "desc" ? -1 : 1 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const users = await User.find(query)
      .select("-password")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(query);
    res.status(200).json({ users, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const blockUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isBlocked } = req.body;
    await User.findByIdAndUpdate(req.params.id, { isBlocked });
    res.status(200).json({ message: `User ${isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (error) {
    res.status(500).json({ message: "Error blocking user", error });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, status, sortBy, sortOrder, page = 1, limit = 10, startDate, endDate } = req.query;
    let query: any = {};

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
    if (!status || status === 'all') {
      revQuery.status = { $ne: "cancelled" };
    }
    
    const revenueStats = await Order.aggregate([
      { $match: revQuery },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueStats.length > 0 ? revenueStats[0].total : 0;

    const orders = await Order.find(query)
      .populate('vendorId', 'fullName email')
      .populate('userId', 'fullName email')
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
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export const reassignVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { vendorId } = req.body;
    if (!vendorId) {
      res.status(400).json({ message: "vendorId is required" });
      return;
    }
    const vendor = await User.findOne({ _id: vendorId, role: 'vendor' });
    if (!vendor) {
      res.status(404).json({ message: "Vendor not found" });
      return;
    }
    const order = await Order.findByIdAndUpdate(id, { vendorId }, { new: true })
      .populate('vendorId', 'fullName email')
      .populate('userId', 'fullName email');
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Vendor reassigned", order });
  } catch (error) {
    res.status(500).json({ message: "Error reassigning vendor", error });
  }
};

