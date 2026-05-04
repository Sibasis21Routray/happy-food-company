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
  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');
  const [addressLoading, setAddressLoading] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

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

  const handleCheckout = async () => {
    if (selectedPaymentMethod !== 'COD') {
      alert('Currently, only Cash on Delivery (COD) is supported for immediate placing. Please select Cash on Delivery.');
      return;
    }

    if (!selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }

    const selectedAddr = addresses.find(a => a._id === selectedAddressId);
    if (!selectedAddr) return;

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    setPlacingOrder(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/order/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          billingAddress: {
            name: selectedAddr.name,
            email: user?.email || selectedAddr.email || 'user@example.com',
            phone: selectedAddr.phone,
            streetAddress: selectedAddr.streetAddress,
            locality: selectedAddr.locality,
            city: selectedAddr.city,
            state: selectedAddr.state,
            country: selectedAddr.country || 'India',
            pinCode: selectedAddr.pinCode,
            type: selectedAddr.type
          }
        })
      });

      if (res.ok) {
        alert('Order placed successfully!');
        navigate('/profile?section=orders');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred while placing the order.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center bg-white">
        <div className="w-8 h-8 border border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-32 bg-white flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="mb-6">
            <ShoppingBag size={48} className="text-gray-300 mx-auto" strokeWidth={1} />
          </div>
          <h1 className="text-2xl font-light text-gray-800 mb-2">Your cart is empty</h1>
          <p className="text-gray-400 text-sm font-light mb-8">Add some happiness to your bag</p>
          <Link to="/happy-shop">
            <button className="px-8 py-3 bg-gray-900 text-white text-sm font-light tracking-wider hover:bg-gray-800 transition-all duration-300">
              CONTINUE SHOPPING
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { number: 1, label: 'Bag' },
    { number: 2, label: 'Address' },
    { number: 3, label: 'Payment' }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
            {currentStep === 1 ? 'Shopping Bag' : currentStep === 2 ? 'Delivery Address' : 'Payment'}
          </h1>
          <div className="w-12 h-px bg-gray-300 mx-auto" />
        </div>

        {/* Stepper */}
        <div className="flex justify-center items-center gap-8 mb-12">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? currentStep > step.number 
                      ? 'text-gray-800' 
                      : 'text-gray-800 border-b border-gray-800'
                    : 'text-gray-300'
                }`}>
                  {currentStep > step.number ? (
                    <Check size={16} strokeWidth={1.5} />
                  ) : (
                    <span className="text-xs font-light">{step.number}</span>
                  )}
                </div>
                <span className={`text-[10px] tracking-wide ${
                  currentStep >= step.number ? 'text-gray-500' : 'text-gray-300'
                }`}>
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-12 h-px transition-all duration-300 ${
                  currentStep > step.number ? 'bg-gray-400' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            
            {/* Step 1: Cart Items */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <AnimatePresence>
                  {cart.items.map((item: any) => {
                    const product = item.productId;
                    const pid = product._id || product;
                    return (
                      <motion.div 
                        key={pid}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border border-gray-100 p-5 hover:border-gray-200 transition-all duration-300"
                      >
                        <div className="flex gap-5">
                          {/* Image */}
                          <div className="w-20 h-20 bg-gray-50 flex-shrink-0">
                            <img 
                              src={product.images?.[0] || '/images/combo-6-1.png'} 
                              alt={product.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1">
                            <h3 className="text-sm font-light text-gray-800 mb-1">{product.title}</h3>
                            <p className="text-gray-400 text-xs font-light mb-2">
                              {product.category || 'Combo Pack'}
                            </p>
                            <p className="text-gray-900 text-base font-light">₹{item.price}</p>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleUpdateQuantity(pid, item.quantity - 1)}
                              className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-all"
                            >
                              <Minus size={12} strokeWidth={1} />
                            </button>
                            <span className="text-xs text-gray-600 w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(pid, item.quantity + 1)}
                              className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-all"
                            >
                              <Plus size={12} strokeWidth={1} />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button 
                            onClick={() => handleRemove(pid)}
                            className="text-gray-300 hover:text-gray-500 transition-all"
                          >
                            <Trash2 size={16} strokeWidth={1} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Step 2: Address Selection */}
            {currentStep === 2 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-light text-gray-600">Select delivery address</h3>
                  <button 
                    onClick={() => navigate('/profile?section=addresses')} 
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    + Add New
                  </button>
                </div>

                {addressLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-6 h-6 border border-gray-200 border-t-gray-800 rounded-full animate-spin" />
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="border border-gray-100 p-12 text-center">
                    <MapPin size={32} className="mx-auto text-gray-200 mb-4" strokeWidth={1} />
                    <p className="text-gray-400 text-sm font-light mb-6">No saved addresses</p>
                    <button 
                      onClick={() => navigate('/profile?section=addresses')} 
                      className="px-6 py-2 border border-gray-300 text-gray-600 text-xs font-light hover:border-gray-500 transition-all"
                    >
                      ADD ADDRESS
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {addresses.map((addr) => (
                      <div 
                        key={addr._id}
                        onClick={() => setSelectedAddressId(addr._id)}
                        className={`border p-5 cursor-pointer transition-all duration-300 ${
                          selectedAddressId === addr._id ? 'border-gray-400' : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              {addr.type === 'Home' ? <Home size={12} className="text-gray-400" /> : <Briefcase size={12} className="text-gray-400" />}
                              <span className="text-[10px] tracking-wide text-gray-400 uppercase">{addr.type}</span>
                            </div>
                            <p className="text-sm font-light text-gray-800 mb-1">{addr.name}</p>
                            <p className="text-xs text-gray-400 font-light">
                              {addr.streetAddress}, {addr.locality}, {addr.city}, {addr.state} - {addr.pinCode}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{addr.phone}</p>
                          </div>
                          {selectedAddressId === addr._id && (
                            <Check size={14} className="text-gray-600" strokeWidth={1.5} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-sm font-light text-gray-600 mb-6">Choose payment method</h3>
                <div className="space-y-3">
                  {[
                    { id: 'COD', label: 'Cash on Delivery', icon: <Truck size={16} />, desc: 'Pay when your order arrives' },
                    { id: 'UPI', label: 'UPI', icon: <Smartphone size={16} />, desc: 'Google Pay, PhonePe, etc.' },
                    { id: 'CARD', label: 'Credit/Debit Card', icon: <CreditCard size={16} />, desc: 'All major cards accepted' },
                    { id: 'WALLET', label: 'Digital Wallet', icon: <Wallet size={16} />, desc: 'Paytm, Amazon Pay, etc.' }
                  ].map((m) => (
                    <div 
                      key={m.id}
                      onClick={() => setSelectedPaymentMethod(m.id)}
                      className={`border p-4 cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                        selectedPaymentMethod === m.id ? 'border-gray-400' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className={`${selectedPaymentMethod === m.id ? 'text-gray-800' : 'text-gray-400'}`}>
                        {m.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-light text-gray-800">{m.label}</p>
                        <p className="text-xs text-gray-400 font-light">{m.desc}</p>
                      </div>
                      {selectedPaymentMethod === m.id && (
                        <Check size={14} className="text-gray-600" strokeWidth={1.5} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-100 p-6 sticky top-32">
              <h3 className="text-sm font-light text-gray-600 mb-5">Order Summary</h3>
              
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-light">Subtotal</span>
                  <span className="text-gray-600">₹{cart.totalAmount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-light">Shipping</span>
                  <span className="text-gray-500">Free</span>
                </div>
                <div className="border-t border-gray-100 my-3" />
                <div className="flex justify-between">
                  <span className="text-sm font-light text-gray-600">Total</span>
                  <span className="text-base font-light text-gray-900">₹{cart.totalAmount}</span>
                </div>
              </div>

              <div className="space-y-3">
                {currentStep > 1 && (
                  <button 
                    onClick={prevStep}
                    className="w-full py-3 border border-gray-200 text-gray-500 text-xs font-light tracking-wider hover:border-gray-400 transition-all"
                  >
                    BACK
                  </button>
                )}
                
                <button 
                  onClick={currentStep === 3 ? handleCheckout : nextStep}
                  disabled={(currentStep === 2 && !selectedAddressId) || placingOrder}
                  className="w-full py-3 bg-gray-900 text-white text-xs font-light tracking-wider hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {placingOrder ? 'PROCESSING...' : currentStep === 1 ? 'CHECKOUT' : currentStep === 2 ? 'CONTINUE' : 'PLACE ORDER'}
                </button>
                
                <Link to="/happy-shop" className="block text-center">
                  <span className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    Continue Shopping
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};