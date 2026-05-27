import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { Mail, RefreshCw, ChevronRight, CheckCircle } from 'lucide-react';
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
    <div className="pt-20 lg:pt-32 pb-20 flex justify-center items-center px-4 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 md:p-10 w-full max-w-md"
      >
        <div className="mb-8">
          <h1 className="heading-1 text-2xl md:text-3xl text-gray-900 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-500 text-sm">
            {submitted 
              ? "We've sent a recovery link to your email." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-md text-gray-900 mb-1.5">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-700 focus:border-gray-800 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit" 
              className="w-full bg-gray-900 text-white py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : 'Send Reset Link'}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <div className="text-center pt-4">
              <Link to="/auth" className="text-gray-900 font-medium text-sm">
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle size={32} />
              </div>
            </div>
            <p className="text-gray-700">
              Check your inbox for a link to reset your password. If you don't see it, check your spam folder.
            </p>
            <Link 
              to="/auth" 
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-300"
            >
              Back to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};
