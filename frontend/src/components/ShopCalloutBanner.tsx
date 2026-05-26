import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ShopCalloutBannerProps {
  /**
   * The image source for the floating product mockup
   * @default "/images/cashew-raisin.png"
   */
  productImage?: string;
  
  /**
   * Alt text for the product image
   * @default "Happy Bar Nutrition Protein Bar Package"
   */
  productImageAlt?: string;
  
  /**
   * The brush script style heading text (smaller, decorative)
   * @default "Real Food"
   */
  scriptHeading?: string;
  
  /**
   * The main bold serif heading text
   * @default "Real People.<br />Real Impact."
   */
  mainHeading?: string;
  
  /**
   * Button text
   * @default "Shop Now"
   */
  buttonText?: string;
  
  /**
   * URL to navigate to when button is clicked
   * @default "/happy-shop"
   */
  buttonLink?: string;
  
  /**
   * Testimonial quote text
   * @default "\"The best protein bars on the go! Healthy, tasty and so reliable!\""
   */
  testimonialQuote?: string;
  
  /**
   * Testimonial author name
   * @default "Marina G."
   */
  testimonialAuthor?: string;
  
  /**
   * Testimonial author label (e.g., "Verified Customer")
   * @default "Verified Customer"
   */
  testimonialLabel?: string;
  
  /**
   * Testimonial author avatar image URL
   * @default "/shopcalloutbanner/photo-1534528741775-53994a69daeb.avif"
   */
  testimonialAvatar?: string;
  
  /**
   * Background color for the sloped banner
   * @default "#ff7341"
   */
  backgroundColor?: string;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

export const ShopCalloutBanner: React.FC<ShopCalloutBannerProps> = ({
  productImage = "/images/cashew-raisin.png",
  productImageAlt = "Happy Bar Nutrition Protein Bar Package",
  scriptHeading = "Real Food",
  mainHeading = "Real People.<br />Real Impact.",
  buttonText = "Shop Now",
  buttonLink = "/happy-shop",
  testimonialQuote = "\"The best protein bars on the go! Healthy, tasty and so reliable!\"",
  testimonialAuthor = "Marina G.",
  testimonialLabel = "Verified Customer",
  testimonialAvatar = "/shopcalloutbanner/photo-1534528741775-53994a69daeb.avif",
  backgroundColor = "#ff7341",
  className = "",
}) => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate(buttonLink);
  };

  return (
    <section className={`relative w-full pt-12 pb-20 bg-gray-100 overflow-visible ${className}`}>
      {/* Exact Sloped Angle Background Canvas */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundColor,
          clipPath: 'polygon(0 82%, 100% 58%, 100% 100%, 0 100%)' 
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
        
        {/* Floating Product Mockup Package */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-full max-w-[400px] md:mb-[-40px] flex justify-center"
        >
          <img 
            src={productImage} 
            alt={productImageAlt} 
            className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] -rotate-5"
          />
        </motion.div>

        {/* Action Stack Side */}
        <div className="flex flex-col items-center text-center space-y-5 md:pt-12">
          <div className="space-y-1">
            {/* Heading 2 - Brush script style */}
            <h2 className="heading-2 text-3xl md:text-4xl text-gray-900 block">
              {scriptHeading}
            </h2>
            {/* Heading 1 - Bold serif */}
            <h1 
              className="heading-1 text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight"
              dangerouslySetInnerHTML={{ __html: mainHeading }}
            />
          </div>

          {/* Clean Rounded Action Capsule Button */}
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={()=>{navigate("/happy-shop")}}
            className="bg-[#050505] text-white text-xs tracking-widest font-bold px-8 py-3 rounded-full uppercase flex items-center gap-2 shadow-lg transition-transform"
          >
            {buttonText} <span className="text-base">&rarr;</span>
          </motion.button>

          {/* User Testimonial Review Block */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm p-3.5 rounded-lg border border-white/60 max-w-xs shadow-md text-left flex items-start gap-3 transform translate-y-4"
          >
            {/* Profile Thumbnail */}
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 border border-gray-300">
              <img 
                src={testimonialAvatar} 
                alt={testimonialAuthor}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="space-y-0.5">
              <p className="text-body text-xs leading-snug text-gray-800">
                {testimonialQuote}
              </p>
              <div className="text-body text-[10px] font-medium">
                <span className="font-semibold text-gray-700">{testimonialAuthor}</span> {testimonialLabel}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShopCalloutBanner;