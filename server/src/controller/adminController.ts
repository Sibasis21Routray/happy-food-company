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
    const vendors = await User.find({ role: "vendor" }).select("-password");
    res.status(200).json(vendors);
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
    const users = await User.find({ role: { $nin: ["admin", "vendor"] } }).select("-password");
    res.status(200).json(users);
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

export const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate('vendorId', 'fullName email')
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
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

