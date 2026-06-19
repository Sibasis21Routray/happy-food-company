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
      title: 'Happy Bar - Almond Cranberry | Cashew Raisin - Variety Box of 6',
      price: 276,
      images: ['/combo-products/Variety-6-AC-CR-removebg-preview.png'],
    },
    {
      _id: '69e0bed3ddd3678cb38d4aa4',
      slug: 'combo-6-2',
      title: 'Happy Bar - Coconut Almond | Date Almond Cranberry - Variety Box of 6',
      price: 276,
      images: ['/combo-products/Variety-6-CA-DAC-removebg-preview.png'],
      
    },
    {
      _id: '69e0bed3ddd3678cb38d4aa5',
      slug: 'combo-12',
      title: 'Almond Cranberry | Cashew Raisin | Coconut Almond | Date Almond Cranberry 0- Variety Box of 12',
      price: 552,
      images: ['/combo-products/Variety-12-removebg-preview.png'],
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
            setProducts(INITIAL_PRODUCTS);
          } else {
            setProducts(comboProducts);
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
    <div className="min-h-screen bg-white pt-24 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header - Using global typography classes */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <span className="text-body text-sm tracking-[0.2em] text-gray-700">COLLECTION</span>
            </div>
            <h1 className="heading-1 text-4xl sm:text-5xl md:text-6xl tracking-tight text-gray-900 mb-4">
              Shop
            </h1>
            <div className="w-12 h-px bg-gray-300 mx-auto" />
            <p className="text-body text-gray-700 text-md mt-6 max-w-md mx-auto">
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
                      <span className="text-body text-[10px] tracking-wider text-gray-500 border-b border-gray-300 pb-1">
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
                        className={`${wishlist.includes(p._id) ? 'fill-gray-800 text-gray-800' : 'text-gray-700 hover:text-gray-600'}`}
                      />
                    </button>
                  </div>

                  {/* Product Info - Using global text classes */}
                  <div className="p-6 text-center">
                    {/* Category - Using text-body */}
                    {p.category && (
                      <p className="text-body text-gray-700 text-[10px] tracking-wider mb-2 uppercase">
                        {p.category}
                      </p>
                    )}
                    
                    
                    
                    {/* Title - Using heading-3 class */}
                    <h3 className="heading-3 text-gray-800 text-base tracking-wide mb-3 leading-relaxed min-h-20">
                      {p.title}
                    </h3>
                    
                    {/* Divider */}
                    <div className="w-8 h-px bg-gray-200 mx-auto my-3" />
                    
                    {/* Price - Using heading-3 for emphasis */}
                    <p className="heading-3 text-gray-900 text-xl">
                      ₹{p.price}
                    </p>
                    
                    
                    
                    {/* Action Button - Using text-body */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddToCart(p._id)}
                      className="text-body mt-5 w-full py-3 border border-gray-200 text-gray-700 text-sm tracking-wider hover:border-gray-400 hover:text-gray-900 transition-all duration-300"
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