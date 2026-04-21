import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ShieldCheck, CheckCircle, RefreshCw, ChevronRight } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: '',
    mobileNumber: '',
    identifier: '' // email or mobile for login
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Registration Flow
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  
  // Captcha
  const [captcha, setCaptcha] = useState({ q: '', a: 0 });
  const [captchaInput, setCaptchaInput] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, [isLogin]);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    setCaptcha({ q: `${n1} + ${n2}`, a: n1 + n2 });
    setCaptchaInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.mobileNumber || !formData.gender || !formData.password) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    setShowOtpStep(true);
  };

  const handleRegisterComplete = async () => {
    if (otpInput !== '123456') {
      setError('Invalid OTP. Use 123456');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await api.auth.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender as any,
        mobileNumber: formData.mobileNumber
      });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      setShowOtpStep(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (parseInt(captchaInput) !== captcha.a) {
      setError('Wrong captcha answer!');
      generateCaptcha();
      return;
    }

    setLoading(true);
    try {
      const response = await api.auth.login({
        identifier: formData.identifier,
        password: formData.password
      });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex justify-center items-center px-4 bg-[#f8faff] font-sans overflow-hidden">
      {/* Background blobs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-pink-100/30 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[120px] -ml-64 -mb-64" />

      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white p-8 md:p-12 w-full max-w-xl rounded-[40px] shadow-[0_20px_70px_rgba(0,0,0,0.06)] border border-white relative z-10"
      >
        <div className="flex justify-center gap-10 mb-10">
          <button 
            onClick={() => { setIsLogin(true); setShowOtpStep(false); setError(''); }}
            className={`text-sm font-black tracking-widest transition-all pb-2 border-b-4 ${isLogin ? 'text-[#FA6011] border-[#ff3c83]' : 'text-gray-300 border-transparent'}`}
          >
            LOGIN
          </button>
          <button 
            onClick={() => { setIsLogin(false); setShowOtpStep(false); setError(''); }}
            className={`text-sm font-black tracking-widest transition-all pb-2 border-b-4 ${!isLogin ? 'text-[#FA6011] border-[#ff3c83]' : 'text-gray-300 border-transparent'}`}
          >
            SIGN UP
          </button>
        </div>

        <h2 className="text-[28px] font-black text-[#FA6011] mb-8 tracking-tight">
          {isLogin ? 'Welcome Back!' : (showOtpStep ? 'Verify your Mobile' : 'Create Account')}
        </h2>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 text-red-500 p-4 rounded-2xl mb-8 text-sm font-bold border border-red-100 flex items-center gap-3"
          >
            <ShieldCheck size={20} />
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form 
              key="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleLogin} 
              className="space-y-5"
            >
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  name="identifier"
                  type="text" 
                  placeholder="Email or Mobile Number" 
                  value={formData.identifier}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-14 pr-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:bg-white focus:border-orange-300 focus:ring-4 focus:ring-orange-50 transition-all font-medium"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  name="password"
                  type="password" 
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-14 pr-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:bg-white focus:border-orange-300 focus:ring-4 focus:ring-orange-50 transition-all font-medium"
                />
              </div>

              {/* Captcha Section */}
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-gray-400 tracking-wider">SECURITY CHECK</span>
                  <button type="button" onClick={generateCaptcha} className="text-[#FA6011] hover:rotate-180 transition-all duration-500">
                    <RefreshCw size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 text-center font-black text-xl tracking-widest text-[#FA6011] shadow-sm select-none">
                    {captcha.q} = ?
                  </div>
                  <input 
                    type="number"
                    placeholder="Result"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                    className="w-28 p-4 rounded-2xl border border-gray-100 bg-white focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-50 transition-all font-black text-center text-lg"
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={loading}
                type="submit" 
                className="w-full bg-[#FA6011] text-white font-black h-16 rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-orange-100 mt-2 tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="animate-spin" /> : 'LOGIN'}
                <ChevronRight size={20} />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div 
              key="signup-flow"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {!showOtpStep ? (
                <form onSubmit={handleRegisterStart} className="space-y-5">
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      name="fullName"
                      type="text" 
                      placeholder="Full Name" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-14 pr-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-50 transition-all font-medium"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        name="email"
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-14 pr-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-50 transition-all font-medium"
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-14 pr-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-50 transition-all font-bold text-gray-500 appearance-none"
                      >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      name="mobileNumber"
                      type="text" 
                      placeholder="Mobile Number" 
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-14 pr-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-50 transition-all font-medium"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      name="password"
                      type="password" 
                      placeholder="Password" 
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-14 pr-5 py-4.5 rounded-2xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:bg-white focus:border-pink-300 focus:ring-4 focus:ring-pink-50 transition-all font-medium"
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit" 
                    className="w-full bg-[#ff3c83] text-white font-black h-16 rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-pink-100 mt-2 tracking-widest flex items-center justify-center gap-3"
                  >
                    CONTINUE
                    <ChevronRight size={20} />
                  </motion.button>
                </form>
              ) : (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <p className="text-gray-400 font-bold">We've sent a 6-digit code to</p>
                    <p className="text-[#FA6011] font-black">{formData.mobileNumber}</p>
                  </div>
                  
                  <div className="flex justify-center gap-3">
                    <input 
                      type="text" 
                      maxLength={6}
                      placeholder="· · · · · ·"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="w-full max-w-[200px] text-center p-5 text-3xl font-black tracking-[10px] rounded-3xl border-2 border-pink-100 bg-pink-50/30 focus:outline-none focus:border-[#ff3c83] focus:bg-white transition-all text-[#ff3c83] placeholder:tracking-normal placeholder:text-gray-300"
                    />
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handleRegisterComplete}
                      disabled={loading || otpInput.length < 6}
                      className="w-full bg-[#ff3c83] text-white font-black h-16 rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-pink-100 tracking-widest disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {loading ? <RefreshCw className="animate-spin" /> : 'VERIFY & REGISTER'}
                      <CheckCircle size={20} />
                    </button>
                    <button 
                      onClick={() => setShowOtpStep(false)}
                      className="w-full text-gray-400 font-black text-sm uppercase tracking-widest hover:text-gray-600 transition-colors"
                    >
                      Change Mobile Number
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
