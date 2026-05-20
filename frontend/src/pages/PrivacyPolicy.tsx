import React from 'react';
import { motion } from 'framer-motion';
import { ShopNowSection } from '../components/ShopNowSection';

const PrivacyPolicyUI = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.08 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const contactVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.3 }
    },
    hover: {
      scale: 1.01,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-orange-500 font-sans tracking-tight">Happy</span>
            <span className="text-2xl font-bold text-gray-800 font-sans tracking-tight">Bar</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">Home</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Product</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Journal</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Shop</a>
          </div>

          {/* Icons Placeholders */}
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="cursor-pointer hover:text-gray-900">👤 siba</span>
            <span className="cursor-pointer hover:text-gray-900 relative">
              🛒 <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </span>
          </div>
        </div>
      </nav>

      {/* 2. HERO HEADER */}
      <motion.div
        variants={headerVariants}
        className="pt-36 pb-6 bg-white"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-14">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-5xl font-normal text-black tracking-wide"
          >
            Privacy Policy
          </motion.h1>
        </div>
      </motion.div>

      {/* 3. PRIVACY POLICY DOCUMENT CONTAINER */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="pb-16 bg-white"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-14">
          <motion.div 
            variants={contentVariants}
            className="transition-all duration-300"
          >
            <div className="space-y-6 text-gray-600 text-base text-left leading-relaxed">
              
              <motion.p variants={sectionVariants}>
                Welcome to <strong className="text-gray-800">thehappyfoodcompany.com</strong>, a website owned and 
                operated by Angstrohm Foods Pvt Ltd ("Angstrohm" or "we"), a registered company in India. 
                Angstrohm Foods Pvt Ltd, (we, us, our) is committed to protecting your personal information.
              </motion.p>
              
              <motion.p variants={sectionVariants}>
                This Privacy Policy sets out how we handle personal information that we may collect from you, including 
                when you visit any of our brand websites or social media pages, get in contact or correspond with us and 
                enter our brand promotions. Personal information may include, but is not limited to, your name, email 
                address, mailing address, phone number, date of birth and gender (Personal Information).
              </motion.p>

              {/* Enhanced heading spacing with pt-8 pb-2 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-8 pb-2">
                We will only use Personal Information we collect from you for lawful purposes which may include:
              </motion.h2>
              
              <motion.ul variants={containerVariants} className="list-none space-y-3 pl-2">
                {[
                  "to personalize any future communications to you;",
                  "to manage and develop our promotions and to contact you in relation to our promotions, including if you are a winner of a particular promotion;",
                  "to send marketing communications to you which include but are not limited to emails, texts or notifications relating to our brands, products, promotions or services or those of our related companies or strategic partners;",
                  "for our administrative purposes and for internal record keeping;",
                  "to improve the experience across our digital assets;",
                  "to undertake customer service activities such as responding to any queries, comments or complaints you may have;",
                  "for marketing analytics and research purposes;",
                  "to comply with relevant laws and regulations;",
                  "for any other specific purpose which we notify you of at the time your Personal Information is collected."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={listItemVariants}
                    whileHover={{ x: 3 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-orange-400 mt-1.5">•</span> 
                    <span className="text-gray-600 text-base">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p variants={sectionVariants} className="pt-4">
                Prior to sending you marketing communications relating to our brands, products, promotions or services 
                or those of our related companies or strategic partners, on the first occasion you provide Personal 
                Information to us, you will be asked if you wish to opt in to these marketing communications.
              </motion.p>

              <motion.p variants={sectionVariants}>
                You may opt out of receiving marketing communications relating to our brands, products, promotions, 
                services or those of our related companies or strategic partners at any time by following the opt-out 
                instructions provided.
              </motion.p>

              <motion.p variants={sectionVariants}>
                All Personal Information is collected and held by Angstrohm Foods Pvt Ltd or by our related companies 
                in jurisdictions outside of India. However, we may also store your Personal Information within technology 
                platforms and databases operated by third parties. We will take reasonable precautions against unauthorized 
                use, access, and disclosure by those third parties.
              </motion.p>

              {/* Enhanced heading spacing with pt-8 pb-2 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-8 pb-2">
                We will not share your Personal Information with third parties except:
              </motion.h2>
              
              <motion.ul variants={containerVariants} className="list-none space-y-3 pl-2">
                {[
                  "we may publish your name in connection with a promotion if you are a winner;",
                  "where necessary and only to the extent necessary for the third parties to provide services to us in connection with our promotions;",
                  "to our third-party business partners including marketing and advertising companies, data processing companies, and data analysis companies to conduct sales, marketing, and advertising research and analysis on our behalf;",
                  "to third party data processing agents to assist us in providing our services to you;",
                  "to third party survey analysis agencies (we contractually obligate these third parties to protect the confidentiality of customer survey information) to assist us in improving our services."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={listItemVariants}
                    whileHover={{ x: 3 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-orange-400 mt-1.5">•</span> 
                    <span className="text-gray-600 text-base">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p variants={sectionVariants} className="pt-4">
                Except as described in this Privacy Policy, we will not disclose or use your Personal Information without 
                your permission unless required or permitted by law.
              </motion.p>

              <motion.p variants={sectionVariants}>
                Your Personal Information remains yours. You may request details of the Personal Information that is held 
                by us and we will delete it or correct it if you ask us to do so. You may contact us using the contact 
                information below.
              </motion.p>

              <motion.p variants={sectionVariants}>
                We take reasonable precautions to make sure that we keep your Personal Information secure and comply with 
                our obligations in relation to the security of your Personal Information that is held by us to address 
                ris such as loss, misuse, unauthorized access, disclosure, alteration, and destruction.
              </motion.p>

              <motion.p variants={sectionVariants}>
                Where you have authorized us to disclose your Personal Information to third parties, their use and 
                maintenance of your Personal Information is outside our control and we accept no responsibility or 
                liability for such third-party use. These third parties may have separate and independent privacy 
                policies which will govern your Personal Information disclosed to them.
              </motion.p>

              <motion.p variants={sectionVariants}>
                We may update this Privacy Policy from time to time.
              </motion.p>

              <motion.p variants={sectionVariants}>
                From time to time, Angstrohm Foods Pvt Ltd may offer certain promotions. Our promotions may contain links 
                to third party websites or applications. We are not responsible for the privacy practices or content of 
                third party websites or applications. These third party websites may have separate and independent privacy 
                policies, and we encourage you to investigate and ask questions before disclosing any information to the 
                operators of third party websites.
              </motion.p>

              <motion.p variants={sectionVariants}>
                Your participation in our promotions is also governed by any applicable Terms and Conditions of Entry. 
                Please read these carefully, as you agree to them by your entry to the relevant promotion.
              </motion.p>

              <motion.p variants={sectionVariants}>
                By using or accessing our digital platforms or entering our promotions, you are deemed to have agreed to 
                our Privacy Policy (as amended from time to time). Be sure to review this Privacy Policy periodically to 
                ensure familiarity with its most current version. If you disagree with the changes in our Privacy Policy, 
                please do not use our digital platforms after the posting of such changes online. Please note that if you 
                elect not to provide certain information to us, we may not be able to provide you with the products, 
                services or information you require.
              </motion.p>

              {/* Cookie Box */}
              <motion.div 
                variants={contactVariants}
                whileHover="hover"
                className="bg-gray-50 p-6 my-8 border border-gray-100 rounded-lg transition-all duration-300"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-500 text-sm font-light italic leading-relaxed"
                >
                  "Cookie" technology enables the Websites or service provider's system to recognize your browser and 
                  capture and remember certain information. We use cookies to understand and save your preferences for 
                  future visits, to enable ad serving on our Websites and to compile aggregate data about Websites traffic 
                  and interaction so that we can offer a better Websites experience and tools in the future. We may contract 
                  with third party service providers to assist us in better understanding our Websites visitors.
                </motion.p>
              </motion.div>

              {/* Enhanced heading spacing with pt-8 pb-2 */}
              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-8 pb-2">Contact Us</motion.h2>
              
              <motion.p variants={sectionVariants}>
                If there are any questions regarding this Privacy Policy or you would like to request correction to your 
                Personal Information that we hold, you may contact us using the information below:
              </motion.p>
              
              {/* Contact Address Block */}
              <motion.div 
                variants={contactVariants}
                whileHover="hover"
                className="border border-gray-100 rounded-lg p-6 mt-4 hover:shadow-sm transition-all duration-300"
              >
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-medium text-gray-800 text-base mb-2"
                >
                  Angstrohm Foods Pvt Ltd
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-gray-500 text-sm"
                >
                  3rd Floor, Krishna Arcade,
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-500 text-sm"
                >
                  No. 17, S K NAGAR, KODIGEHALLI,
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-gray-500 text-sm"
                >
                  Bengaluru, Karnataka, 560092
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 text-sm"
                >
                  <span className="font-medium text-gray-600">Email:</span>{' '}
                  <a 
                    href="mailto:woohoo@thehappyfoodcompany.com" 
                    className="text-orange-500 hover:text-orange-600 underline transition-colors duration-300"
                  >
                    woohoo@thehappyfoodcompany.com
                  </a>
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
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
};

export default PrivacyPolicyUI;