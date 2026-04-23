import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Users, ArrowRight } from 'lucide-react';
import { ShopNowSection } from '../components/ShopNowSection';

const teamMembers = [
  { name: "Joanne (Jo) Seaton", role: "CMO", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/jo-seaton.png" },
  { name: "Arun (AA) Augustine", role: "CEO", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/aa-augustine.png" },
  { name: "Giridhar (Giri) Singh", role: "CTO", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/giri-singh.png" },
  { name: "Helmar Ten Winkel", role: "Advisor", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/helmarten.png" },
  { name: "Job Van Hasselt", role: "Advisor", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/job.png" },
  { name: "Boing", role: "VVVIP", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/01/boing2.png", special: true },
];

const combos = [
  {
    title: "Almond Cranberry + Cashew Raisin",
    count: "Combo Box of 6",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/AC-CR-top.webp", // Replace with actual combo image URL
    description: "Embark on a flavor-packed journey with our dynamic duo featuring Almond Cranberry and Cashew Raisin.",
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "The Full Symphony",
    count: "Combo Box of 12",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/NEW12-top.webp", // Replace with actual combo image URL
    description: "Enjoy a snack symphony with all four flavors. Each bite is a unique and delicious experience.",
    color: "from-pink-500 to-rose-500",
    featured: true
  },
  {
    title: "Coconut Almond + Date Almond Cranberry",
    count: "Combo Box of 6",
    image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/CA-DAC-top.webp", // Replace with actual combo image URL
    description: "Savor the delightful medley of flavors featuring the irresistible pairing of Coconut and Date Almond.",
    color: "from-amber-400 to-orange-500"
  }
];

export default function HappyTeam() {
  return (
    <div className="bg-[#369aca] min-h-screen font-sans text-slate-900 mt-10">
      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-7xl shadow-7xl font-black text-[#f26522] mb-6 tracking-tight"
          >
            Our Team
          </motion.h2>
          <p className="max-w-3xl mx-auto text-xl text-white  leading-relaxed font-extrabold">
            Meet our team of bold and whimsical innovators – the visionaries with audacious dreams, unconventional thinking, and enough madness to shake up the world, leaving everyone asking, “How in the world did they pull that off?!”
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`aspect-square overflow-hidden relative flex items-center justify-center ${member.special ? 'bg-[#d83a56]' : 'bg-slate-50'}`}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=Team+Member";
                  }}
                />
              </div>
              <div className="p-6 text-center bg-[#f26522] text-white">
                <h3 className="font-black text-xl uppercase tracking-wide">{member.name}</h3>
                <p className="text-sm font-bold opacity-90 uppercase tracking-tighter">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ShopNowSection />
    </div>
  );
}