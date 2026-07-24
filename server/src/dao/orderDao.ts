import { query } from '../config/database';
import { Order, OrderItem, CreateOrderInput, UpdateOrderInput } from '../models/order.model';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { randomUUID } from "crypto";

// ─── Helper to convert snake_case to camelCase ──────────────
const toCamelCase = (row: any): any => {
  const result: any = {};
  for (const key in row) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = row[key];
  }
  return result;
};

// ─── Helper to get next order number ──────────────────────────
export const getNextOrderNumber = async (): Promise<number> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT MAX(order_number) as maxOrderNumber FROM orders'
  );
  return (rows[0]?.maxOrderNumber || 0) + 1;
};

// ─── Create order ──────────────────────────────────────────────
export const createOrder = async (data: any): Promise<Order> => {
  const orderId = randomUUID();
const orderNumber = await getNextOrderNumber();

await query(
    `INSERT INTO orders (
  id,
  order_number,
  user_id,
  billing_address_id,
  shipping_address_id,
  total_amount,
  status,
  payment_status,
  payment_id,
  subtotal,
  coupon_code,
  discount_percent,
  discount_amount,
  vendor_id,
  payment_method
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      orderId,
  orderNumber,
  data.userId,
  data.billingAddressId,
  data.shippingAddressId || data.billingAddressId,
  data.totalAmount,
  data.status || "pending",
  data.paymentStatus || "Pending",
  data.paymentId || null,
  data.subtotal || data.totalAmount,
  data.couponCode || null,
  data.discountPercent || 0,
  data.discountAmount || 0,
  data.vendorId || null,
  data.paymentMethod || "COD",
    ]
  );

  
  // Create order items
  if (data.items && data.items.length) {
    for (const item of data.items) {
      await query(
  `INSERT INTO order_items
  (order_id, product_id, title, quantity, price)
  VALUES (?, ?, ?, ?, ?)`,
  [
    orderId,
    item.productId,
    item.title,
    item.quantity,
    item.price,
  ]
);
    }
  }
  
  // Get the created order with items
  const orderRows = await query<RowDataPacket[]>(
    'SELECT * FROM orders WHERE id = ?',
    [orderId]
  );
  
  const order = toCamelCase(orderRows[0]);
  
  // Get order items
  const itemRows = await query<RowDataPacket[]>(
    `SELECT oi.*, p.title, p.images 
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [orderId]
  );
  
  order.items = itemRows.map((row: any) => toCamelCase(row));
  
  return order;
};

// ─── Get orders by user ID ──────────────────────────────────────
export const getOrdersByUserId = async (userId: string): Promise<any[]> => {
  const orders = await query<RowDataPacket[]>(
    `SELECT o.*, 
            ba.id as billing_id, ba.name as billing_name, ba.phone as billing_phone, 
            ba.street_address as billing_street, ba.city as billing_city, 
            ba.state as billing_state, ba.country as billing_country, ba.pin_code as billing_pincode,
            sa.id as shipping_id, sa.name as shipping_name, sa.phone as shipping_phone,
            sa.street_address as shipping_street, sa.city as shipping_city,
            sa.state as shipping_state, sa.country as shipping_country, sa.pin_code as shipping_pincode
     FROM orders o
     LEFT JOIN addresses ba ON o.billing_address_id = ba.id
     LEFT JOIN addresses sa ON o.shipping_address_id = sa.id
     WHERE o.user_id = ?
     ORDER BY o.created_at DESC`,
    [userId]
  );
  
  if (!orders.length) return [];
  
  const result = [];
  for (const order of orders) {
    const orderData = toCamelCase(order);
    
    const items = await query<RowDataPacket[]>(
      `SELECT oi.*, p.id as product_id, p.title, p.images, p.heading, p.price as product_price
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderData.id]
    );
    
    orderData.items = items.map((item: any) => {
      const itemData = toCamelCase(item);
      // Parse images safely
      let images = [];
      try {
        images = JSON.parse(itemData.images || '[]');
      } catch (e) {
        images = [];
      }
      itemData.images = images;
      itemData.image = images[0] || null;
      itemData.product = {
        id: itemData.productId,
        title: itemData.title,
        images: images,
        heading: itemData.heading,
        price: itemData.productPrice
      };
      return itemData;
    });
    
    orderData.billingAddress = {
      id: orderData.billingId,
      name: orderData.billingName,
      phone: orderData.billingPhone,
      streetAddress: orderData.billingStreet,
      city: orderData.billingCity,
      state: orderData.billingState,
      country: orderData.billingCountry,
      pinCode: orderData.billingPincode
    };
    
    orderData.shippingAddress = {
      id: orderData.shippingId,
      name: orderData.shippingName,
      phone: orderData.shippingPhone,
      streetAddress: orderData.shippingStreet,
      city: orderData.shippingCity,
      state: orderData.shippingState,
      country: orderData.shippingCountry,
      pinCode: orderData.shippingPincode
    };
    
    result.push(orderData);
  }
  
  return result;
};

// ─── Get order by ID ────────────────────────────────────────────
export const getOrderById = async (id: string): Promise<any | null> => {
  const orders = await query<RowDataPacket[]>(
    `SELECT o.*, 
            ba.id as billing_id, ba.name as billing_name, ba.phone as billing_phone, 
            ba.street_address as billing_street, ba.city as billing_city, 
            ba.state as billing_state, ba.country as billing_country, ba.pin_code as billing_pincode,
            ba.locality as billing_locality, ba.landmark as billing_landmark,
            sa.id as shipping_id, sa.name as shipping_name, sa.phone as shipping_phone,
            sa.street_address as shipping_street, sa.city as shipping_city,
            sa.state as shipping_state, sa.country as shipping_country, sa.pin_code as shipping_pincode,
            sa.locality as shipping_locality, sa.landmark as shipping_landmark,
            u.id as user_id, u.full_name, u.email as user_email, u.mobile_number as user_mobile
     FROM orders o
     LEFT JOIN addresses ba ON o.billing_address_id = ba.id
     LEFT JOIN addresses sa ON o.shipping_address_id = sa.id
     LEFT JOIN users u ON o.user_id = u.id
     WHERE o.id = ?`,
    [id]
  );
  
  if (!orders.length) return null;
  
  const orderData = toCamelCase(orders[0]);
  
  const items = await query<RowDataPacket[]>(
    `SELECT oi.*, p.id as product_id, p.title, p.images, p.heading, p.subtitle, p.price as product_price, p.category
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [orderData.id]
  );
  
  orderData.items = items.map((item: any) => {
    const itemData = toCamelCase(item);
    // Parse images safely
    let images = [];
    try {
      images = JSON.parse(itemData.images || '[]');
    } catch (e) {
      images = [];
    }
    itemData.images = images;
    itemData.image = images[0] || null;
    itemData.product = {
      id: itemData.productId,
      title: itemData.title,
      images: images,
      heading: itemData.heading,
      subtitle: itemData.subtitle,
      price: itemData.productPrice,
      category: itemData.category
    };
    return itemData;
  });
  
  orderData.billingAddress = {
    id: orderData.billingId,
    name: orderData.billingName,
    phone: orderData.billingPhone,
    streetAddress: orderData.billingStreet,
    city: orderData.billingCity,
    state: orderData.billingState,
    country: orderData.billingCountry,
    pinCode: orderData.billingPincode,
    locality: orderData.billingLocality,
    landmark: orderData.billingLandmark
  };
  
  orderData.shippingAddress = {
    id: orderData.shippingId,
    name: orderData.shippingName,
    phone: orderData.shippingPhone,
    streetAddress: orderData.shippingStreet,
    city: orderData.shippingCity,
    state: orderData.shippingState,
    country: orderData.shippingCountry,
    pinCode: orderData.shippingPincode,
    locality: orderData.shippingLocality,
    landmark: orderData.shippingLandmark
  };
  
  orderData.user = {
    id: orderData.userId,
    fullName: orderData.fullName,
    email: orderData.userEmail,
    mobileNumber: orderData.userMobile
  };
  
  return orderData;
};

// ─── Get order by ID (basic) ──────────────────────────────────
export const getOrderByIdBasic = async (id: string): Promise<Order | null> => {
  const rows = await query<RowDataPacket[]>(
    'SELECT * FROM orders WHERE id = ?',
    [id]
  );
  return rows.length ? toCamelCase(rows[0]) : null;
};

// ─── Update order ──────────────────────────────────────────────
export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order | null> => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status); }
  if (data.paymentStatus !== undefined) { fields.push('payment_status = ?'); values.push(data.paymentStatus); }
  if (data.totalAmount !== undefined) { fields.push('total_amount = ?'); values.push(data.totalAmount); }

  if (fields.length === 0) return await getOrderByIdBasic(id);

  values.push(id);
  await query(
    `UPDATE orders SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  
  return await getOrderByIdBasic(id);
};

// ─── Update order status ──────────────────────────────────────
export const updateOrderStatus = async (id: string, status: string): Promise<Order | null> => {
  await query(
    'UPDATE orders SET status = ? WHERE id = ?',
    [status, id]
  );
  return await getOrderByIdBasic(id);
};

// ─── Update payment status ────────────────────────────────────
export const updatePaymentStatus = async (id: string, paymentStatus: string, paymentId?: string): Promise<Order | null> => {
  if (paymentId) {
    await query(
      'UPDATE orders SET payment_status = ?, payment_id = ? WHERE id = ?',
      [paymentStatus, paymentId, id]
    );
  } else {
    await query(
      'UPDATE orders SET payment_status = ? WHERE id = ?',
      [paymentStatus, id]
    );
  }
  return await getOrderByIdBasic(id);
};

// ─── Cancel order ──────────────────────────────────────────────
export const cancelOrder = async (id: string, userId: string): Promise<Order | null> => {
  // Get order with items
  const orderRows = await query<RowDataPacket[]>(
    'SELECT * FROM orders WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  
  if (!orderRows.length) {
    throw new Error('Order not found');
  }
  
  const order = orderRows[0];
  
  // Check if order can be cancelled (using lowercase status)
  if (order.status === 'delivered') {
    throw new Error('Cannot cancel a delivered order');
  }
  
  if (order.status === 'cancelled') {
    throw new Error('Order is already cancelled');
  }
  
  // Update order status (lowercase)
  await query(
    'UPDATE orders SET status = ? WHERE id = ?',
    ['cancelled', id]
  );
  
  // Restore stock
  const items = await query<RowDataPacket[]>(
    'SELECT product_id, quantity FROM order_items WHERE order_id = ?',
    [id]
  );
  
  for (const item of items) {
    await query(
      'UPDATE products SET stock = stock + ? WHERE id = ?',
      [item.quantity, item.product_id]
    );
  }
  
  return await getOrderByIdBasic(id);
};

// ─── Get all orders ────────────────────────────────────────────
export const getAllOrders = async (): Promise<any[]> => {
  const orders = await query<RowDataPacket[]>(
    `SELECT o.*, u.full_name as user_name, u.email as user_email
     FROM orders o
     LEFT JOIN users u ON o.user_id = u.id
     ORDER BY o.created_at DESC`
  );
  
  return orders.map(row => toCamelCase(row));
};

// ─── Get orders with pagination ──────────────────────────────
export const getOrdersPaginated = async (
  page: number = 1,
  limit: number = 10,
  status?: string,
  paymentStatus?: string
): Promise<{ orders: any[]; total: number; totalPages: number }> => {
  const offset = (page - 1) * limit;
  
  let whereClause = 'WHERE 1=1';
  const params: any[] = [];
  
  if (status) {
    whereClause += ' AND status = ?';
    params.push(status);
  }
  
  if (paymentStatus) {
    whereClause += ' AND payment_status = ?';
    params.push(paymentStatus);
  }
  
  // Get total count
  const countRows = await query<RowDataPacket[]>(
    `SELECT COUNT(*) as total FROM orders ${whereClause}`,
    params
  );
  const total = countRows[0].total;
  
  // Get paginated results
  const rows = await query<RowDataPacket[]>(
    `SELECT o.*, u.full_name as user_name, u.email as user_email
     FROM orders o
     LEFT JOIN users u ON o.user_id = u.id
     ${whereClause}
     ORDER BY o.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  
  const orders = rows.map(row => toCamelCase(row));
  
  return {
    orders,
    total,
    totalPages: Math.ceil(total / limit)
  };
};