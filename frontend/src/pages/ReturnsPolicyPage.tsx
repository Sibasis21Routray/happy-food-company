import React from 'react';
import { motion } from 'framer-motion';
import { ShopNowSection } from '../components/ShopNowSection';

const ReturnsPolicyPage = () => {
  // Animation variants aligned with the uniform design specs
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
      
      {/* 1. FIXED NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Logo */}
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

          {/* User Meta Links */}
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="cursor-pointer hover:text-gray-900">👤 siba</span>
            <span className="cursor-pointer hover:text-gray-900 relative">
              🛒 <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </span>
          </div>
        </div>
      </nav>

      {/* 2. PURE WHITE HERO HEADER */}
      <motion.div
        variants={headerVariants}
        className="pt-36 pb-12 relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-5xl font-normal text-black tracking-wide"
            >
              Returns and Refunds
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* 3. DOCUMENT CONTENT CONTAINER */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="pb-24 bg-white"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            variants={contentVariants}
            className="px-0 py-4 transition-all duration-300"
          >
            {/* Structured Paragraph & List Layout */}
            <div className="space-y-6 text-gray-600 text-base text-left leading-relaxed">
              
              <motion.p variants={sectionVariants}>
                Welcome to <strong className="text-gray-800">thehappyfoodcompany.com</strong>, a website owned and operated 
                by Angstrohm Foods Pvt Ltd ("Angstrohm" or "we"), a registered company in India.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-4">
                Terms and Conditions
              </motion.h2>
              
              <motion.p variants={sectionVariants}>
                The following provisions constitute the thehappyfoodcompany.com Returns and Refunds Policy. These provisions 
                aim to safeguard the interests of you (the buyers), Angstrohm, our delivery service partners, and Angstrohm's 
                affiliate companies.
              </motion.p>
              
              <motion.p variants={sectionVariants}>
                Your purchase(s) from the thehappyfoodcompany.com Shop implies your acceptance of this Returns and Refunds 
                Policy, and it is your responsibility to thoroughly read and comprehend its contents.
              </motion.p>
              
              <motion.p variants={sectionVariants}>
                Please note that this Returns and Refunds Policy is subject to change.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-4">
                Order Acceptance
              </motion.h2>
              
              <motion.p variants={sectionVariants}>
                All orders received are subject to approval by Angstrohm. Our personnel reserve the right, at our absolute 
                discretion, to reject any order without providing reasons. In the event of a rejected order, we will refund 
                any payments received.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-4">
                Order Fulfillment and Returns/Refunds
              </motion.h2>
              
              <motion.p variants={sectionVariants}>
                We strive to fulfill all orders accurately. Returns, exchanges, or refunds can be arranged only under the 
                following circumstances:
              </motion.p>
              
              {/* Bullets configured to sit clean flush relative to standard structural grid layout */}
              <motion.ul variants={containerVariants} className="list-none space-y-3 pl-0">
                {[
                  "If the item(s) delivered are damaged or defective;",
                  "If the item(s) have exceeded the expiry date;",
                  "If the item(s) received differ from your order."
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

              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-4">
                Notification and Remediation
              </motion.h2>
              
              <motion.p variants={sectionVariants}>
                If any of the aforementioned situations occur, please contact us at{' '}
                <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-orange-500 hover:text-orange-600 underline transition-colors">
                  woohoo@thehappyfoodcompany.com
                </a>{' '}
                within <strong className="text-gray-800">seven (7) days</strong> of receiving the item(s). We will promptly 
                address the issue. If an exchange is required and the item(s) are unavailable, a full refund will be issued.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-4">
                Processing Time
              </motion.h2>
              
              <motion.p variants={sectionVariants}>
                Please allow up to <strong className="text-gray-800">14 working days</strong> for your inquiry to be processed.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-4">
                Return Procedure
              </motion.h2>
              
              <motion.p variants={sectionVariants}>
                We will coordinate with you and our delivery service provider to schedule the pick-up of the item(s) (where 
                applicable). The returned item(s) should be unused and in the original condition, quantity, and packaging as 
                initially delivered, accompanied by proof of order, payment, and delivery.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-4">
                Refund Process
              </motion.h2>
              
              <motion.p variants={sectionVariants}>
                Refund payments will be debited to the customer's credit card or debit card within{' '}
                <strong className="text-gray-800">14 to 30 working days</strong>, depending on the bank's refund policy. 
                We are not liable for any loss, damage, cost, or expense resulting from any delay in your bank/financial 
                institution processing the refund.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-medium text-gray-800 pt-4">
                Order Cancellation
              </motion.h2>
              
              <motion.p variants={sectionVariants}>
                If you choose to cancel any order after making payment, refunds may be made via your credit card or directly 
                to your bank account at our discretion. Please be aware that we will deduct any fees levied by the payment 
                gateway provider for processing the payment and/or refund.
              </motion.p>

              {/* 4. BRAND ADDRESS ACCENT HIGHLIGHT BOX */}
              <motion.div 
                variants={contactVariants}
                whileHover="hover"
                className="bg-gray-50 p-6 mt-8 border border-gray-100 rounded-lg transition-all duration-300"
              >
                <h3 className="text-base font-medium text-gray-800 mb-2">Angstrohm Foods Pvt Ltd</h3>
                <p className="text-gray-600 text-base mb-1">3rd Floor, Krishna Arcade,</p>
                <p className="text-gray-600 text-base mb-1">No. 17, S K NAGAR, KODIGEHALLI,</p>
                <p className="text-gray-600 text-base mb-4">Bengaluru, Karnataka, 560092</p>
                
                <p className="text-base">
                  <span className="font-normal text-gray-700">Email:</span>{' '}
                  <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-orange-500 hover:text-orange-600 underline transition-colors">
                    woohoo@thehappyfoodcompany.com
                  </a>
                </p>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 5. FOOTER SHOP SEPARATOR SECTION */}
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

export default ReturnsPolicyPage;