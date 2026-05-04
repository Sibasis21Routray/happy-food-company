import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, ShieldAlert } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const getRedirectPath = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'vendor') return '/vendor/dashboard';
    return '/';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.4 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden relative">
      
      {/* Simple Background - No colored blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 404 Icon */}
          <motion.div 
            variants={iconVariants}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <span className="text-[120px] md:text-[180px] font-light text-gray-200 leading-none select-none">404</span>
              <div className="absolute inset-0 flex items-center justify-center">
               
              </div>
            </div>
          </motion.div>

          <motion.h1 
            variants={iconVariants}
            className="text-2xl md:text-3xl font-light text-gray-800 mb-3"
          >
            Page Not Found
          </motion.h1>
          
          <motion.div 
            variants={iconVariants}
            className="w-12 h-px bg-gray-300 mx-auto mb-5"
          />

          <motion.p 
            variants={iconVariants}
            className="text-gray-400 text-sm font-light max-w-md mx-auto leading-relaxed mb-8"
          >
            Oops! The page you're looking for doesn't exist or you don't have the clearance to view it.
          </motion.p>

          <motion.div 
            variants={buttonVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button 
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-6 py-2.5 border border-gray-200 text-gray-600 text-sm font-light hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              GO BACK
            </motion.button>
            
            <motion.div variants={buttonVariants}>
              <Link 
                to={getRedirectPath()}
                className="inline-flex w-full sm:w-auto px-6 py-2.5 bg-gray-800 text-white text-sm font-light tracking-wider hover:bg-gray-700 transition-all duration-300 items-center justify-center gap-2"
              >
                <Home size={14} strokeWidth={1.5} />
                {user ? 'DASHBOARD' : 'HOME'}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={iconVariants}
            className="mt-12 flex items-center justify-center gap-4 text-gray-300 text-[10px] tracking-[0.2em]"
          >
            <div className="h-px w-8 bg-gray-200"></div>
            HAPPY FOOD COMPANY
            <div className="h-px w-8 bg-gray-200"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};