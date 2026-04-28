import React from 'react';
import { motion } from 'framer-motion';
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

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
         
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight mt-5"
          >
            The <span className="text-[#ff793b]">Happy</span> Crew
          </motion.h1>
        </div>
      </section>

      {/* Team Flex Container */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          /* Use Flex with wrap and justify-center to handle orphaned items */
          className="flex flex-wrap justify-center gap-x-8 gap-y-12"
        >
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="group w-full max-w-[260px] flex-shrink-0" 
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1 border border-slate-100">
                {/* Image Container */}
                <div className="aspect-[5/6] overflow-hidden relative bg-slate-50">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 text-center bg-white">
                  <h3 className="font-bold text-lg text-slate-800 mb-0.5 group-hover:text-[#f26522] transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    {member.role}
                  </p>
                  
                  <div className="mt-4 h-0.5 w-6 bg-slate-100 mx-auto rounded-full group-hover:w-10 group-hover:bg-[#369aca] transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="bg-white">
        <ShopNowSection />
      </div>
    </div>
  );
}