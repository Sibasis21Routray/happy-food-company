// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence, easeInOut } from 'framer-motion';
// import { X } from 'lucide-react';
// import { ShopNowSection } from '../components/ShopNowSection';

// const teamMembers = [
//   {
//     name: "Anosha Antony",
//     role: "Corporate Governance, Compliance & Risk Management",
//     position:"CEO",
//     image: "/crew/Ano.jpg",
//     description: `Anosha Antony is a corporate governance and compliance specialist with extensive experience in company secretarial practice, regulatory compliance, risk management, and corporate administration. Having advised more than 25 public and private companies on governance and statutory matters, she brings a deep understanding of how organizations can build strong governance frameworks while maintaining operational agility.
// A graduate of the Institute of Chartered Secretaries and Administrators (ICSA), UK, Anosha has worked across corporate services, consulting, education, and technology sectors. Her expertise includes board governance, shareholder affairs, corporate filings, regulatory compliance, and enterprise-wide quality management.
// Throughout her career, she has led governance and operational initiatives ranging from company secretarial functions and board administration to ISO 9002 implementation and process standardization programmes. Her ability to translate regulatory requirements into practical business processes has helped organizations strengthen accountability, transparency, and compliance.
// As CEO of Galileo Ventures, Anosha oversees the company’s governance, compliance, risk management, and corporate affairs functions.
// She also served as a Council Member of the Institute of Chartered Secretaries and Administrators, Sri Lanka Branch, contributing to the advancement of governance and company secretarial standards within the profession.`,
//   },
//   {
//     name: "Arun Augustine",
//     role: "Business Strategy, Growth & Innovation",
//     position: "CEO",
//     image: "/crew/Arun.png",
//     description: `Arun Augustine is a business leader and serial entrepreneur with over 30 years of global experience across technology, healthcare, digital businesses, and consumer products.

// He spent over two decades with a leading IT services and solutions company in Southeast Asia, where he served as Managing Director and Chief Marketing Officer, overseeing operations across 14 countries in Southeast Asia, as well as the UK, Germany, and select businesses in the United States. Following the company’s acquisition by NTT (now NTT Data), Arun continued in an expanded leadership role for over eight years, driving regional growth and integration. After stepping down from his executive role, he continued to serve as a Board Member and an advisor to NTT.

// Following this, Arun transitioned into entrepreneurship, building, scaling, and exiting ventures across sectors. He co-founded Angstrohm Technologies, a health-tech platform, leading the business through growth and a successful partial exit in 2022, divesting 80% while remaining a shareholder.

// He is the co-founder of Angstrohm Consulting (established 2013), where he has led strategic advisory engagements, including working with the Malaysian government to develop the digital regulatory framework for digital health during the COVID-19 period. He also founded Angstrohm Digital, a digital marketing company, and Angstrohm Foods, a protein energy bar manufacturing business operating since 2014.

// Arun is the majority shareholder and driving force behind several ventures across Sri Lanka and the region, including Galileo Ventures (Sri Lanka and Malaysia), SeaChange Solutions (a compliance and learning management SaaS platform serving over 8,000 users), and ASAP Solutions (real estate and proptech).

// He has also contributed to industry development as a committee member and later as an advisor to OM - PIKOM (the National ICT Association of Malaysia).

// In addition to his business interests, Arun contributes to social impact initiatives and serves as an independent director of Happy Bar Nutrition Inc., a nutrition-focused charity.`,
//   },
//   {
//     name: "K J Giridhar Singh",
//     role: "Chief Technology Officer",
//     position :"",
//     image: "/crew/Giri.jpg",
//     description: `K J Giridhar Singh is a technology architect and engineering leader with more than 25 years of experience designing, building, and scaling complex digital platforms across gaming, fintech, healthcare, artificial intelligence, blockchain, and SaaS environments.
// His expertise lies in turning ambitious business ideas into scalable technology platforms. Throughout his career, he has architected high-volume transaction systems, cloud-native applications, sportsbook platforms, gaming ecosystems, payment integrations, and healthcare technology solutions capable of supporting large user communities and demanding operational requirements.
// Before joining Galileo Ventures, Giri held senior technology leadership positions with gaming and technology companies across India and Southeast Asia, where he led engineering organizations, modernized technology stacks, and implemented cloud-first architectures that improved scalability, performance, and operational efficiency.
// He is also the co-founder of Angstrohm Technologies, where he led the development of a healthcare SaaS platform from concept through growth and eventual partial exit. Through his consulting company, Technoshaastra Solutions, he advised startups and enterprises on software architecture, performance engineering, cloud infrastructure, and Agile delivery.
// At Galileo Ventures, Giri leads technology strategy, product engineering, cloud architecture, artificial intelligence initiatives, and software delivery, ensuring that every solution is built on a foundation that is secure, scalable, and future-ready.`,
//   },
//   {
//     name: "Helmar ten Winkel",
//     role: "Advisor",
//     position:"",
//     image: "/crew/Helmar.png",
//     description: `Helmar ten Winkel is a business transformation specialist and former multinational executive with more than 30 years of experience helping organizations improve performance through better alignment of people, processes, and technology.
// With an academic background in Mathematics, Physics, and Information Technology, Helmar has spent much of his career leading large-scale transformation programmes focused on operational efficiency, service delivery, outsourcing, process management, and organizational development.
// His leadership experience includes senior executive roles with Philips, Atos Origin, Emerio, and NTT, where he managed global service organizations, large international teams, and multi-million-dollar operational improvement programmes. During his tenure at Atos Origin and Emerio, he was responsible for global infrastructure services, portfolio management, support operations, and enterprise-wide efficiency initiatives that delivered significant business value.
// Helmar’s consulting and advisory work has focused on business process redesign, organizational effectiveness, change management, governance, and service optimization. His particular interest lies in human performance within organizations—understanding how people, processes, and culture can be aligned to achieve sustainable business outcomes.
// At Galileo Ventures, Helmar advises clients on organizational transformation, process excellence, operating model design, and business improvement initiatives, helping organizations achieve measurable and lasting results.`,
//   },
//   {
//     name: "Job Van Hasselt",
//     role: "Advisor",
//     position:"",
//     image: "/crew/Job.jpg",
//     description: `Job van Hasselt is an international commercial leader whose career spans more than four decades across Europe, Asia Pacific, the Middle East, and Africa. His expertise lies in building markets, establishing regional operations, and driving commercial growth in highly competitive industries.
// Throughout his career, he has held senior leadership positions with global organizations including Bobst, Manroland, QI Press Controls, and Kama GmbH, where he was responsible for sales, marketing, business development, and regional management across multiple countries and business units.
// Job has successfully launched regional headquarters, developed distributor and service networks, negotiated major commercial agreements, and led market expansion initiatives throughout Southeast Asia. His experience spans both mature and emerging markets, giving him a practical understanding of how businesses can successfully enter, grow, and scale across diverse operating environments.
// At Galileo Ventures, Job provides strategic advice on market expansion, commercial strategy, partnership development, and international business growth, drawing upon decades of hands-on experience building successful regional businesses.
// His extensive network across Asia and Europe, coupled with his multicultural business experience, provides valuable insight for organizations seeking to expand beyond their home markets.
// `,
//   },
  
// ];

// export default function HappyTeam() {
//   const [selectedMember, setSelectedMember] = useState(null);

//   useEffect(() => {
//   if (selectedMember) {
//     document.body.style.overflow = "hidden";
//     document.documentElement.style.overflow = "hidden";
//   } else {
//     document.body.style.overflow = "";
//     document.documentElement.style.overflow = "";
//   }

//   return () => {
//     document.body.style.overflow = "";
//     document.documentElement.style.overflow = "";
//   };
// }, [selectedMember]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   };

//   const headerVariants = {
//     hidden: { opacity: 0, y: -30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: easeInOut }
//     }
//   };

//   const sectionVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 }
//     }
//   };

//   return (
//     <div className="bg-white min-h-screen pt-14 overflow-x-hidden font-sans">
      
//       {/* Hero Section */}
//       <motion.section
//         variants={headerVariants}
//         initial="hidden"
//         animate="visible"
//         className="py-12 sm:py-16 md:py-20 mb-8 sm:mb-12 relative overflow-hidden bg-gray-900"
//       >
//         {/* Left Decorative Image */}
//         <motion.div 
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-24 sm:w-48 md:w-64 opacity-30 md:opacity-60 pointer-events-none"
//         >
//           <img 
//             src="/ingredients/cashew.png" 
//             alt="Decorative left"
//             className="w-full h-auto object-contain -rotate-12"
//           />
//         </motion.div>

//         {/* Right Decorative Image */}
//         <motion.div 
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-0 w-24 sm:w-48 md:w-64 opacity-30 md:opacity-60 pointer-events-none"
//         >
//           <img 
//             src="/ingredients/Cranberry.png" 
//             alt="Decorative right"
//             className="w-full h-auto object-contain rotate-12"
//           />
//         </motion.div>

//         <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
//           <div className="text-center">
//             <motion.h1 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="heading-1 text-3xl sm:text-4xl md:text-5xl text-white mb-2 sm:mb-3 font-bold tracking-tight"
//             >
//               The Happy Crew
//             </motion.h1>
            
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//               className="text-body text-white/80 text-sm sm:text-md md:text-lg mt-2 sm:mt-4 max-w-md mx-auto px-4"
//             >
//               Meet the passionate people behind Happy Bar
//             </motion.p>
//           </div>
//         </div>
//       </motion.section>

//       {/* Team Grid Section */}
//       <motion.section
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         className="pb-12 sm:pb-20"
//       >
//         <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
//           <motion.div 
//             variants={containerVariants}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
//           >
//             {teamMembers.map((member, idx) => (
//               <motion.div 
//                 key={idx}
//                 variants={itemVariants}
//                 whileHover={{ y: -4 }}
//                 onClick={() => setSelectedMember(member)}
//                 className="group w-full max-w-[340px] flex flex-col h-full bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md rounded-sm overflow-hidden" 
//               >
//                 {/* Image Container */}
//                 <div className="aspect-[5/6] overflow-hidden bg-gray-50 relative">
//                   <img 
//                     src={member.image} 
//                     alt={member.name}
//                     className="w-100 h-100 object-cover transition-all duration-500 group-hover:scale-105"
//                     loading="lazy"
//                   />
//                 </div>

//                 {/* Content Container */}
//                 <div className="p-4 sm:p-5 text-center flex flex-col flex-grow justify-between">
//                   <div>
//                     <h3 className="sub-heading text-gray-800 text-base sm:text-lg font-semibold mb-1 tracking-wide group-hover:text-gray-900 transition-colors">
//                       {member.name}
//                     </h3>
//                     <p className="text-gray-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider leading-tight">
//                       {member.role}
//                     </p>
//                   </div>

//                   {/* Clean truncated layout snippet */}
//                   <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:text-left leading-relaxed border-t border-gray-50 pt-3 line-clamp-2">
//                     {member.description.trim()}
//                   </p>

//                   <div className="mt-4 w-8 h-px bg-gray-200 mx-auto group-hover:w-12 transition-all duration-300" />
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </motion.section>

      
//       {/* Dynamic Pop-up Modal Box for Credentials */}
//       <AnimatePresence>
//         {selectedMember && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
            
//             {/* Click backdrop area to close modal */}
//             <motion.div
//               initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.1 }}
//         onClick={() => setSelectedMember(null)}
//         className="absolute inset-0"
//             />
      
//             {/* Modal Inner Window */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.96, y: 10 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.98, y: 5 }}
//         transition={{
//           duration: 0.15,
//           ease: "easeOut"
//         }}
//               className="bg-white w-full max-w-lg md:max-w-2xl lg:max-w-7xl mt-10 shadow-2xl relative z-10 border border-gray-100 flex flex-col lg:flex-row h-auto max-h-[80vh] lg:h-[600px] overflow-y-auto lg:overflow-hidden rounded-lg"
//             >
//               {/* Close Button element overlay */}
//               <button
//                 onClick={() => setSelectedMember(null)}
//                 className="sticky lg:absolute top-3 right-3 sm:top-4 sm:right-4 ml-auto lg:ml-0 z-20 bg-white/90 p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all shadow-sm focus:outline-none"
//               >
//                 <X className="w-4 h-4 sm:w-5 sm:h-5" />
//               </button>
      
//               {/* Modal Left Frame Segment (Image Container) */}
//               <div className="w-full lg:w-[520px] shrink-0 bg-gray-50 aspect-[3/3] lg:aspect-auto lg:self-stretch relative">
//                 <img
//                   src={selectedMember.image}
//                   alt={selectedMember.name}
//                   className="w-full h-full object-cover object-top absolute inset-0"
//                 />
//               </div>
      
//               {/* Modal Right Frame Segment (Content Container) */}
//               <div className="w-full lg:flex-1 p-5 sm:p-6 md:p-8 flex flex-col justify-center lg:min-h-0">
                
//                 {/* Header */}
//                 <div className="shrink-0 pb-4 pr-8 lg:pr-0">
//                   <h3 className="text-gray-900 text-lg sm:text-xl md:text-2xl font-bold tracking-tight ">
//                     {selectedMember.name}
//                     {selectedMember.position && (
//                       <span className="text-sm text-gray-400 pl-2">
//                         ({selectedMember.position})
//                       </span>
//                     )}
//                   </h3>
      
//                   <span className="inline-block mt-1.5 text-[10px] sm:text-[11px] font-bold text-gray-400 rounded-sm uppercase tracking-widest leading-tight">
//                     {selectedMember.role}
//                   </span>
//                 </div>
      
//                 {/* Description */}
//                 <div className="mt-2 sm:mt-4 border-t border-gray-100 pt-3 sm:pt-4 pr-1 lg:flex-1 lg:overflow-y-auto lg:min-h-0">
//                   <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line pb-2">
//                     {selectedMember.description.trim()}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
      

//       {/* Shop Now Section */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//       >
//         <ShopNowSection />
//       </motion.div>
//     </div>
//   );
// }