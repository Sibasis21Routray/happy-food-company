import React from 'react';
import { motion, easeInOut } from 'framer-motion';
import { ShopNowSection } from '../components/ShopNowSection';

const ReturnsPolicyPage = () => {
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeInOut }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
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
    },
    hover: {
      x: 5,
      transition: { duration: 0.2 }
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
    <div className="min-h-screen bg-white pt-24">
      
      {/* Header Section */}
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
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 "
        />
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-light text-white mb-3"
            >
              Returns and Refunds
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
              className="text-white/70 text-sm font-light mt-4"
            >
              Effective as of January 11, 2024
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Policy Document Container */}
      <motion.section
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white border border-gray-100 p-8 md:p-12 hover:border-gray-200 transition-all duration-300">
            
            <motion.div 
              variants={contentVariants}
              className="space-y-6 text-gray-600 text-sm leading-relaxed"
            >
              <motion.p variants={sectionVariants}>
                Welcome to <strong className="text-gray-800">thehappyfoodcompany.com</strong>, a website owned and operated 
                by Angstrohm Foods Pvt Ltd ("Angstrohm" or "we"), a registered company in India.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">
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

              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">
                Order Acceptance
              </motion.h2>
              <motion.p variants={sectionVariants}>
                All orders received are subject to approval by Angstrohm. Our personnel reserve the right, at our absolute 
                discretion, to reject any order without providing reasons. In the event of a rejected order, we will refund 
                any payments received.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">
                Order Fulfillment and Returns/Refunds
              </motion.h2>
              <motion.p variants={sectionVariants}>
                We strive to fulfill all orders accurately. Returns, exchanges, or refunds can be arranged only under the 
                following circumstances:
              </motion.p>
              <motion.ul className="list-none space-y-2 mt-2">
                {[
                  "If the item(s) delivered are damaged or defective;",
                  "If the item(s) have exceeded the expiry date;",
                  "If the item(s) received differ from your order."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    variants={listItemVariants}
                    whileHover="hover"
                    className="flex gap-3"
                  >
                    <span className="text-gray-400 mt-0.5">–</span> 
                    <span className="text-gray-500 text-sm">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">
                Notification and Remediation
              </motion.h2>
              <motion.p variants={sectionVariants}>
                If any of the aforementioned situations occur, please contact us at{' '}
                <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-gray-600 hover:text-gray-800 transition-colors">
                  woohoo@thehappyfoodcompany.com
                </a>{' '}
                within <strong className="text-gray-700">seven (7) days</strong> of receiving the item(s). We will promptly 
                address the issue. If an exchange is required and the item(s) are unavailable, a full refund will be issued.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">
                Processing Time
              </motion.h2>
              <motion.p variants={sectionVariants}>
                Please allow up to <strong className="text-gray-700">14 working days</strong> for your inquiry to be processed.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">
                Return Procedure
              </motion.h2>
              <motion.p variants={sectionVariants}>
                We will coordinate with you and our delivery service provider to schedule the pick-up of the item(s) (where 
                applicable). The returned item(s) should be unused and in the original condition, quantity, and packaging as 
                initially delivered, accompanied by proof of order, payment, and delivery.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">
                Refund Process
              </motion.h2>
              <motion.p variants={sectionVariants}>
                Refund payments will be debited to the customer's credit card or debit card within{' '}
                <strong className="text-gray-700">14 to 30 working days</strong>, depending on the bank's refund policy. 
                We are not liable for any loss, damage, cost, or expense resulting from any delay in your bank/financial 
                institution processing the refund.
              </motion.p>

              <motion.h2 variants={sectionVariants} className="text-xl font-light text-gray-800 pt-4">
                Order Cancellation
              </motion.h2>
              <motion.p variants={sectionVariants}>
                If you choose to cancel any order after making payment, refunds may be made via your credit card or directly 
                to your bank account at our discretion. Please be aware that we will deduct any fees levied by the payment 
                gateway provider for processing the payment and/or refund.
              </motion.p>

              {/* Contact Section */}
              <motion.div 
                variants={contactVariants}
                whileHover="hover"
                className="border border-gray-100 p-6 mt-6 hover:border-gray-200 transition-all duration-300"
              >
                <p className="font-light text-gray-800 text-base mb-2">Angstrohm Foods Pvt Ltd</p>
                <p className="text-gray-500 text-sm">3rd Floor, Krishna Arcade,</p>
                <p className="text-gray-500 text-sm">No. 17, S K NAGAR, KODIGEHALLI,</p>
                <p className="text-gray-500 text-sm">Bengaluru, Karnataka, 560092</p>
                <p className="mt-3 text-sm">
                  <span className="font-light text-gray-600">Email:</span>{' '}
                  <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-gray-500 hover:text-gray-700 transition-colors">
                    woohoo@thehappyfoodcompany.com
                  </a>
                </p>
              </motion.div>
            </motion.div>
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
};

export default ReturnsPolicyPage;