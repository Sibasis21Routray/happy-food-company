import React, { useRef, useState, useEffect } from "react";
import { motion, Variants, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, HelpCircle, Mail, Quote, Star } from "lucide-react";

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
        className="heading-3 md:heading-2 lg:heading-1 text-gray-900 mb-4 px-2"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="body-base text-gray-500 max-w-2xl mx-auto px-4"
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

// ========== HAPPY BAR LANDING COMPONENT ==========

const HappyBarLanding: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Top Notification Banner */}
      <div className="w-full mt-20 bg-black text-white text-center py-2 px-4 text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2 border-b border-gray-800">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="body-small">India's Favorite Protein Bars Have Landed — <Link to={"/happy-shop"} className="underline cursor-pointer">Try it today</Link></span>
      </div>

      {/* HERO SECTION */}
      <section 
        ref={sectionRef}
        className="relative w-full min-h-[65vh] bg-gray-100 flex items-center overflow-hidden py-12 md:py-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.1) 70%), url('https://m.gettywallpapers.com/wp-content/uploads/2023/12/Gym-Exercise-PC-Wallpaper.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
          <motion.div 
            className="col-span-1 lg:col-span-6 text-white space-y-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="space-y-1">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-4">
                <div className="brush-script-text text-3xl sm:text-4xl md:text-5xl  mb-1 lg:-ml-1 transform -rotate-[1deg] text-white">
                  Real Food
                </div>
                <p className="brand-serif-headline text-4xl sm:text-5xl md:text-6xl text-white mt-2">
                  Real People.<br />
                  Real Impact.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Link to={"/happy-shop"} className="px-10 py-3.5 bg-gray-900 hover:bg-black text-white rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border border-gray-700 inline-flex items-center gap-3 group shadow-xl">
                <span>Shop Now</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-2 pt-4">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="body-xs text-gray-300 font-medium tracking-wide">
                Over 2500+ 5 Star Reviews
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-xl shadow-lg border border-white/20 text-left max-w-sm mt-6"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                <img src="https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg" alt="Marina G." className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="body-small text-gray-800 font-medium leading-snug">
                  "The best protein bars on the go! Healthy, tasty and so reliable!"
                </p>
                <span className="body-xs text-gray-500 font-bold block mt-0.5">Marina G. <span className="text-gray-400 font-normal">• Verified Customer</span></span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <motion.img 
        src="/images/cashew-raisin.png" 
        alt="All Real Cashew Cookie Dough Protein Bar" 
        className="absolute top-80 left-100 w-full h-114 object-contain z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] -rotate-10"
        whileHover={{ scale: 1.02, rotate: -1 }}
        transition={{ duration: 0.3 }}
      />

      {/* BRAND VALUE PROPOSITION */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 py-15">
        <div className="space-y-4 max-w-md text-center lg:text-left">
          <div className="space-y-1">
            <h2 className="heading-4 md:heading-3 text-gray-900 leading-tight">
              Why choose <br className="hidden lg:inline" /> All Real Nutrition?
            </h2>
            <p className="body-base text-gray-500">
              Good for you - and the planet.
            </p>
          </div>
          
          <div className="pt-2 space-y-1">
            <h3 className="brush-script-text text-3xl md:text-4xl text-gray-800 font-medium tracking-wide">
              Real Food
            </h3>
            <p className="body-small text-gray-600 max-w-xs mx-auto lg:mx-0 leading-relaxed">
              Made in a kitchen, not a lab. Great for the gut and for the taste buds.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12 lg:w-auto">
          <div className="flex items-center gap-4 sm:gap-5 justify-center">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-green-200 bg-green-50 flex flex-col items-center justify-center p-1.5 text-center transition-transform hover:scale-105 duration-300">
              <span className="text-[9px] uppercase font-bold tracking-widest text-green-700">Proudly</span>
              <span className="heading-6 text-sm sm:text-base font-bold text-green-800 my-0.5">IRISH</span>
              <span className="text-[8px] uppercase font-bold text-green-700 tracking-wider">Made</span>
            </div>
            
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-pink-200 bg-pink-50 flex flex-col items-center justify-center p-1.5 text-center transition-transform hover:scale-105 duration-300">
              <span className="text-[9px] uppercase font-bold tracking-widest text-pink-700">Protein</span>
              <span className="heading-4 text-xl sm:text-2xl font-bold text-pink-800 leading-none my-0.5">16g</span>
              <span className="text-[8px] uppercase font-bold text-pink-700 tracking-wider">Per Bar</span>
            </div>
            
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-blue-200 bg-blue-50 flex flex-col items-center justify-center p-1.5 text-center transition-transform hover:scale-105 duration-300">
              <span className="text-[9px] uppercase font-bold tracking-widest text-blue-700">Less Than</span>
              <span className="heading-4 text-xl sm:text-2xl font-bold text-blue-800 leading-none my-0.5">12</span>
              <span className="text-[8px] uppercase font-bold text-blue-700 tracking-wider">Ingredients</span>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 border-t sm:border-t-0 sm:border-l border-gray-200 pt-6 sm:pt-0 sm:pl-8 justify-center">
            <div className="flex items-center gap-3 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0">
                <div className="w-full h-full rounded-full border border-gray-900 flex flex-col items-center justify-center p-1 text-center font-bold text-[8px] font-mono font-black leading-none uppercase tracking-tighter text-gray-900 transition-colors group-hover:bg-gray-900 group-hover:text-white duration-300">
                  <span>Plastic</span>
                  <span className="text-[10px] font-black mt-0.5 border-t border-gray-900 group-hover:border-white pt-0.5">Free</span>
                </div>
              </div>
              <div className="leading-none">
                <h4 className="heading-6 text-xs font-bold text-gray-900">Plastic-free</h4>
                <p className="body-xs text-gray-500 mt-0.5">Packaging</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0">
                <div className="w-full h-full rounded-full border border-gray-900 flex items-center justify-center text-lg text-gray-900 transition-colors group-hover:bg-gray-900 group-hover:text-white duration-300">
                  🌱
                </div>
              </div>
              <div className="leading-none">
                <h4 className="heading-6 text-xs font-bold text-gray-900">Home</h4>
                <p className="body-xs text-gray-500 mt-0.5">Compostable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Card
const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 text-left py-2 cursor-pointer"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
        <img src={feature.img} alt={feature.title} className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col justify-center max-w-[160px]">
        <h3 className="heading-6 font-bold text-gray-800 text-sm sm:text-base tracking-tight">
          {feature.title}
        </h3>
        {feature.desc && (
          <p className="body-xs text-gray-600 mt-0.5 leading-tight">
            {feature.desc}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// Ingredient Card Component
const IngredientCard = ({ ingredient, index }: { ingredient: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="flex flex-col items-center text-center w-full group"
    >
      <div className="w-full h-32 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-105">
        <img src={ingredient.img} alt={ingredient.title} className="max-w-[90%] max-h-full object-contain" />
      </div>

      <div className="space-y-2 max-w-[240px]">
        <h4 className="heading-6 font-bold text-gray-800 text-base sm:text-lg tracking-tight leading-snug">
          {ingredient.title}
        </h4>
        <p className="body-xs text-gray-500 leading-relaxed">
          {ingredient.desc}
        </p>
      </div>
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
          <img src={combo.img} alt={combo.title} className="w-full h-full object-contain" />
        </div>

        <h3 className="heading-6 text-base sm:text-lg font-bold text-gray-900 mb-1 tracking-wide">
          {combo.title}
        </h3>
        <p className="body-small text-orange-500 mb-3 tracking-wide">
          {combo.flavors}
        </p>
        <p className="body-small text-gray-500 leading-relaxed mb-4">
          {combo.desc}
        </p>

        <div className="mb-4">
          <span className="heading-5 text-xl sm:text-2xl font-bold text-gray-900">
            ₹{combo.price}
          </span>
        </div>

        <Link to="/happy-shop">
          <motion.button
            whileHover={{ scale: 1.02, borderColor: "#f97316", color: "#f97316" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 border border-gray-200 text-gray-700 text-sm font-bold tracking-wider hover:border-orange-400 transition-all duration-300"
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
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
              className="relative bg-white p-10 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-50"
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
                <p className="body-base text-gray-700 font-medium tracking-tight">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4 border-t border-orange-50 pt-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                  <span className="brand-text">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="body-small text-gray-900 font-bold tracking-tight">
                    {testimonial.author}
                  </p>
                  <p className="body-xs text-orange-500 uppercase font-bold tracking-wider">
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

// Craftsmanship Section
const CraftsmanshipSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { step: "01", title: "Sourced", desc: "Premium nuts & fruits from ethical farms", icon: Leaf },
    { step: "02", title: "Cold-Pressed", desc: "Preserving nutrients at low temperatures", icon: Snowflake },
    { step: "03", title: "Handcrafted", desc: "Small batches with artisanal care", icon: Hand },
    { step: "04", title: "Packed Fresh", desc: "Sealed for purity and taste", icon: Package },
  ];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title="Crafted with intention" subtitle="From farm to bar — pure, simple, honest" />
        
        <div ref={ref} className="relative mt-16">
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
                  className={`flex flex-col md:flex-row items-center gap-6 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <motion.span 
                      className="heading-1 text-6xl md:text-7xl font-black text-orange-100"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.step}
                    </motion.span>
                    <motion.h3 
                      className="heading-4 text-2xl md:text-3xl font-bold text-gray-900 mt-2 tracking-tight"
                      whileHover={{ x: 5, color: "#F97316" }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="body-base text-gray-500 mt-2 leading-relaxed max-w-md mx-auto md:mx-0">
                      {step.desc}
                    </p>
                  </div>
                  
                  <motion.div 
                    className="relative z-10"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center shadow-md">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-inner">
                        <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
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

        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm tracking-[0.2em] font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            DISCOVER OUR STORY
            <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
              <ArrowRight size={14} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// FAQ Accordion Item Component
const FAQItem = ({ question, answer, isOpen, onToggle, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left hover:text-orange-600 transition-colors duration-300"
      >
        <span className="body-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-gray-400 group-hover:text-orange-600 transition-colors"
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="body-small text-gray-600 leading-relaxed pb-5 max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main FAQ Component
const FAQ = ({ faqs, contactEmail = "support@allrealnutrition.com" }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const rightPanelVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
  };

  return (
    <section className="w-full bg-gray-50 py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <motion.div
          ref={sectionRef}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:col-span-5 space-y-6"
        >
          <div className="space-y-2">
            <h2 className="heading-2 md:heading-1 lg:heading-1 font-black tracking-tight text-gray-900 leading-tight">
              Frequently Asked
              <br />
              <span className="text-orange-500">Questions</span>
            </h2>
          </div>
          
          <motion.div 
            className="space-y-1 pt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="body-base text-gray-600 font-medium">Still have a query?</p>
            <motion.p 
              whileHover={{ x: 5 }}
              className="body-base text-gray-900 font-bold underline cursor-pointer hover:text-orange-600 transition-colors inline-block"
            >
              Get in touch with us
            </motion.p><br/>
            <a 
              href={`mailto:${contactEmail}`} 
              className="body-base text-orange-600 font-semibold block pt-1 hover:underline inline-flex items-center gap-2 group"
            >
              <Mail size={14} className="group-hover:scale-110 transition-transform" />
              {contactEmail}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={rightPanelVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:col-span-7 divide-y divide-gray-200 border-t border-b border-gray-200 bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="px-6">
                <FAQItem
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === index}
                  onToggle={() => toggleFAQ(index)}
                  index={index}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AllProductsSection: React.FC<{ products: any[] }> = ({ products }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const circleColors = [
    'bg-sky-400',
    'bg-amber-400', 
    'bg-lime-400',
    'bg-purple-400'
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-20 space-y-3">
          <h2 className="heading-1 text-gray-900">
            All Products
          </h2>
          <p className="body-base text-gray-500 max-w-xl mx-auto">
            Experience our complete range of clean energy. No fillers, no secrets, just real food.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {products.map((product, idx) => {
            const isHovered = hoveredId === product.slug;
            const currentBg = circleColors[idx % circleColors.length];

            return (
              <motion.div
                key={product.slug}
                variants={cardVariants}
                onMouseEnter={() => setHoveredId(product.slug)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex flex-col items-center text-center group h-full"
              >
                <Link 
                  to={`/product/${product.slug}`} 
                  className="relative w-full aspect-square flex items-center justify-center mb-6 block"
                >
                  <div className={`absolute w-[82%] h-[82%] rounded-full ${currentBg} transition-transform duration-500 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`} />
                  
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                    <motion.img
                      src={product.img}
                      alt={product.name}
                      className="w-[88%] h-auto object-contain filter drop-shadow-lg"
                      animate={isHovered ? { scale: 1.05, rotate: -12, y: -6 } : { scale: 1, rotate: -8, y: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    />
                  </div>
                </Link>

                <div className="space-y-3 w-full px-2 flex flex-col items-center flex-1">
                  <h3 className="heading-4 text-gray-900 tracking-tight leading-tight">
                    {product.name}
                  </h3>
                  
                  <p className="body-small text-gray-600 leading-relaxed max-w-[260px] mx-auto min-h-[60px]">
                    {product.desc || "Find your favourite flavour"}
                  </p>

                  <div className="pt-3 w-full max-w-[200px] mt-auto">
                    <Link
                      to={`/product/${product.slug}`}
                      className="w-full py-3 bg-gray-900 hover:bg-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                      <span>SHOP NOW</span>
                      <span className="text-xs font-normal text-gray-400 group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
    { title: "PROTEIN RICH", desc: "5 grams of protein per serving", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/energy-bar_7634814.png" },
    { title: "ALL NATURAL", desc: "Crafted with premium ingredients", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/lotus_2610118.png" },
    { title: "VEGETARIAN", desc: "100% plant-based goodness", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/leaf.png" },
    { title: "NO PRESERVATIVES", desc: "Pure and clean ingredients", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/no-preservatives_4411195.png" },
    { title: "NO ADDED SUGAR", desc: "Naturally sweetened", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/sugar-free.png" },
    { title: "AFFORDABLE", desc: "Just ₹40 per bar", img: "https://angstrohmfoods.com/wp-content/uploads/2025/07/rupee-symbol.png" },
  ];

  const ingredients = [
    { title: "ALMONDS", img: "/ingredients/almond.png", desc: "Rich in vitamin E and healthy fats" },
    { title: "CRANBERRIES", img: "/ingredients/Cranberry.png", desc: "Packed with antioxidants" },
    { title: "CASHEWS", img: "/ingredients/cashew.png", desc: "Essential minerals and protein" },
    { title: "RAISINS", img: "/ingredients/raisin.png", desc: "Natural energy boost with iron" },
    { title: "COCONUT", img: "/ingredients/Coconut Craze.png", desc: "Healthy MCTs for energy" },
    { title: "PEANUTS", img: "/ingredients/Peanut.png", desc: "Plant-based protein" },
    { title: "JAGGERY", img: "/ingredients/Jaggery.png", desc: "Unrefined sweetener" },
    { title: "DATES", img: "/ingredients/Date.png", desc: "Naturally sweet with fiber" },
  ];

  const combos = [
    { title: "STARTER", flavors: "2 Flavors • 6 Bars", desc: "Perfect introduction", img: "/images/combo-6-1.png", price: "240" },
    { title: "FAMILY", flavors: "4 Flavors • 12 Bars", desc: "Complete variety pack", img: "/images/combo-12.png", price: "480" },
    { title: "TROPICAL", flavors: "2 Flavors • 6 Bars", desc: "Exotic tropical fusion", img: "/images/combo-6-2.png", price: "240" },
  ];

  const faqsToUse = [
    { q: "What are the ingredients?", a: "Our bars are made with 12 or fewer real food ingredients, nothing artificial. Each product page shows the full ingredient list for that flavor." },
    { q: "Are All Real products suitable for vegans?", a: "We offer dedicated plant-based recipe lines on our shop matching identical eco metrics." },
    { q: "Where do you ship to?", a: "We ship nationwide across India with standard shipping taking 3-5 business days." },
    { q: "How long will my order take?", a: "Standard dispatch arrivals settle within 2-4 business days." },
    { q: "How does the subscription service work?", a: "Save 10% on recurring automated monthly replenishment cycles cancelable anytime." },
    { q: "Can I return my order if there's a problem?", a: "Yes, we uphold 30-day claims protection support pipelines actively." },
    { q: "Do you sell to wholesale customers?", a: "Yes, connect distribution networks directly through our corporate merchant interface forms." },
  ];

  const contactEmail = "support@allrealnutrition.com";

  return (
    <div className="w-full bg-white overflow-x-hidden">
      <HappyBarLanding />
      
      <section className="py-12 bg-white">
        <div className="flex justify-center mx-auto px-4 lg:px-0 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mx-auto">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      <div id="all-products">
        <AllProductsSection products={products} />
      </div>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Pure Ingredients" subtitle="Simple. Natural. Honest." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mx-auto max-w-7xl">
            {ingredients.map((ingredient, i) => (
              <IngredientCard key={i} ingredient={ingredient} index={i} />
            ))}
          </div>
        </div>
      </section>

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
      
      <CraftsmanshipSection />
      <TestimonialSection />
      
      <FAQ faqs={faqsToUse} contactEmail={contactEmail} />
    </div>
  );
};

export default HomePage;