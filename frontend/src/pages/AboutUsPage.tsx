import React, { useEffect, useState } from 'react';
import { AnimatePresence, easeInOut, motion } from 'framer-motion';
import { ShopNowSection } from '../components/ShopNowSection';
import ShopCalloutBanner from '../components/ShopCalloutBanner';
import HappyTeam from './HappyTeam';
import { X } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
  if (selectedMember) {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };
}, [selectedMember]);

  const teamMembers = [
  {
    name: "Anosha Antony",
    role: "Corporate Governance, Compliance & Risk Management",
    position:"CEO",
    image: "/crew/Ano.jpg",
    description: `Anosha Antony is a corporate governance and compliance specialist with extensive experience in company secretarial practice, regulatory compliance, risk management, and corporate administration. Having advised more than 25 public and private companies on governance and statutory matters, she brings a deep understanding of how organizations can build strong governance frameworks while maintaining operational agility.
A graduate of the Institute of Chartered Secretaries and Administrators (ICSA), UK, Anosha has worked across corporate services, consulting, education, and technology sectors. Her expertise includes board governance, shareholder affairs, corporate filings, regulatory compliance, and enterprise-wide quality management.
Throughout her career, she has led governance and operational initiatives ranging from company secretarial functions and board administration to ISO 9002 implementation and process standardization programmes. Her ability to translate regulatory requirements into practical business processes has helped organizations strengthen accountability, transparency, and compliance.
As CEO of Galileo Ventures, Anosha oversees the company’s governance, compliance, risk management, and corporate affairs functions.
She also served as a Council Member of the Institute of Chartered Secretaries and Administrators, Sri Lanka Branch, contributing to the advancement of governance and company secretarial standards within the profession.`,
  },
  {
    name: "Arun Augustine",
    role: "Business Strategy, Growth & Innovation",
    position: "CEO",
    image: "/crew/Arun.png",
    description: `Arun Augustine is a business leader and serial entrepreneur with over 30 years of global experience across technology, healthcare, digital businesses, and consumer products.

He spent over two decades with a leading IT services and solutions company in Southeast Asia, where he served as Managing Director and Chief Marketing Officer, overseeing operations across 14 countries in Southeast Asia, as well as the UK, Germany, and select businesses in the United States. Following the company’s acquisition by NTT (now NTT Data), Arun continued in an expanded leadership role for over eight years, driving regional growth and integration. After stepping down from his executive role, he continued to serve as a Board Member and an advisor to NTT.

Following this, Arun transitioned into entrepreneurship, building, scaling, and exiting ventures across sectors. He co-founded Angstrohm Technologies, a health-tech platform, leading the business through growth and a successful partial exit in 2022, divesting 80% while remaining a shareholder.

He is the co-founder of Angstrohm Consulting (established 2013), where he has led strategic advisory engagements, including working with the Malaysian government to develop the digital regulatory framework for digital health during the COVID-19 period. He also founded Angstrohm Digital, a digital marketing company, and Angstrohm Foods, a protein energy bar manufacturing business operating since 2014.

Arun is the majority shareholder and driving force behind several ventures across Sri Lanka and the region, including Galileo Ventures (Sri Lanka and Malaysia), SeaChange Solutions (a compliance and learning management SaaS platform serving over 8,000 users), and ASAP Solutions (real estate and proptech).

He has also contributed to industry development as a committee member and later as an advisor to OM - PIKOM (the National ICT Association of Malaysia).

In addition to his business interests, Arun contributes to social impact initiatives and serves as an independent director of Happy Bar Nutrition Inc., a nutrition-focused charity.`,
  },
  {
    name: "K J Giridhar Singh",
    role: "Chief Technology Officer",
    position :"",
    image: "/crew/Giri.jpg",
    description: `K J Giridhar Singh is a technology architect and engineering leader with more than 25 years of experience designing, building, and scaling complex digital platforms across gaming, fintech, healthcare, artificial intelligence, blockchain, and SaaS environments.
His expertise lies in turning ambitious business ideas into scalable technology platforms. Throughout his career, he has architected high-volume transaction systems, cloud-native applications, sportsbook platforms, gaming ecosystems, payment integrations, and healthcare technology solutions capable of supporting large user communities and demanding operational requirements.
Before joining Galileo Ventures, Giri held senior technology leadership positions with gaming and technology companies across India and Southeast Asia, where he led engineering organizations, modernized technology stacks, and implemented cloud-first architectures that improved scalability, performance, and operational efficiency.
He is also the co-founder of Angstrohm Technologies, where he led the development of a healthcare SaaS platform from concept through growth and eventual partial exit. Through his consulting company, Technoshaastra Solutions, he advised startups and enterprises on software architecture, performance engineering, cloud infrastructure, and Agile delivery.
At Galileo Ventures, Giri leads technology strategy, product engineering, cloud architecture, artificial intelligence initiatives, and software delivery, ensuring that every solution is built on a foundation that is secure, scalable, and future-ready.`,
  },
  {
    name: "Helmar ten Winkel",
    role: "Advisor",
    position:"",
    image: "/crew/Helmar.png",
    description: `Helmar ten Winkel is a business transformation specialist and former multinational executive with more than 30 years of experience helping organizations improve performance through better alignment of people, processes, and technology.
With an academic background in Mathematics, Physics, and Information Technology, Helmar has spent much of his career leading large-scale transformation programmes focused on operational efficiency, service delivery, outsourcing, process management, and organizational development.
His leadership experience includes senior executive roles with Philips, Atos Origin, Emerio, and NTT, where he managed global service organizations, large international teams, and multi-million-dollar operational improvement programmes. During his tenure at Atos Origin and Emerio, he was responsible for global infrastructure services, portfolio management, support operations, and enterprise-wide efficiency initiatives that delivered significant business value.
Helmar’s consulting and advisory work has focused on business process redesign, organizational effectiveness, change management, governance, and service optimization. His particular interest lies in human performance within organizations—understanding how people, processes, and culture can be aligned to achieve sustainable business outcomes.
At Galileo Ventures, Helmar advises clients on organizational transformation, process excellence, operating model design, and business improvement initiatives, helping organizations achieve measurable and lasting results.`,
  },
  {
    name: "Job Van Hasselt",
    role: "Advisor",
    position:"",
    image: "/crew/Job.jpg",
    description: `Job van Hasselt is an international commercial leader whose career spans more than four decades across Europe, Asia Pacific, the Middle East, and Africa. His expertise lies in building markets, establishing regional operations, and driving commercial growth in highly competitive industries.
Throughout his career, he has held senior leadership positions with global organizations including Bobst, Manroland, QI Press Controls, and Kama GmbH, where he was responsible for sales, marketing, business development, and regional management across multiple countries and business units.
Job has successfully launched regional headquarters, developed distributor and service networks, negotiated major commercial agreements, and led market expansion initiatives throughout Southeast Asia. His experience spans both mature and emerging markets, giving him a practical understanding of how businesses can successfully enter, grow, and scale across diverse operating environments.
At Galileo Ventures, Job provides strategic advice on market expansion, commercial strategy, partnership development, and international business growth, drawing upon decades of hands-on experience building successful regional businesses.
His extensive network across Asia and Europe, coupled with his multicultural business experience, provides valuable insight for organizations seeking to expand beyond their home markets.
`,
  },
  
];

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
    <div className="w-full bg-white text-[#1a1a1a] font-sans overflow-hidden">
      
      {/* 1. Header Section */}
      <section className="pt-24 pb-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-2"
        >
          {/* Heading 1 - Bold serif headline */}
          <h1 className="heading-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-2">
            The Happy Bar Story
          </h1>
          
          {/* Heading 2 - Brush script style accent (using heading-2 class) */}
          <h2 
            className="heading-2  text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1 lg:-ml-1 transform -rotate-[1deg] text-gray-700"
          >
            All natural. Plastic-free. 100% Compostable.
          </h2>
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
                transform: 'matrix(0.99, -0.05, 0.05, 0.99, 0, 0)',
              }}
            >
              <img 
                src="/aboutus/fuel-your-day-happy-bar.webp" 
                alt="Founders working at desk" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/aboutus/photo-1517245386807-bb43f82c33c4.avif";
                }}
              />
            </div>
          </motion.div>

          {/* Text Side matching paragraph sizes exactly */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-7 flex flex-col justify-start text-left"
          >
            {/* Sub-heading - Using heading-3 class */}
            <h3 className="sub-heading text-xl md:text-2xl leading-snug mb-6 max-w-xl">
              In 2017 we said enough with the artificial protein bars... <br />
              We started making natural protein bars under our brand, Origin.
            </h3>
            
            {/* Body text - Using text-body class */}
            <p className="text-body text-[#333333] text-md md:text-base leading-relaxed mb-6 max-w-2xl">
              We made them in our kitchens and sold them in farmers markets until we moved into 
              our factory in Kerry and Origin was nation-wide. After many long conversation about 
              single use plastic and our passion for sustainability, we knew there was more to us 
              than just making a natural protein bar.
            </p>
            
            {/* Body text continuation */}
            <p className="text-body text-[#333333] text-md md:text-base leading-relaxed max-w-2xl">
              We decided to create a brand that could make a real difference. We wanted to create 
              a brand with a strong social mission, one that made an impact on the world around 
              us. That was the moment Happy Bar Nutrition was born!
            </p>
          </motion.div>
          
        </div>
      </section>
      
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
          
          {/* Text Left */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 text-left max-w-xl"
          >
            {/* Heading 2 - Using brush script style for emphasis */}
            <h2 className="sub-heading text-xl md:text-2xl leading-snug mb-4 ">
              We started on seperate paths as two engineers who left the corporate world to make it in the healthy snacking industry.
            </h2>
            
            {/* Body text */}
            <p className="text-body text-[#2b3a4a] text-base md:text-lg mb-4 leading-relaxed">
              Ross started biltong brand. Niall started a protein bar brand. <br />
              Ross left his biltong business, met Niall and they joined forces at Origin.
            </p>
            
          {/* Muted text for fine print */}
            <p className="text-body  text-md md:text-md leading-relaxed max-w-lg">
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
                src="/aboutus/kids-approved.webp" 
                alt="Engineers working on recipes in protective gear" 
                className="w-full h-full object-cover grayscale-[10%] contrast-[105%]"
                onError={(e) => {
                  e.currentTarget.src = "/aboutus/photo-1556742049-0cfed4f6a45d.avif";
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
                src="/aboutus/kids-approved.webp" 
                alt="Community background" 
                className="w-full h-48 object-cover filter blur-[1px]"
              />
              <div className="bg-[#1a1a1a]/90 p-4 text-center">
                <span className="text-muted text-[9px] text-gray-400 block">Happy Bar Community</span>
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
                src="/aboutus/kids-approved.webp" 
                alt="Cyclist sharing an Happy Bar protein bar" 
                className="w-full h-56 object-cover"
              />
              <div className="bg-[#171717] text-white py-4 px-3 text-center">
                <span className="text-muted text-[11px] tracking-widest text-[#a3a3a3] block font-sans font-semibold mb-0.5">FREE LIVE WORKOUTS</span>
                <h4 className="heading-4 font-serif text-base font-medium tracking-wide text-gray-150">Happy Bar Community Group</h4>
              </div>
            </motion.div>
          </div>

          {/* Community Text Description */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-5 text-left"
          >
            <h2 className="sub-heading text-xl md:text-2xl leading-snug max-w-xl">
              Community has always been a huge part of our journeys in fitness
            </h2>
            <p className="sub-heading text-base md:text-lg font-normal text-gray-800 tracking-wide">
              and we believe a community with a common mission can solve anything.
            </p>
            <div className="text-body text-md md:text-md text-gray-700 space-y-4 leading-relaxed max-w-xl">
              <p>
                We have put a major focus on building our Happy Bar community. Through 
                our events and online community we are striving to make our world 
                cleaner though the Happy Bar Clean Planet Project where we are supporting 
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


      <div className="text-center mb-8 sm:mb-20">
            <h2 className="heading-1 text-2xl pt-10 sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold mb-2 sm:mb-3">
              Leadership
            </h2>
            <div className="w-12 h-px bg-gray-300 mx-auto" />
            <p className="sub-heading text-gray-400 text-xs sm:text-sm md:text-md mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
              "Meet our team of bold and whimsical innovators - click any
              profile to read their full story."
            </p>
          </div>

            {/* Team Grid Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="pb-12 sm:pb-20"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
          >
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedMember(member)}
                className="group w-full max-w-[340px] flex flex-col h-full bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md rounded-sm overflow-hidden" 
              >
                {/* Image Container */}
                <div className="aspect-[5/6] overflow-hidden bg-gray-50 relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-100 h-100 object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content Container */}
                <div className="p-4 sm:p-5 text-center flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="sub-heading text-gray-800 text-base sm:text-lg font-semibold mb-1 tracking-wide group-hover:text-gray-900 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider leading-tight">
                      {member.role}
                    </p>
                  </div>

                  {/* Clean truncated layout snippet */}
                  <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:text-left leading-relaxed border-t border-gray-50 pt-3 line-clamp-2">
                    {member.description.trim()}
                  </p>

                  <div className="mt-4 w-8 h-px bg-gray-200 mx-auto group-hover:w-12 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      
       {/* Dynamic Pop-up Modal Box for Credentials */}
<AnimatePresence>
  {selectedMember && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
      
      {/* Click backdrop area to close modal */}
      <motion.div
        initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.1 }}
  onClick={() => setSelectedMember(null)}
  className="absolute inset-0"
      />

      {/* Modal Inner Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.98, y: 5 }}
  transition={{
    duration: 0.15,
    ease: "easeOut"
  }}
        className="bg-white w-full max-w-lg md:max-w-2xl lg:max-w-7xl mt-10 shadow-2xl relative z-10 border border-gray-100 flex flex-col lg:flex-row h-auto max-h-[80vh] lg:h-[600px] overflow-y-auto lg:overflow-hidden rounded-lg"
      >
        {/* Close Button element overlay */}
        <button
          onClick={() => setSelectedMember(null)}
          className="sticky lg:absolute top-3 right-3 sm:top-4 sm:right-4 ml-auto lg:ml-0 z-20 bg-white/90 p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all shadow-sm focus:outline-none"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Left Frame Segment (Image Container) */}
        <div className="w-full lg:w-[520px] shrink-0 bg-gray-50 aspect-[3/3] lg:aspect-auto lg:self-stretch relative">
          <img
            src={selectedMember.image}
            alt={selectedMember.name}
            className="w-full h-full object-cover object-top absolute inset-0"
          />
        </div>

        {/* Modal Right Frame Segment (Content Container) */}
        <div className="w-full lg:flex-1 p-5 sm:p-6 md:p-8 flex flex-col justify-center lg:min-h-0">
          
          {/* Header */}
          <div className="shrink-0 pb-4 pr-8 lg:pr-0">
            <h3 className="text-gray-900 text-lg sm:text-xl md:text-2xl font-bold tracking-tight ">
              {selectedMember.name}
              {selectedMember.position && (
                <span className="text-sm text-gray-400 pl-2">
                  ({selectedMember.position})
                </span>
              )}
            </h3>

            <span className="inline-block mt-1.5 text-[10px] sm:text-[11px] font-bold text-gray-400 rounded-sm uppercase tracking-widest leading-tight">
              {selectedMember.role}
            </span>
          </div>

          {/* Description */}
          <div className="mt-2 sm:mt-4 border-t border-gray-100 pt-3 sm:pt-4 pr-1 lg:flex-1 lg:overflow-y-auto lg:min-h-0">
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line pb-2">
              {selectedMember.description.trim()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

      {/* 5. Product Show Case Bottom Callout / Clean Sloped Banner */}

<ShopCalloutBanner
  productImage="/images/coconut-almond.png"
  productImageAlt="Coconut Almond Protein Bar"
  scriptHeading="Clean Energy"
  mainHeading="Fuel Your<br />Best Self."
  buttonText="Shop Collection"
  buttonLink="/products"
  testimonialAuthor="Priya M."
  testimonialLabel="Verified Buyer"
  testimonialAvatar="/aboutus/photo-1494790108377-be9c29b29330.avif"
  backgroundColor="#4A3E8E"
/>

      {/* 6. Base Shop Imports */}
      <ShopNowSection />
    </div>
  );
};