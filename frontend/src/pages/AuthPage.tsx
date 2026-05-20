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

  const navigate = useNavigate();

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
    <div className=" pt-20 lg:pt-32 pb-20 flex justify-center items-center px-4 bg-white">
      
    

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className=" p-8 md:p-10 w-full max-w-md relative z-10   duration-500"
      >
        {/* Left-aligned Header */}
        <div className="mb-8">
          <h1 className="heading-1 text-2xl md:text-3xl text-gray-900 mb-1">
            {isLogin ? 'Login' : 'Create Account'}
          </h1>
          {/* <p className="text-body text-gray-500 text-sm">
            {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
          </p> */}
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
                <label className="block text-md text-gray-900 mb-1.5">Email or Mobile</label>
                <input 
                  name="identifier"
                  type="text" 
                  value={formData.identifier}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-700 focus:border-gray-800 focus:outline-none transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label className="block text-md text-gray-900 mb-1.5">Password</label>
                <input 
                  name="password"
                  type="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-700 focus:border-gray-800 focus:outline-none transition-all duration-300"
                />
              </motion.div>

              <motion.button 
                variants={fieldVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit" 
                className="w-full bg-gray-900 text-white py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {loading ? <RefreshCw size={16} className="animate-spin" /> : 'Sign In'}
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              {/* Switch to Sign Up */}
              <motion.div variants={fieldVariants} className="text-left pt-4">
                <p className="text-gray-500 text-sm">
                  {/* Don't have an account?{' '} */}
                  <button
                    type="button"
                    onClick={() => { setIsLogin(false); setShowOtpStep(false); }}
                    className="text-gray-900  font-medium"
                  >
                    Create account
                  </button>
                </p>
              </motion.div>
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
                    <label className="block text-md text-gray-900 mb-1.5">Full Name</label>
                    <input 
                      name="fullName"
                      type="text" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-700 focus:border-gray-800 focus:outline-none transition-all duration-300"
                    />
                  </motion.div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={fieldVariants}>
                      <label className="block text-md text-gray-900 mb-1.5">Email</label>
                      <input 
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-700 focus:border-gray-800 focus:outline-none transition-all duration-300"
                      />
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                      <label className="block text-md text-gray-900 mb-1.5">Gender</label>
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-700 focus:border-gray-800 focus:outline-none transition-all duration-300 bg-white text-gray-700"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </motion.div>
                  </div>

                 <motion.div variants={fieldVariants}>
  <label className="block text-md text-gray-900 mb-1.5">
    Mobile Number
  </label>

  <PhoneInput
    country={"in"}
    value={formData.mobileNumber}
    onChange={(phone: string) =>
      setFormData({ ...formData, mobileNumber: phone })
    }

    inputClass="!w-full !pl-14 !pr-4 !py-3 !border !border-gray-700 focus:!border-gray-800 focus:!outline-none !h-auto transition-all duration-300"

    buttonClass="!bg-transparent !border-0 !w-12"

    containerClass="!w-full"

    dropdownClass="!text-black"
  />
</motion.div>

                  <motion.div variants={fieldVariants}>
                    <label className="block text-md text-gray-900 mb-1.5">Password</label>
                    <input 
                      name="password"
                      type="password" 
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-700 focus:border-gray-800 focus:outline-none transition-all duration-300"
                    />
                  </motion.div>

                  <motion.button 
                    variants={fieldVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full bg-gray-900 text-white py-3 text-md font-medium tracking-wider hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Create
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>

                  {/* Switch to Sign In */}
                  <motion.div variants={fieldVariants} className="text-left pt-4">
                    <p className="text-gray-500 text-sm">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => { setIsLogin(true); setShowOtpStep(false); }}
                        className="text-gray-900 hover: font-medium"
                      >
                        Sign In
                      </button>
                    </p>
                  </motion.div>
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
                    <p className="text-gray-500 text-sm mb-1">We've sent a 6-digit code to</p>
                    <p className="text-gray-900 font-medium">{formData.mobileNumber}</p>
                  </motion.div>
                  
                  <motion.div variants={fieldVariants}>
                    <label className="block text-sm text-gray-800 mb-1.5 text-center">Enter OTP</label>
                    <motion.input 
                      type="text" 
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      whileFocus={{ scale: 1.02 }}
                      className="w-full text-center px-4 py-3 text-lg font-light tracking-[8px] border border-gray-300 focus:border-gray-800 focus:outline-none transition-all duration-300"
                    />
                  </motion.div>

                  <div className="space-y-3">
                    <motion.button 
                      variants={fieldVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleRegisterComplete}
                      disabled={loading || otpInput.length < 6}
                      className="w-full bg-gray-900 text-white py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
                    >
                      {loading ? <RefreshCw size={16} className="animate-spin" /> : 'Verify & Register'}
                      <CheckCircle size={14} className="group-hover:scale-110 transition-transform duration-300" />
                    </motion.button>
                    <motion.button 
                      variants={fieldVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowOtpStep(false)}
                      className="w-full text-gray-400 text-sm hover:text-gray-800 transition-colors duration-300"
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