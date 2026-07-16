import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as orderService from "../services/orderService";
import { getRazorpayInstance } from "../utils/razorpay";
import * as cartService from "../services/cartService";
import * as couponService from "../services/couponService";
import * as productDao from "../dao/productDao";

// ─── Place order ──────────────────────────────────────────────
export const placeOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productIds, couponCode, billingAddress, shippingAddress, paymentMethod, razorpayDetails } = req.body;

    if (!billingAddress) {
      res.status(400).json({ message: "billingAddress is required" });
      return;
    }

    const result = await orderService.placeOrder({
      userId: req.userId!,
      productIds,
      couponCode,
      billingAddress,
      shippingAddress,
      paymentMethod,
      razorpayDetails
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

// ─── Create Razorpay Order ────────────────────────────────────
export const createRazorpayOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productIds, couponCode } = req.body;
    const userId = req.userId!;

    const cart = await cartService.getCart(userId);
    if (!cart.items.length) { res.status(400).json({ message: "Cart is empty" }); return; }

    let cartItems = cart.items;
    
    if (productIds && productIds.length > 0) {
      const normalizedProductIds = productIds.map((id: string) => id.trim().toLowerCase());
      const productIdSet = new Set(normalizedProductIds);
      cartItems = cartItems.filter((item) => {
        let itemProductId = item.productId as any;
        if (typeof itemProductId !== "string") itemProductId = itemProductId._id ? itemProductId._id.toString() : itemProductId.toString();
        return productIdSet.has(itemProductId.trim().toLowerCase());
      });
      if (!cartItems.length) { res.status(400).json({ message: "No matching items found in cart" }); return; }
    }

    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        let productIdStr = item.productId as any;
        if (typeof productIdStr !== "string") productIdStr = productIdStr._id ? productIdStr._id.toString() : productIdStr.toString();
        const product = await productDao.getProductById(productIdStr);
        if (!product || !product.isActive) throw new Error(`Product no longer available`);
        return { price: item.price, quantity: item.quantity };
      })
    );

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let totalAmount = subtotal;

    if (couponCode) {
      const couponResult = await couponService.applyCoupon(couponCode, subtotal);
      totalAmount = couponResult.finalAmount;
    }

    const razorpay = getRazorpayInstance();
    const amountInPaise = Math.round(totalAmount * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${userId.toString().substring(16)}_${Date.now()}`,
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
