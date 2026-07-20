import { Request, Response } from "express";
import * as userDao from "../dao/userDao";
import * as orderDao from "../dao/orderDao";
import bcrypt from "bcryptjs";

// ─── Helper to convert params to string ──────────────────────
const getParamId = (id: string | string[] | undefined): string | null => {
  if (!id) return null;
  return Array.isArray(id) ? id[0] : id;
};

// ─── Get Dashboard Stats ──────────────────────────────────────
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalVendors = await userDao.getUsersByRole('vendor');  // ← lowercase
    const totalUsers = await userDao.getUsersByRole('user');      // ← lowercase
    const allOrders = await orderDao.getAllOrders();
    
    const totalOrders = allOrders.length;
    const completedOrders = allOrders.filter(o => o.status === 'delivered').length;  // ← lowercase
    
    const totalRevenue = allOrders
  .filter(o => o.status !== "cancelled")
  .reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0
  );

    res.status(200).json({ 
      totalVendors: totalVendors.length,
      totalUsers: totalUsers.length,
      totalOrders,
      totalRevenue,
      completedOrders
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error fetching dashboard stats", 
      error: error.message 
    });
  }
};

// ─── Get Vendors ──────────────────────────────────────────────
export const getVendors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, sortBy, sortOrder, filter, page = 1, limit = 10 } = req.query;
    
    let vendors = await userDao.getUsersByRole('vendor');  // ← lowercase
    
    if (search) {
      const searchStr = (search as string).toLowerCase();
      vendors = vendors.filter(v => 
        v.fullName?.toLowerCase().includes(searchStr) ||
        v.email?.toLowerCase().includes(searchStr) ||
        v.mobileNumber?.toLowerCase().includes(searchStr)
      );
    }
    
    if (filter === 'blocked') {
      vendors = vendors.filter(v => v.isBlocked);
    } else if (filter === 'active') {
      vendors = vendors.filter(v => !v.isBlocked);
    }
    
    if (sortBy) {
      const sortOrderValue = sortOrder === 'desc' ? -1 : 1;
      vendors.sort((a, b) => {
        const aVal = (a as any)[sortBy as string];
        const bVal = (b as any)[sortBy as string];
        if (aVal < bVal) return -1 * sortOrderValue;
        if (aVal > bVal) return 1 * sortOrderValue;
        return 0;
      });
    }
    
    const total = vendors.length;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;
    const paginatedVendors = vendors.slice(skip, skip + limitNum);
    
    res.status(200).json({
      vendors: paginatedVendors,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error fetching vendors", 
      error: error.message 
    });
  }
};

// ─── Create Vendor ─────────────────────────────────────────────
export const createVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, mobileNumber } = req.body;
    
    const existing = await userDao.findUserByEmail(email);
    if (existing) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = await userDao.createUser({
      fullName,
      email,
      password: hashedPassword,
      mobileNumber,
      role: 'vendor'  // ← lowercase
    });
    
    res.status(201).json({ 
      message: "Vendor created", 
      vendor 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error creating vendor", 
      error: error.message 
    });
  }
};

// ─── Delete Vendor ─────────────────────────────────────────────
export const deleteVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const idStr = getParamId(id);
    
    if (!idStr) {
      res.status(400).json({ message: "Vendor ID is required" });
      return;
    }
    
    const result = await userDao.deleteUser(idStr);
    
    if (!result) {
      res.status(404).json({ message: "Vendor not found" });
      return;
    }
    
    res.status(200).json({ message: "Vendor deleted" });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error deleting vendor", 
      error: error.message 
    });
  }
};

// ─── Block Vendor ──────────────────────────────────────────────
export const blockVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;
    const idStr = getParamId(id);
    
    if (!idStr) {
      res.status(400).json({ message: "Vendor ID is required" });
      return;
    }
    
    const vendor = await userDao.toggleUserBlock(idStr, isBlocked);
    
    if (!vendor) {
      res.status(404).json({ message: "Vendor not found" });
      return;
    }
    
    res.status(200).json({ 
      message: `Vendor ${isBlocked ? 'blocked' : 'unblocked'}` 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error blocking vendor", 
      error: error.message 
    });
  }
};

// ─── Get Users ─────────────────────────────────────────────────
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, sortBy, sortOrder, filter, page = 1, limit = 10 } = req.query;
    
    let users = await userDao.getUsersByRole('user');  // ← lowercase
    
    if (search) {
      const searchStr = (search as string).toLowerCase();
      users = users.filter(u => 
        u.fullName?.toLowerCase().includes(searchStr) ||
        u.email?.toLowerCase().includes(searchStr) ||
        u.mobileNumber?.toLowerCase().includes(searchStr)
      );
    }
    
    if (filter === 'blocked') {
      users = users.filter(u => u.isBlocked);
    } else if (filter === 'active') {
      users = users.filter(u => !u.isBlocked);
    }
    
    if (sortBy) {
      const sortOrderValue = sortOrder === 'desc' ? -1 : 1;
      users.sort((a, b) => {
        const aVal = (a as any)[sortBy as string];
        const bVal = (b as any)[sortBy as string];
        if (aVal < bVal) return -1 * sortOrderValue;
        if (aVal > bVal) return 1 * sortOrderValue;
        return 0;
      });
    }
    
    const total = users.length;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;
    const paginatedUsers = users.slice(skip, skip + limitNum);
    
    res.status(200).json({
      users: paginatedUsers,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error fetching users", 
      error: error.message 
    });
  }
};

// ─── Block User ────────────────────────────────────────────────
export const blockUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;
    const idStr = getParamId(id);
    
    if (!idStr) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    
    const user = await userDao.toggleUserBlock(idStr, isBlocked);
    
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    
    res.status(200).json({ 
      message: `User ${isBlocked ? 'blocked' : 'unblocked'}` 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error blocking user", 
      error: error.message 
    });
  }
};

// ─── Get All Orders ────────────────────────────────────────────
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, status, sortBy, sortOrder, page = 1, limit = 10, startDate, endDate } = req.query;
    
    const result = await orderDao.getOrdersPaginated(
      Number(page),
      Number(limit),
      status as string,
      undefined
    );
    
    let orders = result.orders;
    let total = result.total;
    
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate as string) : new Date(0);
      const end = endDate ? new Date(endDate as string) : new Date();
      end.setHours(23, 59, 59, 999);
      
      orders = orders.filter(o => {
        const createdAt = new Date(o.createdAt);
        return createdAt >= start && createdAt <= end;
      });
      total = orders.length;
    }
    
    if (search) {
      const searchStr = (search as string).toLowerCase();
      orders = orders.filter(o =>
        o.id?.toLowerCase().includes(searchStr) ||
        o.user?.fullName?.toLowerCase().includes(searchStr) ||
        o.user?.email?.toLowerCase().includes(searchStr)
      );
      total = orders.length;
    }
    
    if (sortBy) {
      const sortOrderValue = sortOrder === 'desc' ? -1 : 1;
      orders.sort((a, b) => {
        const aVal = (a as any)[sortBy as string];
        const bVal = (b as any)[sortBy as string];
        if (aVal < bVal) return -1 * sortOrderValue;
        if (aVal > bVal) return 1 * sortOrderValue;
        return 0;
      });
    }
    
    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')  // ← lowercase
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;
    const paginatedOrders = orders.slice(skip, skip + limitNum);
    
    res.status(200).json({
      orders: paginatedOrders,
      total,
      totalRevenue,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error fetching orders", 
      error: error.message 
    });
  }
};

// ─── Reassign Vendor ───────────────────────────────────────────
export const reassignVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { vendorId } = req.body;
    const idStr = getParamId(id);
    
    if (!idStr) {
      res.status(400).json({ message: "Order ID is required" });
      return;
    }
    
    if (!vendorId) {
      res.status(400).json({ message: "vendorId is required" });
      return;
    }
    
    const vendor = await userDao.findUserById(vendorId);
    if (!vendor || vendor.role !== 'vendor') {  // ← lowercase
      res.status(404).json({ message: "Vendor not found" });
      return;
    }
    
    const order = await orderDao.updateOrder(idStr, { vendorId });
    
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    
    const updatedOrder = await orderDao.getOrderById(idStr);
    
    res.status(200).json({ 
      message: "Vendor reassigned", 
      order: updatedOrder 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error reassigning vendor", 
      error: error.message 
    });
  }
};

// ─── Update Order Status ──────────────────────────────────────
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const idStr = getParamId(id);
    
    if (!idStr) {
      res.status(400).json({ message: "Order ID is required" });
      return;
    }
    
    if (!status) {
      res.status(400).json({ message: "Status is required" });
      return;
    }

    // Lowercase status values to match old MongoDB
    const validStatuses = ["pending", "confirmed", "shipped", "out for delivery", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status value" });
      return;
    }

    const order = await orderDao.updateOrderStatus(idStr, status);
    
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    const updatedOrder = await orderDao.getOrderById(idStr);

    res.status(200).json({ 
      message: "Order status updated successfully", 
      order: updatedOrder 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error updating order status", 
      error: error.message 
    });
  }
};