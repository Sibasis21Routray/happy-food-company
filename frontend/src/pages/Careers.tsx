import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  IndianRupee, 
  Users, 
  Plane, 
  HeartPulse, 
  Umbrella, 
  Cookie, 
  ChevronRight,
  GraduationCap,
  Bike,
  Headphones
} from 'lucide-react';
import { ShopNowSection } from '../components/ShopNowSection';

const teamMembers = [
  { name: "Joanne (Jo) Seaton", role: "CMO", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/jo-seaton.png" },
  { name: "Arun (AA) Augustine", role: "CEO", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/aa-augustine.png" },
  { name: "Giridhar (Giri) Singh", role: "CTO", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/giri-singh.png" },
  { name: "Helmar Ten Winkel", role: "Advisor", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/helmarten.png" },
  { name: "Job Van Hasselt", role: "Advisor", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/06/job.png" },
  { name: "Boing", role: "VVVIP", image: "https://thehappyfoodcompany.com/wp-content/uploads/2024/01/boing2.png", special: true },
];

const perks = [
  { icon: IndianRupee, label: "Competitive Salary", color: "text-pink-500" },
  { icon: HeartPulse, label: "Health Insurance", color: "text-orange-500" },
  { icon: Users, label: "Company Events", color: "text-green-500" },
  { icon: Umbrella, label: "Paid Vacation", color: "text-red-400" },
  { icon: Plane, label: "Incentive Travel", color: "text-blue-400" },
  { icon: Cookie, label: "Weekly Supply of Happy Bars", color: "text-purple-500" },
];

const positions = [
  {
    title: "Logistics Executive",
    icon: GraduationCap,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    description: "As a Logistics Executive at The Happy Food Company, you will be the friendly face ensuring our delicious products reach stores and customers with a smile. Your role will involve coordinating and delivering orders efficiently, maintaining our high standards of customer service, and spreading happiness through timely and accurate deliveries. Join our vibrant team and help us keep our customers happy and satisfied every day!"
  },
  {
    title: "Field Sales Executives",
    icon: Bike,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
    description: "Calling all sales superstars! The Happy Food Company is on a mission to bring our deliciously healthy snacks to every corner of the country, and we need a Field Sales Executive to help us do it. If you’re a go-getter who loves meeting new people and closing deals, this is the job for you! From pitching our products to building lasting relationships, every day will be an adventure filled with excitement and satisfaction. Join us and let’s spread happiness, one snack at a time!"
  },
  {
    title: "Telemarketers",
    icon: Headphones,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    description: "Are you a chatterbox with a knack for persuasion? Join us at The Happy Food Company as a Telemarketer and bring some sunshine to our sales team! Your mission, should you choose to accept it, involves spreading the word about our nutritious snacks to eager customers. With your charming personality and our amazing products, we’ll make every call a delightful experience. Join us and let’s dial up the fun together!"
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* 1. Hero Impact Section */}
      <section className="relative bg-[#bde0fe] pt-20 pb-42 px-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-7xl font-black text-[#0077c0] leading-tight mb-8 drop-shadow-sm"
            >
              READY TO MAKE AN IMPACT?
            </motion.h1>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d4289] leading-tight">
              Join the Happy Team, <br /> Energise your career!
            </h2>
          </div>
          <div className="flex-1 relative">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-slate-50 p-4 rounded-xl shadow-2xl rotate-3"
            >
              <img 
                src="https://thehappyfoodcompany.com/wp-content/uploads/2025/12/Untitled-design-26.png" 
                alt="Happy Bars" 
                className="rounded-lg w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
        {/* Cloud-like Divider Effect */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white clip-path-clouds"></div>
      </section>

      {/* 2. Mission & Video Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100">
              <h3 className="text-[#8e244d] text-2xl font-black mb-4 uppercase">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                To boldly go where few have gone before — crafting healthy, nutritious snacks that are junk-free, chemical-free, and bursting with real goodness.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100">
              <h3 className="text-[#8e244d] text-2xl font-black mb-4 uppercase">Company Culture</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                At <span className="text-[#0077c0]">The Happy Food Company</span>, we're obsessed with quality and safety. We're on a mission to make every moment with us fun and exciting for both our customers and our awesome team!
              </p>
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white aspect-video relative">
<video
  
  loop
  muted
  playsInline
  controls
  className="w-full h-full object-cover"
>
  <source
    src="https://thehappyfoodcompany.com/wp-content/uploads/2024/05/The-Happy-Food-Company-v1.0.mp4"
    type="video/mp4"
  />
</video>
               
            </div>
          </div>
        </div>
      </section>

      {/* 3. Perks Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-[#f26522] text-5xl font-black mb-16 drop-shadow-md">PERKS & BENEFITS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-10">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className={`p-4 rounded-2xl bg-white shadow-md group-hover:scale-110 transition-transform`}>
                  <perk.icon className={`w-8 h-8 ${perk.color}`} />
                </div>
                <span className="text-2xl font-bold text-slate-700">{perk.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team Section */}
      <section className="py-24 bg-[#d1c4e9]/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[#6a1b9a] text-5xl font-black mb-6">OUR TEAM</h2>
          <p className="max-w-3xl mx-auto text-slate-600 italic font-medium mb-16 px-4">
            "Meet our team of bold and whimsical innovators - the visionaries with audacious dreams, 
            unconventional thinking, and enough madness to shake up the world."
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div whileHover={{ y: -10 }} key={idx} className="bg-white p-2 rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden">
                <div className={`aspect-square overflow-hidden rounded-[1.8rem] mb-4 ${member.special ? 'bg-[#d83a56]' : 'bg-slate-50'}`}>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="bg-[#f26522] py-4 px-2 rounded-2xl text-white">
                  <p className="font-black text-sm uppercase tracking-tight">{member.name}</p>
                  <p className="text-[10px] font-bold opacity-80 uppercase">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Open Positions Section */}
      <section className="py-24 bg-[#fce4ec]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-[#f26522] text-5xl font-black mb-20">OPEN POSITIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {positions.map((pos, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-xl border border-white hover:shadow-2xl transition-all">
                <div className={`w-20 h-20 ${pos.bgColor} rounded-full flex items-center justify-center mb-6`}>
                  <pos.icon className={`w-10 h-10 ${pos.iconColor}`} />
                </div>
                <h3 className="text-[#8e244d] text-2xl font-black mb-4">{pos.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-1">
                  {pos.description}
                </p>
                <button className="flex items-center gap-2 bg-[#8e244d] text-white px-8 py-3 rounded-full font-black text-sm hover:bg-[#6a1b9a] transition-colors group">
                  APPLY NOW <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
       
      </section>
      
      <ShopNowSection />

    </div>
  );
}

