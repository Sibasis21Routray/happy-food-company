import React from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, Ticket, Gift } from 'lucide-react';

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

export const OrdersPage = () => (
  <div className="pt-32 bg-[#f8faff] min-h-screen">
    <AccountPlaceholder 
      title="My Orders" 
      icon={<Package />} 
      subtitle="You haven't placed any orders yet. Time to get some Happy Bars!"
    />
  </div>
);

import { ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

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

export const CouponsPage = () => (
  <div className="pt-32 bg-[#f8faff] min-h-screen">
    <AccountPlaceholder 
      title="My Coupons" 
      icon={<Ticket />} 
      subtitle="No coupons available right now. Keep an eye out for special deals!"
    />
  </div>
);

export const GiftCardsPage = () => (
  <div className="pt-32 bg-[#f8faff] min-h-screen">
    <AccountPlaceholder 
      title="Gift Cards" 
      icon={<Gift />} 
      subtitle="Send the gift of happiness! Gift cards will be available soon."
    />
  </div>
);
