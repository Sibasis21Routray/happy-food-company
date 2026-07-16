import React from 'react';
import { X, Package, Download } from 'lucide-react';

interface OrderDetailsModalProps {
  order: any;
  onClose: () => void;
  onStatusChange?: (orderId: string, newStatus: string) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose, onStatusChange }) => {
  if (!order) return null;

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const subtotal = order.subtotal || order.items?.reduce((acc: number, item: any) => acc + ((item.productId?.price || item.price || 0) * item.quantity), 0) || 0;
  const shippingFee = 0.00; // Assuming free shipping for now
  const marketplaceFee = 0.00; // Can be dynamic if backend supports
  const totalAmount = order.totalAmount || subtotal;
  const shippingAddress = order.shippingAddress || order.shippingAddressId;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onStatusChange) {
      onStatusChange(order._id, e.target.value);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[90vh] overflow-hidden border border-white/50">
        
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                <Package size={16} className="text-orange-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Order Details</h2>
            </div>
            <div className="text-sm font-medium text-gray-500 flex items-center gap-2 ml-11">
              Status: 
              {onStatusChange ? (
                <select 
                  value={order.status} 
                  onChange={handleStatusChange}
                  className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide border-0 cursor-pointer focus:ring-2 focus:ring-orange-200 ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-orange-100 text-orange-700'
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="out for delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              ) : (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {order.status}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 rounded-full transition-all"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto font-sans flex-1">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* LEFT COLUMN: Items list */}
            <div className="flex-1 space-y-4">
              {order.items?.map((item: any, idx: number) => {
                const product = item.productId || item;
                const price = product.price || item.price || 0;
                const title = product.title || item.title || 'Unknown Item';
                const image = product.image || item.image || (product.images && product.images[0]);

                return (
                  <div key={product._id || idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Item Image */}
                      <div className="w-24 h-24 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden relative group-hover:border-orange-200 transition-colors">
                        {image ? (
                          <img src={image} alt={title} className="w-full h-full object-cover" />
                        ) : (
                          <Package size={32} className="text-gray-300" />
                        )}
                      </div>
                      
                      {/* Item Info */}
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-900 hover:text-[#FA6011] cursor-pointer transition-colors leading-tight">
                          {title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Sold by: <span className="text-[#007185] hover:underline cursor-pointer hover:text-[#c45500]">The Happy Food Company</span>
                        </p>
                        <p className="text-sm font-medium text-gray-800 mt-1 flex items-center gap-2">
                          <span>₹{price.toFixed(2)}</span>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-600 font-normal">Qty: {item.quantity || 1}</span>
                        </p>

                        {/* Removed Customer Address from here */}
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Shipping Address Block (Left Column) */}
              {shippingAddress && (
                <div className="bg-orange-50/40 border border-orange-100 rounded-xl p-6 shadow-sm relative overflow-hidden mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <h2 className="text-sm font-bold text-orange-900 tracking-wider uppercase">Shipping Address</h2>
                  </div>
                  
                  <div className="text-sm text-gray-800 leading-relaxed border-l-2 border-orange-200 pl-3 ml-1">
                    <p className="font-bold text-gray-900 mb-1">{shippingAddress.name}</p>
                    <p>{shippingAddress.streetAddress}{shippingAddress.locality && `, ${shippingAddress.locality}`}</p>
                    <p className="mt-0.5">
                      {shippingAddress.city}{shippingAddress.state && `, ${shippingAddress.state}`} {shippingAddress.pinCode}
                    </p>
                    <p className="mt-1.5 text-gray-600">
                      Phone: <span className="font-medium">{shippingAddress.phone}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Order Summary & Info */}
            <div className="w-full lg:w-80 space-y-4">
              
              {/* Order Summary Block */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-300"></div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="text-sm text-gray-600 space-y-1.5 mb-5 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="flex justify-between"><span className="text-gray-500">Date:</span> <span className="font-medium text-gray-900">{orderDate}</span></p>
                  <p className="flex justify-between"><span className="text-gray-500">Order #:</span> <span className="font-medium text-gray-900">{order.orderNumber ? `171-${order.orderNumber.toString().padStart(7, '0')}` : order._id.slice(-8)}</span></p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">₹{shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Marketplace Fee</span>
                    <span className="font-medium text-gray-900">₹{marketplaceFee.toFixed(2)}</span>
                  </div>
                  
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Discount</span>
                      <span>-₹{order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-gray-100 mt-3">
                    <div className="flex justify-between text-black font-bold text-lg">
                      <span>Grand Total</span>
                      <span className="text-orange-600">₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Block */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                <h2 className="text-base font-bold text-gray-900 mb-3">Payment Method</h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-600">{order.paymentMethod === 'Online' ? 'CARD' : 'COD'}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                      {order.paymentMethod ? order.paymentMethod.replace(/_/g, ' ') : 'BHIM UPI'}
                    </p>
                    {order.razorpayDetails?.paymentId && (
                      <p className="text-xs text-gray-400 mt-0.5 font-mono">
                        {order.razorpayDetails.paymentId}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
