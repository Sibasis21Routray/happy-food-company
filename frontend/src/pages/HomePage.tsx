import React, { useRef, useState, useEffect } from "react";
import { motion, Variants,useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Quote, Star } from "lucide-react";

import { Eye, ShoppingBag, Leaf, Zap, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Snowflake, Hand, Package, ArrowRight, Award, Heart, Sparkles } from 'lucide-react';



// ========== PREMIUM COMPONENTS ==========

// Premium Section Header
const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center mb-12 md:mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-4 px-2"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-md sm:text-md font-light tracking-wide px-4"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 40 } : { width: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="h-px bg-gradient-to-r from-orange-300 to-orange-400 rounded-full mx-auto mt-6"
      />
    </div>
  );
};

// ========== HAPPY BAR LANDING COMPONENT WITH ENHANCED ANIMATIONS ==========
const HappyBarLanding: React.FC = () => {
  const [hoveredFlavor, setHoveredFlavor] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Text animation variants
  const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

 const statVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.7 + i * 0.1,
      duration: 0.5,
    },
  }),
};



  const flavorTagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.05,
      duration: 0.3,
    },
  }),
};

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-[#FFF5EB] to-[#FFEFE0] flex items-center"
    >
      {/* --- ANIMATED BACKGROUND BLOBS --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[-5%] right-[-10%] w-[70%] h-[130%] bg-gradient-to-br from-orange-100/40 to-amber-100/25 rounded-[40%_60%_40%_60%] z-0"
      />
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-[-10%] left-[-8%] w-[40%] h-[50%] bg-gradient-to-tr from-orange-200/25 to-amber-200/15 rounded-full blur-3xl opacity-60 z-0"
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[20%] w-[50%] h-[50%] bg-orange-300/10 rounded-full blur-3xl z-0"
      />

      {/* --- FLOATING DECORATIVE ELEMENTS --- */}
      <svg className="absolute top-[12%] left-[25%] w-80 opacity-25 z-10 hidden lg:block" viewBox="0 0 200 200" fill="none">
        <motion.path
          d="M0 100 C 50 0, 150 200, 200 100"
          stroke="#F97316"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>

      {/* Floating Particles with Enhanced Animation */}
      <motion.div 
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[12%] w-3 h-3 bg-orange-400/50 rounded-full z-10 hidden lg:block"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], x: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[25%] left-[8%] w-2 h-2 bg-amber-500/40 rounded-full z-10 hidden lg:block"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] right-[18%] w-1.5 h-1.5 bg-orange-300/60 rounded-full z-10 hidden lg:block"
      />

      {/* Main Container */}
      <div className="relative z-20 w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-center">
          
          {/* --- LEFT COLUMN: Secondary Content --- */}
          <div className="hidden xl:flex xl:col-span-2 flex-col justify-between h-[550px]">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.div
                initial={{ rotate: -15, scale: 0 }}
                animate={{ rotate: -15, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                whileHover={{ rotate: -5, scale: 1.05 }}
              >
                <img src="/ingredients/Date.png" alt="Almond Icon" className="w-14 h-14 opacity-100" />
              </motion.div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-orange-600/50 leading-relaxed font-light max-w-[140px]">
                Pure, simple, <br /> naturally happy
              </p>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-light">Featured</p>
              <div className="relative group">
                <motion.img 
                  src="/images/cashew-raisin.png" 
                  alt="Cashew Raisin Bar" 
                  className="w-32 drop-shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3"
                  whileHover={{ y: -8 }}
                />
              </div>
            </motion.div>
          </div>

          {/* --- CENTER COLUMN: Main Hero Text --- */}
          <motion.div 
            className="col-span-12 lg:col-span-6 xl:col-span-5 relative pt-10 md:pt-0"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Badge */}
            <motion.div 
              variants={badgeVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-orange-100/80 shadow-sm mb-6 md:mb-8"
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-orange-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[10px] md:text-[11px] tracking-[0.25em] text-orange-600 uppercase font-medium">Clean Energy • Real Joy</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] leading-[1.08] font-light text-gray-900 tracking-[-0.03em]">
              Make your <br />
              <span className="relative inline-block mt-2">
                <motion.span 
                  className="font-serif italic text-orange-400/30 absolute -left-28 md:-left-36 lg:-left-44 top-1 text-5xl md:text-7xl lg:text-8xl pointer-events-none whitespace-nowrap"
                  animate={{ x: [-5, 5, -5], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  happy
                </motion.span>
                day with
              </span> <br />
              <motion.span 
                className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mt-2 inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                Happy Bar
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-500 text-sm md:text-base max-w-md mt-6 leading-relaxed font-light"
            >
              5g protein. 100% natural. Zero guilt. Crafted with real ingredients that
              nourish your body and delight your taste buds. Every bite, pure happiness.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link to="/happy-shop">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 35px -12px rgba(249, 115, 22, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 md:px-12 py-3.5 md:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-[11px] md:text-xs font-light tracking-[0.25em] uppercase hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-xl"
                >
                  Shop Now
                </motion.button>
              </Link>
              
              {/* Flavor Tags */}
              <div className="flex flex-wrap gap-2">
                {["Cashew", "Coconut", "Almond", "Cranberry", "Date"].map((flavor, i) => (
                  <motion.span 
                    key={flavor}
                    custom={i}
                    variants={flavorTagVariants}
                    whileHover={{ scale: 1.05, backgroundColor: "#FFF5EB", borderColor: "#F97316" }}
                    onMouseEnter={() => setHoveredFlavor(flavor)}
                    onMouseLeave={() => setHoveredFlavor(null)}
                    className="px-3 py-1.5 text-[10px] md:text-[11px] text-gray-500 border border-orange-100 rounded-full cursor-pointer hover:text-orange-600 transition-all duration-200"
                  >
                    {flavor}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Nutritional Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-6 border-t border-orange-100/80">
              {[
                { value: "5g", label: "PROTEIN" },
                { value: "100%", label: "NATURAL" },
                { value: "0g", label: "ADDED SUGAR" },
                { value: "₹40", label: "PER BAR" },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  custom={idx}
                  variants={statVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="text-center sm:text-left"
                >
                  <motion.div 
                    className="text-xl md:text-2xl font-light text-gray-900"
                    whileHover={{ scale: 1.05, color: "#F97316" }}
                    transition={{ duration: 0.2 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-[8px] md:text-[9px] tracking-[0.2em] text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: LARGE HERO IMAGE --- */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-5 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <motion.div 
              variants={imageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative w-full flex justify-center lg:justify-end"
            >
              {/* Large Background Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-orange-200/30 via-amber-200/20 to-transparent rounded-full blur-3xl scale-125"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Shadow Under Product */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-orange-900/10 blur-2xl rounded-full" />
              
              {/* Main Product Image - EXTRA LARGE */}
              <motion.img 
                src="/choco.png" 
                alt="Happy Bar Protein Bar - Delicious healthy snack" 
                className="w-auto h-auto max-w-[105%] sm:max-w-[105%] md:max-w-[100%] lg:max-w-[125%] xl:max-w-[100%] 2xl:max-w-[130%] relative z-10 drop-shadow-2xl"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.03 }}
              />

              {/* Floating Ingredient Badges with Enhanced Animation */}
              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-5 -right-3 md:top-1 md:-right-4 backdrop-blur-sm rounded-full p-2.5 md:p-3 z-20"
                whileHover={{ scale: 1.1 }}
              >
                <img src="/ingredients/almond.png" alt="Premium Almonds" className="w-8 h-8 md:w-18 md:h-18" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute -bottom-4 -left-3 md:-bottom-7 md:-left-5 backdrop-blur-sm rounded-full p-2.5 md:p-3 z-20"
                whileHover={{ scale: 1.1 }}
              >
                <img src="/ingredients/Cranberry.png" alt="Organic Cranberries" className="w-7 h-7 md:w-18 md:h-18" />
              </motion.div>

              <motion.div 
                animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/3 -right-2 md:-right-1 backdrop-blur-sm rounded-full p-1.5 md:p-2 z-20 hidden sm:flex"
                whileHover={{ scale: 1.1 }}
              >
                <img src="/ingredients/cashew.png" alt="Premium Cashews" className="w-5 h-5 md:w-22 md:h-22" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM SCROLL INDICATOR --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-30"
      >
        <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-gray-400 font-light">SCROLL</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Feature Card (ENLARGED)
const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="text-center hover:scale-105 transition-transform duration-300 p-4 sm:p-6 md:p-8 rounded-lg">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-6 flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 rounded-full">
          <img
            src={feature.img}
            alt={feature.title}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <h3 className="font-light text-gray-800 text-base sm:text-lg md:text-xl mb-2 sm:mb-3 tracking-wide">
          {feature.title}
        </h3>
        <p className="text-gray-400 text-sm sm:text-md md:text-base leading-relaxed font-light max-w-xs mx-auto">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
};

// Ingredient Card (ENLARGED)
const IngredientCard = ({ ingredient, index }: { ingredient: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.02 }}
      className="text-center hover:scale-105 transition-transform duration-300 p-2 sm:p-4 md:p-8 rounded-lg"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-3 sm:mb-6 flex items-center justify-center bg-white rounded-full shadow-sm">
        <img
          src={ingredient.img}
          alt={ingredient.title}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <p className="font-light text-gray-600 text-sm sm:text-md md:text-lg tracking-wide">
        {ingredient.title}
      </p>
    </motion.div>
  );
};

// Combo Card
const ComboCard = ({ combo, index }: { combo: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="bg-white p-6 sm:p-8 text-center border border-gray-100 hover:border-orange-200 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md">
        <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto mb-6">
          <img
            src={combo.img}
            alt={combo.title}
            className="w-full h-full object-contain"
          />
        </div>

        <h3 className="text-base sm:text-lg font-light text-gray-900 mb-1 tracking-wide">
          {combo.title}
        </h3>
        <p className="text-sm sm:text-md text-orange-400 mb-3 tracking-wide">
          {combo.flavors}
        </p>
        <p className="text-gray-500 text-sm sm:text-md leading-relaxed mb-4 font-light">
          {combo.desc}
        </p>

        <div className="mb-4">
          <span className="text-xl sm:text-2xl font-light text-gray-900">
            ₹{combo.price}
          </span>
        </div>

        <Link to="/happy-shop">
          <motion.button
            whileHover={{ scale: 1.02, borderColor: "#f97316", color: "#f97316" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 sm:py-2.5 border border-gray-200 text-gray-700 text-sm sm:text-md font-light tracking-wider hover:border-orange-400 transition-all duration-300"
          >
            SHOP NOW
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

const testimonials = [
  {
    quote: "The cleanest protein bar I've ever tasted. No artificial aftertaste, just real ingredients.",
    author: "Priya M.",
    role: "Wellness Coach",
  },
  {
    quote: "Finally a healthy snack that doesn't compromise on taste. The Cashew Raisin is my daily go-to.",
    author: "Arjun K.",
    role: "Verified Buyer",
  },
  {
    quote: "My kids love them, and I love that they're getting real nutrition. Win-win!",
    author: "Neha S.",
    role: "Mom of Two",
  },
];

const TestimonialSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-[#FFF8F0] to-[#FFF5EB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
           <SectionHeader
            title="Loved by the mindful ones"
            subtitle="Join thousands who've made the switch to clean snacking"
          />
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="relative bg-white p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(255,185,116,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(255,185,116,0.2)] transition-all duration-300 border border-orange-50/50"
            >
              <div className="absolute top-6 right-8 text-orange-100">
                <Quote size={48} fill="currentColor" />
              </div>

              <div className="flex gap-0.5 mb-6 relative">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-orange-400 fill-orange-400" />
                ))}
              </div>

              <blockquote className="relative mb-8">
                <p className="text-gray-700 text-lg leading-relaxed font-medium tracking-tight">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4 border-t border-orange-50 pt-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-bold tracking-tight">
                    {testimonial.author}
                  </p>
                  <p className="text-orange-500/80 text-[11px] uppercase font-semibold tracking-widest">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Craftsmanship Section - Add before Testimonials


const CraftsmanshipSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { 
      step: "01", 
      title: "Sourced", 
      desc: "Premium nuts & fruits from ethical farms", 
      icon: Leaf,
    },
    { 
      step: "02", 
      title: "Cold-Pressed", 
      desc: "Preserving nutrients at low temperatures", 
      icon: Snowflake,
    },
    { 
      step: "03", 
      title: "Handcrafted", 
      desc: "Small batches with artisanal care", 
      icon: Hand,
    },
    { 
      step: "04", 
      title: "Packed Fresh", 
      desc: "Sealed for purity and taste", 
      icon: Package,
    },
  ];

  return (
    <section className="py-14 md:py-22 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto lg:px-8">
        <SectionHeader
          title="Crafted with intention"
          subtitle="From farm to bar — pure, simple, honest"
        />
        
        <div ref={ref} className="relative mt-16">
          {/* Timeline connector line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-200 via-orange-300/50 to-transparent md:translate-x-[-0.5px]" />
          
          <div className="space-y-16">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <motion.span 
                      className="text-6xl md:text-7xl font-black text-orange-100"
                      whileHover={{ scale: 1.05, color: "#FED7AA" }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.step}
                    </motion.span>
                    <motion.h3 
                      className="text-2xl md:text-3xl font-light text-gray-900 mt-2 tracking-tight"
                      whileHover={{ x: 5, color: "#F97316" }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-gray-400 mt-2 leading-relaxed max-w-md mx-auto md:mx-0">
                      {step.desc}
                    </p>
                  </div>
                  
                  <motion.div 
                    className="relative z-10"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Outer ring */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center shadow-md">
                      {/* Inner circle */}
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-inner">
                        <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Pulsing ring animation */}
                    {/* <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-orange-400/40"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
                    />
                     */}
                    {/* Glow effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-orange-400/20 blur-xl -z-10"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    />
                  </motion.div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs tracking-[0.2em] font-light rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            DISCOVER OUR STORY
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <ArrowRight size={14} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================================
// ALL PRODUCTS SECTION - FIXED: Centered like other headings
// ============================================================================



const AllProductsSection: React.FC<{ products: any[] }> = ({ products }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const headerItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const lineVariants: Variants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: 40,
      opacity: 1,
      transition: { delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-14 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header with Enhanced Animation */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={headerItemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-4 px-2"
          >
            All Happy Bars
          </motion.h2>
          
          <motion.p
            variants={headerItemVariants}
            className="text-gray-400 max-w-2xl mx-auto text-md sm:text-md font-light tracking-wide px-4"
          >
            Experience our complete range of clean energy. No fillers, no secrets, just real food.
          </motion.p>

          <motion.div
            variants={lineVariants}
            className="h-px bg-gradient-to-r from-orange-300 to-orange-400 rounded-full mx-auto mt-6"
          />
        </motion.div>

        {/* Products Grid with Stagger Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {products.map((product) => (
            <motion.div
              key={product.slug}
              variants={cardVariants}
              onMouseEnter={() => setHoveredId(product.slug)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated Border Glow on Hover */}
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-[2.6rem] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
              />
              
              {/* Product Visual Container */}
              <Link 
                to={`/product/${product.slug}`} 
                className="relative aspect-[4/5] bg-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 border border-gray-100/50 group-hover:border-orange-100 group-hover:shadow-[0_30px_60px_-15px_rgba(255,185,116,0.15)] block"
              >
                {/* Animated Background Decor */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-orange-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Floating Particles on Hover */}
                {hoveredId === product.slug && (
                  <>
                    <motion.div 
                      className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-300 rounded-full"
                      animate={{ 
                        scale: [0, 10, 0],
                        opacity: [0, 0.3, 0],
                        x: [0, 30, 60],
                        y: [0, -20, -40],
                      }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-amber-300 rounded-full"
                      animate={{ 
                        scale: [0, 8, 0],
                        opacity: [0, 0.25, 0],
                        x: [0, -25, -50],
                        y: [0, 15, 30],
                      }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                    />
                  </>
                )}
                
                {/* Image Component with Enhanced Animation */}
                <motion.div
                  animate={hoveredId === product.slug ? { y: -12, scale: 1.06, rotate: 2 } : { y: 0, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative z-10 w-full h-full flex items-center justify-center"
                >
                  <motion.img
                    src={product.img}
                    alt={product.name}
                    className="w-auto h-[85%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.08)] group-hover:drop-shadow-[0_30px_40px_rgba(0,0,0,0.12)] transition-all duration-500"
                    whileHover={{ scale: 1.02 }}
                  />
                </motion.div>

                {/* Quick View Button that appears on hover */}
                <motion.div 
                  className="absolute bottom-6 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoveredId === product.slug ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[10px] tracking-[0.2em] text-orange-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                    QUICK VIEW
                  </span>
                </motion.div>
              </Link>

              {/* Product Info with Slide Animation */}
              <motion.div 
                className="mt-8 px-2 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3 
                      className="text-2xl font-light text-gray-900 tracking-tight group-hover:text-orange-600 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      {product.name}
                    </motion.h3>
                  </div>
                  <motion.div 
                    className="text-right"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <p className="text-2xl font-light text-gray-900">₹{product.price}</p>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Per Bar</p>
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-sm text-gray-400 font-light line-clamp-2 leading-relaxed"
                  whileHover={{ color: "#6B7280" }}
                >
                  {product.desc}
                </motion.p>

                {/* Animated Add to Cart Button */}
                <motion.button
                  className="w-full mt-4 py-2.5 border border-gray-200 text-gray-500 text-xs tracking-[0.15em] font-light rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.02, backgroundColor: "#FFF5EB" }}
                  whileTap={{ scale: 0.98 }}
                >
                  ADD TO CART
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};



// Main Component
export const HomePage: React.FC = () => {
  const products = [
    {
      slug: "cashew-raisin",
      name: "Cashew Raisin",
      desc: "The dynamic duo of cashews and raisins creates a snacking sensation that's perfect for anyone seeking a convenient & mouthwatering way to power up their vibrant lifestyle.",
      img: "/images/cashew-raisin.png",
      price: "40",
    },
    {
      slug: "coconut-almond",
      name: "Coconut Almond",
      desc: "A mouthwatering medley of coconut & almonds, a dynamic duo celebrated for their nourishing prowess & mouth-watering taste, ensuring you stay fuelled & fabulous.",
      img: "/images/coconut-almond.png",
      price: "40",
    },
    {
      slug: "date-almond-cranberry",
      name: "Date Almond Cranberry",
      desc: "A harmonious blend of dates, cranberries, and almonds, a trio celebrated for their distinct flavours & wellness advantages. A satisfying pick-me-up that supports your well-being.",
      img: "/images/date-almond-cranberry.png",
      price: "40",
    },
    {
      slug: "almond-cranberry",
      name: "Almond Cranberry",
      desc: "A fusion of jaggery, cranberries, & almonds, ingredients renowned for their tastes & health benefits. A festive treat that tantalizes your taste buds while promoting your well-being.",
      img: "/images/almond-cranberry.png",
      price: "40",
    },
  ];

  const features = [
    {
      title: "PROTEIN RICH",
      desc: "5 grams of protein per serving for sustained energy",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/energy-bar_7634814.png",
    },
    {
      title: "ALL NATURAL",
      desc: "Crafted with premium ingredients, nothing artificial",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/lotus_2610118.png",
    },
    {
      title: "VEGETARIAN",
      desc: "100% plant-based goodness for everyone",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/leaf.png",
    },
    {
      title: "NO PRESERVATIVES",
      desc: "Pure and clean ingredients you can trust",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/no-preservatives_4411195.png",
    },
    {
      title: "NO ADDED SUGAR",
      desc: "Naturally sweetened with fruits and nuts",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/sugar-free.png",
    },
    {
      title: "AFFORDABLE",
      desc: "Premium quality at just ₹40 per bar",
      img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/rupee-symbol.png",
    },
  ];

  const ingredients = [
    { title: "ALMONDS", img: "/ingredients/almond.png" },
    { title: "CRANBERRIES", img: "/ingredients/Cranberry.png" },
    { title: "CASHEWS", img: "/ingredients/cashew.png" },
    { title: "RAISINS", img: "/ingredients/raisin.png" },
    { title: "COCONUT", img: "/ingredients/Coconut Craze.png" },
    { title: "PEANUTS", img: "/ingredients/Peanut.png" },
    { title: "JAGGERY", img: "/ingredients/Jaggery.png" },
    { title: "DATES", img: "/ingredients/Date.png" },
  ];

  const combos = [
    {
      title: "STARTER",
      flavors: "2 Flavors • 6 Bars",
      desc: "Perfect introduction to our protein bars",
      img: "/images/combo-6-1.png",
      price: "240",
    },
    {
      title: "FAMILY",
      flavors: "4 Flavors • 12 Bars",
      desc: "Complete variety pack for the whole family",
      img: "/images/combo-12.png",
      price: "480",
    },
    {
      title: "TROPICAL",
      flavors: "2 Flavors • 6 Bars",
      desc: "Exotic tropical fusion of flavors",
      img: "/images/combo-6-2.png",
      price: "240",
    },
  ];

  return (
    <div className="w-full bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative">
        <HappyBarLanding />
      </section>
      
      {/* All Products Section - Now Center Aligned */}
      <AllProductsSection products={products} />

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Why Choose Us"
            subtitle="Crafted with precision and care"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mx-auto">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Pure Ingredients"
            subtitle="Simple. Natural. Honest."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 sm:gap-6 md:gap-8 mx-auto">
            {ingredients.map((ingredient, i) => (
              <IngredientCard key={i} ingredient={ingredient} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Combo Offers Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Combo Packs" subtitle="Better together" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {combos.map((combo, i) => (
              <ComboCard key={i} combo={combo} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      <CraftsmanshipSection/>
      <TestimonialSection/>
    </div>
  );
};

export default HomePage;