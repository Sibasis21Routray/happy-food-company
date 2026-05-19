import React from 'react';
import { motion } from 'framer-motion';
import { ShopNowSection } from '../components/ShopNowSection';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="w-full bg-white text-[#1a1a1a] font-sans overflow-hidden">
      

    <div className="w-full bg-white text-[#1a1a1a] overflow-hidden">
      
      {/* 1. Header Section */}
      <section className="pt-24 pb-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-2"
        >
          {/* Bold, distinct serif header - Increased font size */}
          <h1 className="brand-serif-headline text-4xl sm:text-5xl md:text-6xl  text-gray-800 mt-2">
            The All Real Story
          </h1>
          
          {/* Handwritten-style script subtitle - Increased font size */}
          <p 
            className="brush-script-text text-3xl sm:text-4xl md:text-5xl font-normal mb-1 lg:-ml-1 transform -rotate-[1deg] text-gray-700"
           
          >
            All natural. Plastic-free. 100% Compostable.
          </p>
        </motion.div>
      </section>

      {/* 2. Brand Origin Split Section */}
      <section className="pb-20 pt-6 px-6 max-w-6xl mx-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Image Side with exact perspective tilt */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 pt-4"
          >
            <div 
              className="w-full overflow-hidden shadow-md bg-gray-50 origin-center"
              style={{ 
                transform: 'matrix(0.99, -0.05, 0.05, 0.99, 0, 0)', // Simulates the exact angle from the viewport image
              }}
            >
              <img 
                src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/fuel-your-day-happy-bar.webp" 
                alt="Founders working at desk" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>
          </motion.div>

          {/* Text Side matching paragraph sizes exactly - Increased font sizes */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-7 flex flex-col justify-start text-left"
          >
            {/* Main Lead Paragraph - Increased font size */}
            <h3 className="text-xl md:text-2xl font-sans font-normal text-gray-900 leading-snug mb-6 max-w-xl">
              In 2017 we said enough with the artificial protein bars... <br />
              We started making natural protein bars under our brand, Origin.
            </h3>
            
            {/* Middle Narrative Block - Increased font size */}
            <p className="text-[#333333] font-light text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
              We made them in our kitchens and sold them in farmers markets until we moved into 
              our factory in Kerry and Origin was nation-wide. After many long conversation about 
              single use plastic and our passion for sustainability, we knew there was more to us 
              than just making a natural protein bar.
            </p>
            
            {/* Final Real Nutrition Realization Block - Increased font size */}
            <p className="text-[#333333] font-light text-sm md:text-base leading-relaxed max-w-2xl">
              We decided to create a brand that could make a real difference. We wanted to create 
              a brand with a strong social mission, one that made an impact on the world around 
              us. That was the moment All Real Nutrition was born!
            </p>
          </motion.div>
          
        </div>
      </section>
      
    </div>


      {/* 3. Corporate to Entrepreneurship Angled Banner */}
<section className="relative w-full pt-20 pb-28 md:pt-24 md:pb-36 overflow-visible">
  {/* Angled Background Ribbon */}
  <div 
    className="absolute inset-0 bg-[#e3eff5] z-0"
    style={{ 
      clipPath: 'polygon(0 12%, 100% 0%, 100% 80%, 0% 92%)' 
    }}
  />

  <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
    
    {/* Text Left - Increased font sizes */}
    <motion.div 
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="md:col-span-7 text-left max-w-xl"
    >
      {/* Serif Heading matching the image style exactly - Increased font size */}
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0c2340] leading-tight mb-4 tracking-tight">
        We started on seperate paths as two engineers who left the corporate world to make it in the healthy snacking industry.
      </h2>
      
      {/* Middle Body Text - Increased font size */}
      <p className="text-[#2b3a4a] font-normal text-base md:text-lg mb-4 leading-relaxed">
        Ross started biltong brand. Niall started a protein bar brand. <br />
        Ross left his biltong business, met Niall and they joined forces at Origin.
      </p>
      
      {/* Fine Print / Obsession paragraph - Increased font size */}
      <p className="text-[#5a6b7c] font-light text-xs md:text-sm leading-relaxed max-w-lg">
        From day one we have been absolutely obsessed with our product. We have spent 5 years 
        perfecting the recipe, and gone through hundreds of recipes to get it just right. We have 
        spent all that time, sourcing the finest ingredients the world has to offer while keeping true 
        to our beliefs of using only nutrient-packed natural ingredients. After years of development, 
        our products finally meet our rigorous standards for taste, nutrition and texture.
      </p>
    </motion.div>

    {/* Image Right (With Negative Margin Overflow) */}
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="md:col-span-5 relative self-start md:mb-[-80px] z-20 flex justify-center md:justify-end"
    >
      <div className="w-full max-w-[360px] md:max-w-full aspect-[4/5] overflow-hidden shadow-xl rounded-sm border-4 border-white bg-white">
        <img 
          src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/kids-approved.webp" 
          alt="Engineers working on recipes in protective gear" 
          className="w-full h-full object-cover grayscale-[10%] contrast-[105%]"
          onError={(e) => {
            // Backup placeholder if the link changes
            e.currentTarget.src = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600";
          }}
        />
      </div>
    </motion.div>

  </div>
</section>


      {/* 4. Community & Fitness Section */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Workout / Community Cards (Stacked Appearance) */}
          <div className="md:col-span-5 flex justify-center items-center relative min-h-[360px]">
            {/* Background Peek Card */}
            <div className="absolute left-4 sm:left-12 w-56 h-72 bg-white border border-gray-100 shadow-sm rounded-sm overflow-hidden opacity-40 transform -translate-x-12 scale-95 pointer-events-none hidden sm:block">
              <img 
                src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/kids-approved.webp" 
                alt="Community background" 
                className="w-full h-48 object-cover filter blur-[1px]"
              />
              <div className="bg-[#1a1a1a]/90 p-4 text-center">
                <span className="text-[9px] text-gray-400 block">All Real Community</span>
              </div>
            </div>
            
            {/* Main Active Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-64 bg-white shadow-xl rounded-sm overflow-hidden z-10 border border-gray-100"
            >
              <img 
                src="https://thehappyfoodcompany.com/wp-content/uploads/2024/06/kids-approved.webp" 
                alt="Cyclist sharing an All Real protein bar" 
                className="w-full h-56 object-cover"
              />
              <div className="bg-[#171717] text-white py-4 px-3 text-center">
                <span className="text-[11px] tracking-widest text-[#a3a3a3] block font-sans font-semibold mb-0.5">FREE LIVE WORKOUTS</span>
                <h4 className="font-serif text-base font-medium tracking-wide text-gray-150">All Real Community Group</h4>
              </div>
            </motion.div>
          </div>

          {/* Community Text Description - Increased font sizes */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-5 text-left"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight tracking-tight max-w-xl">
              Community has always been a huge part of our journeys in fitness
            </h2>
            <p className="text-base md:text-lg font-normal text-gray-800 tracking-wide">
              and we believe a community with a common mission can solve anything.
            </p>
            <div className="text-xs md:text-sm text-gray-700 font-light space-y-4 leading-relaxed max-w-xl">
              <p>
                We have put a major focus on building our All Real community. Through 
                our events and online community we are striving to make our world 
                cleaner though the All Real Clean Planet Project where we are supporting 
                charities who clean oceans from plastic pollution and plant trees.
              </p>
              <p>
                We are working hard to build a place where we push ourselves to become 
                better while making a positive impact on the world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Product Show Case Bottom Callout / Clean Sloped Banner */}
      <section className="relative w-full pt-2 pb-20 bg-gray-100 overflow-visible">
        {/* Exact Sloped Angle Background Canvas */}
        <div 
          className="absolute inset-0 bg-[#ff7341] z-0"
          style={{ clipPath: 'polygon(0 82%, 100% 58%, 100% 100%, 0 100%)' }}
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
              src="/images/cashew-raisin.png" 
              alt="All Real Cashew Cookie Dough Protein Bar Package" 
              className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] -rotate-5"
            />
          </motion.div>

          {/* Action Stack Side - Increased font sizes */}
          <div className="flex flex-col items-center text-center space-y-5 md:pt-12">
            <div className="space-y-1">
              <span 
                className="text-3xl md:text-4xl text-gray-900 block"
                style={{ fontFamily: "'Caveat', 'Alex Brush', 'Dancing Script', cursive" }}
              >
                Real Food
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
                Real People.<br />Real Impact.
              </h2>
            </div>

            {/* Clean Rounded Action Capsule Button */}
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#050505] text-white text-xs tracking-widest font-bold px-8 py-3 rounded-full uppercase flex items-center gap-2 shadow-lg transition-transform"
            >
              Shop Now <span className="text-base">&rarr;</span>
            </motion.button>

            {/* User Testimonial Review Block - Increased font sizes */}
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
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                  alt="Marina G."
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs leading-snug font-normal text-gray-800">
                  "The best protein bars on the go! Healthy, tasty and so reliable!"
                </p>
                <div className="text-[10px] text-gray-500 font-medium">
                  <span className="font-semibold text-gray-700">Marina G.</span> Verified Customer
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 6. Base Shop Imports */}
      <ShopNowSection />
    </div>
  );
};