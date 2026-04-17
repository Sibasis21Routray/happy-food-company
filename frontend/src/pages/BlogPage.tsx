import React from 'react';
import { motion } from 'framer-motion';

export const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 items-center justify-center flex bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="glass p-16 rounded-[40px] text-center max-w-3xl shadow-2xl border border-white/50"
      >
        <h1 className="text-6xl font-black mb-8 text-[#ff6b00]">Our Blog</h1>
        <p className="text-xl font-medium text-slate-700 mb-12 leading-relaxed">
          Welcome to the Happy Food Co. blog! We're cooking up some delicious articles about nutrition, well-being, and natural ingredients. Check back soon for amazing wellness tips!
        </p>
        <motion.img 
          src="/images/logo.png" 
          alt="Happy Bar Logo" 
          className="h-28 mx-auto drop-shadow-xl"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
