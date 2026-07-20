import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as orderService from "../services/orderService";
import { getRazorpayInstance } from "../utils/razorpay";
import * as cartService from "../services/cartService";
import * as couponService from "../services/couponService";
import * as productDao from "../dao/productDao";

// ─── Helper to convert params to string ──────────────────────
const getParamId = (id: string | string[] | undefined): string | null => {
  if (!id) return null;
  return Array.isArray(id) ? id[0] : id;
};

// ─── Place order ──────────────────────────────────────────────
export const placeOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { productIds, couponCode, billingAddress, shippingAddress, paymentMethod, razorpayDetails } = req.body;

    if (!billingAddress) {
      res.status(400).json({ message: "billingAddress is required" });
      return;
    }

    const result = await orderService.placeOrder({
      userId: req.userId,
      productIds,
      couponCode,
      billingAddress,
      shippingAddress,
      paymentMethod,
      razorpayDetails
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: result.order,
      billingAddress: result.billingAddress,
      shippingAddress: result.shippingAddress,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ─── Create Razorpay Order ────────────────────────────────────
export const createRazorpayOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { productIds, couponCode } = req.body;
    const userId = req.userId;

    const cart = await cartService.getCart(userId);
    if (!cart.items || !cart.items.length) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    let cartItems = cart.items;
    
    if (productIds && productIds.length > 0) {
      const normalizedProductIds = productIds.map((id: string) => id.trim().toLowerCase());
      const productIdSet = new Set(normalizedProductIds);
      cartItems = cartItems.filter((item) => {
        const itemProductId = item.productId.toString().trim().toLowerCase();
        return productIdSet.has(itemProductId);
      });
      if (!cartItems.length) {
        res.status(400).json({ message: "No matching items found in cart" });
        return;
      }
    }

    let subtotal = 0;
    for (const item of cartItems) {
      const productIdStr = item.productId.toString();
      const product = await productDao.getActiveProductById(productIdStr);
      if (!product) {
        res.status(400).json({ message: "Product no longer available" });
        return;
      }
      subtotal += item.price * item.quantity;
    }

    let totalAmount = subtotal;

    if (couponCode) {
      try {
        const couponResult = await couponService.applyCoupon(couponCode, subtotal);
        totalAmount = couponResult.finalAmount;
      } catch (error: any) {
        res.status(400).json({ message: `Coupon error: ${error.message}` });
        return;
      }
    }

    const razorpay = getRazorpayInstance();
    const amountInPaise = Math.round(totalAmount * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${userId.substring(0, 8)}_${Date.now()}`,
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Get my orders ────────────────────────────────────────────
export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const orders = await orderService.getUserOrders(req.userId);
    res.status(200).json({ orders });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Get single order ─────────────────────────────────────────
export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { id } = req.params;
    const orderId = getParamId(id);

    if (!orderId) {
      res.status(400).json({ message: "Order ID is required" });
      return;
    }

    const order = await orderService.getOrderDetail(orderId, req.userId);
    res.status(200).json({ order });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};