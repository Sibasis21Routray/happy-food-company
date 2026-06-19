import React from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  Users,
  Plane,
  HeartPulse,
  Umbrella,
  Cookie,
  GraduationCap,
  Bike,
  Headphones,
} from "lucide-react";
import { ShopNowSection } from "../components/ShopNowSection";

const teamMembers = [
  {
    name: "Joanne (Jo) Seaton",
    role: "Corporate Governance, Compliance & Risk Management",
    position: "CEO",
    image: "/careers/jo-seaton.png",
  },
  {
    name: "Arun Augustine",
    role: "Business Strategy, Growth & Innovation",
    position: "CEO",
    image: "/careers/aa-augustine.png",
  },
  {
    name: "K J Giridhar Singh",
    role: "Chief Technology Officer",
    position: "",
    image: "/careers/giri-singh.png",
  },
  {
    name: "Helmar ten Winkel",
    role: "Advisor",
    position: "",
    image: "/careers/helmarten.png",
  },
  {
    name: "Job Van Hasselt",
    role: "Advisor",
    position: "",
    image: "/careers/job.png",
  },
];

const perks = [
  { icon: IndianRupee, label: "Competitive Salary", color: "text-pink-500" },
  { icon: HeartPulse, label: "Health Insurance", color: "text-orange-500" },
  { icon: Users, label: "Company Events", color: "text-green-500" },
  { icon: Umbrella, label: "Paid Vacation", color: "text-red-400" },
  { icon: Plane, label: "Incentive Travel", color: "text-blue-400" },
  {
    icon: Cookie,
    label: "Weekly Supply of Happy Bars",
    color: "text-purple-500",
  },
];

const positions = [
  {
    title: "Logistics Executive",
    icon: GraduationCap,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    description:
      "As a Logistics Executive at The Happy Food Company, you will be the friendly face ensuring our delicious products reach stores and customers with a smile. Your role will involve coordinating and delivering orders efficiently, maintaining our high standards of customer service, and spreading happiness through timely and accurate deliveries. Join our vibrant team and help us keep our customers happy and satisfied every day!",
  },
  {
    title: "Field Sales Executives",
    icon: Bike,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
    description:
      "Calling all sales superstars! The Happy Food Company is on a mission to bring our deliciously healthy snacks to every corner of the country, and we need a Field Sales Executive to help us do it. If you’re a go-getter who loves meeting new people and closing deals, this is the job for you! From pitching our products to building lasting relationships, every day will be an adventure filled with excitement and satisfaction. Join us and let’s spread happiness, one snack at a time!",
  },
  {
    title: "Telemarketers",
    icon: Headphones,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    description:
      "Are you a chatterbox with a knack for persuasion? Join us at The Happy Food Company as a Telemarketer and bring some sunshine to our sales team! Your mission, should you choose to accept it, involves spreading the word about our nutritious snacks to eager customers. With your charming personality and our amazing products, we’ll make every call a delightful experience. Join us and let’s dial up the fun together!",
  },
];

export default function Careers() {
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      y: -4,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-white pt-14 overflow-x-hidden font-sans">
      {/* Hero Section */}
      <motion.section
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 sm:py-16 md:py-20 mb-8 sm:mb-12 relative overflow-hidden bg-gray-900"
      >
        {/* Left Decorative Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-24 sm:w-48 md:w-64 opacity-30 md:opacity-60 pointer-events-none"
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-0 w-24 sm:w-48 md:w-64 opacity-30 md:opacity-60 pointer-events-none"
        >
          <img
            src="/ingredients/Cranberry.png"
            alt="Decorative right"
            className="w-full h-auto object-contain rotate-12"
          />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="heading-1 text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight mb-2 sm:mb-3"
            >
              READY TO MAKE AN IMPACT?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-body text-white/80 text-sm sm:text-md mt-2 sm:mt-4 max-w-md mx-auto px-2"
            >
              Join the Happy Team, Energise your career
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
        className="py-10 sm:py-16 md:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="border border-gray-100 p-6 sm:p-8 hover:border-gray-200 transition-all duration-300 rounded-sm"
              >
                <h3 className="sub-heading text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                  Our Mission
                </h3>
                <p className="text-body text-gray-500 text-xs sm:text-sm md:text-md leading-relaxed">
                  To boldly go where few have gone before — crafting healthy,
                  nutritious snacks that are junk-free, chemical-free, and
                  bursting with real goodness.
                </p>
              </motion.div>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="border border-gray-100 p-6 sm:p-8 hover:border-gray-200 transition-all duration-300 rounded-sm"
              >
                <h3 className="sub-heading text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                  Company Culture
                </h3>
                <p className="text-body text-gray-500 text-xs sm:text-sm md:text-md leading-relaxed">
                  At{" "}
                  <span className="text-gray-700 font-medium">
                    The Happy Food Company
                  </span>
                  , we're obsessed with quality and safety. We're on a mission
                  to make every moment with us fun and exciting for both our
                  customers and our awesome team!
                </p>
              </motion.div>
            </div>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative group w-full"
            >
              {/* <div className="overflow-hidden border border-gray-100 aspect-video rounded-sm">
                <video
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://youtu.be/srSoRImGc4o?si=TpEHrstvwuTCrXTg"
                    type="video/mp4"
                  />
                </video>
              </div> */}

              <div className="overflow-hidden border border-gray-100 aspect-video rounded-sm">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/srSoRImGc4o"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-10 sm:py-16 md:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold mb-2 sm:mb-3">
              OUR TEAM
            </h2>
            <div className="w-12 h-px bg-gray-300 mx-auto" />
            <p className="sub-heading text-gray-400 text-xs sm:text-sm md:text-md mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
              Meet our team of bold and whimsical innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
            {teamMembers.map((member, idx) => (
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                key={idx}
                className="flex flex-col w-full max-w-[340px] h-full border border-gray-100 hover:border-gray-200 transition-all duration-300 bg-white cursor-default group shadow-sm hover:shadow-md rounded-sm overflow-hidden"
              >
                <div className="aspect-[5/6] overflow-hidden bg-gray-50 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Content height uses a balanced min-height layer to align cards uniformly across rows */}
                <div className="p-4 sm:p-5 text-center flex flex-col flex-grow justify-between min-h-[125px]">
                  <div className="flex flex-col justify-center items-center flex-grow">
                    <p className="sub-heading text-gray-800 text-base sm:text-lg font-semibold group-hover:text-gray-900 transition-colors">
                      {member.name}{" "}
                      {member.position && (
                        <span className="text-sm text-gray-400 font-normal">
                          ({member.position})
                        </span>
                      )}
                    </p>
                    
                    {/* Role elements are now static and visible by default below the name block */}
                    <p className="text-body text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-2 leading-tight">
                      {member.role}
                    </p>
                  </div>

                  <div className="mt-4 w-8 h-px bg-gray-200 mx-auto group-hover:w-16 transition-all duration-300" />
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
        className="py-12 sm:py-16 md:py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold mb-2 sm:mb-3">
              OPEN POSITIONS
            </h2>
            <div className="w-12 h-px bg-gray-300 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {positions.map((pos, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white border border-gray-100 p-6 sm:p-8 hover:border-gray-200 transition-all duration-300 rounded-sm flex flex-col h-full"
              >
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 ${pos.bgColor} rounded-full flex items-center justify-center mb-4 sm:mb-5 shrink-0`}
                >
                  <pos.icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${pos.iconColor}`}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="sub-heading text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                  {pos.title}
                </h3>
                <p className="text-body text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 flex-grow">
                  {pos.description}
                </p>
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