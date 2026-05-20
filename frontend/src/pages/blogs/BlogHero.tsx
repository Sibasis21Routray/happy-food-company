import React from "react";
import { motion } from "framer-motion";

interface BlogHeroProps {
  date?: string;
  title: string;
  author?: string;
  description?: string;
  accentColor?: string; // e.g., 'rgba(242, 215, 219, 0.6)'
  backgroundImage?: string; // Dynamic main post image
}

export const BlogHero: React.FC<BlogHeroProps> = ({
  date = "FEB 28, 2024",
  title = "Evan Lynch: It's That Time Of Year Again",
  author = "Vinay B",
  description,
  accentColor = "#f27547", // Perfect color-match for the pink band
  backgroundImage,
}) => {
  return (
    <section className="relative w-full pt-12 pb-6 md:pt-16 md:pb-8 overflow-hidden bg-white select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap');
        .blog-title-slab {
          font-family: 'Arvo', serif;
        }
      `}</style>

      {/* The Graphic Ribbon Layer:
        Positions dynamically across the wrapper to frame the text elements and sit beautifully behind the image breakout space.
      */}
      <div 
        className={`absolute pointer-events-none transform -skew-y-6 origin-center z-0 left-0 right-0 ${
          backgroundImage 
            ? "top-[45%] bottom-[20%] scale-y-[1.0]" 
            : "inset-0 scale-y-[0.35] sm:scale-y-[0.4]"
        }`}
        style={{ background: accentColor }}
      />

      {/* Main Column Layout Viewport */}
      <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center flex flex-col items-center">
        
        {/* Meta Stamp Header */}
        {date && (
          <motion.span 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase mb-3 block"
          >
            {date}
          </motion.span>
        )}

        {/* Serif Structural Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="blog-title-slab text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl leading-snug sm:leading-tight mb-3"
        >
          {title}
        </motion.h1>

        {/* Author Byline Credit Label */}
        {author && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="text-xs font-normal text-neutral-600 tracking-wide mb-8"
          >
            Posted by <span className="text-neutral-800 font-medium hover:underline cursor-pointer">{author}</span>
          </motion.p>
        )}

        {/* Dynamic Image Canvas Breakout Frame */}
        {backgroundImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, type: "spring", stiffness: 50 }}
            className="w-full max-w-5xl aspect-[16/9] sm:aspect-[21/10] md:aspect-[12/6] rounded-md overflow-hidden bg-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-neutral-200/40 relative z-20 mb-8"
          >
            <img 
              src={backgroundImage} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Optional Context Narrative Description Block */}
        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="text-neutral-500 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed font-normal tracking-normal"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
};