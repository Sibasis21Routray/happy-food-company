import React from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, Ticket, Gift, ShoppingCart, Trash2, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

interface PlaceholderProps {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
}

const AccountPlaceholder: React.FC<PlaceholderProps> = ({ title, icon, subtitle }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-10 bg-white">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="mb-6"
    >
      {React.cloneElement(icon as React.ReactElement<any>, { size: 40, className: "text-gray-300", strokeWidth: 1 })}
    </motion.div>
    <h1 className="text-2xl font-light text-gray-800 mb-2">{title}</h1>
    <div className="w-12 h-px bg-gray-200 my-4" />
    <p className="text-gray-400 text-sm font-light max-w-md mx-auto">{subtitle}</p>
    <Link to="/happy-shop">
      <button className="mt-8 px-8 py-3 bg-gray-900 text-white text-sm font-light tracking-wider hover:bg-gray-800 transition-all duration-300">
        START SHOPPING
      </button>
    </Link>
  </div>
);

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending:   { bg: 'bg-gray-50', text: 'text-gray-500', label: 'Pending' },
  confirmed: { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Confirmed' },
  shipped:   { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Shipped' },
  delivered: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Delivered' },
  cancelled: { bg: 'bg-gray-50', text: 'text-gray-400', label: 'Cancelled' },
};

export const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    api.orders.getAll()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.orders ?? []);
        setOrders(list);
      })
      .catch(() => setError('Failed to load orders. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center bg-white">
        <div className="w-8 h-8 border border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm font-light">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="pt-32 bg-white min-h-screen">
        <AccountPlaceholder
          title="My Orders"
          icon={<Package />}
          subtitle="You haven't placed any orders yet."
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-gray-900 mb-2">My Orders</h1>
          <div className="w-12 h-px bg-gray-300 mx-auto" />
        </div>

        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const status = STATUS_STYLES[order.status] ?? STATUS_STYLES['pending'];
            const date = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
              : '';
            return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/orders/${order._id}`)}
                className="border border-gray-100 p-5 hover:border-gray-200 transition-all cursor-pointer group"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-[10px] text-gray-400 tracking-wider mb-1">ORDER ID</p>
                    <p className="text-xs font-light text-gray-600 font-mono">{order._id.slice(-8)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {date && <p className="text-xs text-gray-400 font-light">{date}</p>}
                    <span className={`text-[10px] font-light tracking-wider px-2 py-1 ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  {order.items?.slice(0, 2).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 flex items-center justify-center">
                          <Package size={14} className="text-gray-400" strokeWidth={1} />
                        </div>
                        <div>
                          <p className="font-light text-gray-700 text-sm line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-400 font-light">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-light text-gray-600 text-sm">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                  {order.items?.length > 2 && (
                    <p className="text-xs text-gray-400 font-light text-center pt-2">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <p className="text-gray-400 text-xs font-light">Total Amount</p>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-light text-gray-800">₹{order.totalAmount?.toFixed(0)}</p>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-all" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const WishlistPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchWishlist = async () => {
    try {
      const data = await api.wishlist.get();
      if (data.wishlist) {
        setItems(data.wishlist.productIds);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      await api.wishlist.remove(productId);
      setItems(prev => prev.filter(item => (item._id || item) !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await api.cart.add(productId, 1);
      navigate('/cart');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center bg-white">
        <div className="w-8 h-8 border border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 bg-white min-h-screen">
        <AccountPlaceholder 
          title="My Wishlist" 
          icon={<Heart />} 
          subtitle="Your wishlist is empty."
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-gray-900 mb-2">My Wishlist</h1>
          <div className="w-12 h-px bg-gray-300 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-100 p-5 hover:border-gray-200 transition-all group relative"
            >
              <button 
                onClick={() => handleRemove(product._id)}
                className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-gray-500 transition-all z-10"
              >
                <Trash2 size={14} strokeWidth={1} />
              </button>

              <Link to={`/product/${product.slug}`} className="block mb-4">
                <div className="w-full aspect-square bg-gray-50 overflow-hidden mb-4">
                  <img 
                    src={product.images?.[0] || '/images/combo-6-1.png'} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm font-light text-gray-800 line-clamp-1">{product.title}</h3>
                <p className="text-base font-light text-gray-900 mt-1">₹{product.price}</p>
              </Link>

              <button 
                onClick={() => handleAddToCart(product._id)}
                className="w-full py-2 border border-gray-200 text-gray-600 text-xs font-light tracking-wider hover:border-gray-400 hover:text-gray-900 transition-all duration-300"
              >
                ADD TO CART
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CouponsPage = () => {
  const [coupons, setCoupons] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [copied, setCopied] = React.useState<string | null>(null);

  React.useEffect(() => {
    api.coupons.getAll()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.coupons ?? []);
        setCoupons(list.filter((c: any) => c.isActive));
      })
      .catch(() => setError('Failed to load coupons.'))
      .finally(() => setLoading(false));
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center bg-white">
        <div className="w-8 h-8 border border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm font-light">{error}</p>
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="pt-32 bg-white min-h-screen">
        <AccountPlaceholder
          title="My Coupons"
          icon={<Ticket />}
          subtitle="No coupons available right now."
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-gray-900 mb-2">My Coupons</h1>
          <div className="w-12 h-px bg-gray-300 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {coupons.map((coupon) => {
            const isExpired = coupon.expiresAt && new Date(coupon.expiresAt) < new Date();
            const expiryStr = coupon.expiresAt
              ? new Date(coupon.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
              : 'No expiry';
            return (
              <motion.div
                key={coupon._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border p-5 transition-all ${isExpired ? 'opacity-40 border-gray-100' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-3xl font-light text-gray-800">{coupon.discountPercent}%</p>
                    <p className="text-[10px] text-gray-400 tracking-wider mt-1">OFF</p>
                  </div>
                  {isExpired && (
                    <span className="text-[10px] text-gray-400 tracking-wider">Expired</span>
                  )}
                </div>
                
                <div className="border-t border-gray-100 my-4" />
                
                <div className="flex items-center justify-between bg-gray-50 px-3 py-2">
                  <span className="font-mono text-sm text-gray-700 tracking-wider">{coupon.code}</span>
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    disabled={isExpired}
                    className="text-[10px] font-light text-white bg-gray-800 px-3 py-1 hover:bg-gray-700 transition disabled:opacity-50"
                  >
                    {copied === coupon.code ? 'COPIED' : 'COPY'}
                  </button>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-xs">
                  {coupon.minOrderAmount > 0 && (
                    <span className="text-gray-400 font-light">Min: ₹{coupon.minOrderAmount}</span>
                  )}
                  <span className="text-gray-400 font-light">
                    {isExpired ? 'Expired' : `Valid till ${expiryStr}`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const GiftCardsPage = () => (
  <div className="pt-32 bg-white min-h-screen">
    <AccountPlaceholder 
      title="Gift Cards" 
      icon={<Gift />} 
      subtitle="Send the gift of happiness! Gift cards will be available soon."
    />
  </div>
);