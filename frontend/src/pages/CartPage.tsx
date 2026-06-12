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
import { useSearchParams } from 'react-router-dom';
import { useToast } from '../components/Layout/Toast';


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
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

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
  const step = Number(searchParams.get('step'));

  if (step === 2 && cart?.items?.length) {
  setCurrentStep(2);
}

if (step === 3 && selectedAddressId) {
  setCurrentStep(3);
}
}, [searchParams]);


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
      showToast('Currently, only Cash on Delivery (COD) is supported for immediate placing. Please select Cash on Delivery.', 'error');
      return;
    }

    if (!selectedAddressId) {
      showToast('Please select a delivery address', 'error');
      return;
    }

    const selectedAddr = addresses.find(a => a._id === selectedAddressId);
    if (!selectedAddr) return;

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    setPlacingOrder(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/order/place`, {
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
        showToast('Order placed successfully!', 'success');
        navigate('/profile?section=orders');
      } else {
        const data = await res.json();
        showToast(data.message || 'Failed to place order', 'error');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      showToast('An error occurred while placing the order.', 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center bg-white">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
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
            <ShoppingBag size={64} className="text-gray-300 mx-auto" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-3">Your cart is empty</h1>
          <p className="text-gray-600 text-lg font-light mb-8">Add some happiness to your bag</p>
          <Link to="/happy-shop">
            <button className="px-10 py-4 bg-gray-900 text-white text-base font-medium tracking-wider hover:bg-gray-800 transition-all duration-300 rounded-sm">
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
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
            {currentStep === 1 ? 'Shopping Bag' : currentStep === 2 ? 'Delivery Address' : 'Payment'}
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto" />
        </div>

        {/* Stepper */}
        <div className="flex justify-center items-center gap-10 mb-12">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center gap-2">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  currentStep >= step.number 
                    ? currentStep > step.number 
                      ? 'bg-gray-900 text-white' 
                      : 'border-2 border-gray-900 text-gray-900'
                    : 'border-2 border-gray-200 text-gray-300'
                }`}>
                  {currentStep > step.number ? (
                    <Check size={18} strokeWidth={2} />
                  ) : (
                    <span className="text-base font-medium">{step.number}</span>
                  )}
                </div>
                <span className={`text-sm font-medium tracking-wide ${
                  currentStep >= step.number ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-16 h-px transition-all duration-300 ${
                  currentStep > step.number ? 'bg-gray-800' : 'bg-gray-200'
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
              <div className="space-y-5">
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
                        className="border border-gray-200 p-6 hover:border-gray-300 transition-all duration-300 rounded-sm"
                      >
                        <div className="flex gap-6">
                          {/* Image */}
                          <div className="w-24 h-24 bg-gray-50 flex-shrink-0">
                            <img 
                              src={product.images?.[0] || '/images/combo-6-1.png'} 
                              alt={product.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.title}</h3>
                            <p className="text-gray-500 text-sm font-light mb-2">
                              {product.category || 'Combo Pack'}
                            </p>
                            <p className="text-gray-900 text-xl font-medium">₹{item.price}</p>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => handleUpdateQuantity(pid, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-gray-600 transition-all rounded-sm"
                            >
                              <Minus size={14} strokeWidth={1.5} />
                            </button>
                            <span className="text-base text-gray-800 w-8 text-center font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(pid, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-gray-600 transition-all rounded-sm"
                            >
                              <Plus size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button 
                            onClick={() => handleRemove(pid)}
                            className="text-gray-400 hover:text-red-500 transition-all"
                          >
                            <Trash2 size={18} strokeWidth={1.5} />
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
            <h3 className="text-lg font-medium text-gray-800">
             Select Delivery Address <span className="text-red-500">*</span>
             </h3>

      <button
        onClick={() =>
  navigate('/profile?section=addresses&returnTo=checkout')
}
        className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
      >
        + Add New Address
      </button>
    </div>

    {!selectedAddressId && addresses.length > 0 && (
      <p className="text-red-500 text-sm mb-4">
        * Please select a delivery address to continue
      </p>
    )}

    {addressLoading ? (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </div>
    ) : addresses.length === 0 ? (
      <div className="border border-gray-200 p-12 text-center rounded-sm">
        <MapPin
          size={48}
          className="mx-auto text-gray-300 mb-4"
          strokeWidth={1}
        />

        <p className="text-gray-600 text-lg font-light mb-2">
          No saved addresses
        </p>

        <p className="text-red-500 text-sm mb-6">
          * Address is required to place an order
        </p>

        <button
          onClick={() =>
  navigate('/profile?section=addresses&returnTo=checkout')
}
          className="px-8 py-3 border border-gray-300 text-gray-700 text-base font-medium hover:border-gray-700 transition-all rounded-sm"
        >
          ADD ADDRESS
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-5">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            onClick={() => setSelectedAddressId(addr._id)}
            className={`border p-6 cursor-pointer transition-all duration-300 rounded-sm ${
              selectedAddressId === addr._id
                ? 'border-gray-700 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {addr.type === 'Home' ? (
                    <Home size={14} className="text-gray-600" />
                  ) : (
                    <Briefcase size={14} className="text-gray-600" />
                  )}

                  <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                    {addr.type}
                  </span>
                </div>

                <p className="text-lg font-semibold text-gray-900 mb-1">
                  {addr.name}
                </p>

                <p className="text-base text-gray-600 font-light mb-2">
                  {addr.streetAddress}, {addr.locality}, {addr.city},{" "}
                  {addr.state} - {addr.pinCode}
                </p>

                <p className="text-base text-gray-700 font-medium">
                  {addr.phone}
                </p>
              </div>

              {selectedAddressId === addr._id && (
                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                  <Check
                    size={14}
                    className="text-white"
                    strokeWidth={2}
                  />
                </div>
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
                <h3 className="text-lg font-medium text-gray-800 mb-6">Choose payment method</h3>
                <div className="space-y-4">
                  {[
                    { id: 'COD', label: 'Cash on Delivery', icon: <Truck size={18} />, desc: 'Pay when your order arrives' },
                    { id: 'UPI', label: 'UPI', icon: <Smartphone size={18} />, desc: 'Google Pay, PhonePe, etc.' },
                    { id: 'CARD', label: 'Credit/Debit Card', icon: <CreditCard size={18} />, desc: 'All major cards accepted' },
                    { id: 'WALLET', label: 'Digital Wallet', icon: <Wallet size={18} />, desc: 'Paytm, Amazon Pay, etc.' }
                  ].map((m) => (
                    <div 
                      key={m.id}
                      onClick={() => setSelectedPaymentMethod(m.id)}
                      className={`border p-5 cursor-pointer transition-all duration-300 flex items-center gap-5 rounded-sm ${
                        selectedPaymentMethod === m.id ? 'border-gray-700 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`${selectedPaymentMethod === m.id ? 'text-gray-900' : 'text-gray-500'}`}>
                        {m.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-medium text-gray-800">{m.label}</p>
                        <p className="text-sm text-gray-500 font-light mt-1">{m.desc}</p>
                      </div>
                      {selectedPaymentMethod === m.id && (
                        <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                          <Check size={14} className="text-white" strokeWidth={2} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 sticky top-32 rounded-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 font-light">Subtotal</span>
                  <span className="text-gray-900 font-medium">₹{cart.totalAmount}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 font-light">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 my-4" />
                <div className="flex justify-between">
                  <span className="text-xl font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">₹{cart.totalAmount}</span>
                </div>
              </div>

              <div className="space-y-3">
                {currentStep > 1 && (
                  <button 
                    onClick={prevStep}
                    className="w-full py-4 border border-gray-300 text-gray-700 text-base font-medium tracking-wider hover:border-gray-900 hover:text-gray-900 transition-all rounded-sm"
                  >
                    BACK
                  </button>
                )}
                
                <button 
                  onClick={currentStep === 3 ? handleCheckout : nextStep}
                  disabled={(currentStep === 2 && !selectedAddressId) || placingOrder}
                  className="w-full py-4 bg-gray-900 text-white text-base font-semibold tracking-wider hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                >
                  {placingOrder ? 'PROCESSING...' : currentStep === 1 ? 'PROCEED TO CHECKOUT' : currentStep === 2 ? 'CONTINUE TO PAYMENT' : 'PLACE ORDER'}
                </button>
                
                <Link to="/happy-shop" className="block text-center">
                  <span className="text-base text-gray-500 hover:text-gray-800 transition-colors font-medium">
                    ← Continue Shopping
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