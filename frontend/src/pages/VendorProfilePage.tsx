import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Smartphone, Truck, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import PhoneInputModule from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ProfileDropdown } from '../components/Dashboard/ProfileDropdown';

const PhoneInput = (PhoneInputModule as any).default || PhoneInputModule;

const API = 'http://localhost:5000/api';

export const VendorProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData({
        fullName: parsed.fullName || '',
        email: parsed.email || '',
        mobileNumber: parsed.mobileNumber || '',
        password: ''
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    if (formData.mobileNumber.length < 10) {
      setMessage({ type: 'error', text: 'Please enter a valid mobile number' });
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setFormData(prev => ({ ...prev, password: '' }));
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans pb-12">
      <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/">
            <img src="/images/logo.png" alt="Happy Food Company" className="h-[50px] object-contain drop-shadow-sm transition-transform hover:scale-105" />
          </Link>
          <ProfileDropdown user={user} onLogout={handleLogout} dashboardType="vendor" />
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => navigate('/vendor/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-[#FA6011] transition-colors font-bold text-sm">
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-10 text-white relative">
            <div className="relative z-10">
              <h1 className="text-3xl font-black tracking-tight mb-2">Vendor Profile</h1>
              <p className="text-orange-100 font-bold text-sm">Partner Management & Fulfillment Control Center</p>
            </div>
            <Truck size={120} className="absolute right-10 top-1/2 -translate-y-1/2 text-white/10" />
          </div>

          <div className="p-10">
            {message && (
              <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
                message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
              }`}>
                {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <p className="font-black text-sm">{message.text}</p>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <User size={12} className="text-[#FA6011]" /> Full Name
                  </label>
                  <input 
                    required
                    type="text" 
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Enter owner name" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:bg-white focus:border-orange-200 transition-all outline-none font-bold text-slate-700" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Mail size={12} className="text-[#FA6011]" /> Business Email
                  </label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="vendor@company.com" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:bg-white focus:border-orange-200 transition-all outline-none font-bold text-slate-700" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Smartphone size={12} className="text-[#FA6011]" /> Mobile Number
                  </label>
                  <PhoneInput 
                    country={'in'}
                    value={formData.mobileNumber}
                    onChange={(phone: string) => setFormData({...formData, mobileNumber: phone})}
                    inputClass="!w-full !p-4 !bg-gray-50 !border !border-gray-100 !rounded-2xl focus:!ring-4 focus:!ring-orange-100 focus:!bg-white focus:!border-orange-200 !transition-all !outline-none !font-bold !text-slate-700 !h-14"
                    buttonClass="!bg-transparent !border-0 !rounded-l-2xl !pl-3"
                    containerClass="!w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <AlertCircle size={12} className="text-[#FA6011]" /> New Password (Optional)
                  </label>
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="Leave blank to keep current" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:bg-white focus:border-orange-200 transition-all outline-none font-bold text-slate-700" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Truck size={12} className="text-[#FA6011]" /> Verification Status
                  </label>
                  <div className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-green-500 uppercase tracking-widest text-xs flex items-center gap-2 cursor-not-allowed">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Verified Partner Network
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 shadow-xl shadow-orange-100 transition-all disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200">
            <h3 className="font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
              <Truck size={20} className="text-orange-500" /> Fulfillment
            </h3>
            <p className="text-gray-400 font-bold text-xs leading-relaxed">
              Your business email and mobile number are used to send order alerts and coordination updates. Keep them current to avoid missed orders.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200">
            <h3 className="font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" /> Compliance
            </h3>
            <p className="text-gray-400 font-bold text-xs leading-relaxed">
              As a verified partner, your profile information must match your business registration documents for tax and payout purposes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
