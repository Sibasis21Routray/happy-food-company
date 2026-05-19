import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BannerProps {
  badgeText?: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  productImage: string;
  productAlt?: string;
  accentColor?: string; // e.g., 'rgba(242, 215, 219, 0.75)'
  testimonialText?: string;
  testimonialAuthor?: string;
  leftFloatingImage?: string; // Optional side ingredients deco
  rightFloatingImage?: string; // Optional side ingredients deco
}

export const Banner: React.FC<BannerProps> = ({
  badgeText = "Real Food",
  headline = "We make our protein bars with 12 or less simple natural ingredients.",
  subheadline = "We mix our Milk Protein blend with a mixture of nut pieces and freshly ground nut butter, then add it to a blend of honey, chicory, dates, sea salt and natural flavouring.",
  ctaText = "SHOP NOW",
  productImage = "/images/cashew-cookie-dough.png",
  productAlt = "Protein Bar Pack",
  accentColor = "rgba(242, 215, 219, 0.75)", // Matches the soft pink hue exactly
  testimonialText = "“The best protein bars on the go! Healthy, tasty and so reliable!”",
  testimonialAuthor = "Marina G.",
  leftFloatingImage,
  rightFloatingImage,
}) => {
  return (
    <section className="relative w-full bg-white py-6 md:py-4 overflow-hidden select-none flex flex-col items-center">
      {/* Dynamic Font Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&family=Playfair+Display:ital,wght@1,500&display=swap');
        .font-brand-slab { font-family: 'Arvo', serif; }
        .font-brand-script { font-family: 'Playfair Display', serif; font-style: italic; }
      `}</style>

      {/* 1. BACKGROUND LAYER: Perfectly skewed decorative backdrop stripe */}
      <div
        className="absolute w-[120%] h-40 sm:h-48 md:h-56 top-[15%] md:top-[18%] left-1/2 -translate-x-1/2 -rotate-4 pointer-events-none z-0 transform origin-center"
        style={{ backgroundColor: accentColor }}
      />

      {/* 2. BACKGROUND SATELLITES: Breakout Edge Decos (e.g. sea salt bowls or nuts scattered) - ENLARGED */}
      {leftFloatingImage && (
        <div className="absolute left-[-40px] md:left-[-60px] top-[5%] md:top-[20%] w-36 sm:w-48 md:w-64 lg:w-72 z-10 pointer-events-none opacity-90 filter drop-shadow-md">
          <img src={leftFloatingImage} alt="deco-left" className="w-full object-contain" />
        </div>
      )}
      {rightFloatingImage && (
        <div className="absolute right-[-40px] md:right-[-60px] top-[12%] md:top-[20%] w-36 sm:w-48 md:w-64 lg:w-72 z-10 pointer-events-none opacity-90 filter drop-shadow-md">
          <img src={rightFloatingImage} alt="deco-right" className="w-full object-contain" />
        </div>
      )}

      {/* MAIN VIEWPORT CONTAINER */}
      <div className="container mx-auto px-6 max-w-4xl relative z-20 flex flex-col items-center text-center">
        
        {/* 3. CENTERPIECE FOCUS: Floating horizontal bar display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 45 }}
          className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] mb-8 md:mb-10 relative"
        >
          <img
            src={productImage}
            alt={productAlt}
            className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] transform -rotate-2 hover:rotate-0 transition-transform duration-500"
          />
        </motion.div>

        {/* 4. CONTENT BLOCK: Editorial Copy Details */}
        <div className="space-y-4 max-w-2xl flex flex-col items-center">
          {badgeText && (
            <span className="heading-2 text-2xl sm:text-3xl text-neutral-800 tracking-wide block">
              {badgeText}
            </span>
          )}

          <h2 className="font-brand-slab text-neutral-900 text-xl sm:text-2xl md:text-3xl font-bold leading-snug sm:leading-tight px-2">
            {headline}
          </h2>

          <p className="text-neutral-500 text-xs sm:text-sm font-normal leading-relaxed max-w-xl px-4">
            {subheadline}
          </p>
        </div>

        {/* 5. INTERACTION: Rounded Capsule Button Control */}
        <Link to={"/happy-shop"} className="mt-8">
          <button
            className="bg-[#111111] hover:bg-neutral-800 text-white font-bold tracking-widest text-[11px] px-8 py-3.5 rounded-full shadow-md transition-all duration-200 flex items-center justify-center space-x-2 group focus:outline-none"
          >
            <span>{ctaText}</span>
            <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

        {/* 6. PROOF FOOTER: Verified Customer Micro-Review Bubble */}
        {testimonialText && (
          <div className="mt-10 bg-white/70 backdrop-blur-xs border border-neutral-100/80 px-4 py-2.5 rounded-2xl flex items-center space-x-3 shadow-[0_8px_25px_rgba(0,0,0,0.03)] max-w-sm text-left">
            <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden shrink-0 border border-white">
              <div className="w-full h-full bg-gradient-to-tr from-amber-200 to-orange-300 flex items-center justify-center font-bold text-[10px] text-orange-950">
                {testimonialAuthor.charAt(0)}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-neutral-600 italic leading-tight font-medium">
                {testimonialText}
              </p>
              <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mt-0.5">
                {testimonialAuthor} <span className="text-emerald-500 font-medium font-sans">✓ Verified Customer</span>
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};