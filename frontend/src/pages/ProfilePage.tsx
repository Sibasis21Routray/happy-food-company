import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { 
  User, MapPin, CreditCard, 
  Package, Heart, Ticket, Bell, 
  Smartphone, ChevronRight, 
  CheckCircle, HelpCircle, UserCheck
} from 'lucide-react';

type Section = 'profile' | 'addresses' | 'orders' | 'gift-cards' | 'upi' | 'cards' | 'wishlist' | 'coupons' | 'notifications';

export const ProfilePage: React.FC = () => {
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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        firstName: parsedUser.firstName || parsedUser.fullName?.split(' ')[0] || '',
        lastName: parsedUser.lastName || parsedUser.fullName?.split(' ').slice(1).join(' ') || '',
        gender: parsedUser.gender || '',
        email: parsedUser.email || '',
        mobileNumber: parsedUser.mobileNumber || ''
      });
    }
  }, []);

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
    <div className="min-h-screen pt-32 pb-20 bg-[#f1f3f6]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-4 h-full">
          
          {/* LEFT SIDEBAR */}
          <div className="w-full md:w-[300px] flex flex-col gap-4">
            {/* Profile Header */}
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

            {/* Navigation Menu */}
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

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 bg-white shadow-sm border border-gray-200/50 p-6 md:p-8 rounded-sm overflow-hidden min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeSection === 'profile' && (
                <motion.div 
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-black text-gray-900">Personal Information</h2>
                      <button 
                        onClick={() => setEditFields({ ...editFields, personal: !editFields.personal })}
                        className="text-[#FA6011] font-black text-sm hover:underline"
                      >
                        {editFields.personal ? 'Cancel' : 'Edit'}
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
                      <div className="flex-1 space-y-2">
                        <input 
                          type="text"
                          disabled={!editFields.personal}
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={`w-full p-4 border rounded-[2px] focus:outline-none transition-all ${
                            editFields.personal ? 'border-[#FA6011] bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                          }`}
                          placeholder="First Name"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input 
                          type="text"
                          disabled={!editFields.personal}
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={`w-full p-4 border rounded-[2px] focus:outline-none transition-all ${
                            editFields.personal ? 'border-[#FA6011] bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                          }`}
                          placeholder="Last Name"
                        />
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

                  {/* Email Address */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-black text-gray-900">Email Address</h2>
                      <button 
                        onClick={() => setEditFields({ ...editFields, email: !editFields.email })}
                        className="text-[#FA6011] font-black text-sm hover:underline"
                      >
                        {editFields.email ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                    <div className="max-w-md">
                      <input 
                        type="email"
                        disabled={!editFields.email}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full p-4 border rounded-[2px] focus:outline-none transition-all ${
                          editFields.email ? 'border-[#FA6011] bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                        }`}
                        placeholder="Email Address"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg font-black text-gray-900">Mobile Number</h2>
                      <button 
                        onClick={() => setEditFields({ ...editFields, mobile: !editFields.mobile })}
                        className="text-[#FA6011] font-black text-sm hover:underline"
                      >
                        {editFields.mobile ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                    <div className="max-w-md">
                      <input 
                        type="text"
                        disabled={!editFields.mobile}
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        className={`w-full p-4 border rounded-[2px] focus:outline-none transition-all ${
                          editFields.mobile ? 'border-[#FA6011] bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                        }`}
                        placeholder="Mobile Number"
                      />
                    </div>
                  </div>

                  {/* FAQs */}
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

                  {/* Final Save Button (Visible if any field is being edited) */}
                  {(editFields.personal || editFields.email || editFields.mobile) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-6"
                    >
                      <button 
                        onClick={handleUpdate}
                        disabled={loading}
                        className="bg-[#FA6011] text-white px-12 py-4 font-black rounded-[2px] hover:brightness-110 shadow-lg shadow-orange-100 transition-all disabled:opacity-50 flex items-center gap-3"
                      >
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
                <motion.div 
                  key="addresses"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-gray-900 uppercase">Manage Addresses</h2>
                    <button className="flex items-center gap-2 text-[#FA6011] font-black text-sm border border-gray-200 px-4 py-2 hover:bg-gray-50 rounded-sm">
                      + ADD A NEW ADDRESS
                    </button>
                  </div>
                  
                  {user.addresses && user.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map((addr: any, i: number) => (
                        <div key={i} className="p-6 border border-gray-100 rounded-sm relative group">
                          <p className="font-black text-gray-900 mb-2">{addr.name}</p>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <p className="mt-2 font-bold text-gray-900">{addr.phone}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <MapPin size={32} className="text-gray-300" />
                      </div>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No Addresses Saved Yet</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Other sections */}
              {!['profile', 'addresses'].includes(activeSection) && (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-6"
                >
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
  );
};
