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

  // Complete product data with all details
  const INITIAL_PRODUCTS = [
    {
      _id: '69e0bed3ddd3678cb38d4aa3',
      slug: 'combo-6-1',
      title: 'Almond Cranberry + Cashew Raisin',
      price: 300,
      images: ['/images/combo-6-1.png'],
      category: 'Combos',
      description: '6 bars • 2 flavors',
      features: ['All Natural', 'No Preservatives', 'Vegetarian'],
      badge: 'Bestseller'
    },
    {
      _id: '69e0bed3ddd3678cb38d4aa4',
      slug: 'combo-6-2',
      title: 'Coconut Almond + Date Almond Cranberry',
      price: 300,
      images: ['/images/combo-6-2.png'],
      category: 'Combos',
      description: '6 bars • 2 flavors',
      features: ['All Natural', 'No Preservatives', 'Vegetarian']
    },
    {
      _id: '69e0bed3ddd3678cb38d4aa5',
      slug: 'combo-12',
      title: 'Happy Bar - Combo Box of 12',
      price: 600,
      images: ['/images/combo-12.png'],
      category: 'Combos',
      description: '12 bars • 4 flavors',
      features: ['All Natural', 'No Preservatives', 'Vegetarian'],
      badge: 'Best Value'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first
        const apiProducts = await api.products.getAll();
        
        if (apiProducts && apiProducts.length > 0) {
          // Filter only combo products
          const comboProducts = apiProducts.filter((p: any) => 
            p.slug?.startsWith('combo') || p.category === 'Combos'
          );
          
          if (comboProducts.length > 0) {
            setProducts(comboProducts);
          } else {
            setProducts(INITIAL_PRODUCTS);
          }
        } else {
          setProducts(INITIAL_PRODUCTS);
        }

        // Fetch wishlist if user is logged in
        const user = localStorage.getItem('user');
        if (user) {
          try {
            const wish = await api.wishlist.get();
            if (wish && wish.wishlist) {
              const wishlistIds = wish.wishlist.productIds.map((p: any) => p._id || p);
              setWishlist(wishlistIds);
            }
          } catch (wishErr) {
            console.error('Wishlist fetch failed:', wishErr);
          }
        }
      } catch (err) {
        console.error('Products fetch failed, using fallback data:', err);
        setProducts(INITIAL_PRODUCTS);
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
      console.error('Wishlist operation failed:', err);
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
      console.error('Add to cart failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 font-light">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <span className="text-xs tracking-[0.2em] text-gray-400">COLLECTION</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-4">
              Shop
            </h1>
            <div className="w-12 h-px bg-gray-300 mx-auto" />
            <p className="text-gray-400 text-sm font-light mt-6 max-w-md mx-auto">
              Premium protein bars crafted for your everyday adventures
            </p>
          </motion.div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="w-8 h-8 border border-gray-200 border-t-gray-800 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, idx) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 relative">
                  
                  {/* Badge */}
                  {p.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] tracking-wider text-gray-500 border-b border-gray-300 pb-1">
                        {p.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Image Container */}
                  <div className="relative bg-gray-50">
                    <Link to={`/product/${p.slug}`}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={p.images?.[0] || '/images/placeholder.png'}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleAddToWishlist(e, p._id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 z-20"
                    >
                      <Heart
                        size={16}
                        strokeWidth={1.5}
                        className={`${wishlist.includes(p._id) ? 'fill-gray-800 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 text-center">
                    {/* Category */}
                    {p.category && (
                      <p className="text-gray-400 text-[10px] font-light tracking-wider mb-2 uppercase">
                        {p.category}
                      </p>
                    )}
                    
                    {/* Description/Serving info */}
                    {p.description && (
                      <p className="text-gray-400 text-xs font-light tracking-wide mb-2">
                        {p.description}
                      </p>
                    )}
                    
                    {/* Title */}
                    <h3 className="text-gray-800 font-light text-base tracking-wide mb-3 leading-relaxed">
                      {p.title}
                    </h3>
                    
                    {/* Divider */}
                    <div className="w-8 h-px bg-gray-200 mx-auto my-3" />
                    
                    {/* Price */}
                    <p className="text-gray-900 text-xl font-light">
                      ₹{p.price}
                    </p>
                    
                    {/* Features Tags */}
                    {p.features && p.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mt-3 mb-4">
                        {p.features.slice(0, 3).map((feature: string, i: number) => (
                          <span key={i} className="text-[10px] text-gray-400">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddToCart(p._id)}
                      className="mt-5 w-full py-3 border border-gray-200 text-gray-700 text-xs font-light tracking-wider hover:border-gray-400 hover:text-gray-900 transition-all duration-300"
                    >
                      ADD TO CART
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};