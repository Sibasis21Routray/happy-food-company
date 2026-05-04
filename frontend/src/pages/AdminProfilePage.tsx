import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Smartphone, Shield, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import PhoneInputModule from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ProfileDropdown } from '../components/Dashboard/ProfileDropdown';

const PhoneInput = (PhoneInputModule as any).default || PhoneInputModule;

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
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/">
            <img src="/images/logo.png" alt="Happy Food Company" className="h-10 object-contain" />
          </Link>
          <ProfileDropdown user={user} onLogout={handleLogout} dashboardType="admin" />
        </div>
      </header>

      <main className="container mx-auto px-6 mt-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors text-sm font-light">
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Dashboard
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-100 p-6">
            <h1 className="text-xl font-light text-gray-800 mb-1">Admin Profile</h1>
            <p className="text-gray-400 text-sm font-light">Global Administrator & Platform Management Controls</p>
          </div>

          <div className="p-6 md:p-8">
            {/* Message */}
            {message && (
              <div className={`mb-6 p-3 flex items-center gap-2 text-sm ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
              }`}>
                {message.type === 'success' ? <CheckCircle size={14} strokeWidth={1.5} /> : <AlertCircle size={14} strokeWidth={1.5} />}
                <span className="font-light">{message.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">FULL NAME</label>
                  <input 
                    required
                    type="text" 
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Enter your full name" 
                    className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">EMAIL ADDRESS</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com" 
                    className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none transition-all"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">MOBILE NUMBER</label>
                  <PhoneInput 
                    country={'in'}
                    value={formData.mobileNumber}
                    onChange={(phone: string) => setFormData({...formData, mobileNumber: phone})}
                    inputClass="!w-full !px-4 !py-2.5 !border !border-gray-200 !text-sm focus:!border-gray-400 focus:!outline-none !h-auto"
                    buttonClass="!bg-transparent !border-0"
                    containerClass="!w-full"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">NEW PASSWORD (OPTIONAL)</label>
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="Leave blank to keep current" 
                    className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none transition-all"
                  />
                </div>

                {/* Access Level */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">ACCESS LEVEL</label>
                  <div className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 text-gray-600 text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                    Root Administrator
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gray-800 text-white px-8 py-2.5 text-sm font-light tracking-wider hover:bg-gray-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'UPDATING...' : 'UPDATE PROFILE'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-gray-500" strokeWidth={1.5} />
              <h3 className="text-sm font-light text-gray-700">System Security</h3>
            </div>
            <p className="text-gray-400 text-xs font-light leading-relaxed">
              Your profile has master access to platform configuration, vendor payouts, and user data management. Please ensure your session is secure.
            </p>
          </div>
          <div className="bg-white border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Mail size={16} className="text-gray-500" strokeWidth={1.5} />
              <h3 className="text-sm font-light text-gray-700">Notifications</h3>
            </div>
            <p className="text-gray-400 text-xs font-light leading-relaxed">
              System alerts will be sent to your registered email address regarding vendor applications, large order spikes, and security events.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};