import React from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, Ticket, Gift, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

interface PlaceholderProps {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
}

const AccountPlaceholder: React.FC<PlaceholderProps> = ({ title, icon, subtitle }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-10">
    <motion.div 
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      className="w-32 h-32 bg-orange-100 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-lg shadow-orange-100/50"
    >
      {React.cloneElement(icon as React.ReactElement<any>, { size: 60, color: '#FD6804' })}
    </motion.div>
    <h1 className="text-4xl font-black text-[#1e3a8a] mb-4 tracking-tight uppercase">{title}</h1>
    <p className="text-gray-400 font-bold max-w-md mx-auto">{subtitle}</p>
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-10 px-10 py-4 bg-[#ff3c83] text-white font-black rounded-2xl shadow-xl shadow-pink-100 tracking-widest text-sm"
      onClick={() => window.location.href = '/happy-shop'}
    >
      START SHOPPING
    </motion.button>
  </div>
);

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending:   { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
  confirmed: { bg: 'bg-blue-100',   text: 'text-blue-700',   label: 'Confirmed' },
  shipped:   { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Shipped' },
  delivered: { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Delivered' },
  cancelled: { bg: 'bg-red-100',    text: 'text-red-700',    label: 'Cancelled' },
};

export const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    api.orders.getAll()
      .then((data) => {
        // backend may return { orders: [...] } or an array directly
        const list = Array.isArray(data) ? data : (data.orders ?? []);
        setOrders(list);
      })
      .catch(() => setError('Failed to load orders. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff3c83]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 bg-[#f8faff] min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-bold text-lg">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="pt-32 bg-[#f8faff] min-h-screen">
        <AccountPlaceholder
          title="My Orders"
          icon={<Package />}
          subtitle="You haven't placed any orders yet. Time to get some Happy Bars!"
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-[#f8faff] min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-black text-[#1e3a8a] mb-10 flex items-center gap-4">
          <Package size={40} className="text-[#FD6804]" />
          MY ORDERS
        </h1>

        <div className="flex flex-col gap-6">
          {orders.map((order) => {
            const status = STATUS_STYLES[order.status] ?? STATUS_STYLES['pending'];
            const date = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
              : '';
            return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/orders/${order._id}`)}
                className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-lg hover:border-[#FD6804]/20 border border-transparent transition-all cursor-pointer group"
              >
                {/* Order header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-sm font-black text-[#1e3a8a] font-mono">{order._id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {date && <p className="text-sm text-gray-400 font-semibold">{date}</p>}
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-50">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                          <Package size={18} color="#FD6804" />
                        </div>
                        <div>
                          <p className="font-bold text-[#1e3a8a] text-sm line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-black text-[#ff3c83]">₹{(item.price * item.quantity).toFixed(0)}</p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <p className="text-gray-400 font-semibold text-sm">Total Amount</p>
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-black text-[#1e3a8a]">₹{order.totalAmount?.toFixed(0)}</p>
                    <span className="text-xs font-black text-[#FD6804] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details →
                    </span>
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
    return <div className="min-h-screen pt-32 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff3c83]" /></div>;
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 bg-[#f8faff] min-h-screen">
        <AccountPlaceholder 
          title="My Wishlist" 
          icon={<Heart />} 
          subtitle="Your wishlist is lonely. Save your favorite bars here!"
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-[#f8faff] min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl font-black text-[#1e3a8a] mb-10 flex items-center gap-4">
          <Heart size={40} className="text-[#ff3c83]" />
          MY WISHLIST
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((product) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <button 
                onClick={() => handleRemove(product._id)}
                className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all z-10"
              >
                <Trash2 size={18} />
              </button>

              <Link to={`/product/${product.slug}`} className="block mb-6">
                <div className="w-full aspect-square bg-gray-50 rounded-[2rem] overflow-hidden mb-4">
                  <img src={product.images?.[0] || '/images/combo-6-1.png'} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-black text-[#1e3a8a] line-clamp-1">{product.title}</h3>
                <p className="text-[#ff3c83] text-2xl font-black mt-2">₹{product.price}.00</p>
              </Link>

              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => handleAddToCart(product._id)}
                className="w-full bg-[#ff3c83] text-white font-black py-4 rounded-2xl shadow-lg shadow-pink-100 flex items-center justify-center gap-2 tracking-widest text-sm"
              >
                <ShoppingCart size={18} />
                ADD TO BAG
              </motion.button>
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
      <div className="min-h-screen pt-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff3c83]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 bg-[#f8faff] min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-bold text-lg">{error}</p>
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="pt-32 bg-[#f8faff] min-h-screen">
        <AccountPlaceholder
          title="My Coupons"
          icon={<Ticket />}
          subtitle="No coupons available right now. Keep an eye out for special deals!"
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-[#f8faff] min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-black text-[#1e3a8a] mb-10 flex items-center gap-4">
          <Ticket size={40} className="text-[#FD6804]" />
          MY COUPONS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coupons.map((coupon) => {
            const isExpired = coupon.expiresAt && new Date(coupon.expiresAt) < new Date();
            const expiryStr = coupon.expiresAt
              ? new Date(coupon.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
              : 'No expiry';
            return (
              <motion.div
                key={coupon._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all ${isExpired ? 'opacity-50' : ''}`}
              >
                <div className="h-2 bg-gradient-to-r from-[#FD6804] to-[#ff3c83]" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-5xl font-black text-[#1e3a8a]">{coupon.discountPercent}%</p>
                      <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">OFF</p>
                    </div>
                    {isExpired && (
                      <span className="px-3 py-1 bg-red-100 text-red-500 text-xs font-black rounded-full uppercase">Expired</span>
                    )}
                  </div>
                  <div className="border-t-2 border-dashed border-gray-100 my-4" />
                  <div className="flex items-center justify-between bg-orange-50 rounded-xl px-4 py-3">
                    <span className="font-black text-[#FD6804] tracking-widest text-lg">{coupon.code}</span>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      disabled={isExpired}
                      className="text-xs font-black text-white bg-[#FD6804] px-3 py-1.5 rounded-lg hover:brightness-110 transition disabled:opacity-50"
                    >
                      {copied === coupon.code ? '✓ COPIED!' : 'COPY'}
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-400 font-semibold">
                    {coupon.minOrderAmount > 0 && (
                      <span>Min. order: ₹{coupon.minOrderAmount}</span>
                    )}
                    <span className="ml-auto">{isExpired ? 'Expired' : `Valid till ${expiryStr}`}</span>
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

export const GiftCardsPage = () => (
  <div className="pt-32 bg-[#f8faff] min-h-screen">
    <AccountPlaceholder 
      title="Gift Cards" 
      icon={<Gift />} 
      subtitle="Send the gift of happiness! Gift cards will be available soon."
    />
  </div>
);
