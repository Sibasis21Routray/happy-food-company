import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as orderDao from "../dao/orderDao";
import * as userDao from "../dao/userDao";

// ─── Helper to convert params to string ──────────────────────
const getParamId = (id: string | string[] | undefined): string | null => {
  if (!id) return null;
  return Array.isArray(id) ? id[0] : id;
};

// ─── Get Dashboard Stats ──────────────────────────────────────
export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const vendorId = req.userId;
    const { startDate, endDate } = req.query;

    const allOrders = await orderDao.getAllOrders();
    
    let vendorOrders = allOrders.filter(o => o.vendorId === vendorId);
    
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999);
      
      vendorOrders = vendorOrders.filter(o => {
        const createdAt = new Date(o.createdAt);
        return createdAt >= start && createdAt <= end;
      });
    }

    const totalOrders = vendorOrders.length;
    const completedOrders = vendorOrders.filter(o => o.status === "DELIVERED").length;
    const pendingOrders = vendorOrders.filter(o => o.status === "PENDING").length;
    const processingOrders = vendorOrders.filter(o => 
      o.status === "CONFIRMED" || o.status === "SHIPPED"
    ).length;

    const totalRevenue = vendorOrders
      .filter(o => ["DELIVERED", "SHIPPED", "CONFIRMED"].includes(o.status))
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const totalSalesValue = vendorOrders
      .filter(o => o.status !== "CANCELLED")
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.status(200).json({
      totalOrders,
      completedOrders,
      pendingOrders,
      processingOrders,
      totalRevenue,
      totalSalesValue
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching vendor stats",
      error: error.message
    });
  }
};

// ─── Get Orders ──────────────────────────────────────────────
export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const vendorId = req.userId;
    const { search, status, sortBy, sortOrder, page = 1, limit = 10, startDate, endDate } = req.query;

    let allOrders = await orderDao.getAllOrders();
    
    let vendorOrders = allOrders.filter(o => o.vendorId === vendorId);
    
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate as string) : new Date(0);
      const end = endDate ? new Date(endDate as string) : new Date();
      end.setHours(23, 59, 59, 999);
      
      vendorOrders = vendorOrders.filter(o => {
        const createdAt = new Date(o.createdAt);
        return createdAt >= start && createdAt <= end;
      });
    }

    if (status && status !== 'all') {
      vendorOrders = vendorOrders.filter(o => o.status === status);
    }

    if (search) {
      const searchStr = (search as string).toLowerCase();
      vendorOrders = vendorOrders.filter(o =>
        o.id?.toLowerCase().includes(searchStr) ||
        o.user?.fullName?.toLowerCase().includes(searchStr) ||
        o.user?.email?.toLowerCase().includes(searchStr)
      );
    }

    if (sortBy) {
      const sortOrderValue = sortOrder === 'desc' ? -1 : 1;
      vendorOrders.sort((a, b) => {
        const aVal = (a as any)[sortBy as string];
        const bVal = (b as any)[sortBy as string];
        if (aVal < bVal) return -1 * sortOrderValue;
        if (aVal > bVal) return 1 * sortOrderValue;
        return 0;
      });
    } else {
      vendorOrders.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }

    const totalRevenue = vendorOrders
      .filter(o => o.status !== "CANCELLED")
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const total = vendorOrders.length;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;
    const paginatedOrders = vendorOrders.slice(skip, skip + limitNum);

    res.status(200).json({
      orders: paginatedOrders,
      total,
      totalRevenue,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching vendor orders",
      error: error.message
    });
  }
};

// ─── Update Order Status ──────────────────────────────────────
export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { id } = req.params;
    const { status } = req.body;
    const vendorId = req.userId;
    const idStr = getParamId(id);

    if (!idStr) {
      res.status(400).json({ message: "Order ID is required" });
      return;
    }

    if (!status) {
      res.status(400).json({ message: "Status is required" });
      return;
    }

    const validStatuses = ["PENDING", "CONFIRMED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status value" });
      return;
    }

    const order = await orderDao.getOrderById(idStr);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    if (order.vendorId !== vendorId) {
      res.status(403).json({ message: "Order not assigned to you" });
      return;
    }

    await orderDao.updateOrderStatus(idStr, status);
    
    const fullOrder = await orderDao.getOrderById(idStr);

    res.status(200).json({
      message: "Order status updated",
      order: fullOrder
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error updating order status",
      error: error.message
    });
  }
};