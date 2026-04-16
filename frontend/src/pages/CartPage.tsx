import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Trash2, Plus, Minus, 
  ArrowRight, ShoppingBag, ArrowLeft,
  Check, Home, Briefcase, MapPin,
  CreditCard, Wallet, Truck, Smartphone
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // 1: Bag, 2: Address, 3: Payment
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI');
  const [addressLoading, setAddressLoading] = useState(false);

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

  const fetchAddresses = async () => {
    setAddressLoading(true);
    try {
      const resp = await api.addresses.getAll();
      setAddresses(resp.addresses || []);
      if (resp.addresses?.length > 0 && !selectedAddressId) {
        setSelectedAddressId(resp.addresses[0]._id);
      }
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    } finally {
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    if (currentStep === 2) {
      fetchAddresses();
    }
  }, [currentStep]);

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

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-4xl font-black text-[#1e3a8a] flex items-center gap-4">
            <ShoppingCart size={40} className="text-[#ff3c83]" />
            {currentStep === 1 ? 'MY BAG' : currentStep === 2 ? 'DELIVERY ADDRESS' : 'PAYMENT METHOD'}
          </h1>

          {/* Stepper */}
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-black text-sm transition-all ${
                  currentStep >= s ? 'bg-[#ff3c83] text-white shadow-lg shadow-pink-100' : 'bg-white text-gray-300 border border-gray-100'
                }`}>
                  {currentStep > s ? <Check size={20} /> : s}
                </div>
                {s < 3 && <div className={`w-8 h-1 rounded-full transition-all ${currentStep > s ? 'bg-[#ff3c83]' : 'bg-gray-100'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Step 1: Bag Items */}
          {currentStep === 1 && (
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.items.map((item: any) => {
                  const product = item.productId;
                  const pid = product._id || product;
                  return (
                    <motion.div 
                      key={pid}
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
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
                        <button onClick={() => handleUpdateQuantity(pid, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-[#ff3c83] transition-colors">
                          <Minus size={18} />
                        </button>
                        <span className="w-8 text-center font-black text-[#1e3a8a]">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(pid, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-[#ff3c83] transition-colors">
                          <Plus size={18} />
                        </button>
                      </div>

                      <div className="text-right min-w-[100px]">
                        <p className="text-xl font-black text-[#ff3c83]">₹{item.price * item.quantity}.00</p>
                        <p className="text-xs text-gray-400 font-bold">₹{item.price} each</p>
                      </div>

                      <button onClick={() => handleRemove(pid)}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={22} />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* Step 2: Address Selection */}
          {currentStep === 2 && (
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#1e3a8a]">Select Delivery Address</h3>
                <button onClick={() => navigate('/profile?section=addresses')} className="text-[#ff3c83] font-black text-sm uppercase tracking-wider hover:underline">
                  + Add New Address
                </button>
              </div>

              {addressLoading ? (
                <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#ff3c83]" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div 
                      key={addr._id}
                      onClick={() => setSelectedAddressId(addr._id)}
                      className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all relative ${
                        selectedAddressId === addr._id ? 'border-[#ff3c83] bg-pink-50/30' : 'border-gray-50 bg-white hover:border-gray-100'
                      }`}
                    >
                      {selectedAddressId === addr._id && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-[#ff3c83] rounded-full flex items-center justify-center text-white">
                          <Check size={14} strokeWidth={4} />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-4">
                        {addr.type === 'Home' ? <Home size={18} className="text-gray-400" /> : <Briefcase size={18} className="text-gray-400" />}
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-gray-100 rounded-lg text-gray-500">{addr.type}</span>
                      </div>
                      <p className="font-black text-[#1e3a8a] mb-1">{addr.name}</p>
                      <p className="text-sm text-gray-500 font-bold leading-relaxed">
                        {addr.streetAddress}, {addr.locality}, {addr.city}, {addr.state} - {addr.pinCode}
                      </p>
                      <p className="mt-4 font-black text-[#ff3c83] text-sm">{addr.phone}</p>
                    </div>
                  ))}
                  
                  {addresses.length === 0 && (
                    <div className="col-span-2 p-12 bg-white rounded-[2.5rem] border border-dashed text-center">
                      <MapPin size={40} className="mx-auto text-gray-200 mb-4" />
                      <p className="text-gray-400 font-bold mb-6">No saved addresses found</p>
                      <button onClick={() => navigate('/profile?section=addresses')} className="bg-[#ff3c83] text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-pink-100">
                        Add New Address
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Payment Method */}
          {currentStep === 3 && (
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-xl font-black text-[#1e3a8a]">Choose Payment Method</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'UPI', label: 'UPI (GPay, PhonePe, etc.)', icon: <Smartphone size={24} />, desc: 'Pay instantly using your UPI apps' },
                  { id: 'CARD', label: 'Credit / Debit Cards', icon: <CreditCard size={24} />, desc: 'All major cards supported' },
                  { id: 'WALLET', label: 'Digital Wallets', icon: <Wallet size={24} />, desc: 'Pay with popular wallets' },
                  { id: 'COD', label: 'Cash on Delivery', icon: <Truck size={24} />, desc: 'Pay when your bar arrives' }
                ].map((m) => (
                  <div 
                    key={m.id}
                    onClick={() => setSelectedPaymentMethod(m.id)}
                    className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center gap-6 ${
                      selectedPaymentMethod === m.id ? 'border-[#ff3c83] bg-pink-50/30' : 'border-gray-50 bg-white hover:border-gray-100'
                    }`}
                  >
                    <div className={`p-4 rounded-2xl ${selectedPaymentMethod === m.id ? 'bg-[#ff3c83] text-white' : 'bg-gray-50 text-gray-400'}`}>
                      {m.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-[#1e3a8a]">{m.label}</p>
                      <p className="text-xs text-gray-400 font-bold">{m.desc}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === m.id ? 'border-[#ff3c83]' : 'border-gray-200'}`}>
                      {selectedPaymentMethod === m.id && <div className="w-3 h-3 bg-[#ff3c83] rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              
              <div className="space-y-4">
                {currentStep > 1 && (
                  <button 
                    onClick={prevStep}
                    className="w-full flex items-center justify-center gap-2 text-gray-400 font-bold text-sm py-4 rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                )}
                
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  disabled={currentStep === 2 && !selectedAddressId}
                  className="w-full bg-[#ff3c83] text-white font-black py-5 rounded-2xl shadow-xl shadow-pink-100 flex items-center justify-center gap-3 tracking-widest group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === 1 ? 'CHECKOUT' : currentStep === 2 ? 'CONTINUE TO PAYMENT' : 'PLACE ORDER'}
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </div>
              
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
