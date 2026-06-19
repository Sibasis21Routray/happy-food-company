import React, { useRef, useState, useEffect } from "react";
import { motion, Variants, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Mail,
  Quote,
  Star,
} from "lucide-react";

import {
  Eye,
  ShoppingBag,
  Leaf,
  Zap,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import {
  Snowflake,
  Hand,
  Package,
  ArrowRight,
  Award,
  Heart,
  Sparkles,
} from "lucide-react";
import { ShopNowSection } from "../components/ShopNowSection";

import { Factory, Calendar, Apple, Globe, Users } from "lucide-react";

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
        className="heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 px-2"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="sub-heading text-gray-700 max-w-2xl mx-auto text-md sm:text-md px-4"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

// ========== HAPPY BAR LANDING COMPONENT WITH ENHANCED ANIMATIONS ==========

const HappyBarLanding: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Image carousel data
  const carouselImages = [
    {
      src: "/images/cashew-raisin.png",
      alt: "Happy Bar Cashew Cookie Dough Protein Bar"
    },
    {
      src: "/images/coconut-almond.png",
      alt: "Happy Bar Coconut Almond Protein Bar"
    },
    {
      src: "/images/date-almond-cranberry.png",
      alt: "Happy Bar Date Almond Cranberry Protein Bar"
    },
    {
      src: "/images/almond-cranberry.png",
      alt: "Happy Bar Almond Cranberry Protein Bar"
    }
  ];

  // State for current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-scroll effect - changes image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Animation variants tailored for crisp presentation
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
    <div className="w-full min-h-screen bg-white text-[#1A1A1A] font-sans overflow-x-hidden">
      {/* Top Notification Banner */}
      <div className="w-full mt-20 bg-black text-white text-center py-2 px-4 text-xs md:text-sm tracking-widest uppercase font-medium flex items-center justify-center gap-2 border-b border-gray-800">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span className="text-body">
          India's Favorite Protein Bars Has Landed —{" "}
          <Link
            to={"/happy-shop"}
            className="underline cursor-pointer lowercase font-normal"
          >
            Try it today
          </Link>
        </span>
      </div>

      {/* --- SECTION 1: HERO SECTION --- */}
      <section
        ref={sectionRef}
        className="
    relative w-full min-h-[75vh]  
    flex items-center overflow-hidden
    py-12 md:py-0
    bg-gray-100

    bg-[linear-gradient(to_right,rgba(0,0,0,0.45)_30%,rgba(0,0,0,0.1)_70%),url('/homepage/Gym-Exercise-PC-Wallpaper-sm.png')]
    md:bg-[linear-gradient(to_right,rgba(0,0,0,0.45)_30%,rgba(0,0,0,0.1)_70%),url('/homepage/Gym-Exercise-PC-Wallpaper.jpg')]

    bg-cover bg-center bg-no-repeat
  "
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
          {/* Hero Text Copy */}
          <motion.div
            className="col-span-1 lg:col-span-6 text-white space-y-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="space-y-1">
              {/* Main Headline Stack - Using global typography classes */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-0 lg:pt-4">
                <h1 className="heading-1 text-4xl sm:text-5xl md:text-6xl text-white mt-2">
                  All natural ingredients.
                  <br />
                  Nothing Artificial.
                </h1>
              </div>
            </motion.div>

            {/* MOBILE CAROUSEL - Horizontal slide only with hidden scrollbar */}
            <div className="block lg:hidden relative w-full max-w-xs mx-auto">
              <div 
                className="relative overflow-hidden" 
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none' 
                }}
              >
                <style>{`
                  .relative.overflow-hidden::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={carouselImages[currentImageIndex].src}
                    alt={carouselImages[currentImageIndex].alt}
                    className="mx-auto h-64 sm:h-72 object-contain z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] -rotate-10"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    whileHover={{ scale: 1.02, rotate: -1 }}
                  />
                </AnimatePresence>
              </div>

              {/* Dot indicators for mobile */}
              {/* <div className="flex justify-center gap-2 mt-4">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`transition-all duration-300 ${
                      currentImageIndex === idx 
                        ? 'w-6 h-1.5 bg-white/80' 
                        : 'w-3 h-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div> */}
            </div>

            {/* CTA Button Link */}
            <motion.div variants={itemVariants} className="pt-0 lg:pt-4">
              <Link
                to={"/happy-shop"}
                className="px-10 py-3.5 bg-[#141414] hover:bg-black text-white rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border border-gray-800 inline-flex items-center gap-3 group shadow-xl"
              >
                <span>Shop Now</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </span>
              </Link>
            </motion.div>

            {/* Social Proof Stars */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-2 pt-4"
            >
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-body text-xs md:text-sm text-gray-300 font-medium tracking-wide">
                Highly rated by satisfied customers
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DESKTOP CAROUSEL - Horizontal slide only with hidden scrollbar */}
      <div className="absolute lg:block hidden md:top-90 lg:top-80 left-110 w-full h-114 md:h-94 lg:h-134 xl:h-[42vh]">
        <div 
          className="relative w-full h-full overflow-hidden"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none' 
          }}
        >
          <style>{`
            .relative.w-full.h-full.overflow-hidden::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={carouselImages[currentImageIndex].src}
              alt={carouselImages[currentImageIndex].alt}
              className="w-full h-full object-contain z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] -rotate-10"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              whileHover={{ scale: 1.02, rotate: -1 }}
            />
          </AnimatePresence>
        </div>

        {/* Dot indicators for desktop */}
        {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center gap-2 mt-4">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`transition-all duration-300 ${
                currentImageIndex === idx 
                  ? 'w-6 h-1.5 bg-white/80' 
                  : 'w-3 h-1.5 bg-white/30'
              }`}
            />
          ))}
        </div> */}
      </div>

      {/* --- SECTION 2: BRAND VALUE PROPOSITION --- */}
      <div className="flex justify-center mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14 py-15">
        <h2 className="heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-neutral-900 px-1">
          Why choose Happy Bar ?
        </h2>
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
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.05 }}
      className="
        flex flex-col sm:flex-row
        items-center
        text-center sm:text-left
        gap-3
        py-2
        cursor-pointer
      "
    >
      {/* Image */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
        <img
          src={feature.img}
          alt={feature.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center max-w-[160px] sm:max-w-[180px]">
        <h4 className="heading-4 font-bold text-[#F05E26] text-sm sm:text-base tracking-tight">
          {feature.title}
        </h4>

        {feature.desc && (
          <p className="text-muted text-[11px] sm:text-xs mt-1 leading-tight">
            {feature.desc}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// --- INGREDIENT CARD COMPONENT ---
const IngredientCard = ({
  ingredient,
  index,
}: {
  ingredient: any;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  // Custom Allergen Box variant matching the image exactly
  if (ingredient.isAllergenCard) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.5, delay: index * 0.04 }}
        className="w-full bg-[#DCE7F4] rounded-lg px-6 py-8 flex flex-col items-center text-center justify-between min-h-[300px]"
      >
        {/* Flat Line-Art Document Graphic Symbol */}
        <div className="text-neutral-700 mt-2">
          <svg
            className="w-12 h-12 stroke-[1.2]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </div>

        {/* Text Details Area */}
        <div className="space-y-2.5 max-w-[200px] my-auto">
          <h4 className="heading-4 font-bold text-neutral-800 text-base tracking-tight">
            Allergen Information
          </h4>
          <p className="text-muted text-xs leading-relaxed">
            All our products contain the following allergens: Milk, Legumes and
            Tree Nuts.
          </p>
        </div>

        {/* Lower Call-To-Action Link */}
        <div className="mb-2">
          <a
            href="#product-info"
            className="text-xs font-normal text-neutral-700 underline underline-offset-4 hover:text-neutral-900 transition-colors"
          >
            Open Product Information
          </a>
        </div>
      </motion.div>
    );
  }

  // Pure Minimalist Product Ingredient variant layout
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="flex flex-col items-center text-center w-full group"
    >
      {/* Frame-free Isolated Ingredient Asset Box */}
      <div className="w-full h-32 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-103">
        <img
          src={ingredient.img}
          alt={ingredient.title}
          className="max-w-[90%] max-h-full object-contain"
        />
      </div>

      {/* Structured Text Content Block */}
      <div className="space-y-2 max-w-[240px]">
        {/* Bold Title Styling - Using heading-4 */}
        <h4 className="heading-4 font-bold text-neutral-800 text-base sm:text-lg tracking-tight leading-snug">
          {ingredient.title}
        </h4>

        {/* Minimal Editorial Copy */}
        <p className="text-muted text-xs leading-relaxed">{ingredient.desc}</p>
      </div>
    </motion.div>
  );
};

const testimonials = [
  {
    quote:
      "The cleanest protein bar I've ever tasted. No artificial aftertaste, just real ingredients.",
    author: "Priya M.",
    role: "Wellness Coach",
  },
  {
    quote:
      "Finally a healthy snack that doesn't compromise on taste. The Cashew Raisin is my daily go-to.",
    author: "Arjun K.",
    role: "Verified Buyer",
  },
  {
    quote:
      "My kids love them, and I love that they're getting real nutrition. Win-win!",
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
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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
                  <Star
                    key={i}
                    size={16}
                    className="text-orange-400 fill-orange-400"
                  />
                ))}
              </div>

              <blockquote className="relative mb-8">
                <p className="text-body text-gray-700 text-lg leading-relaxed font-medium tracking-tight">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4 border-t border-orange-50 pt-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                  <span className="text-body">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="heading-4 text-gray-900 text-sm font-bold tracking-tight">
                    {testimonial.author}
                  </p>
                  <p className="text-muted text-orange-500/80 text-[11px] uppercase font-semibold tracking-widest">
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

// Craftsmanship Section - Fully Responsive for Mobile, Tablet, and Desktop
const CraftsmanshipSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      step: "01",
      title: "Source the Best",
      desc: "We select premium nuts, fruits, and wholesome ingredients from trusted suppliers.",
      icon: Leaf,
    },
    {
      step: "02",
      title: "Blend Naturally",
      desc: "Every recipe is crafted to balance taste, texture, and nutrition using real ingredients.",
      icon: Snowflake,
    },
    {
      step: "03",
      title: "Quality Assured",
      desc: "Produced in our modern Bangalore manufacturing facility with strict quality controls.",
      icon: Hand,
    },
    {
      step: "04",
      title: "Packed Fresh",
      desc: "Sealed for freshness and convenience so every bar tastes as good as intended.",
      icon: Package,
    },
  ];

  return (
    <section className="pt-0 -mt-16 md:-mt-24 pb-12 md:pb-22 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Crafted with Care"
          subtitle="From carefully selected ingredients to every finished bar, quality comes first."
        />

        <div ref={ref} className="relative mt-12 md:mt-16">
          {/* Timeline connector line - dynamically adjusts positions cleanly between mobile and desktop styles */}
          <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-200 via-orange-300/50 to-transparent transform md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-8">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: idx * 0.12,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`flex flex-row md:items-center gap-6 md:gap-12 w-full ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Left content block wrapper */}
                  <div
                    className={`flex-1 text-left ${
                      idx % 2 === 0 ? "md:items-end" : "md:text-left"
                    } pl-16 md:pl-0`}
                  >
                    <div className="flex flex-col">
                      <motion.span
                        className="heading-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-orange-100/90 leading-none select-none"
                        whileHover={{ scale: 1.05, color: "#FED7AA" }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.step}
                      </motion.span>
                      <motion.h3
                        className="heading-3 text-xl sm:text-2xl md:text-3xl text-gray-900 mt-1 tracking-tight font-bold"
                        whileHover={{
                          x: idx % 2 === 0 ? -5 : 5,
                          color: "#F97316",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.title}
                      </motion.h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-sm ml-0 mr-auto md:mx-auto lg:mx-0">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Central Icon Node Indicator Segment */}
                  <div className="absolute left-0 md:relative md:left-auto flex justify-center items-center z-10 w-20 md:w-auto">
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 6 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {/* Outer ring */}
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center shadow-md">
                        {/* Inner circle */}
                        <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-inner">
                          <IconComponent
                            className="w-5 h-5 md:w-6 md:h-6 text-white"
                            strokeWidth={2}
                          />
                        </div>
                      </div>

                      {/* Animated Glow effect ring structure */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-orange-400/20 blur-lg -z-10"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.3,
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Balanced Spacer node for mirroring grid symmetry cleanly on wide device sizes */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

//additional section

const QualityHighlights = () => {
  const highlights = [
    {
      title: "World-Class Manufacturing Facility",
      desc: "Produced in Bangalore using modern equipment and robust food safety processes.",
      bgImage: "https://pbs.twimg.com/media/DLxYScxX0AA-Eu4.jpg",
      gridClass: "lg:col-span-4",
    },
    {
      title: "Stringent Quality Standards",
      desc: "Every batch undergoes quality checks to ensure consistency, safety, and taste.",
      bgImage: "https://etimg.etb2bimg.com/photo/109858507.cms",
      gridClass: "lg:col-span-4",
    },
    {
      title: "Made with Pure Ghee",
      desc: "A traditional ingredient that adds richness and flavour to every bar.",
      bgImage:
        "https://cdn.shopify.com/s/files/1/0703/8029/0267/files/ChatGPT_Image_Mar_28_2026_12_51_01_AM.png?v=1774639341",
      gridClass: "lg:col-span-4",
      highlightTitle: true,
    },
    {
      title: "9-Month Shelf Life",
      desc: "TÜV-certified shelf life for confidence in quality and freshness.",
      bgImage:
        "https://www.madgetech.com/wp-content/uploads/2020/09/ExpirationDates-Full.jpg",
      gridClass: "lg:col-span-3",
    },
    {
      title: "Real Ingredients Only",
      desc: "Made with nuts, fruits, milk protein, jaggery, and pure ghee.",
      bgImage:
        "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=80",
      gridClass: "lg:col-span-3",
    },
    {
      title: "Proudly Made in India",
      desc: "Locally manufactured with global-quality production standards.",
      bgImage:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
      gridClass: "lg:col-span-3",
    },
    {
      title: "Trusted by Families",
      desc: "A convenient snack made with ingredients you know and trust.",
      bgImage:
        "https://st2.depositphotos.com/2234518/5181/i/450/depositphotos_51818167-stock-photo-family-portrait-with-thumbs-up.jpg",
      gridClass: "lg:col-span-3",
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
    },
  };

  return (
    <section className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Additional Quality Highlights"
          subtitle="Uncompromising Standards Premium Ingredients "
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-12
            gap-4 md:gap-6
          "
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.015,
                transition: { duration: 0.2 },
              }}
              className={`
                relative
                overflow-hidden
                rounded-3xl
                shadow-sm
                group
                flex flex-col justify-end

                min-h-[280px]
                sm:min-h-[320px]
                md:min-h-[340px]

                col-span-1
                ${item.gridClass}
              `}
            >
              {/* Background Image */}
              <div
                className="
                  absolute inset-0
                  bg-cover bg-center bg-no-repeat
                  transition-transform duration-700 ease-out
                  group-hover:scale-105
                "
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                }}
              />

              {/* Gradient Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/95
                  via-black/60
                  to-transparent
                  transition-opacity duration-300
                  group-hover:from-black
                "
              />

              {/* Content */}
              <div className="relative z-10 p-5 sm:p-6 md:p-8">
                <h3
                  className="
                    text-xl
                    sm:text-2xl
                    lg:text-3xl
                    font-extrabold
                    tracking-tight
                    text-white
                    leading-tight
                    mb-3
                  "
                >
                  {item.highlightTitle && item.title.includes("Ghee") ? (
                    <>
                      Made with <br />
                      <span className="text-[#ff5722]">
                        {item.title.replace("Made with ", "")}
                      </span>
                    </>
                  ) : (
                    item.title
                  )}
                </h3>

                <p
                  className="
                    text-gray-300
                    font-normal
                    leading-relaxed
                    text-sm
                    lg:text-base
                    max-w-sm
                  "
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ========== FAQ ACCORDION ITEM COMPONENT ==========
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
        <span className="heading-4 font-bold text-sm md:text-base tracking-wide text-gray-900 group-hover:text-orange-600 transition-colors">
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
            <p className="text-body text-xs md:text-sm text-gray-600 leading-relaxed pb-5 max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ========== MAIN FAQ COMPONENT ==========
const FAQ = ({ faqs, contactEmail = "woohoo@thehappyfoodcompany.com" }) => {
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
        {/* FAQ Left Header Deck */}
        <motion.div
          ref={sectionRef}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:col-span-5 space-y-6"
        >
          <div className="space-y-2">
            <h2 className="heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 leading-tight">
              Frequently Asked
            </h2>
            <h2 className="heading-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Questions
            </h2>
          </div>

          <motion.div
            className="space-y-1 text-sm pt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-body text-gray-600 font-medium">
              Still have a query?
            </p>
            <motion.p
              whileHover={{ x: 5 }}
              className="text-body text-gray-900 font-bold underline cursor-pointer hover:text-orange-600 transition-colors inline-block"
            >
              Get in touch with us
            </motion.p>
            <br />
            <a
              href={`mailto:${contactEmail}`}
              className="text-body text-orange-600 font-semibold block pt-1 hover:underline inline-flex items-center gap-2 group"
            >
              <Mail
                size={14}
                className="group-hover:scale-110 transition-transform"
              />
              {contactEmail}
            </a>
          </motion.div>
        </motion.div>

        {/* FAQ Accordions Framework Component */}
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
    "bg-[#8985B0]", // Darkened from #ADAAC7
    "bg-[#F2AD69]", // Darkened from #E7B27E
    "bg-[#D58689]", // Darkened from #D69B9C
    "bg-[#C17FAF]", // Darkened from #D0A1C3
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto ">
        {/* --- BRANDED HEADER DECK --- */}
        <div className="text-center mb-20 space-y-3">
          <h2 className="heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl  tracking-tight text-neutral-900">
            All Products
          </h2>
          <p className="text-body sub-heading text-neutral-500 max-w-xl mx-auto text-sm sm:text-base tracking-wide">
            Experience our complete range of clean energy. No fillers, no
            secrets, just real food.
          </p>
        </div>

        {/* --- AUTHENTIC GRID WITH STAGGER ANIMATION --- */}
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
                {/* Product Box Frame Wrapper */}
                <Link
                  to={`/product/${product.slug}`}
                  className="relative w-full aspect-square flex items-center justify-center mb-6 block"
                >
                  {/* Clean Geometric Backdrop Circle */}
                  <div
                    className={`absolute w-[82%] h-[82%] rounded-full ${currentBg} transition-transform duration-500 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
                  />

                  {/* Tilted Floating Product Packaging Assembly */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                    <motion.img
                      src={product.img}
                      alt={product.name}
                      className="w-[88%] h-auto object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)]"
                      animate={
                        isHovered
                          ? {
                              scale: 1.05,
                              rotate: -12,
                              y: -6,
                            }
                          : {
                              scale: 1,
                              rotate: -8,
                              y: 0,
                            }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 22,
                      }}
                    />
                  </div>
                </Link>

                {/* Product Typography Block */}
                <div className="space-y-3 w-full px-2 flex flex-col items-center flex-1">
                  <h3 className="heading-3 text-lg sm:text-xl font-bold text-neutral-900 tracking-tight leading-tight">
                    {product.name}
                  </h3>

                  <p className="text-body text-sm text-neutral-600 leading-relaxed max-w-[260px] mx-auto min-h-[60px]">
                    {product.desc || "Find your favourite flavour"}
                  </p>

                  <div className="pt-3 w-full max-w-[200px] mt-auto">
                    <Link
                      to={`/product/${product.slug}`}
                      className=" w-full py-3 bg-[#141414] hover:bg-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                      <span>SHOP NOW</span>
                      <span className="text-xs font-normal  group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
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
    {
      title: "REAL INGREDIENTS",
      desc: "Made with nuts, fruits, jaggery, and other wholesome ingredients you can recognize.",
      img: "/homepage/leaf.png",
    },
    {
      title: "NATURALLY DELICIOUS",
      desc: "Sweetened with dates, raisins, cranberries, and jaggery—not loaded with refined sugars.",
      img: "/homepage/lotus_2610118.png",
    },
    {
      title: "PROTEIN & ENERGY",
      desc: "A convenient source of protein and sustained energy for busy days.",
      img: "/homepage/energy-bar_7634814.png",
    },
    {
      title: "PURE GHEE GOODNESS",
      desc: "Crafted with pure ghee for rich taste and traditional goodness.",
      img: "/homepage/sugar-free.png",
    },
    {
      title: "NO ARTIFICIAL PRESERVATIVES",
      desc: "Nothing artificial. No preservatives, flavours, or colourings.",
      img: "/homepage/no-preservatives_4411195.png",
    },
    {
      title: "MADE IN INDIA",
      desc: "Manufactured in Bangalore under stringent quality and food safety standards.",
      img: "/homepage/rupee-symbol.png",
    },
  ];

  const ingredients = [
    {
      title: "ALMONDS",
      img: "/ingredients/almond.png",
      desc: "Rich in vitamin E, protein, and healthy fats that support overall wellbeing.",
    },
    {
      title: "CRANBERRIES",
      img: "/ingredients/Cranberry.png",
      desc: "Naturally tart and packed with antioxidants for a burst of flavour.",
    },
    {
      title: "CASHEWS",
      img: "/ingredients/cashew.png",
      desc: "Creamy, delicious, and a natural source of protein and essential minerals.",
    },
    {
      title: "RAISINS",
      img: "/ingredients/raisin.png",
      desc: "A naturally sweet source of energy, fibre, and micronutrients.",
    },
    {
      title: "COCONUT",
      img: "/ingredients/Coconut Craze.png",
      desc: "Provides flavour, texture, and naturally occurring healthy fats.",
    },
    {
      title: "PEANUTS",
      img: "/ingredients/Peanut.png",
      desc: "Packed with plant-based protein and satisfying crunch.",
    },
    {
      title: "JAGGERY",
      img: "/ingredients/Jaggery.png",
      desc: "A traditional unrefined sweetener made from sugarcane.",
    },
    {
      title: "DATES",
      img: "/ingredients/Date.png",
      desc: "Naturally sweet and rich in fibre, making them a perfect energy source.",
    },
  ];

  const faqsToUse = [
    {
      q: "What ingredients are used in Happy Bars?",
      a: "Happy Bars are made using real ingredients such as almonds, cashews, peanuts, coconut, dates, raisins, cranberries, jaggery, milk protein, and pure ghee. Each flavour has its own unique blend, but every recipe is built around simple, wholesome ingredients.",
    },
    {
      q: "Do Happy Bars contain artificial preservatives?",
      a: "No. Happy Bars contain no artificial preservatives, flavours, or colourings.",
    },
    {
      q: "What sweeteners are used in Happy Bars?",
      a: "We use ingredients such as dates, raisins, cranberries, and jaggery to provide natural sweetness and great taste.",
    },
    {
      q: "What makes Happy Bar different?",
      a: "We focus on simple ingredients and honest nutrition. Happy Bars are made with pure ghee and real foods, without artificial preservatives, flavours, or colourings.",
    },
    {
      q: "Where are Happy Bars manufactured?",
      a: "Happy Bars are proudly manufactured in Bangalore, India, in a modern food production facility operating under stringent quality and food safety standards.",
    },
    {
      q: "How long do Happy Bars stay fresh?",
      a: "Happy Bars have a shelf life of up to 9 months when stored according to the instructions on the pack.",
    },
    {
      q: "Do you supply retailers and distributors?",
      a: "Yes. We work with supermarkets, retail chains, distributors, gyms, cafés, educational institutions, and corporate wellness programs across India.",
    },
  ];

  const contactEmail = "woohoo@thehappyfoodcompany.com";

  return (
    <div className="w-full bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative">
        <HappyBarLanding />
      </section>

      {/* Features Section */}
      <section className="py-2 bg-white px-2">
        <div className=" flex justify-center mx-auto px-0 max-w-full md:max-w-10/12 ">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mx-auto">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <div id="all-products">
        <AllProductsSection products={products} />
      </div>

      {/* Ingredients Section */}
      <section className="mt-15 sm:mt-15 md:mt-15 ">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Meet the Ingredients Behind Every Happy Bar"
            subtitle="Simple. Natural. Honest."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mx-auto max-w-7xl">
            {ingredients.map((ingredient, i) => (
              <IngredientCard key={i} ingredient={ingredient} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Combo Offers Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <ShopNowSection />
      </section>

      <CraftsmanshipSection />
      <TestimonialSection />
      <QualityHighlights />
      {/* FAQ Section */}
      <FAQ faqs={faqsToUse} contactEmail={contactEmail} />
    </div>
  );
};

export default HomePage;