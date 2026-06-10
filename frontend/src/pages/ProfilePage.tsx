import React, { useState, useEffect, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate ,useSearchParams} from 'react-router-dom';
import { api } from '../services/api';
import { 
  User, MapPin, CreditCard, 
  Package, Heart, Ticket, Bell, 
  Smartphone, ChevronRight, 
  CheckCircle, HelpCircle, UserCheck, Gift,
  Navigation, Trash2, ShoppingCart, Menu, X, UserCircle, Settings, LogOut
} from 'lucide-react';
import { Country, State } from 'country-state-city';
import PhoneInputModule from 'react-phone-input-2';
import { useToast } from '../components/Layout/Toast';
import 'react-phone-input-2/lib/style.css';

const PhoneInput = (PhoneInputModule as any).default || PhoneInputModule;

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-10 text-red-500 font-bold"><h1>Something went wrong.</h1><pre>{this.state.error?.toString()}</pre></div>;
    }
    return this.props.children;
  }
}

type Section = 'profile' | 'addresses' | 'orders' | 'gift-cards' | 'upi' | 'cards' | 'wishlist' | 'coupons' | 'notifications';

interface UserData {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  gender?: string;
  email?: string;
  mobileNumber?: string;
}

interface AddressFormData {
  name: string;
  phone: string;
  pinCode: string;
  locality: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  landmark: string;
  alternatePhone: string;
  type: 'Home' | 'Work';
  email: string;
}

interface WishlistItem {
  _id: string;
  slug?: string;
  title?: string;
  price?: number;
  images?: string[];
}

interface SavedAddress {
  _id?: string;
  name: string;
  phone: string;
  streetAddress: string;
  locality: string;
  city: string;
  state: string;
  pinCode: string;
  type: 'Home' | 'Work';
}

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobileNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string }>({ type: '', text: '' });
  const [editFields, setEditFields] = useState({
    personal: false,
    email: false,
    mobile: false
  });
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [addressForm, setAddressForm] = useState<AddressFormData>({
    name: '',
    phone: '',
    pinCode: '',
    locality: '',
    streetAddress: '',
    city: '',
    state: '',
    country: 'IN',
    landmark: '',
    alternatePhone: '',
    type: 'Home',
    email: ''
  });
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768);

  const [searchParams] = useSearchParams();

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(addressForm.country);
  const { showToast } = useToast();


  useEffect(() => {
  const section = searchParams.get('section');

  if (
    section &&
    [
      'profile',
      'addresses',
      'orders',
      'wishlist',
      'coupons',
      'notifications',
      'gift-cards',
      'upi',
      'cards',
    ].includes(section)
  ) {
    setActiveSection(section as Section);
  }
}, [searchParams]);


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchAddresses = async () => {
    try {
      const resp = await api.addresses.getAll();
      setSavedAddresses(resp.addresses || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWishlist = async () => {
    setLoadingWishlist(true);
    try {
      const resp = await api.wishlist.get();
      setWishlistItems(resp.wishlist?.productIds || []);
    } catch (err) {
      console.error('Wishlist fetch error:', err);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const resp = await api.orders.getAll();
      setOrders(resp.orders || []);
    } catch (err) {
      console.error('Orders fetch error:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed: UserData = JSON.parse(storedUser);
      setUser(parsed);
      setFormData({
        firstName: parsed.firstName || parsed.fullName?.split(' ')[0] || '',
        lastName: parsed.lastName || parsed.fullName?.split(' ').slice(1).join(' ') || '',
        gender: parsed.gender || '',
        email: parsed.email || '',
        mobileNumber: parsed.mobileNumber || '',
        password: ''
      });
      setAddressForm(prev => ({ ...prev, email: parsed.email || '', name: parsed.fullName || '' }));
      fetchAddresses();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (activeSection === 'wishlist') {
      fetchWishlist();
    } else if (activeSection === 'orders') {
      fetchOrders();
    }
  }, [activeSection]);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await api.wishlist.remove(productId);
      setWishlistItems(prev => prev.filter(item => (item._id || item) !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCartFromWishlist = async (productId: string) => {
    try {
      await api.cart.add(productId, 1);
      navigate('/cart');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (formData.mobileNumber.length < 10) {
      setMessage({ type: 'error', text: 'Please enter a valid mobile number' });
      setLoading(false);
      return;
    }

    try {
      const updatedData = {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`.trim()
      };
      const response = await api.auth.updateProfile(updatedData);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      setFormData(prev => ({ ...prev, password: '' }));
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditFields({ personal: false, email: false, mobile: false });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
        const data = await response.json();
        
        if (data.address) {
          const addr = data.address;
          setAddressForm(prev => ({
            ...prev,
            streetAddress: addr.road || addr.suburb || '',
            locality: addr.neighbourhood || addr.suburb || '',
            city: addr.city || addr.town || addr.village || '',
            pinCode: addr.postcode || '',
            state: addr.state || ''
          }));
        }
      } catch (err) {
        console.error("Reverse geocoding error:", err);
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error("Geolocation error:", error);
      setLoading(false);
      showToast('Unable to retrieve your location', 'error');
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const SidebarItem = ({ id, label, icon }: { id: Section; label: string; icon: React.ReactNode }) => (
    <button 
      onClick={() => {
        setActiveSection(id);
        setMobileMenuOpen(false);
      }}
      className={`w-full flex items-center justify-between px-5 py-4 transition-all ${
        activeSection === id ? 'bg-gray-50 text-gray-900 border-l-2 border-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={activeSection === id ? 'text-gray-800' : 'text-gray-500'}>
          {icon}
        </span>
        <span className="text-base font-medium">{label}</span>
      </div>
      {activeSection === id && <ChevronRight size={16} className="text-gray-500" />}
    </button>
  );

  if (!user) return null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900">My Account</h1>
            <div className="w-16 h-px bg-gray-300 mt-2" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden mb-5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full bg-gray-900 p-5 flex items-center justify-between rounded-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">My Account</span>
                  <p className="text-lg font-semibold text-white">{user.fullName?.split(' ')[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 uppercase">
                  {mobileMenuOpen ? 'Close' : 'Menu'}
                </span>
                {mobileMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
              </div>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar */}
            <AnimatePresence>
              {(mobileMenuOpen || windowWidth >= 768) && (
                <motion.div 
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed md:relative inset-0 md:inset-auto z-50 md:z-auto w-[300px] md:w-80 bg-white md:bg-transparent shadow-xl md:shadow-none overflow-y-auto md:overflow-visible rounded-r-sm md:rounded-none"
                >
                  {/* Mobile Sidebar Header */}
                  <div className="md:hidden bg-gray-900 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center">
                        <User size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Welcome back,</p>
                        <p className="text-lg font-semibold text-white">{user.fullName}</p>
                      </div>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                      <X size={22} className="text-white" />
                    </button>
                  </div>

                  {/* Desktop User Info */}
                  <div className="hidden md:block bg-white border border-gray-100 p-6 mb-5 rounded-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                        <User size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hello,</p>
                        <p className="text-lg font-semibold text-gray-900">{user.fullName}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <div className="bg-white border border-gray-100 rounded-sm">
                    <SidebarItem id="profile" label="Profile" icon={<User size={18} />} />
                    <SidebarItem id="orders" label="Orders" icon={<Package size={18} />} />
                    <SidebarItem id="addresses" label="Addresses" icon={<MapPin size={18} />} />
                    <SidebarItem id="wishlist" label="Wishlist" icon={<Heart size={18} />} />
                    <SidebarItem id="coupons" label="Coupons" icon={<Ticket size={18} />} />
                    <SidebarItem id="notifications" label="Notifications" icon={<Bell size={18} />} />
                  </div>

                  {/* Logout Button */}
                  <button 
                    onClick={handleLogout}
                    className="mt-5 w-full bg-white border border-gray-100 p-5 text-left text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-3 rounded-sm"
                  >
                    <LogOut size={18} />
                    <span className="text-base font-medium">Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Overlay for mobile */}
            {mobileMenuOpen && windowWidth < 768 && (
              <div 
                className="fixed inset-0 bg-black/60 z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}

            {/* Main Content */}
            <div className="flex-1 bg-white border border-gray-100 p-6 md:p-8 min-h-[600px] rounded-sm">
              <AnimatePresence mode="wait">
                {/* Profile Section */}
                {activeSection === 'profile' && (
                  <motion.div 
                    key="profile" 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-light text-gray-900 mb-2">Personal Information</h2>
                      <div className="w-16 h-px bg-gray-200" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2 font-medium">First Name</label>
                        <input 
                          type="text" 
                          disabled={!editFields.personal}
                          value={formData.firstName} 
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={`w-full px-4 py-3 border text-base transition-all rounded-sm ${
                            editFields.personal 
                              ? 'border-gray-300 focus:border-gray-700 focus:outline-none' 
                              : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-700'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2 font-medium">Last Name</label>
                        <input 
                          type="text" 
                          disabled={!editFields.personal}
                          value={formData.lastName} 
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={`w-full px-4 py-3 border text-base transition-all rounded-sm ${
                            editFields.personal 
                              ? 'border-gray-300 focus:border-gray-700 focus:outline-none' 
                              : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-700'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2 font-medium">Gender</label>
                      <div className="flex gap-8">
                        {['Male', 'Female'].map((g) => (
                          <label key={g} className="flex items-center gap-2 cursor-pointer">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              formData.gender === g ? 'border-gray-800' : 'border-gray-300'
                            }`}>
                              {formData.gender === g && <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />}
                            </div>
                            <input type="radio" className="hidden" disabled={!editFields.personal} name="gender" value={g}
                              checked={formData.gender === g} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
                            <span className={`text-base ${editFields.personal ? 'text-gray-800' : 'text-gray-500'}`}>{g}</span>
                          </label>
                        ))}
                      </div>
                      {!editFields.personal && (
                        <button 
                          onClick={() => setEditFields({ ...editFields, personal: true })}
                          className="text-sm text-gray-500 hover:text-gray-800 mt-3 font-medium"
                        >
                          Edit Personal Info
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2 font-medium">Email Address</label>
                      <input 
                        type="email" 
                        disabled={!editFields.email}
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 border text-base transition-all rounded-sm ${
                          editFields.email 
                            ? 'border-gray-300 focus:border-gray-700 focus:outline-none' 
                            : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-700'
                        }`}
                      />
                      {!editFields.email && (
                        <button 
                          onClick={() => setEditFields({ ...editFields, email: true })}
                          className="text-sm text-gray-500 hover:text-gray-800 mt-3 font-medium"
                        >
                          Edit Email
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2 font-medium">Mobile Number</label>
                      <input 
                        type="tel"
                        value={formData.mobileNumber} 
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none rounded-sm"
                        placeholder="Enter mobile number"
                        disabled={!editFields.mobile}
                      />
                      {!editFields.mobile && (
                        <button 
                          onClick={() => setEditFields({ ...editFields, mobile: true })}
                          className="text-sm text-gray-500 hover:text-gray-800 mt-3 font-medium"
                        >
                          Edit Mobile
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2 font-medium">Change Password (Optional)</label>
                      <input 
                        type="password" 
                        value={formData.password} 
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none rounded-sm"
                        placeholder="Enter new password"
                      />
                      <p className="text-xs text-gray-400 mt-1">Leave blank to keep current password</p>
                    </div>

                    {(editFields.personal || editFields.email || editFields.mobile) && (
                      <div className="flex gap-4 pt-4">
                        <button 
                          onClick={handleUpdate} 
                          disabled={loading} 
                          className="px-8 py-3 bg-gray-900 text-white text-base font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 rounded-sm"
                        >
                          {loading ? 'SAVING...' : 'SAVE CHANGES'}
                        </button>
                        <button 
                          onClick={() => setEditFields({ personal: false, email: false, mobile: false })}
                          className="px-8 py-3 border border-gray-300 text-gray-700 text-base font-medium hover:border-gray-700 transition-all rounded-sm"
                        >
                          CANCEL
                        </button>
                      </div>
                    )}

                    {message.text && (
                      <div className={`p-4 text-base flex items-center gap-2 rounded-sm ${
                        message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'
                      }`}>
                        {message.type === 'success' ? <CheckCircle size={18} /> : <HelpCircle size={18} />}
                        {message.text}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Orders Section */}
                {activeSection === 'orders' && (
                  <motion.div 
                    key="orders" 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="mb-6">
                      <h2 className="text-2xl font-light text-gray-900 mb-2">My Orders</h2>
                      <div className="w-16 h-px bg-gray-200" />
                    </div>

                    {loadingOrders ? (
                      <div className="flex justify-center py-16">
                        <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-5">
                        {orders.map((order) => (
                          <div
                            key={order._id}
                            onClick={() => navigate(`/orders/${order._id}`)}
                            className="border border-gray-200 p-6 hover:border-gray-300 transition-all cursor-pointer group rounded-sm"
                          >
                            <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Order ID</p>
                                <p className="text-sm text-gray-700 font-mono font-medium">{order._id?.slice(-12)}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`text-xs font-semibold uppercase px-3 py-1 rounded-sm ${
                                  order.status === 'delivered' ? 'bg-green-50 text-green-700' :
                                  order.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {order.status}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-3">
                              {order.items?.slice(0, 2).map((item: any) => (
                                <div key={item.productId} className="flex justify-between">
                                  <div>
                                    <p className="text-base text-gray-800 font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="text-base font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                                </div>
                              ))}
                              {order.items?.length > 2 && (
                                <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
                              )}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                              <p className="text-base text-gray-600 font-medium">Total Amount</p>
                              <div className="flex items-center gap-3">
                                <p className="text-xl font-bold text-gray-900">₹{order.totalAmount}</p>
                                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600 transition-all" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-sm">
                        <Package size={48} className="mx-auto text-gray-300 mb-4" strokeWidth={1} />
                        <p className="text-gray-600 text-lg mb-4">No orders placed yet</p>
                        <button onClick={() => navigate('/happy-shop')}
                          className="px-8 py-3 border border-gray-300 text-gray-700 text-base font-medium hover:border-gray-800 hover:text-gray-900 transition-all rounded-sm">
                          START SHOPPING
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Addresses Section */}
                {activeSection === 'addresses' && (
                  <motion.div 
                    key="addresses" 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-light text-gray-900 mb-2">Saved Addresses</h2>
                        <div className="w-16 h-px bg-gray-200" />
                      </div>
                      {!isAddingAddress && (
                        <button 
                          onClick={() => setIsAddingAddress(true)} 
                          className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 px-4 py-2 transition-all font-medium rounded-sm"
                        >
                          + ADD NEW
                        </button>
                      )}
                    </div>

                    {isAddingAddress && (
                      <div className="border border-gray-200 p-6 space-y-5 rounded-sm">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-800">Add New Address</h3>
                          <button onClick={handleGetCurrentLocation} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 font-medium">
                            <Navigation size={14} /> Use my location
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <input type="text" className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none rounded-sm"
                            placeholder="Full Name" value={addressForm.name} onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} />
                          <input type="tel" className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none rounded-sm"
                            placeholder="Mobile Number" value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} />
                          <select className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none rounded-sm bg-white"
                            value={addressForm.country} onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value, state: '' })}>
                            <option value="">Select Country</option>
                            {countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                          </select>
                          <select className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none rounded-sm bg-white"
                            value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}>
                            <option value="">Select State</option>
                            {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                          </select>
                          <input type="text" className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none rounded-sm"
                            placeholder="Pincode" value={addressForm.pinCode} onChange={(e) => setAddressForm({ ...addressForm, pinCode: e.target.value })} />
                          <input type="text" className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none rounded-sm"
                            placeholder="Locality" value={addressForm.locality} onChange={(e) => setAddressForm({ ...addressForm, locality: e.target.value })} />
                        </div>

                        <textarea className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none min-h-[100px] rounded-sm"
                          placeholder="Street Address, House No, Building Name..." value={addressForm.streetAddress} onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <input type="text" className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none rounded-sm"
                            placeholder="City" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} />
                          <input type="text" className="w-full px-4 py-3 border border-gray-300 text-base focus:border-gray-700 focus:outline-none rounded-sm"
                            placeholder="Landmark (Optional)" value={addressForm.landmark} onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })} />
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-6">
                            {(['Home', 'Work'] as const).map((t) => (
                              <label key={t} className="flex items-center gap-2 cursor-pointer">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                  addressForm.type === t ? 'border-gray-800' : 'border-gray-300'
                                }`}>
                                  {addressForm.type === t && <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />}
                                </div>
                                <input type="radio" className="hidden" name="addressType" value={t} 
                                  checked={addressForm.type === t} onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value as 'Home' | 'Work' })} />
                                <span className="text-base text-gray-700 font-medium">{t}</span>
                              </label>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            <button onClick={() => setIsAddingAddress(false)} className="px-6 py-2 text-base text-gray-600 hover:text-gray-900 font-medium">Cancel</button>
                            <button onClick={async () => {
                                if (addressForm.phone.length < 10) {
                                  showToast('Please enter a valid phone number', 'error');
                                  return;
                                }
                                try {
                                  setLoading(true);
                                  const resp = await api.addresses.create(addressForm);
                                  if (resp.address) {
                                    setSavedAddresses(prev => [...prev, resp.address]);
                                    setIsAddingAddress(false);
                                    setAddressForm(prev => ({ ...prev, phone: '', pinCode: '', locality: '', streetAddress: '', city: '', state: '', landmark: '', alternatePhone: '', type: 'Home' }));
                                  }
                                } catch (error) { console.error(error); } finally { setLoading(false); }
                              }} className="px-6 py-2 bg-gray-900 text-white text-base font-semibold hover:bg-gray-800 transition-all rounded-sm">
                              SAVE
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {savedAddresses.map((addr, i) => (
                        <div key={addr._id || i} className="border border-gray-200 p-5 hover:border-gray-300 transition-all rounded-sm">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-xs font-semibold text-gray-600 uppercase bg-gray-100 px-3 py-1 rounded-sm">
                              {addr.type}
                            </span>
                          </div>
                          <p className="font-semibold text-gray-900 text-base mb-1">{addr.name}</p>
                          <p className="text-gray-600 text-sm mb-2">{addr.phone}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {addr.streetAddress}, {addr.locality}, {addr.city}, {addr.state} - {addr.pinCode}
                          </p>
                        </div>
                      ))}
                    </div>

                    {!isAddingAddress && savedAddresses.length === 0 && (
                      <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-sm">
                        <MapPin size={48} className="mx-auto text-gray-300 mb-4" strokeWidth={1} />
                        <p className="text-gray-600 text-lg">No saved addresses</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Wishlist Section */}
                {activeSection === 'wishlist' && (
                  <motion.div 
                    key="wishlist" 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="mb-6">
                      <h2 className="text-2xl font-light text-gray-900 mb-2">My Wishlist ({wishlistItems.length})</h2>
                      <div className="w-16 h-px bg-gray-200" />
                    </div>

                    {loadingWishlist ? (
                      <div className="flex justify-center py-16">
                        <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                      </div>
                    ) : wishlistItems.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => (
                          <div key={item._id} className="border border-gray-200 p-4 hover:border-gray-300 transition-all group relative rounded-sm">
                            <button 
                              onClick={() => handleRemoveFromWishlist(item._id)}
                              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-600 transition-all z-10 bg-white rounded-full"
                            >
                              <Trash2 size={16} />
                            </button>
                            
                            <div className="cursor-pointer" onClick={() => navigate(`/product/${item.slug || item._id}`)}>
                              <div className="aspect-square bg-gray-50 mb-4 overflow-hidden">
                                <img src={item.images?.[0] || '/images/placeholder.png'} alt={item.title || 'Product'} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                  onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }} />
                              </div>
                              <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                              <p className="text-xl font-bold text-gray-900 mb-4">₹{item.price || 0}</p>
                            </div>

                            <button onClick={() => handleAddToCartFromWishlist(item._id)}
                              className="w-full py-3 border border-gray-300 text-gray-700 text-base font-medium hover:border-gray-800 hover:text-gray-900 transition-all rounded-sm">
                              ADD TO CART
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-sm">
                        <Heart size={48} className="mx-auto text-gray-300 mb-4" strokeWidth={1} />
                        <p className="text-gray-600 text-lg mb-4">Your wishlist is empty</p>
                        <button onClick={() => navigate('/happy-shop')}
                          className="px-8 py-3 border border-gray-300 text-gray-700 text-base font-medium hover:border-gray-800 hover:text-gray-900 transition-all rounded-sm">
                          EXPLORE PRODUCTS
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Placeholder for other sections */}
                {!['profile', 'orders', 'addresses', 'wishlist'].includes(activeSection) && (
                  <motion.div 
                    key="placeholder" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <Gift size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-light text-gray-700 capitalize mb-2">{activeSection.replace('-', ' ')}</h3>
                    <p className="text-gray-500 text-base">Coming soon</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};