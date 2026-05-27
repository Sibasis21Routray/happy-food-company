import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { Lock, RefreshCw, ChevronRight, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../components/Layout/Toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      showToast('Invalid or missing reset token', 'error');
      navigate('/auth');
    }
  }, [token, navigate, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }

    setLoading(true);
    try {
      await api.auth.resetPassword({ token, password });
      setSuccess(true);
      showToast('Password reset successfully!', 'success');
      setTimeout(() => {
        navigate('/auth');
      }, 3000);
    } catch (err: any) {
      showToast(err.message || 'Failed to reset password', 'error');
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
            Reset Password
          </h1>
          <p className="text-gray-500 text-sm">
            {success 
              ? "Your password has been reset successfully." 
              : "Please enter your new password below."}
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-md text-gray-900 mb-1.5">New Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Min 6 characters"
                    className="w-full px-4 py-3 border border-gray-700 focus:border-gray-800 focus:outline-none transition-all duration-300"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-md text-gray-900 mb-1.5">Confirm New Password</label>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
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
              {loading ? <RefreshCw size={16} className="animate-spin" /> : 'Reset Password'}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle size={32} />
              </div>
            </div>
            <p className="text-gray-700">
              Your password has been changed. You will be redirected to the login page shortly.
            </p>
            <button 
              onClick={() => navigate('/auth')}
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-all duration-300"
            >
              Go to Login
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
