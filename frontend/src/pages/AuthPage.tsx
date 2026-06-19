import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../components/Layout/Toast';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    identifier: ''
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.mobileNumber || !formData.password) {
      showToast('Please fill all fields', 'error');
      return;
    }
    if (formData.mobileNumber.length < 10) {
      showToast('Please enter a valid mobile number', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.auth.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
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
    <div className="relative min-h-screen pt-16 sm:pt-20 lg:pt-32 pb-16 sm:pb-20 flex justify-center items-center px-3 sm:px-4 md:px-6 bg-gray-50 overflow-hidden">
      
      {/* Background Gradients & Effects (Removed Images) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-amber-500/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5" />
      </div>

      {/* Floating decorative elements */}
      <div className="hidden sm:block absolute top-20 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-20 right-10 w-48 sm:w-64 h-48 sm:h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Auth Form Card */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          relative z-10 
          w-110
          max-w-[320px] xs:max-w-[340px] sm:max-w-[380px] md:max-w-sm lg:max-w-lg
          mx-auto
          bg-white
          rounded-xl sm:rounded-2xl 
          shadow-2xl 
          border border-gray-100
          p-5 xs:p-6 sm:p-6 md:p-8
          transition-all duration-300
          md:-translate-y-2 lg:-translate-y-5
        "
      >
        {/* Left-aligned Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {isLogin ? 'Login' : 'Create Account'}
          </h1>
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
              className="space-y-3 sm:space-y-4 md:space-y-5"
            >
              <motion.div variants={fieldVariants}>
                <label className="block text-xs sm:text-sm md:text-md text-gray-900 mb-1 sm:mb-1.5">
                  Email or Mobile
                </label>
                <input 
                  name="identifier"
                  placeholder="Enter your registered email or mobile no."
                  type="text" 
                  value={formData.identifier}
                  onChange={handleInputChange}
                  required
                  className="
                    w-full 
                    px-3 sm:px-4 
                    py-2 sm:py-2.5 md:py-3 
                    text-sm sm:text-base
                    border border-gray-300 
                    focus:border-gray-800 
                    focus:outline-none 
                    transition-all duration-300 
                    bg-white/50
                    rounded-md
                  "
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label className="block text-xs sm:text-sm md:text-md text-gray-900 mb-1 sm:mb-1.5">
                  Password
                </label>
                
                <div className="relative flex items-center">
                  <input 
                    name="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="
                      w-full 
                      px-3 sm:px-4 
                      pr-10 sm:pr-12 
                      py-2 sm:py-2.5 md:py-3 
                      text-sm sm:text-base
                      border border-gray-300 
                      focus:border-gray-800 
                      focus:outline-none 
                      transition-all duration-300 
                      bg-white/50
                      rounded-md
                    "
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-400 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="text-right mt-1">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-gray-500 hover:text-gray-900 text-xs sm:text-sm"
                  >
                    Forgot password?
                  </button>
                </div>
              </motion.div>

              <motion.button 
                variants={fieldVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit" 
                className="
                  w-full 
                  bg-gray-900 
                  text-white 
                  py-2 sm:py-2.5 md:py-3 
                  text-xs sm:text-sm 
                  font-medium 
                  tracking-wider 
                  hover:bg-gray-800 
                  transition-all duration-300 
                  disabled:opacity-50 
                  flex items-center justify-center gap-2 
                  group
                  rounded-md
                "
              >
                {loading ? 'Processing...' : 'Sign In'}
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              <motion.div variants={fieldVariants} className="text-left pt-2 sm:pt-3 md:pt-4">
                <p className="text-gray-500 text-xs sm:text-sm">
                  <button
                    type="button"
                    onClick={() => { setIsLogin(false); }}
                    className="text-gray-900 font-medium"
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
              <form onSubmit={handleRegister} className="space-y-2.5 sm:space-y-3 md:space-y-4">
                <motion.div variants={fieldVariants}>
                  <label className="block text-xs sm:text-sm md:text-md text-gray-900 mb-1 sm:mb-1.5">
                    Full Name
                  </label>
                  <input 
                    name="fullName"
                    placeholder="Enter your full name"
                    type="text" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="
                      w-full 
                      px-3 sm:px-4 
                      py-2 sm:py-2.5 md:py-3 
                      text-sm sm:text-base
                      border border-gray-300 
                      focus:border-gray-800 
                      focus:outline-none 
                      transition-all duration-300 
                      bg-white/50
                      rounded-md
                    "
                  />
                </motion.div>
                
                <motion.div variants={fieldVariants}>
                  <label className="block text-xs sm:text-sm md:text-md text-gray-900 mb-1 sm:mb-1.5">
                    Email
                  </label>
                  <input 
                    name="email"
                    placeholder="Enter your email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="
                      w-full 
                      px-3 sm:px-4 
                      py-2 sm:py-2.5 md:py-3 
                      text-sm sm:text-base
                      border border-gray-300 
                      focus:border-gray-800 
                      focus:outline-none 
                      transition-all duration-300 
                      bg-white/50
                      rounded-md
                    "
                  />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label className="block text-xs sm:text-sm md:text-md text-gray-900 mb-1 sm:mb-1.5">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={formData.mobileNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const cleanNumber = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, mobileNumber: cleanNumber });
                    }}
                    className="
                      w-full 
                      px-3 sm:px-4 
                      py-2 sm:py-2.5 md:py-3 
                      border border-gray-300 
                      focus:border-gray-800 
                      focus:outline-none 
                      h-auto 
                      transition-all duration-300 
                      bg-white/50
                      text-sm sm:text-base
                      rounded-md
                    "
                  />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <label className="block text-xs sm:text-sm md:text-md text-gray-900 mb-1 sm:mb-1.5">
                    Password
                  </label>
                  
                  <div className="relative flex items-center">
                    <input 
                      name="password"
                      placeholder="Create your password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="
                        w-full 
                        px-3 sm:px-4 
                        pr-10 sm:pr-12 
                        py-2 sm:py-2.5 md:py-3 
                        text-sm sm:text-base
                        border border-gray-300 
                        focus:border-gray-800 
                        focus:outline-none 
                        transition-all duration-300 
                        bg-white/50
                        rounded-md
                      "
                    />
                    
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>

                <motion.button 
                  variants={fieldVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit" 
                  className="
                    w-full 
                    bg-gray-900 
                    text-white 
                    py-2 sm:py-2.5 md:py-3 
                    text-xs sm:text-sm 
                    font-medium 
                    tracking-wider 
                    hover:bg-gray-800 
                    transition-all duration-300 
                    flex items-center justify-center gap-2 
                    group
                    rounded-md
                  "
                >
                  {loading ? 'Processing...' : 'Create'}
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                <motion.div variants={fieldVariants} className="text-left pt-2 sm:pt-3 md:pt-4">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsLogin(true); }}
                      className="text-gray-900 font-medium"
                    >
                      Sign In
                    </button>
                  </p>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};