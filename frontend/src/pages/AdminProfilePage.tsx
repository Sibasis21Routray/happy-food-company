import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Smartphone, Shield, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { ProfileDropdown } from '../components/Dashboard/ProfileDropdown';

const API = 'http://localhost:5000/api';

export const AdminProfilePage: React.FC = () => {
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
          <ProfileDropdown user={user} onLogout={handleLogout} dashboardType="admin" />
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-[#FA6011] transition-colors font-bold text-sm">
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-10 text-white relative">
            <div className="relative z-10">
              <h1 className="text-3xl font-black tracking-tight mb-2">Admin Profile</h1>
              <p className="text-slate-400 font-bold text-sm">Global Administrator & Platform Management Controls</p>
            </div>
            <Shield size={120} className="absolute right-10 top-1/2 -translate-y-1/2 text-white/5" />
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
                    placeholder="Enter your full name" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FA6011]/10 focus:bg-white focus:border-[#FA6011]/30 transition-all outline-none font-bold text-slate-700" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Mail size={12} className="text-[#FA6011]" /> Email Address
                  </label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FA6011]/10 focus:bg-white focus:border-[#FA6011]/30 transition-all outline-none font-bold text-slate-700" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Smartphone size={12} className="text-[#FA6011]" /> Mobile Number
                  </label>
                  <input 
                    required
                    type="text" 
                    value={formData.mobileNumber}
                    onChange={e => setFormData({...formData, mobileNumber: e.target.value})}
                    placeholder="+91 XXXXX XXXXX" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FA6011]/10 focus:bg-white focus:border-[#FA6011]/30 transition-all outline-none font-bold text-slate-700" 
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
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FA6011]/10 focus:bg-white focus:border-[#FA6011]/30 transition-all outline-none font-bold text-slate-700" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Shield size={12} className="text-[#FA6011]" /> Access Level
                  </label>
                  <div className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-[#FA6011] uppercase tracking-widest text-xs flex items-center gap-2 cursor-not-allowed">
                    <div className="w-2 h-2 bg-[#FA6011] rounded-full animate-pulse" />
                    Root Administrator (Master Access)
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-[#FA6011] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-95 shadow-xl shadow-orange-100 transition-all disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Core Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200">
            <h3 className="font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
              <Shield size={20} className="text-[#FA6011]" /> System Security
            </h3>
            <p className="text-gray-400 font-bold text-xs leading-relaxed">
              Your profile has master access to platform configuration, vendor payouts, and user data management. Please ensure your session is secure.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200">
            <h3 className="font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
              <Mail size={20} className="text-[#FA6011]" /> Notifications
            </h3>
            <p className="text-gray-400 font-bold text-xs leading-relaxed">
              System alerts will be sent to your registered email address regarding vendor applications, large order spikes, and security events.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
