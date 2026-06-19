import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { RefreshCw, ChevronRight, CheckCircle } from 'lucide-react';
import { useToast } from '../components/Layout/Toast';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }

    setLoading(true);
    try {
      await api.auth.forgotPassword(email);
      setSubmitted(true);
      showToast('Reset link sent to your email!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to send reset link', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-16 sm:pt-20 lg:pt-32 pb-16 sm:pb-20 flex justify-center items-center px-3 sm:px-4 md:px-6 bg-gray-50 overflow-hidden">
      
      {/* Background Gradients & Effects (Removed Images) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-amber-500/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5" />
      </div>

      {/* Floating decorative elements - Hidden on mobile */}
      <div className="hidden sm:block absolute top-20 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-20 right-10 w-48 sm:w-64 h-48 sm:h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Forgot Password Form Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          relative z-10 
          w-full 
          max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] md:max-w-md
          mx-auto
          bg-white
          rounded-xl sm:rounded-2xl 
          shadow-2xl 
          border border-gray-100
          p-5 xs:p-6 sm:p-8 md:p-10
          transition-all duration-300
        "
      >
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            {submitted 
              ? "We've sent a recovery link to your email." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm md:text-md text-gray-900 mb-1 sm:mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
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
              </div>
            </div>

            <motion.button 
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
              {loading ? <RefreshCw size={16} className="animate-spin" /> : 'Send Reset Link'}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <div className="text-center pt-2 sm:pt-3 md:pt-4">
              <Link 
                to="/auth" 
                className="text-gray-900 font-medium text-xs sm:text-sm hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
            <div className="flex justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle size={28} />
              </div>
            </div>
            <p className="text-gray-700 text-xs sm:text-sm">
              Check your inbox for a link to reset your password. If you don't see it, check your spam folder.
            </p>
            <Link 
              to="/auth" 
              className="
                inline-block 
                bg-gray-900 
                text-white 
                px-6 sm:px-8 
                py-2 sm:py-2.5 md:py-3 
                text-xs sm:text-sm 
                font-medium 
                tracking-wider 
                hover:bg-gray-800 
                transition-all duration-300
                rounded-md
              "
            >
              Back to Login
            </Link>
          </div>
        )}

        {/* Brand watermark at bottom of card */}
        <div className="mt-4 sm:mt-5 md:mt-6 pt-3 sm:pt-4 border-t border-gray-200/50 text-center">
          <p className="text-[10px] xs:text-xs text-gray-400 tracking-widest">
            HAPPY BAR • REAL INGREDIENTS
          </p>
        </div>
      </motion.div>
    </div>
  );
};