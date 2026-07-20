// src/models/order.model.ts
export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
}

// IMPORTANT: Use lowercase to match old MongoDB
export type OrderStatus = "pending" | "confirmed" | "shipped" | "out for delivery" | "delivered" | "cancelled";
export type PaymentMethod = "COD" | "Online";  // Match old MongoDB
export type PaymentStatus = "Pending" | "Completed" | "Failed";  // Match old MongoDB

export interface RazorpayDetails {
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  couponCode: string | null;
  discountPercent: number;
  discountAmount: number;
  totalAmount: number;
  billingAddressId: string;
  shippingAddressId: string;
  status: OrderStatus;
  vendorId?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  razorpayDetails?: RazorpayDetails;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateOrderInput = Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'orderNumber' | 'status' | 'paymentStatus'> & {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
};

export type UpdateOrderInput = Partial<Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'orderNumber'>>;

export type OrderFilters = {
  userId?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
};