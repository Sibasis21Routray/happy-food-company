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

      {/* <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 40 } : { width: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="h-px bg-gradient-to-r from-orange-300 to-orange-400 rounded-full mx-auto mt-6"
      /> */}
    </div>
  );
};

// ========== HAPPY BAR LANDING COMPONENT WITH ENHANCED ANIMATIONS ==========

const HappyBarLanding: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

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

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, type: "spring", stiffness: 90, damping: 20 },
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
          Indias's Favorite Protein Bars Has Landed —{" "}
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
        className="relative w-full min-h-[65vh] bg-gray-100 flex items-center overflow-hidden py-12 md:py-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.1) 70%), url('https://m.gettywallpapers.com/wp-content/uploads/2023/12/Gym-Exercise-PC-Wallpaper.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
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
                {/* Dry Ink Brush Script Accent - Using heading-2 class */}
                <h2 className="heading-2 text-3xl sm:text-4xl md:text-5xl mb-1 lg:-ml-1 transform -rotate-[1deg]">
                  Real Food
                </h2>

                {/* Premium Slab Serif Headings - Using heading-1 class */}
                <h1 className="heading-1 text-4xl sm:text-5xl md:text-6xl text-white mt-2">
                  Real People.
                  <br />
                  Real Impact.
                </h1>
              </div>
            </motion.div>
            <motion.img
              src="/images/cashew-raisin.png"
              alt="Happy Bar Cashew Cookie Dough Protein Bar"
              className="block lg:hidden mx-auto h-fit sm:h-64 object-contain z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] -rotate-10"
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ duration: 0.3 }}
            />

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
                Over 2500+ 5 Star Reviews
              </p>
            </motion.div>

            {/* Live Floating Testimonial Capsule */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-xl shadow-lg border border-white/20 text-left max-w-sm mt-6"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                <img
                  src="https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
                  alt="Marina G."
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-body text-xs text-gray-800 font-medium leading-snug">
                  "The best protein bars on the go! Healthy, tasty and so
                  reliable!"
                </p>
                <span className="text-muted text-[10px] font-bold block mt-0.5">
                  Marina G.{" "}
                  <span className="text-gray-400 font-normal">
                    • Verified Customer
                  </span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.img
        src="/images/cashew-raisin.png"
        alt="Happy Bar Cashew Cookie Dough Protein Bar"
        className="absolute lg:block hidden  md:top-90 left-100 w-full h-114 md:h-94 lg:h-134 xl:h-110 object-contain z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] -rotate-10"
        whileHover={{ scale: 1.02, rotate: -1 }}
        transition={{ duration: 0.3 }}
      />

      {/* --- SECTION 2: BRAND VALUE PROPOSITION --- */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 py-15">
        {/* Left Column: Heading and Text Branding */}
        <div className="space-y-4 max-w-md text-center lg:text-left">
          <div className="space-y-1">
            <h2 className="heading-1 text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
              Why choose <br className="hidden lg:inline" /> Happy Bar
              Nutrition?
            </h2>
            <p className="text-body text-neutral-500 text-base">
              Good for you - and the planet.
            </p>
          </div>

          <div className="pt-2 space-y-1">
            {/* Using heading-2 class for brush script style */}
            <h2 className="heading-2 text-3xl md:text-4xl text-neutral-800 font-medium tracking-wide">
              Real Food
            </h2>
            <p className="text-body text-neutral-700 text-xs md:text-sm max-w-xs mx-auto lg:mx-0 leading-relaxed">
              Made in a kitchen, not a lab. Great for the gut and for the taste
              buds.
            </p>
          </div>
        </div>

        {/* Right Column: Central Badges & Global Eco System Compliance Icons */}
        <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12 lg:w-auto">
          {/* Circular Badges Section */}
          <div className="flex items-center gap-4 sm:gap-5 justify-center">
            {/* Proudly Irish Made Badge */}
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-[#BCE1BC] bg-[#E3F4E3] flex flex-col items-center justify-center p-1.5 text-center select-none shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-transform hover:scale-105 duration-300">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#4A7A4A]">
                Proudly
              </span>
              <span className="brand-serif-headline text-sm sm:text-base font-bold tracking-tight text-[#2B542B] my-0.5">
                IRISH
              </span>
              <span className="text-[8px] uppercase font-bold text-[#4A7A4A] tracking-wider">
                Made
              </span>
            </div>

            {/* Protein 16g Per Bar Badge */}
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-[#F5C2CB] bg-[#FCECEF] flex flex-col items-center justify-center p-1.5 text-center select-none shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-transform hover:scale-105 duration-300">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#A34757]">
                Protein
              </span>
              <span className="brand-serif-headline text-xl sm:text-2xl font-bold text-[#6B2431] leading-none my-0.5">
                16g
              </span>
              <span className="text-[8px] uppercase font-bold text-[#A34757] tracking-wider">
                Per Bar
              </span>
            </div>

            {/* Less Than 12 Ingredients Badge */}
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-[#B4D6EB] bg-[#E3F2FC] flex flex-col items-center justify-center p-1.5 text-center select-none shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-transform hover:scale-105 duration-300">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#31698A]">
                Less Than
              </span>
              <span className="brand-serif-headline text-xl sm:text-2xl font-bold text-[#1E4359] leading-none my-0.5">
                12
              </span>
              <span className="text-[8px] uppercase font-bold text-[#31698A] tracking-wider">
                Ingredients
              </span>
            </div>
          </div>

          {/* Eco Certifications List Block */}
          <div className="flex items-center gap-6 sm:gap-8 border-t sm:border-t-0 sm:border-l border-neutral-200 pt-6 sm:pt-0 sm:pl-8 justify-center">
            {/* Plastic Free Item */}
            <div className="flex items-center gap-3 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0">
                <div className="w-full h-full rounded-full border border-neutral-900 flex flex-col items-center justify-center p-1 text-center font-bold text-[8px] font-mono font-black leading-none uppercase tracking-tighter text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-white duration-300">
                  <span>Plastic</span>
                  <span className="text-[10px] font-black mt-0.5 border-t border-neutral-900 group-hover:border-white pt-0.5">
                    Free
                  </span>
                </div>
              </div>
              <div className="leading-none">
                <h4 className="heading-4 text-xs font-bold text-neutral-900">
                  Plastic-free
                </h4>
                <p className="text-muted text-[11px] mt-0.5">Packaging</p>
              </div>
            </div>

            {/* Home Compostable Item */}
            <div className="flex items-center gap-3 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0">
                <div className="w-full h-full rounded-full border border-neutral-900 flex items-center justify-center text-lg text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-white duration-300">
                  🌱
                </div>
              </div>
              <div className="leading-none">
                <h4 className="heading-4 text-xs font-bold text-neutral-900">
                  Home
                </h4>
                <p className="text-muted text-[11px] mt-0.5">Compostable</p>
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
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 text-left py-2 cursor-pointer"
    >
      {/* Minimalist Black Vector Stamp Graphic */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
        <img
          src={feature.img}
          alt={feature.title}
          className="w-full h-full object-contain text-neutral-900"
        />
      </div>

      {/* Horizontal Text Breakdown Stack */}
      <div className="flex flex-col justify-center max-w-[160px]">
        {/* Bold Slab Title - Using heading-4 */}
        <h4 className="heading-4 font-bold text-neutral-800 text-sm sm:text-base tracking-tight">
          {feature.title}
        </h4>

        {/* Subdued Meta Description Text if available */}
        {feature.desc && (
          <p className="text-muted text-[11px] sm:text-xs mt-0.5 leading-tight">
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

// Craftsmanship Section
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
    <section className="mb-14 md:mb-22 bg-white overflow-hidden">
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
                  transition={{
                    delay: idx * 0.15,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <motion.span
                      className="heading-1 text-6xl md:text-7xl font-black text-orange-100"
                      whileHover={{ scale: 1.05, color: "#FED7AA" }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.step}
                    </motion.span>
                    <motion.h3
                      className="heading-3 text-2xl md:text-3xl text-gray-900 mt-2 tracking-tight"
                      whileHover={{ x: 5, color: "#F97316" }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-muted mt-2 leading-relaxed max-w-md mx-auto md:mx-0">
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
                        <IconComponent
                          className="w-7 h-7 md:w-8 md:h-8 text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-orange-400/20 blur-xl -z-10"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.3,
                      }}
                    />
                  </motion.div>

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

  // Layout color rotation mapping based on the circle backdrops from your files
  const circleColors = [
    "bg-[#7BC6E8]", // Sky Blue backdrop
    "bg-[#FFCD43]", // Warm Yellow backdrop
    "bg-[#AECB75]", // Sage Green backdrop
    "bg-[#DCA4E6]", // Soft Purple backdrop
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
                  <h3 className="heading-3 text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight leading-tight">
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
    {
      title: "ALMONDS",
      img: "/ingredients/almond.png",
      desc: "Rich in vitamin E and healthy fats for heart health",
    },
    {
      title: "CRANBERRIES",
      img: "/ingredients/Cranberry.png",
      desc: "Packed with antioxidants and natural sweetness",
    },
    {
      title: "CASHEWS",
      img: "/ingredients/cashew.png",
      desc: "Creamy texture with essential minerals and protein",
    },
    {
      title: "RAISINS",
      img: "/ingredients/raisin.png",
      desc: "Natural energy boost with iron and fiber",
    },
    {
      title: "COCONUT",
      img: "/ingredients/Coconut Craze.png",
      desc: "Healthy MCTs for sustained energy release",
    },
    {
      title: "PEANUTS",
      img: "/ingredients/Peanut.png",
      desc: "Plant-based protein and heart-healthy fats",
    },
    {
      title: "JAGGERY",
      img: "/ingredients/Jaggery.png",
      desc: "Unrefined sweetener rich in minerals",
    },
    {
      title: "DATES",
      img: "/ingredients/Date.png",
      desc: "Naturally sweet with fiber and essential nutrients",
    },
  ];

  const faqsToUse = [
    {
      q: "What are the ingredients?",
      a: "Our bars are made with 12 or fewer real food ingredients, nothing artificial. We use grass-fed milk protein from family farms in Ireland's County Kerry, plus mineral-rich Irish Atlantic sea salt. Each product page shows the full ingredient list for that flavor.",
    },
    {
      q: "Are Happy Bar products suitable for vegans?",
      a: "We offer dedicated plant-based recipe lines on our shop matching identical eco metrics. Our vegan range uses premium plant proteins from peas and rice, delivering the same great taste and nutrition profile.",
    },
    {
      q: "Where do you ship to?",
      a: "We ship nationwide across Ireland, the UK, and international European sectors seamlessly. Standard shipping takes 3-5 business days, with express options available at checkout.",
    },
    {
      q: "How long will my order take?",
      a: "Standard dispatch arrivals settle within 2-4 business fulfillment loops cleanly. You'll receive tracking information via email once your order ships.",
    },
    {
      q: "How does the subscription service work?",
      a: "Save 10% on recurring automated monthly replenishment cycles cancelable anytime. Choose your favorite bars, set delivery frequency, and we'll handle the rest. No commitment, pause or cancel whenever you like.",
    },
    {
      q: "Can I return my order if there's a problem?",
      a: "Yes, we uphold 30-day claims protection support pipelines actively. If you're not satisfied with your purchase, contact our support team for a full refund or replacement.",
    },
    {
      q: "Do you sell to wholesale customers?",
      a: "Yes, connect distribution networks directly through our corporate merchant interface forms. We offer bulk pricing for gyms, cafes, retail stores, and corporate wellness programs.",
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
      <section className="py-12 bg-white">
        <div className=" flex justify-center mx-auto px-4 lg:px-0 max-w-7xl">
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
            title="Pure Ingredients"
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

      {/* FAQ Section */}
      <FAQ faqs={faqsToUse} contactEmail={contactEmail} />

    </div>
  );
};

export default HomePage;
