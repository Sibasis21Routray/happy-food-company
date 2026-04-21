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

  return (
    <div className="min-h-screen bg-[#f8faff] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Abstract Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="relative">
              <span className="text-[100px] md:text-[200px] font-black text-slate-900/5 leading-none select-none">404</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex items-center justify-center border border-gray-100 group">
                  <ShieldAlert size={40} className="md:size-[48px] text-[#FA6011] group-hover:rotate-12 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Lost in the <span className="text-[#FA6011]">Hub?</span>
          </h1>
          
          <p className="text-gray-500 font-bold text-lg mb-12 max-w-md mx-auto leading-relaxed">
            Oops! The page you're searching for doesn't exist or you don't have the clearance to view it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 rounded-2xl font-black text-slate-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95"
            >
              <ArrowLeft size={18} />
              GO BACK
            </button>
            <Link 
              to={getRedirectPath()}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FA6011] to-[#ff3c83] text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(250,96,17,0.3)] hover:brightness-110 active:scale-95"
            >
              <Home size={18} />
              {user ? 'BACK TO DASHBOARD' : 'GO TO HOME'}
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-4 text-gray-300 font-black text-[10px] uppercase tracking-[0.2em]">
            <div className="h-px w-8 bg-gray-200"></div>
            HAPPY FOOD COMPANY • HUB PRO
            <div className="h-px w-8 bg-gray-200"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
