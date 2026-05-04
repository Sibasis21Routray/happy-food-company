import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, MapPin, CheckCircle, Truck, ShoppingBag, Clock, XCircle } from 'lucide-react';
import { api } from '../services/api';

// Tracking steps definition
const TRACKING_STEPS = [
  { key: 'pending',    label: 'Order Placed',      icon: ShoppingBag },
  { key: 'confirmed', label: 'Confirmed',          icon: CheckCircle },
  { key: 'processing',label: 'Processing',         icon: Clock },
  { key: 'shipped',   label: 'Shipped',            icon: Truck },
  { key: 'delivered', label: 'Delivered',          icon: Package },
];

const STATUS_ORDER = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

function getStepIndex(status: string): number {
  const idx = STATUS_ORDER.indexOf(status);
  return idx === -1 ? 0 : idx;
}

function statusStyle(status: string) {
  switch (status) {
    case 'delivered':  return 'bg-green-50 text-green-700 border border-green-200';
    case 'cancelled':  return 'bg-red-50 text-red-600 border border-red-200';
    case 'shipped':    return 'bg-blue-50 text-blue-700 border border-blue-200';
    case 'processing': return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
    default:           return 'bg-gray-50 text-gray-700 border border-gray-200';
  }
}

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const resp = await api.orders.getById(id);
        setOrder(resp.order);
      } catch (err: any) {
        setError(err.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-white gap-5">
        <XCircle size={48} className="text-gray-400" strokeWidth={1.5} />
        <p className="text-gray-500 text-base font-light">{error || 'Order not found'}</p>
        <button onClick={() => navigate(-1)} className="text-gray-700 text-sm font-medium underline-offset-4 hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  const isCancelled = order.status === 'cancelled';
  const currentStep = getStepIndex(order.status);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Orders
        </button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >

          {/* Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Order ID</p>
                <p className="text-base font-mono text-gray-800 break-all">{order._id?.slice(-12)}</p>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${statusStyle(order.status)}`}>
                  {order.status?.toUpperCase()}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          {!isCancelled && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-7">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-8">Order Status</h2>

              {/* Desktop: horizontal steps */}
              <div className="hidden sm:flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-100 z-0">
                  <div
                    className="h-full bg-gray-600 transition-all duration-700"
                    style={{ width: `${(currentStep / (TRACKING_STEPS.length - 1)) * 100}%` }}
                  />
                </div>

                {TRACKING_STEPS.map((step, idx) => {
                  const done = idx <= currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="relative z-10 flex flex-col items-center gap-3 flex-1">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: done ? 1 : 0.9 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          done ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Icon size={20} strokeWidth={1.5} />
                      </motion.div>
                      <p className={`text-xs font-medium tracking-wide text-center ${
                        done ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mobile: vertical steps */}
              <div className="sm:hidden space-y-0">
                {TRACKING_STEPS.map((step, idx) => {
                  const done = idx <= currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="flex items-stretch gap-5">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          done ? 'bg-gray-800 text-white shadow-sm' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon size={18} strokeWidth={1.5} />
                        </div>
                        {idx < TRACKING_STEPS.length - 1 && (
                          <div className={`w-0.5 flex-1 my-1 ${done && idx < currentStep ? 'bg-gray-600' : 'bg-gray-200'}`} style={{ minHeight: 30 }} />
                        )}
                      </div>
                      <div className="pb-6 pt-1">
                        <p className={`text-sm font-medium tracking-wide ${done ? 'text-gray-800' : 'text-gray-400'}`}>
                          {step.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cancelled State */}
          {isCancelled && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-7 flex items-start gap-5">
              <XCircle size={28} className="text-red-500 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-red-700 uppercase tracking-wide text-sm mb-1">Order Cancelled</p>
                <p className="text-sm text-red-600 font-normal">This order has been cancelled. Contact support for more information.</p>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-7">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-6">Order Items</h2>
            <div className="divide-y divide-gray-100">
              {order.items?.map((item: any, idx: number) => (
                <div key={item.productId || idx} className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4 min-w-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package size={20} className="text-gray-400" strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-base font-medium text-gray-800 truncate">{item.title}</p>
                      <p className="text-sm text-gray-500 mt-0.5">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 flex-shrink-0">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
              {order.discount > 0 && (
                <div className="flex justify-between text-base">
                  <span className="text-gray-500">Discount</span>
                  <span className="text-green-600 font-medium">- ₹{order.discount?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2">
                <p className="text-base font-medium text-gray-600 uppercase tracking-wider">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹{order.totalAmount?.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-7">
              <div className="flex items-center gap-3 mb-5">
                <MapPin size={20} className="text-gray-600" strokeWidth={1.5} />
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Delivery Address</h2>
              </div>
              <div className="space-y-1.5">
                <p className="text-base font-medium text-gray-800">{order.shippingAddress.name}</p>
                <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>
                <p className="text-sm text-gray-500 leading-relaxed mt-2">
                  {order.shippingAddress.streetAddress}
                  {order.shippingAddress.locality && `, ${order.shippingAddress.locality}`}
                  {order.shippingAddress.city && `, ${order.shippingAddress.city}`}
                  {order.shippingAddress.state && `, ${order.shippingAddress.state}`}
                  {order.shippingAddress.pinCode && ` - ${order.shippingAddress.pinCode}`}
                </p>
              </div>
            </div>
          )}

          {/* Payment Method */}
          {order.paymentMethod && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-7">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Payment Method</h2>
              <p className="text-base font-medium text-gray-700">
                {order.paymentMethod.replace(/_/g, ' ').toUpperCase()}
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};