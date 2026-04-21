import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, MapPin, CheckCircle, Truck, ShoppingBag, Clock, XCircle } from 'lucide-react';
import { api } from '../services/api';

// ── Tracking steps definition ──────────────────────────────────────────────
const TRACKING_STEPS = [
  { key: 'pending',    label: 'Order Placed',      icon: ShoppingBag },
  { key: 'confirmed', label: 'Order Confirmed',    icon: CheckCircle },
  { key: 'processing',label: 'Processing',         icon: Clock },
  { key: 'shipped',   label: 'Shipped',            icon: Truck },
  { key: 'delivered', label: 'Delivered',          icon: Package },
];

const STATUS_ORDER = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

function getStepIndex(status: string): number {
  const idx = STATUS_ORDER.indexOf(status);
  return idx === -1 ? 0 : idx;
}

// ── Status badge colours ───────────────────────────────────────────────────
function statusStyle(status: string) {
  switch (status) {
    case 'delivered':  return 'bg-green-100 text-green-600';
    case 'cancelled':  return 'bg-red-100 text-red-500';
    case 'shipped':    return 'bg-blue-100 text-blue-600';
    case 'processing': return 'bg-yellow-100 text-yellow-600';
    default:           return 'bg-orange-100 text-orange-500';
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

  // ── Loading / Error states ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen pt-24 sm:pt-32 flex items-center justify-center bg-[#f1f3f6]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA6011]" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen pt-24 sm:pt-32 flex flex-col items-center justify-center bg-[#f1f3f6] gap-4">
        <XCircle size={48} className="text-red-400" />
        <p className="text-gray-500 font-bold">{error || 'Order not found'}</p>
        <button onClick={() => navigate(-1)} className="text-[#FA6011] font-black underline text-sm">Go Back</button>
      </div>
    );
  }

  const isCancelled = order.status === 'cancelled';
  const currentStep = getStepIndex(order.status);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 md:pt-28 pb-16 bg-[#f1f3f6]">
      <div className="container mx-auto px-3 sm:px-4 max-w-4xl">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#FA6011] font-bold text-sm mb-6 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to My Orders
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-4"
        >

          {/* ── Header card ──────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                <p className="text-sm sm:text-base font-bold text-gray-800 break-all">{order._id}</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest ${statusStyle(order.status)}`}>
                  {order.status}
                </span>
                <span className="text-xs font-bold text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* ── Tracking Timeline ─────────────────────────────────────── */}
          {!isCancelled && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">
              <h2 className="text-sm sm:text-base font-black uppercase text-gray-900 tracking-widest mb-6">Track Order</h2>

              {/* Desktop: horizontal steps */}
              <div className="hidden sm:flex items-center justify-between relative">
                {/* connector line */}
                <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-100 z-0">
                  <div
                    className="h-full bg-[#FA6011] transition-all duration-700"
                    style={{ width: `${(currentStep / (TRACKING_STEPS.length - 1)) * 100}%` }}
                  />
                </div>

                {TRACKING_STEPS.map((step, idx) => {
                  const done = idx <= currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: done ? 1 : 0.85 }}
                        transition={{ delay: idx * 0.08 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow transition-all ${
                          done ? 'bg-[#FA6011] text-white shadow-orange-200' : 'bg-gray-100 text-gray-300'
                        }`}
                      >
                        <Icon size={18} />
                      </motion.div>
                      <p className={`text-[10px] font-black uppercase tracking-wider text-center ${done ? 'text-[#FA6011]' : 'text-gray-300'}`}>
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
                    <div key={step.key} className="flex items-stretch gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          done ? 'bg-[#FA6011] text-white' : 'bg-gray-100 text-gray-300'
                        }`}>
                          <Icon size={15} />
                        </div>
                        {idx < TRACKING_STEPS.length - 1 && (
                          <div className={`w-0.5 flex-1 my-1 ${done && idx < currentStep ? 'bg-[#FA6011]' : 'bg-gray-100'}`} style={{ minHeight: 24 }} />
                        )}
                      </div>
                      <div className="pb-4 pt-1">
                        <p className={`text-xs font-black uppercase tracking-widest ${done ? 'text-[#FA6011]' : 'text-gray-300'}`}>
                          {step.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {isCancelled && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 sm:p-7 flex items-center gap-4">
              <XCircle size={28} className="text-red-400 flex-shrink-0" />
              <div>
                <p className="font-black text-red-500 uppercase tracking-widest text-xs sm:text-sm">Order Cancelled</p>
                <p className="text-xs text-red-400 font-bold mt-0.5">This order has been cancelled.</p>
              </div>
            </div>
          )}

          {/* ── Items ────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">
            <h2 className="text-sm sm:text-base font-black uppercase text-gray-900 tracking-widest mb-5">Order Items</h2>
            <div className="divide-y divide-gray-50">
              {order.items?.map((item: any, idx: number) => (
                <div key={item.productId || idx} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3 min-w-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl border border-gray-100 flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-black text-gray-900 truncate">{item.title}</p>
                      <p className="text-xs font-bold text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base font-black text-[#FA6011] flex-shrink-0">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-50 flex flex-col gap-2">
              {order.discount > 0 && (
                <div className="flex justify-between text-xs font-bold text-gray-500">
                  <span>Discount</span>
                  <span className="text-green-500">- ₹{order.discount?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm font-black text-gray-400 uppercase tracking-widest">Order Total</p>
                <p className="text-lg sm:text-xl font-black text-gray-900">₹{order.totalAmount?.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* ── Shipping Address ──────────────────────────────────────── */}
          {order.shippingAddress && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-[#FA6011]" />
                <h2 className="text-sm sm:text-base font-black uppercase text-gray-900 tracking-widest">Delivery Address</h2>
              </div>
              <p className="font-black text-gray-900 text-sm sm:text-base">{order.shippingAddress.name}</p>
              <p className="text-[#FA6011] font-bold text-xs sm:text-sm mt-0.5">{order.shippingAddress.phone}</p>
              <p className="text-xs sm:text-sm text-gray-500 font-bold leading-relaxed mt-1">
                {order.shippingAddress.streetAddress}
                {order.shippingAddress.locality && `, ${order.shippingAddress.locality}`},&nbsp;
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}
              </p>
            </div>
          )}

          {/* ── Payment Method ─────────────────────────────────────────── */}
          {order.paymentMethod && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">
              <h2 className="text-sm sm:text-base font-black uppercase text-gray-900 tracking-widest mb-2">Payment Method</h2>
              <p className="text-sm font-bold text-gray-600 capitalize">{order.paymentMethod.replace(/_/g, ' ')}</p>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};
