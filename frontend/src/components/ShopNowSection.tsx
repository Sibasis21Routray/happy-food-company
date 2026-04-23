import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ShopNowSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentComboIndex, setCurrentComboIndex] = useState(0);

  const combos = [
    { title: "Almond Cranberry\nCashew Raisin", subtitle: "Combo Box of 6", desc: "Embark on a flavor-packed journey with our Combo Box featuring the dynamic duo of Almond Cranberry and Cashew Raisin", img: "/images/combo-6-1.png", link: "/product/combo-6-1" },
    { title: "Almond Cranberry\nCashew Raisin\nCoconut Almond\nDate Almond Cranberry", subtitle: "Combo Box of 12", desc: "Enjoy a snack symphony with our Combo Box featuring Almond Cranberry, Cashew Raisin, Coconut Almond, and Date Almond Cranberry.", img: "/images/combo-12.png", link: "/product/combo-12" },
    { title: "Coconut Almond\nDate Almond Cranberry", subtitle: "Combo Box of 6", desc: "Savor the delightful medley of flavors in our Combo Box, featuring the irresistible pairing of Coconut Almond and Date Almond Cranberry", img: "/images/combo-6-2.png", link: "/product/combo-6-2" }
  ];

  const nextCombo = () => {
    setCurrentComboIndex((prev) => (prev + 1) % combos.length);
  };

  const prevCombo = () => {
    setCurrentComboIndex((prev) => (prev - 1 + combos.length) % combos.length);
  };

  return (
    <>
      {/* Combos Wave */}
      {/* <div className="w-full rotate-180 -mb-1 relative z-20">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <path fill="#f4f4fa" fillOpacity="1" d="M0,32L80,32C160,32,320,32,480,48C640,64,800,96,960,96C1120,96,1280,64,1360,48L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div> */}

      <section className="bg-gradient-to-b from-white to-[#d8f0fb] pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          {/* Shop Callout Heading */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 justify-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] leading-none font-black text-[#ff3c83] tracking-tighter drop-shadow-md">SHOP</h1>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-[#1d3557] tracking-tighter leading-tight">Come visit the shop</h2>
          </div>

          {/* Mobile Carousel / Desktop Grid */}
          <div className="block lg:hidden">
            
            {/* Carousel Item */}
            <motion.div
              key={currentComboIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 shadow-xl flex flex-col items-center text-center max-w-sm mx-auto w-full"
            >
              <div className="w-full h-40 sm:h-48 md:h-52 flex justify-center mb-6 md:mb-8 overflow-hidden rounded-2xl bg-white p-4 shrink-0">
                <img src={combos[currentComboIndex].img} alt={combos[currentComboIndex].title} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-[#a12368] font-black text-base sm:text-lg md:text-xl mb-2 sm:mb-3 whitespace-pre-line leading-tight">{combos[currentComboIndex].title}</h3>
              <h4 className="text-[#3273c5] font-black text-base sm:text-lg md:text-xl mb-3 sm:mb-4">{combos[currentComboIndex].subtitle}</h4>
              <p className="text-gray-500 font-bold text-xs sm:text-sm flex-1 mb-6 md:mb-10 leading-relaxed px-2 sm:px-4">{combos[currentComboIndex].desc}</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate(combos[currentComboIndex].link)}
                className="bg-[#f83f7a] text-white font-black py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-[0_8px_25px_rgba(248,63,122,0.3)] tracking-widest text-xs sm:text-sm hover:bg-[#ff206a] mt-auto w-full uppercase"
              >
                SHOP NOW &gt;
              </motion.button>
            </motion.div>

            {/* Carousel Navigation */}
            <div className="flex justify-center gap-4 mb-6 mt-6">
              <button
                onClick={prevCombo}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronLeft size={24} className="text-[#ff3c83]" />
              </button>
              <button
                onClick={nextCombo}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronRight size={24} className="text-[#ff3c83]" />
              </button>
            </div>
            
            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {combos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentComboIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentComboIndex === idx ? 'w-6 bg-[#ff3c83]' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:flex lg:flex-row justify-center items-stretch gap-6 xl:gap-8">
            {combos.map((combo, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className="bg-white rounded-[2.5rem] p-6 xl:p-8 shadow-xl flex flex-col items-center text-center max-w-sm w-full transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="w-full h-44 sm:h-48 md:h-52 flex justify-center mb-6 md:mb-8 overflow-hidden rounded-2xl bg-white p-4 shrink-0">
                  <img src={combo.img} alt={combo.title} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-[#a12368] font-black text-lg xl:text-xl mb-2 xl:mb-3 whitespace-pre-line leading-tight">{combo.title}</h3>
                <h4 className="text-[#3273c5] font-black text-lg xl:text-xl mb-3 xl:mb-4">{combo.subtitle}</h4>
                <p className="text-gray-500 font-bold text-sm flex-1 mb-8 xl:mb-10 leading-relaxed px-2 xl:px-4">{combo.desc}</p>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(combo.link)}
                  className="bg-[#f83f7a] text-white font-black py-3 xl:py-4 px-6 xl:px-8 rounded-2xl shadow-[0_8px_25px_rgba(248,63,122,0.3)] tracking-widest text-sm hover:bg-[#ff206a] mt-auto w-full uppercase"
                >
                  SHOP NOW &gt;
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
