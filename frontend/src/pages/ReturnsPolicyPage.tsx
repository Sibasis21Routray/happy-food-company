import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShopNowSection } from '../components/ShopNowSection';

const ReturnsPolicyPage = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Header Section - Blue Background */}
      <section className="bg-[#4ba9d4] pt-20 pb-16 text-center text-white px-4">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl md:text-[120px] font-black tracking-tighter leading-none mb-0"
        >
          POLICIES
        </motion.h1>
        <h2 className="text-3xl md:text-5xl font-black text-[#1d4289] italic -mt-2 md:-mt-6">
          Returns and Refunds
        </h2>

        {/* Policy Document Container */}
        <div className="min-h-screen py-12">
          <div className="max-w-5xl mx-auto mt-8 bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 text-left text-slate-700 leading-relaxed overflow-hidden">
            
            <div className="space-y-6 text-sm md:text-base max-w-5xl">
              {/* Opening Paragraph */}
              <p>
                Welcome to <strong>thehappyfoodcompany.com</strong>, a website owned and operated by Angstrohm Foods Pvt Ltd 
                ("Angstrohm" or "we"), a registered company in India.
              </p>

              {/* Terms and Conditions Section */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Terms and Conditions</h2>
              <p>
                The following provisions constitute the thehappyfoodcompany.com Returns and Refunds Policy. These provisions 
                aim to safeguard the interests of you (the buyers), Angstrohm, our delivery service partners, and Angstrohm's 
                affiliate companies.
              </p>
              
              <p>
                Your purchase(s) from the thehappyfoodcompany.com Shop implies your acceptance of this Returns and Refunds 
                Policy, and it is your responsibility to thoroughly read and comprehend its contents.
              </p>
              
              <p>
                Please note that this Returns and Refunds Policy is subject to change.
              </p>

              {/* Order Acceptance Section */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Order Acceptance</h2>
              <p>
                All orders received are subject to approval by Angstrohm. Our personnel reserve the right, at our absolute 
                discretion, to reject any order without providing reasons. In the event of a rejected order, we will refund 
                any payments received.
              </p>

              {/* Order Fulfillment and Returns/Refunds Section */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Order Fulfillment and Returns/Refunds</h2>
              <p>
                We strive to fulfill all orders accurately. Returns, exchanges, or refunds can be arranged only under the 
                following circumstances:
              </p>
              <ul className="list-none space-y-2 mt-2">
                <li className="flex gap-2">
                  <span className="text-[#4ba9d4] font-bold">–</span> 
                  <span>If the item(s) delivered are damaged or defective;</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#4ba9d4] font-bold">–</span> 
                  <span>If the item(s) have exceeded the expiry date;</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#4ba9d4] font-bold">–</span> 
                  <span>If the item(s) received differ from your order.</span>
                </li>
              </ul>

              {/* Notification and Remediation Section */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Notification and Remediation</h2>
              <p>
                If any of the aforementioned situations occur, please contact us at{' '}
                <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-[#ff4081] hover:underline font-semibold">
                  woohoo@thehappyfoodcompany.com
                </a>{' '}
                within <strong className="text-[#1d4289]">seven (7) days</strong> of receiving the item(s). We will promptly 
                address the issue. If an exchange is required and the item(s) are unavailable, a full refund will be issued.
              </p>

              {/* Processing Time Section */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Processing Time</h2>
              <p>
                Please allow up to <strong className="text-[#1d4289]">14 working days</strong> for your inquiry to be processed.
              </p>

              {/* Return Procedure Section */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Return Procedure</h2>
              <p>
                We will coordinate with you and our delivery service provider to schedule the pick-up of the item(s) (where 
                applicable). The returned item(s) should be unused and in the original condition, quantity, and packaging as 
                initially delivered, accompanied by proof of order, payment, and delivery.
              </p>

              {/* Refund Process Section */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Refund Process</h2>
              <p>
                Refund payments will be debited to the customer's credit card or debit card within{' '}
                <strong className="text-[#1d4289]">14 to 30 working days</strong>, depending on the bank's refund policy. 
                We are not liable for any loss, damage, cost, or expense resulting from any delay in your bank/financial 
                institution processing the refund.
              </p>

              {/* Order Cancellation Section */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Order Cancellation</h2>
              <p>
                If you choose to cancel any order after making payment, refunds may be made via your credit card or directly 
                to your bank account at our discretion. Please be aware that we will deduct any fees levied by the payment 
                gateway provider for processing the payment and/or refund.
              </p>


              {/* Effective Date */}
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl border-l-4 border-[#4ba9d4]">
                <p className="font-bold text-[#1d4289] text-lg">Angstrohm Foods Pvt Ltd</p>
                <p>3rd Floor, Krishna Arcade,</p>
                <p>No. 17, S K NAGAR, KODIGEHALLI,</p>
                <p>Bengaluru, Karnataka, 560092</p>
                <p className="mt-2">
                  <span className="font-bold text-[#1d4289]">Email:</span>{' '}
                  <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-[#ff4081] hover:underline">
                    woohoo@thehappyfoodcompany.com
                  </a>
                </p>
                <p className="text-xs mt-4 font-black uppercase text-slate-400 tracking-widest">
                  Effective as of January 11, 2024
                </p>
              </div>
            </div>

          
          </div>
        </div>
      </section>
         <ShopNowSection />
    </div>
  );
};

export default ReturnsPolicyPage;