import React, { useState, useEffect, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { 
  User, MapPin, CreditCard, 
  Package, Heart, Ticket, Bell, 
  Smartphone, ChevronRight, 
  CheckCircle, HelpCircle, UserCheck, Gift,
  Navigation, Trash2, ShoppingCart
} from 'lucide-react';
import { Country, State } from 'country-state-city';
import PhoneInputModule from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInput = (PhoneInputModule as any).default || PhoneInputModule;

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('profile');
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobileNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editFields, setEditFields] = useState({
    personal: false,
    email: false,
    mobile: false
  });
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [addressForm, setAddressForm] = useState({
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
    type: 'Home' as 'Home' | 'Work',
    email: ''
  });
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(addressForm.country);

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
      console.log('Wishlist response:', resp);
      setWishlistItems(resp.wishlist?.productIds || []);
    } catch (err) {
      console.error('Wishlist fetch error:', err);
    } finally {
      setLoadingWishlist(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData({
        firstName: parsed.firstName || parsed.fullName?.split(' ')[0] || '',
        lastName: parsed.lastName || parsed.fullName?.split(' ').slice(1).join(' ') || '',
        gender: parsed.gender || '',
        email: parsed.email || '',
        mobileNumber: parsed.mobileNumber || ''
      });
      setAddressForm(prev => ({ ...prev, email: parsed.email, name: parsed.fullName }));
      fetchAddresses();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (activeSection === 'wishlist') {
      fetchWishlist();
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

    try {
      const updatedData = {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`.trim()
      };
      const response = await api.auth.updateProfile(updatedData);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
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
      alert("Geolocation is not supported by your browser");
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
      alert("Unable to retrieve your location");
    });
  };

  const SidebarItem = ({ id, label, icon, groupEnd = false }: { id: Section, label: string, icon: React.ReactNode, groupEnd?: boolean }) => (
    <button 
      onClick={() => setActiveSection(id)}
      className={`w-full flex items-center justify-between px-6 py-4 transition-all ${
        activeSection === id ? 'bg-orange-50/50 text-[#FA6011]' : 'text-gray-600 hover:bg-gray-50'
      } ${groupEnd ? 'border-b border-gray-100 mb-2' : ''}`}
    >
      <div className="flex items-center gap-4">
        <span className={activeSection === id ? 'text-[#FA6011]' : 'text-[#FA6011]'}>
          {icon}
        </span>
        <span className={`text-[14px] font-bold tracking-tight uppercase ${activeSection === id ? 'font-black' : ''}`}>
          {label}
        </span>
      </div>
      {activeSection === id && <ChevronRight size={18} />}
    </button>
  );

  const GroupHeader = ({ label, icon }: { label: string, icon: React.ReactNode }) => (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
      <span className="text-[#FA6011]">{icon}</span>
      <span className="text-[14px] font-black text-gray-400 tracking-wider uppercase">{label}</span>
      <ChevronRight size={18} className="ml-auto text-gray-300" />
    </div>
  );

  if (!user) return null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen pt-32 pb-20 bg-[#f1f3f6]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-4 h-full">
          
          <div className="w-full md:w-[300px] flex flex-col gap-4">
            <div className="bg-white p-4 flex items-center gap-4 shadow-sm border border-gray-200/50 rounded-sm">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/images/avatar-placeholder.png" alt="Avatar" className="w-full h-full object-cover" onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/147/147144.png";
                }} />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] text-gray-500 font-medium">Hello,</span>
                <span className="text-base font-black text-gray-900 leading-tight">
                  {user.fullName}
                </span>
              </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200/50 rounded-sm overflow-hidden flex flex-col">
              <SidebarItem id="orders" label="MY ORDERS" icon={<Package size={20} />} groupEnd />
              
              <GroupHeader label="ACCOUNT SETTINGS" icon={<User size={20} />} />
              <SidebarItem id="profile" label="Profile Information" icon={<UserCheck size={18} className="invisible" />} />
              <SidebarItem id="addresses" label="Manage Addresses" icon={<MapPin size={18} className="invisible" />} />
              <div className="px-6 py-4 border-b border-gray-100 text-[14px] font-bold text-gray-500 uppercase cursor-pointer hover:bg-gray-50">
                PAN Card Information
              </div>

              <GroupHeader label="PAYMENTS" icon={<CreditCard size={20} />} />
              <div className="flex items-center justify-between px-6 py-4 text-gray-600 hover:bg-gray-50 cursor-pointer">
                <span className="text-[14px] font-bold uppercase">Gift Cards</span>
                <span className="text-[#FD6804] font-black">₹0</span>
              </div>
              <SidebarItem id="upi" label="Saved UPI" icon={<Smartphone size={18} className="invisible" />} />
              <SidebarItem id="cards" label="Saved Cards" icon={<CreditCard size={18} className="invisible" />} groupEnd />

              <GroupHeader label="MY STUFF" icon={<Package size={20} />} />
              <SidebarItem id="wishlist" label="My Wishlist" icon={<Heart size={18} className="invisible" />} />
              <SidebarItem id="coupons" label="My Coupons" icon={<Ticket size={18} className="invisible" />} />
              <SidebarItem id="notifications" label="All Notifications" icon={<Bell size={18} className="invisible" />} />
              <SidebarItem id="gift-cards" label="Gift Cards" icon={<Gift size={18} className="invisible" />} />
            </div>

            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
              className="mt-2 bg-white p-4 text-left font-black text-gray-600 shadow-sm border border-gray-200/50 rounded-sm hover:bg-gray-50 flex items-center gap-4"
            >
              <User size={20} className="text-[#FA6011]" />
              LOGOUT
            </button>
          </div>

          <div className="flex-1 bg-white shadow-sm border border-gray-200/50 p-6 md:p-8 rounded-sm overflow-hidden min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeSection === 'profile' && (
                <motion.div 
                   key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-black text-gray-900">Personal Information</h2>
                      <button onClick={() => setEditFields({ ...editFields, personal: !editFields.personal })} className="text-[#FA6011] font-black text-sm hover:underline">
                        {editFields.personal ? 'Cancel' : 'Edit'}
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
                      <div className="flex-1 space-y-2">
                        <input type="text" disabled={!editFields.personal} value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={`w-full p-4 border rounded-[2px] focus:outline-none transition-all ${editFields.personal ? 'border-[#FA6011] bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
                          placeholder="First Name" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input type="text" disabled={!editFields.personal} value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={`w-full p-4 border rounded-[2px] focus:outline-none transition-all ${editFields.personal ? 'border-[#FA6011] bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
                          placeholder="Last Name" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-bold text-gray-700">Your Gender</p>
                      <div className="flex gap-8">
                        {['Male', 'Female'].map((g) => (
                          <label key={g} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              formData.gender === g ? 'border-[#FA6011]' : 'border-gray-300'
                            }`}>
                              {formData.gender === g && <div className="w-2.5 h-2.5 rounded-full bg-[#FA6011]" />}
                            </div>
                            <input 
                              type="radio"
                              className="hidden"
                              disabled={!editFields.personal}
                              name="gender"
                              value={g}
                              checked={formData.gender === g}
                              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            />
                            <span className={`font-medium ${editFields.personal ? 'text-gray-700' : 'text-gray-400'}`}>{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-black text-gray-900">Email Address</h2>
                      <button onClick={() => setEditFields({ ...editFields, email: !editFields.email })} className="text-[#FA6011] font-black text-sm hover:underline">
                        {editFields.email ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                    <div className="max-w-md">
                      <input type="email" disabled={!editFields.email} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full p-4 border rounded-[2px] focus:outline-none transition-all ${editFields.email ? 'border-[#FA6011] bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
                        placeholder="Email Address" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-black text-gray-900">Mobile Number</h2>
                      <button onClick={() => setEditFields({ ...editFields, mobile: !editFields.mobile })} className="text-[#FA6011] font-black text-sm hover:underline">
                        {editFields.mobile ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                    <div className="max-w-md">
                      <input type="text" disabled={!editFields.mobile} value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        className={`w-full p-4 border rounded-[2px] focus:outline-none transition-all ${editFields.mobile ? 'border-[#FA6011] bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
                        placeholder="Mobile Number" />
                    </div>
                  </div>

                  <div className="pt-10 border-t border-gray-100">
                    <h2 className="text-lg font-black text-gray-900 mb-6">FAQs</h2>
                    <div className="space-y-4">
                      <p className="font-bold text-gray-700 flex items-center gap-2">
                        <HelpCircle size={18} className="text-gray-400" />
                        What happens when I update my email address (or mobile number)?
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        Your login email id (or mobile number) changes, likewise. You'll receive all your future order details and communications on your new email id (or mobile number).
                      </p>
                    </div>
                  </div>

                  {(editFields.personal || editFields.email || editFields.mobile) && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6">
                      <button onClick={handleUpdate} disabled={loading} className="bg-[#FA6011] text-white px-12 py-4 font-black rounded-[2px] hover:brightness-110 shadow-lg shadow-orange-100 transition-all disabled:opacity-50 flex items-center gap-3">
                        {loading ? 'SAVING...' : 'SAVE CHANGES'}
                      </button>
                    </motion.div>
                  )}

                  {message.text && (
                    <div className={`p-4 rounded-[2px] font-bold text-sm flex items-center gap-3 ${
                      message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                    }`}>
                      {message.type === 'success' ? <CheckCircle size={18} /> : <HelpCircle size={18} />}
                      {message.text}
                    </div>
                  )}
                </motion.div>
              )}

              {activeSection === 'addresses' && (
                <motion.div key="addresses" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-gray-900 uppercase">Manage Addresses</h2>
                    {!isAddingAddress && (
                      <button onClick={() => setIsAddingAddress(true)} className="flex items-center gap-2 text-[#F95F11] font-black text-sm border border-gray-200 px-4 py-2 hover:bg-gray-50 rounded-sm">
                        + ADD A NEW ADDRESS
                      </button>
                    )}
                  </div>

                  {isAddingAddress && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="bg-[#fcfdff] p-6 md:p-10 rounded-2xl space-y-10 border border-blue-50 shadow-sm overflow-hidden">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                        <h3 className="text-[#F95F11] font-black text-lg uppercase tracking-wider">ADD A NEW ADDRESS</h3>
                        <button onClick={handleGetCurrentLocation} className="bg-[#F95F11]/10 text-[#F95F11] px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#F95F11]/20 transition-all border border-[#F95F11]/20">
                          <Navigation size={16} />
                          Use my current location
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                          <input type="text" className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#F95F11]/30 focus:bg-white outline-none transition-all font-bold text-gray-700"
                            placeholder="John Doe" value={addressForm.name} onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
                          <PhoneInput country={'in'} value={addressForm.phone} onChange={phone => setAddressForm({ ...addressForm, phone })}
                            inputClass="!w-full !h-14 !bg-gray-50 !border-0 !rounded-2xl !pl-14 !font-bold !text-gray-700 focus:!ring-2 focus:!ring-[#F95F11]/30 focus:!bg-white outline-none transition-all"
                            buttonClass="!bg-transparent !border-0 !rounded-l-2xl !pl-4" containerClass="!h-14" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Country</label>
                          <select className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#F95F11]/30 focus:bg-white outline-none transition-all font-bold text-gray-700 appearance-none cursor-pointer"
                            value={addressForm.country} onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value, state: '' })}>
                            {countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">State</label>
                          <select className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#F95F11]/30 focus:bg-white outline-none transition-all font-bold text-gray-700 appearance-none cursor-pointer"
                            value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}>
                            <option value="">Select State</option>
                            {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Pincode</label>
                          <input type="text" className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#F95F11]/30 focus:bg-white outline-none transition-all font-bold text-gray-700"
                            placeholder="6-digit Pincode" value={addressForm.pinCode} onChange={(e) => setAddressForm({ ...addressForm, pinCode: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Locality</label>
                          <input type="text" className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#F95F11]/30 focus:bg-white outline-none transition-all font-bold text-gray-700"
                            placeholder="Locality / Area" value={addressForm.locality} onChange={(e) => setAddressForm({ ...addressForm, locality: e.target.value })} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Address Detail</label>
                        <textarea className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#F95F11]/30 focus:bg-white outline-none transition-all font-bold text-gray-700 min-h-[120px]"
                          placeholder="House No, Building Name, Street Name..." value={addressForm.streetAddress} onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">City / Town</label>
                          <input type="text" className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#F95F11]/30 focus:bg-white outline-none transition-all font-bold text-gray-700"
                            placeholder="City" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Landmark (Optional)</label>
                          <input type="text" className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#F95F11]/30 focus:bg-white outline-none transition-all font-bold text-gray-700"
                            placeholder="Near..." value={addressForm.landmark} onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })} />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-center gap-10 pt-4">
                        <div className="space-y-4">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Address Type</p>
                          <div className="flex gap-10">
                            {(['Home', 'Work'] as const).map((t) => (
                              <label key={t} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${addressForm.type === t ? 'border-[#F95F11]' : 'border-gray-200'}`}>
                                  {addressForm.type === t && <div className="w-3 h-3 rounded-full bg-[#F95F11]" />}
                                </div>
                                <input type="radio" className="hidden" name="addressType" value={t} checked={addressForm.type === t} onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value as any })} />
                                <span className="text-sm font-black text-gray-600 uppercase tracking-widest">{t}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-8 md:ml-auto">
                          <button onClick={async () => {
                              try {
                                setLoading(true);
                                const resp = await api.addresses.create(addressForm);
                                if (resp.address) {
                                  setSavedAddresses(prev => [...prev, resp.address]);
                                  setIsAddingAddress(false);
                                  setAddressForm(prev => ({ ...prev, phone: '', pinCode: '', locality: '', streetAddress: '', city: '', state: '', landmark: '', alternatePhone: '', type: 'Home' }));
                                }
                              } catch (error) { console.error(error); } finally { setLoading(false); }
                            }} className="bg-[#F95F11] text-white px-12 py-4 rounded-2xl font-black tracking-widest text-sm shadow-[0_10px_30px_rgba(249,95,17,0.3)] hover:brightness-110 active:scale-95 transition-all uppercase">
                            SAVE ADDRESS
                          </button>
                          <button onClick={() => setIsAddingAddress(false)} className="text-gray-400 font-black text-sm hover:text-[#F95F11] tracking-widest uppercase transition-colors">
                            CANCEL
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedAddresses.map((addr: any, i: number) => (
                      <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl relative group hover:border-[#F95F11]/30 transition-all shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                          <span className="px-3 py-1.5 bg-[#F95F11]/5 text-[#F95F11] text-[10px] font-black rounded-lg uppercase tracking-widest border border-[#F95F11]/10">
                            {addr.type}
                          </span>
                        </div>
                        <p className="font-black text-gray-900 text-lg mb-3 tracking-tight">{addr.name}</p>
                        <p className="text-[#F95F11] font-black mb-4 tracking-wider">{addr.phone}</p>
                        <p className="text-sm text-gray-500 leading-relaxed font-bold tracking-tight">
                          {addr.streetAddress}, {addr.locality}, {addr.city}, {addr.state} - <span className="text-gray-900">{addr.pinCode}</span>
                        </p>
                      </div>
                    ))}
                  </div>

                  {!isAddingAddress && savedAddresses.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                        <MapPin size={40} className="text-gray-200" />
                      </div>
                      <p className="text-gray-300 font-black uppercase tracking-widest text-sm">You haven't saved any addresses yet</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeSection === 'wishlist' && (
                <motion.div key="wishlist" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-gray-900 uppercase">My Wishlist ({wishlistItems.length})</h2>
                  </div>

                  {loadingWishlist ? (
                    <div className="flex justify-center items-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA6011]" />
                    </div>
                  ) : wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item._id} className="bg-white border border-gray-100 rounded-3xl p-4 relative group hover:shadow-xl transition-all h-full flex flex-col">
                          <button 
                            onClick={() => handleRemoveFromWishlist(item._id)}
                            className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all z-10"
                          >
                            <Trash2 size={18} />
                          </button>
                          
                          <div 
                            className="cursor-pointer flex-1"
                            onClick={() => navigate(`/product/${item.slug || item._id}`)}
                          >
                            <div className="aspect-[1/1] bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-100">
                              <img 
                                src={item.images?.[0] || '/images/avatar-placeholder.png'} 
                                alt={item.title || 'Product'} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                onError={(e) => { (e.target as HTMLImageElement).src = '/images/avatar-placeholder.png'; }}
                              />
                            </div>
                            <h3 className="text-sm font-black text-gray-900 line-clamp-2 mb-2 uppercase tracking-tight min-h-[2.5rem]">
                              {item.title}
                            </h3>
                            <p className="text-[#FA6011] font-black text-lg mb-4">
                              ₹{item.price}.00
                            </p>
                          </div>

                          <button 
                            onClick={() => handleAddToCartFromWishlist(item._id)}
                            className="w-full bg-[#FA6011] text-white font-black py-3 rounded-xl shadow-lg shadow-orange-100 flex items-center justify-center gap-2 tracking-widest text-[12px] uppercase group-hover:brightness-110 transition-all"
                          >
                            <ShoppingCart size={16} />
                            Add to Bag
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                      <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8">
                        <Heart size={40} className="text-[#FA6011]" />
                      </div>
                      <p className="text-gray-300 font-black uppercase tracking-widest text-sm mb-6">Your wishlist is empty</p>
                      <button 
                        onClick={() => navigate('/happy-shop')}
                        className="bg-[#FA6011] text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-orange-100"
                      >
                        Explore Products
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Other sections */}
              {!['profile', 'addresses', 'wishlist'].includes(activeSection) && (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
                    <Smartphone size={40} className="text-[#FA6011]" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase">{activeSection.replace('-', ' ')}</h3>
                  <p className="text-gray-400 font-bold">This section is coming soon. Stay tuned!</p>
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
