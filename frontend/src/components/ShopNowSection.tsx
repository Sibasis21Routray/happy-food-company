import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ShopNowSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentComboIndex, setCurrentComboIndex] = useState(0);

  const combos = [
    { 
      title: "Starter Pack", 
      subtitle: "Almond Cranberry + Cashew Raisin", 
      size: "6 Bars",
      desc: "Embark on a flavor-packed journey with our dynamic duo of Almond Cranberry and Cashew Raisin.", 
      img: "/images/combo-6-1.png", 
      link: "/product/combo-6-1",
      price: "300"
    },
    { 
      title: "Family Pack", 
      subtitle: "All 4 Flavors", 
      size: "12 Bars",
      desc: "Enjoy a snack symphony featuring all four delicious flavors in one complete variety pack.", 
      img: "/images/combo-12.png", 
      link: "/product/combo-12",
      price: "600",
      popular: true
    },
    { 
      title: "Tropical Pack", 
      subtitle: "Coconut Almond + Date Cranberry", 
      size: "6 Bars",
      desc: "Savor the delightful medley of tropical fusion flavors in this irresistible pairing.", 
      img: "/images/combo-6-2.png", 
      link: "/product/combo-6-2",
      price: "300"
    }
  ];

  const nextCombo = () => {
    setCurrentComboIndex((prev) => (prev + 1) % combos.length);
  };

  const prevCombo = () => {
    setCurrentComboIndex((prev) => (prev - 1 + combos.length) % combos.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="mb-3">
            <span className="text-xs tracking-[0.2em] text-gray-400">COMBO PACKS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
            Better Together
          </h2>
          <div className="w-12 h-px bg-gray-300 mx-auto" />
          <p className="text-gray-400 text-sm font-light mt-4 max-w-md mx-auto">
            Perfect for sharing or stocking up
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="block lg:hidden">
          <motion.div
            key={currentComboIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-100 p-6 max-w-sm mx-auto"
          >
            {/* Popular Badge */}
            {combos[currentComboIndex].popular && (
              <div className="text-center mb-4">
                <span className="text-xs tracking-wide text-gray-500 border-b border-gray-300 pb-1">
                  MOST POPULAR
                </span>
              </div>
            )}
            
            {/* Image */}
            <div className="w-full h-48 flex justify-center mb-6">
              <img 
                src={combos[currentComboIndex].img} 
                alt={combos[currentComboIndex].title} 
                className="w-full h-full object-contain" 
              />
            </div>
            
            {/* Info */}
            <div className="text-center">
              <h3 className="text-lg font-light text-gray-800 mb-1">
                {combos[currentComboIndex].title}
              </h3>
              <p className="text-xs text-gray-400 mb-2">
                {combos[currentComboIndex].subtitle}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {combos[currentComboIndex].size}
              </p>
              <p className="text-gray-500 text-xs font-light leading-relaxed mb-4">
                {combos[currentComboIndex].desc}
              </p>
              <div className="mb-4">
                <span className="text-xl font-light text-gray-900">
                  ₹{combos[currentComboIndex].price}
                </span>
              </div>
              <button
                onClick={() => navigate(combos[currentComboIndex].link)}
                className="w-full py-2.5 border border-gray-300 text-gray-700 text-xs font-light tracking-wider hover:border-gray-500 transition-all duration-300"
              >
                VIEW DETAILS
              </button>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={prevCombo}
              className="p-2 border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <ChevronLeft size={18} className="text-gray-500" />
            </button>
            <button
              onClick={nextCombo}
              className="p-2 border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <ChevronRight size={18} className="text-gray-500" />
            </button>
          </div>
          
          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {combos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentComboIndex(idx)}
                className={`transition-all duration-300 ${
                  currentComboIndex === idx 
                    ? 'w-6 h-px bg-gray-800' 
                    : 'w-4 h-px bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {combos.map((combo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 p-6 relative"
            >
              {/* Popular Badge */}
              {combo.popular && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] tracking-wider text-gray-500 border-b border-gray-300 pb-1">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              {/* Image */}
              <div className={`w-full h-48 flex justify-center mb-6 ${combo.popular ? 'mt-6' : ''}`}>
                <img 
                  src={combo.img} 
                  alt={combo.title} 
                  className="w-full h-full object-contain" 
                />
              </div>
              
              {/* Info */}
              <div className="text-center">
                <h3 className="text-lg font-light text-gray-800 mb-1">
                  {combo.title}
                </h3>
                <p className="text-xs text-gray-400 mb-2">
                  {combo.subtitle}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  {combo.size}
                </p>
                <p className="text-gray-500 text-xs font-light leading-relaxed mb-4">
                  {combo.desc}
                </p>
                <div className="mb-5">
                  <span className="text-xl font-light text-gray-900">
                    ₹{combo.price}
                  </span>
                </div>
                <button
                  onClick={() => navigate(combo.link)}
                  className="w-full py-2.5 border border-gray-300 text-gray-700 text-xs font-light tracking-wider hover:border-gray-500 transition-all duration-300"
                >
                  VIEW DETAILS
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};