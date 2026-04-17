import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const INITIAL_PRODUCTS = [
    {
      _id: '69e0bed3ddd3678cb38d4aa3',
      slug: 'combo-6-1',
      title: 'Almond Cranberry + Cashew Raisin',
      price: 300,
      images: ['/images/combo-6-1.png'],
      category: 'Combos'
    },
    {
      _id: '69e0bed3ddd3678cb38d4aa4',
      slug: 'combo-6-2',
      title: 'Coconut Almond + Date Almond Cranberry',
      price: 300,
      images: ['/images/combo-6-2.png'],
      category: 'Combos'
    },
    {
      _id: '69e0bed3ddd3678cb38d4aa5',
      slug: 'combo-12',
      title: 'Happy Bar - Combo Box of 12',
      price: 600,
      images: ['/images/combo-12.png'],
      category: 'Combos'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProducts(INITIAL_PRODUCTS);

        const user = localStorage.getItem('user');
        if (user) {
          const wish = await api.wishlist.get();
          if (wish.wishlist) {
            setWishlist(wish.wishlist.productIds.map((p: any) => p._id || p));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToWishlist = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      if (wishlist.includes(productId)) {
        await api.wishlist.remove(productId);
        setWishlist(prev => prev.filter(id => id !== productId));
      } else {
        await api.wishlist.add(productId);
        setWishlist(prev => [...prev, productId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async (productId: string) => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await api.cart.add(productId, 1);
      navigate('/cart');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faff] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 font-sans relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-20 sm:top-40 right-4 sm:right-10 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#ff3c83]/40 blur-[2px]" />
      <div className="absolute top-40 sm:top-60 right-10 sm:right-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#00d9d9]/30 blur-[4px]" />
      <div className="absolute bottom-1/4 right-16 sm:right-32 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#4cc9f0]/40 blur-[2px]" />
      <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#00d9d9]/20 blur-[6px]" />
      <div className="absolute top-1/2 left-5 sm:left-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#ff3c83]/30 blur-[3px]" />
      <div className="absolute bottom-[5%] left-[2%] w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#00d9d9]/40 blur-[2px]" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <header className="text-center mb-8 sm:mb-12 md:mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-block"
          >
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[140px] font-black leading-none text-[#ff3c83] drop-shadow-xl tracking-tight mb-2 opacity-80 select-none"
              style={{ textShadow: '2px 2px 0 rgba(255, 60, 131, 0.1)' }}
            >
              SHOP
            </h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black text-[#1e3a8a] absolute left-1/2 -translate-x-1/2 bottom-0 w-full whitespace-nowrap drop-shadow-sm"
            >
              Truly Special Happy Bars
            </motion.h2>
          </motion.div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-[#ff3c83]" />
          </div>
        ) : (
          /* Grid Layout - 1 col mobile, 2 cols tablet, 3 cols desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mt-8 md:mt-12 lg:mt-16">
            {products.map((p, idx) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 60 }}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center group w-full"
              >
                <div className="bg-white rounded-[35px] lg:rounded-[45px] p-4 lg:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.07)] border border-gray-50/50 mb-6 md:mb-8 w-full relative">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 150 }}
                    className="w-full aspect-[4/5] rounded-[25px] lg:rounded-[35px] overflow-hidden"
                  >
                    <Link to={`/product/${p.slug}`}>
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-full h-full object-cover brightness-100 group-hover:brightness-[1.02] transition-all duration-500"
                      />
                    </Link>
                  </motion.div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleAddToWishlist(e, p._id)}
                    className="absolute top-4 sm:top-5 lg:top-6 right-4 sm:right-5 lg:right-6 p-2 lg:p-3 bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg hover:scale-110 transition-all z-20"
                  >
                    <Heart
                      size={20}
                      className={`lg:w-6 lg:h-6 ${wishlist.includes(p._id) ? 'fill-[#ff3c83] text-[#ff3c83]' : 'text-gray-300 hover:text-[#ff3c83] transition-colors'}`}
                    />
                  </button>
                </div>

                <div className="text-center px-3 lg:px-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-[#1e3a8a] mb-2 md:mb-3 leading-tight tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-[#ff3c83] text-2xl lg:text-[32px] font-black tracking-tight leading-none">
                    ₹{p.price}.00
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(p._id)}
                  className="mt-5 md:mt-6 lg:mt-8 bg-[#ff3c83] text-white font-black py-2.5 md:py-3 lg:py-4 px-6 md:px-8 lg:px-10 rounded-full text-sm sm:text-base lg:text-lg tracking-widest shadow-xl shadow-pink-100 uppercase transition-all flex items-center gap-2"
                >
                  <ShoppingCart size={16} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  Buy Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};