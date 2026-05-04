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
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      y: -4,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 overflow-x-hidden">
      
      {/* Hero Section - Fixed Background */}
      <motion.section
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="py-16 mb-12 relative overflow-hidden "
          style={{
    backgroundImage: "url('https://img.freepik.com/premium-vector/blue-background-with-line-that-says-blue-vector-illustration-autumn-leaves_1007350-15391.jpg')",
    backgroundSize: "fill",
    backgroundPosition: "center",
    // backgroundRepeat: "no-repeat"
  }}
      >
        {/* Animated Overlay Gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 "
        />
        
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-light text-white mb-3"
            >
              READY TO MAKE AN IMPACT?
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-px bg-white/30 mx-auto"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-white/70 text-sm font-light mt-4 max-w-md mx-auto"
            >
              Join the Happy Team, Energise your career!
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Mission & Video Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="border border-gray-100 p-8 hover:border-gray-200 transition-all duration-300"
              >
                <h3 className="text-lg font-light text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  To boldly go where few have gone before — crafting healthy, nutritious snacks that are junk-free, chemical-free, and bursting with real goodness.
                </p>
              </motion.div>
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="border border-gray-100 p-8 hover:border-gray-200 transition-all duration-300"
              >
                <h3 className="text-lg font-light text-gray-800 mb-4">Company Culture</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  At <span className="text-gray-700">The Happy Food Company</span>, we're obsessed with quality and safety. We're on a mission to make every moment with us fun and exciting for both our customers and our awesome team!
                </p>
              </motion.div>
            </div>
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="relative group"
            >
              <div className="overflow-hidden border border-gray-100 aspect-video">
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
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Perks Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-3">PERKS & BENEFITS</h2>
            <div className="w-12 h-px bg-gray-300 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => (
              <motion.div 
                key={i} 
                variants={cardVariants}
                whileHover="hover"
                className="flex items-center gap-4 p-4 border border-gray-100 hover:border-gray-200 transition-all"
              >
                <div className="p-2">
                  <perk.icon className={`w-5 h-5 ${perk.color}`} strokeWidth={1.5} />
                </div>
                <span className="text-sm font-light text-gray-600">{perk.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-3">OUR TEAM</h2>
            <div className="w-12 h-px bg-gray-300 mx-auto" />
            <p className="text-gray-400 text-sm font-light mt-4 max-w-2xl mx-auto">
              "Meet our team of bold and whimsical innovators - the visionaries with audacious dreams, 
              unconventional thinking, and enough madness to shake up the world."
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                key={idx} 
                className="border border-gray-100 hover:border-gray-200 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="font-light text-gray-800 text-sm">{member.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Open Positions Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-3">OPEN POSITIONS</h2>
            <div className="w-12 h-px bg-gray-300 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {positions.map((pos, idx) => (
              <motion.div 
                key={idx} 
                variants={cardVariants}
                whileHover="hover"
                className="bg-white border border-gray-100 p-8 hover:border-gray-200 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${pos.bgColor} rounded-full flex items-center justify-center mb-5`}>
                  <pos.icon className={`w-6 h-6 ${pos.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-light text-gray-800 mb-3">{pos.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                  {pos.description}
                </p>
                <button className="inline-flex items-center gap-2 text-gray-600 text-xs font-light tracking-wider hover:text-gray-800 transition-colors group">
                  APPLY NOW
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Shop Now Section */}
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