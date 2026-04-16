import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const data = await api.cart.get();
      if (data.cart) {
        setCart(data.cart);
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId: string, newQty: number) => {
    try {
      if (newQty === 0) {
        await handleRemove(productId);
        return;
      }
      if (newQty < 0) return;
      
      const currentQty = cart.items.find((i: any) => (i.productId._id || i.productId) === productId)?.quantity || 0;
      await api.cart.add(productId, newQty - currentQty);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await api.cart.remove(productId);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#ff3c83]" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-32 bg-[#f8faff] flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mb-8 shadow-inner"
        >
          <ShoppingBag size={60} className="text-[#FD6804]" />
        </motion.div>
        <h1 className="text-4xl font-black text-[#1e3a8a] mb-4">Your Bag is Empty</h1>
        <p className="text-gray-400 font-bold mb-10">Add some happiness to your bag!</p>
        <Link to="/happy-shop">
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-[#ff3c83] text-white font-black py-4 px-12 rounded-2xl shadow-xl shadow-pink-100 tracking-widest"
          >
            START SHOPPING
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#f8faff]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl font-black text-[#1e3a8a] mb-12 flex items-center gap-4">
          <ShoppingCart size={40} className="text-[#ff3c83]" />
          MY BAG
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.items.map((item: any) => {
                const product = item.productId;
                const pid = product._id || product;
                return (
                  <motion.div 
                    key={pid}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white p-6 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                      <img src={product.images?.[0] || '/images/combo-6-1.png'} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold text-[#1e3a8a]">{product.title}</h3>
                      <p className="text-gray-400 font-bold text-sm">{product.category}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl">
                      <button 
                        onClick={() => handleUpdateQuantity(pid, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-[#ff3c83] transition-colors"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-8 text-center font-black text-[#1e3a8a]">{item.quantity}</span>
                      <button 
                         onClick={() => handleUpdateQuantity(pid, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-[#ff3c83] transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="text-xl font-black text-[#ff3c83]">₹{item.price * item.quantity}.00</p>
                      <p className="text-xs text-gray-400 font-bold">₹{item.price} each</p>
                    </div>

                    <button 
                      onClick={() => handleRemove(pid)}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={22} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm sticky top-36 border border-gray-50">
              <h2 className="text-2xl font-black text-[#1e3a8a] mb-8">Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between font-bold text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{cart.totalAmount}.00</span>
                </div>
                <div className="flex justify-between font-bold text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="h-px bg-gray-100 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-[#1e3a8a]">Total</span>
                  <span className="text-3xl font-black text-[#ff3c83]">₹{cart.totalAmount}.00</span>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full bg-[#ff3c83] text-white font-black py-5 rounded-2xl shadow-xl shadow-pink-100 flex items-center justify-center gap-3 tracking-widest group"
              >
                CHECKOUT
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
              
              <Link to="/happy-shop" className="block text-center mt-6 text-[#1e3a8a] font-bold text-sm tracking-wide hover:underline uppercase">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
