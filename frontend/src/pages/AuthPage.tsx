import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ShieldCheck, CheckCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { useToast } from '../components/Layout/Toast';
import PhoneInputModule from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInput = (PhoneInputModule as any).default || PhoneInputModule;

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: '',
    mobileNumber: '',
    identifier: ''
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  
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
      showToast('Please fill all fields', 'error');
      return;
    }
    if (formData.mobileNumber.length < 10) {
      showToast('Please enter a valid mobile number', 'error');
      return;
    }
    setShowOtpStep(true);
  };

  const handleRegisterComplete = async () => {
    if (otpInput !== '123456') {
      showToast('Invalid OTP. Use 123456', 'error');
      return;
    }
    
    setLoading(true);
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
      showToast('Account created successfully!', 'success');
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      showToast(err.message || 'Registration failed', 'error');
      setShowOtpStep(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(captchaInput) !== captcha.a) {
      showToast('Wrong captcha answer!', 'error');
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
      showToast('Welcome back!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: { duration: 0.3 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, delayChildren: 0, staggerChildren: 0.08 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex justify-center items-center px-4 bg-white">
      
      {/* Animated Background Gradient */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100"
      />
      
      {/* Animated Decorative Elements */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-20 right-20 w-64 h-64 bg-gray-200 rounded-full blur-3xl"
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-20 left-20 w-64 h-64 bg-gray-300 rounded-full blur-3xl"
      />

      <motion.div 
        
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white border border-gray-300 p-8 md:p-10 w-full max-w-md relative z-10 shadow-sm hover:shadow-md transition-shadow duration-500"
      >
        {/* Tabs with Animation */}
        <div className="flex justify-center gap-8 mb-8">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setIsLogin(true); setShowOtpStep(false); }}
            className={`relative text-sm font-light tracking-wider pb-2 transition-all duration-300 ${
              isLogin ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            LOGIN
            {isLogin && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-px bg-gray-900"
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setIsLogin(false); setShowOtpStep(false); }}
            className={`relative text-sm font-light tracking-wider pb-2 transition-all duration-300 ${
              !isLogin ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            SIGN UP
            {!isLogin && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-px bg-gray-900"
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form 
              key="login-form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleLogin} 
              className="space-y-5"
            >
              <motion.div variants={fieldVariants}>
                <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">EMAIL OR MOBILE</label>
                <input 
                  name="identifier"
                  type="text" 
                  placeholder="Enter your email or mobile" 
                  value={formData.identifier}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-sm focus:border-gray-600 focus:outline-none transition-all duration-300 hover:border-gray-400"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">PASSWORD</label>
                <input 
                  name="password"
                  type="password" 
                  placeholder="Enter your password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-sm focus:border-gray-600 focus:outline-none transition-all duration-300 hover:border-gray-400"
                />
              </motion.div>

              {/* Captcha Section */}
              <motion.div variants={fieldVariants} className="border border-gray-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 tracking-wider">SECURITY CHECK</span>
                  <motion.button 
                    type="button" 
                    onClick={generateCaptcha}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-400 hover:text-gray-600 transition-all"
                  >
                    <RefreshCw size={14} strokeWidth={1.5} />
                  </motion.button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-50 p-3 text-center text-gray-700 text-lg font-light tracking-wide border border-gray-200">
                    {captcha.q} = ?
                  </div>
                  <input 
                    type="number"
                    placeholder="Answer"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                    className="w-24 px-3 py-3 border border-gray-300 text-center text-sm focus:border-gray-600 focus:outline-none transition-all duration-300"
                  />
                </div>
              </motion.div>

              <motion.button 
                variants={fieldVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit" 
                className="w-full bg-gray-900 text-white py-3 text-sm font-light tracking-wider hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {loading ? <RefreshCw size={16} className="animate-spin" strokeWidth={1.5} /> : 'LOGIN'}
                <ChevronRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div 
              key="signup-flow"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {!showOtpStep ? (
                <form onSubmit={handleRegisterStart} className="space-y-4">
                  <motion.div variants={fieldVariants}>
                    <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">FULL NAME</label>
                    <input 
                      name="fullName"
                      type="text" 
                      placeholder="Your full name" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-sm focus:border-gray-600 focus:outline-none transition-all duration-300 hover:border-gray-400"
                    />
                  </motion.div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={fieldVariants}>
                      <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">EMAIL</label>
                      <input 
                        name="email"
                        type="email" 
                        placeholder="Your email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 text-sm focus:border-gray-600 focus:outline-none transition-all duration-300 hover:border-gray-400"
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                      <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">GENDER</label>
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 text-sm focus:border-gray-600 focus:outline-none transition-all duration-300 bg-white text-gray-600 hover:border-gray-400"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div variants={fieldVariants}>
                    <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">MOBILE NUMBER</label>
                    <PhoneInput 
                      country={'in'}
                      value={formData.mobileNumber}
                      onChange={(phone: string) => setFormData({ ...formData, mobileNumber: phone })}
                      inputClass="!w-full !px-4 !py-3 !border !border-gray-300 !text-sm focus:!border-gray-600 focus:!outline-none !h-auto hover:!border-gray-400 transition-all duration-300"
                      buttonClass="!bg-transparent !border-0"
                      containerClass="!w-full"
                    />
                  </motion.div>

                  <motion.div variants={fieldVariants}>
                    <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">PASSWORD</label>
                    <input 
                      name="password"
                      type="password" 
                      placeholder="Create a password" 
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 text-sm focus:border-gray-600 focus:outline-none transition-all duration-300 hover:border-gray-400"
                    />
                  </motion.div>

                  <motion.button 
                    variants={fieldVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full bg-gray-900 text-white py-3 text-sm font-light tracking-wider hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    CONTINUE
                    <ChevronRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </form>
              ) : (
                <motion.div 
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <p className="text-gray-500 text-sm font-light mb-1">We've sent a 6-digit code to</p>
                    <p className="text-gray-900 text-base font-light">{formData.mobileNumber}</p>
                  </motion.div>
                  
                  <motion.div variants={fieldVariants}>
                    <label className="block text-xs text-gray-500 mb-1.5 tracking-wide text-center">ENTER OTP</label>
                    <motion.input 
                      type="text" 
                      maxLength={6}
                      placeholder="123456"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      whileFocus={{ scale: 1.02 }}
                      className="w-full text-center px-4 py-3 text-lg font-light tracking-[8px] border border-gray-300 focus:border-gray-600 focus:outline-none transition-all duration-300"
                    />
                  </motion.div>

                  <div className="space-y-3">
                    <motion.button 
                      variants={fieldVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleRegisterComplete}
                      disabled={loading || otpInput.length < 6}
                      className="w-full bg-gray-900 text-white py-3 text-sm font-light tracking-wider hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
                    >
                      {loading ? <RefreshCw size={16} className="animate-spin" strokeWidth={1.5} /> : 'VERIFY & REGISTER'}
                      <CheckCircle size={14} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                    </motion.button>
                    <motion.button 
                      variants={fieldVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowOtpStep(false)}
                      className="w-full text-gray-400 text-xs font-light tracking-wider hover:text-gray-600 transition-colors duration-300"
                    >
                      Change Mobile Number
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};