import React from 'react';
import { motion, easeInOut } from 'framer-motion';
import { ShopNowSection } from '../components/ShopNowSection';

const teamMembers = [
  { name: "Joanne (Jo) Seaton", role: "CMO", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/jo-seaton.png" },
  { name: "Arun (AA) Augustine", role: "CEO", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/aa-augustine.png" },
  { name: "Giridhar (Giri) Singh", role: "CTO", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/giri-singh.png" },
  { name: "Helmar Ten Winkel", role: "Advisor", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/helmarten.png" },
  { name: "Job Van Hasselt", role: "Advisor", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/job.png" },
];

export default function HappyTeam() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeInOut }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-white min-h-screen pt-14 font-sans">
      
      {/* Hero Section - Simplified Background */}
     <motion.section
  variants={headerVariants}
  initial="hidden"
  animate="visible"
  className="py-16 mb-12 relative overflow-hidden bg-gray-900"
>
  {/* Left Decorative Image */}
  <motion.div 
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-32 sm:w-48 md:w-64 opacity-40 md:opacity-60 pointer-events-none"
  >
    <img 
      src="/ingredients/cashew.png" 
      alt="Decorative left"
      className="w-full h-auto object-contain -rotate-12"
    />
  </motion.div>

  {/* Right Decorative Image */}
  <motion.div 
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-0 w-32 sm:w-48 md:w-64 opacity-40 md:opacity-60 pointer-events-none"
  >
    <img 
      src="/ingredients/Cranberry.png" 
      alt="Decorative right"
      className="w-full h-auto object-contain rotate-12"
    />
  </motion.div>

  <div className="container mx-auto px-6 max-w-7xl relative z-10">
    <div className="text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3"
      >
        The Happy Crew
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-body text-white text-md mt-4 max-w-md mx-auto"
      >
        Meet the passionate people behind Happy Bar
      </motion.p>
    </div>
  </div>
</motion.section>

      {/* Team Grid */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="pb-24"
      >
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div 
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-8"
          >
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group w-[220px] md:w-[240px]" 
              >
                <div className="bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300">
                  {/* Image Container */}
                  <div className="aspect-[5/6] overflow-hidden bg-gray-50">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Content - Using typography classes */}
                  <div className="p-5 text-center">
                    <h3 className="sub-heading text-gray-800 text-base mb-1 tracking-wide">
                      {member.name}
                    </h3>
                    <p className="text-body text-[20px] sub-heading uppercase tracking-wider">
                      {member.role}
                    </p>
                    <div className="mt-3 w-8 h-px bg-gray-200 mx-auto group-hover:w-12 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Shop Now Section with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ShopNowSection />
      </motion.div>
    </div>
  );
}