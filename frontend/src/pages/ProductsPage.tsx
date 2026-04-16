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
        // Use hardcoded products as requested
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
    <div className="min-h-screen bg-[#f8faff] pt-32 pb-20 font-sans relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-40 right-10 w-4 h-4 rounded-full bg-[#ff3c83]/40 blur-[2px]" />
      <div className="absolute top-60 right-20 w-8 h-8 rounded-full bg-[#00d9d9]/30 blur-[4px]" />
      <div className="absolute bottom-1/4 right-32 w-6 h-6 rounded-full bg-[#4cc9f0]/40 blur-[2px]" />
      <div className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-[#00d9d9]/20 blur-[6px]" />
      <div className="absolute top-1/2 left-10 w-5 h-5 rounded-full bg-[#ff3c83]/30 blur-[3px]" />
      <div className="absolute bottom-[5%] left-[2%] w-10 h-10 rounded-full bg-[#00d9d9]/40 blur-[2px]" />

      <div className="container mx-auto px-4 max-w-7xl">
        <header className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-block"
          >
            <h1
              className="text-[80px] md:text-[140px] font-black leading-none text-[#ff3c83] drop-shadow-xl tracking-tight mb-2 opacity-80 select-none"
              style={{ textShadow: '4px 4px 0 rgba(255, 60, 131, 0.1)' }}
            >
              SHOP
            </h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-black text-[#1e3a8a] absolute left-1/2 -translate-x-1/2 bottom-0 w-full whitespace-nowrap drop-shadow-sm"
            >
              Truly Special Happy Bars
            </motion.h2>
          </motion.div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#ff3c83]" />
          </div>
        ) : (
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-8 lg:gap-12 items-end mt-12 md:mt-20 overflow-x-auto pb-10">
            {products.map((p, idx) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, type: "spring", stiffness: 60 }}
                whileHover={{ y: -15 }}
                className="flex flex-col items-center group w-full md:w-[380px] shrink-0"
              >
                <div className="bg-white rounded-[45px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.07)] border border-gray-50/50 mb-10 w-full relative">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 150 }}
                    className="w-full aspect-[4/5] rounded-[35px] overflow-hidden"
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
                    className="absolute top-8 right-8 p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:scale-110 transition-all z-20 group/heart"
                  >
                    <Heart
                      size={24}
                      className={wishlist.includes(p._id) ? 'fill-[#ff3c83] text-[#ff3c83]' : 'text-gray-300 group-hover:text-[#ff3c83]'}
                    />
                  </button>
                </div>

                <div className="text-center px-6">
                  <h3 className="text-2xl font-black text-[#1e3a8a] mb-4 leading-tight tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-[#ff3c83] text-[32px] font-black tracking-tight leading-none">
                    ₹{p.price}.00
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: '#ff1a70' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToCart(p._id)}
                  className="mt-8 bg-[#ff3c83] text-white font-black py-4 px-12 rounded-full text-lg tracking-widest shadow-xl shadow-pink-100 uppercase transition-all flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
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

