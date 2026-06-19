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
      subtitle: "Happy Bar - Coconut Almond | Date Almond Cranberry - Variety Box of 6", 
      img: "/combo-products/Variety-6-AC-CR-removebg-preview.png", 
      link: "/product/combo-6-1",
      price: "276"
    },
    { 
      title: "Family Pack", 
      subtitle: "Almond Cranberry | Cashew Raisin | Coconut Almond | Date Almond Cranberry  - Variety Box of 12", 
      img: "/combo-products/Variety-12-removebg-preview.png", 
      link: "/product/combo-12",
      price: "552",
      popular: true
    },
    { 
      title: "Tropical Pack", 
      subtitle: "Happy Bar - Coconut Almond | Date Almond Cranberry - Variety Box of 6",
      img: "/combo-products/Variety-6-CA-DAC-removebg-preview.png", 
      link: "/product/combo-6-2",
      price: "276"
    }
  ];

  const nextCombo = () => {
    setCurrentComboIndex((prev) => (prev + 1) % combos.length);
  };

  const prevCombo = () => {
    setCurrentComboIndex((prev) => (prev - 1 + combos.length) % combos.length);
  };

  return (
    <section className="py-5 font-sans">
      <div className="container mx-auto px-6 max-w-7xl my-20">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="mb-3">
            <span className="text-body text-md tracking-[0.2em] text-gray-700">COMBO PACKS</span>
          </div>
          <h2 className="heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3">
            Better Together
          </h2>
          <p className="sub-heading text-body text-gray-500 text-md mt-4 max-w-md mx-auto ">
            Perfect for sharing or stocking up
          </p>
        </div>

        {/* Mobile Carousel - IMAGES MADE BIGGER */}
        <div className="block lg:hidden">
          <motion.div
            key={currentComboIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-100 p-6 max-w-sm mx-auto flex flex-col h-full"
          >
            {/* Popular Badge Placeholder to keep height structural */}
            <div className="h-8 flex items-center justify-center mb-4">
              {combos[currentComboIndex].popular && (
                <span className="text-body text-md tracking-wide text-gray-500 border-b border-gray-300 pb-1">
                  MOST POPULAR
                </span>
              )}
            </div>
            
            {/* Mobile Image - INCREASED HEIGHT from h-64 to h-80 */}
            <div className="w-full h-80 flex items-center justify-center mb-6 bg-gray-50/35 overflow-hidden">
              <img 
                src={combos[currentComboIndex].img} 
                alt={combos[currentComboIndex].title} 
                className="w-full h-full object-contain" 
              />
            </div>
            
            {/* Info */}
            <div className="text-center flex flex-col flex-grow">
              <h3 className="sub-heading text-lg text-gray-800 mb-1">
                {combos[currentComboIndex].title}
              </h3>
              <p className="text-body text-md text-gray-500 mb-2">
                {combos[currentComboIndex].subtitle}
              </p>
              <div className="mb-4">
                <span className="sub-heading text-xl text-gray-900">
                  ₹{combos[currentComboIndex].price}
                </span>
              </div>
              <button
                onClick={() => navigate("/happy-shop")}
                className="text-body w-full py-2.5 border border-gray-300 text-gray-700 text-md tracking-wider hover:border-gray-500 transition-all duration-300"
              >
                Shop Now
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

        {/* Desktop Grid - IMAGES MADE BIGGER */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 items-stretch">
          {combos.map((combo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 p-4 relative flex flex-col justify-between"
            >
              {/* Popular Badge Container */}
              <div className="h-10 w-full relative z-20 flex items-center justify-center mb-2">
                {combo.popular && (
                  <div className="px-5 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-orange-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-orange-500">
                      ✦ Most Popular
                    </span>
                  </div>
                )}
              </div>
              
              {/* Desktop Image - CHANGED to aspect-square and increased max-h */}
              <div className="w-full aspect-square max-h-[420px] flex items-center justify-center mb-6 bg-gray-50/35 overflow-hidden">
                <img 
                  src={combo.img} 
                  alt={combo.title} 
                  className="w-full h-full object-contain" 
                />
              </div>
              
              {/* Info */}
              <div className="text-center flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="sub-heading text-lg text-gray-800 mb-1">
                    {combo.title}
                  </h3>
                  <p className="text-body text-md text-gray-500 mb-2">
                    {combo.subtitle}
                  </p>
                </div>
                
                <div>
                  <div className="mb-5">
                    <span className="sub-heading text-xl text-gray-900">
                      ₹{combo.price}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/happy-shop")}
                    className="text-body w-full py-2.5 border border-gray-300 text-gray-700 text-md tracking-wider hover:border-gray-500 transition-all duration-300"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};