import React from 'react';
import { motion } from 'framer-motion';

export const ProductsPage: React.FC = () => {
  const products = [
    { 
      name: 'Almond Cranberry + Cashew Raisin - Box of 6', 
      price: '₹300.00', 
      image: '/images/combo-6-1.png' 
    },
    { 
      name: 'Coconut Almond + Date Almond Cranberry - Box of 6', 
      price: '₹300.00', 
      image: '/images/combo-6-2.png' 
    },
    { 
      name: 'Happy Bar - Combo Box of 12', 
      price: '₹600.00', 
      image: '/images/combo-12.png',
      large: true
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8faff] pt-32 pb-20 font-sans relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-40 right-10 w-4 h-4 rounded-full bg-[#ff3c83]/40 blur-[2px]" />
      <div className="absolute top-60 right-20 w-8 h-8 rounded-full bg-[#00d9d9]/30 blur-[4px]" />
      <div className="absolute bottom-1/4 right-32 w-6 h-6 rounded-full bg-[#4cc9f0]/40 blur-[2px]" />
      <div className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-[#00d9d9]/20 blur-[6px]" />
      <div className="absolute top-1/2 left-10 w-5 h-5 rounded-full bg-[#ff3c83]/30 blur-[3px]" />
      <div className="absolute bottom-[5%] left-[2%] w-10 h-10 rounded-full bg-[#00d9d9]/40 blur-[2px]" />

      <div className="container mx-auto px-4 max-w-7xl">
        <header className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-block"
          >
            <h1 
              className="text-[80px] md:text-[140px] font-black leading-none text-[#ff3c83] drop-shadow-xl tracking-tight mb-2 opacity-80 select-none"
              style={{ textShadow: '4px 4px 0 rgba(255, 60, 131, 0.1)' }}
            >
              SHOP
            </h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-black text-[#1e3a8a] absolute left-1/2 -translate-x-1/2 bottom-0 w-full whitespace-nowrap drop-shadow-sm"
            >
              Truly Special Happy Bars
            </motion.h2>
          </motion.div>
        </header>
        
        <div className="flex flex-wrap justify-center gap-10 md:gap-14 items-end mt-12 md:mt-20">
          {products.map((p, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, type: "spring", stiffness: 60 }}
              whileHover={{ y: -15 }}
              className={`flex flex-col items-center group ${p.large ? 'w-full md:w-[420px]' : 'w-full md:w-[340px]'}`}
            >
              <div className="bg-white rounded-[45px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.07)] border border-gray-50/50 mb-10 w-full relative">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="w-full aspect-[4/5] rounded-[35px] overflow-hidden"
                >
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover brightness-100 group-hover:brightness-[1.02] transition-all duration-500" 
                  />
                </motion.div>
              </div>
              
              <div className="text-center px-6">
                <h3 className="text-2xl font-black text-[#1e3a8a] mb-4 leading-tight tracking-tight">
                  {p.name}
                </h3>
                <p className="text-[#ff3c83] text-[32px] font-black tracking-tight leading-none">
                  {p.price}
                </p>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: '#ff1a70' }}
                whileTap={{ scale: 0.9 }}
                className="mt-8 bg-[#ff3c83] text-white font-black py-4 px-12 rounded-full text-lg tracking-widest shadow-xl shadow-pink-100 uppercase transition-all"
              >
                Buy Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

