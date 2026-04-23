import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, MapPin, Clock, CreditCard, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShopNowSection } from '../components/ShopNowSection';

const DeliveryPolicyPage = () => {
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
          Delivery Policy
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
                The following provisions form the basis of the thehappyfoodcompany.com Delivery Policy. These provisions are 
                intended to protect you (the buyers), Angstrohm, delivery service partners and Angstrohm's affiliate companies. 
                Your purchase(s) on the thehappyfoodcompany.com Shop imply acceptance of this Delivery Policy and it is your 
                responsibility to read and understand it.
              </p>
              
              <p className="italic text-[#4ba9d4] font-semibold">
                This Delivery Policy is subject to change.
              </p>

              {/* Product Availability */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Product Availability</h2>
              <p>
                All orders are subject to product availability. If an item in your order is unavailable, we will ship you the 
                part of your order that is available. When that item becomes available, we will ship you the rest of your order.
              </p>

              {/* Delivery Arrangement */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Delivery Arrangement</h2>
              <p>
                Upon purchase on the thehappyfoodcompany.com Shop, we will arrange to deliver the item(s) to the delivery 
                address specified at the time of checkout.
              </p>

              {/* Shipping Costs */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Shipping Costs</h2>
              <p>
                Shipping costs for your order are <strong>non-refundable</strong> and are based on the weight of the items you 
                order and your location.
              </p>

              {/* Delivery Service Partner */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Delivery Service Partner</h2>
              <p>
                Your Order will be delivered to you via the service of a delivery service partner of our choice.
              </p>

              {/* Delivery Date */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Delivery Date</h2>
              <p>
                The date of delivery for your order may vary due to delivery service partner shipping practices, delivery 
                location, method of delivery and the quantity of items ordered, and in addition your order may be delivered 
                in separate shipments. We shall not be liable for any losses, liabilities, costs, damages, charges or expenses 
                arising out of late delivery. We will, to the best of our ability, notify you if we expect to be unable to meet 
                our delivery dates.
              </p>

              {/* Additional Shipping Charges */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Additional Charges</h2>
              <p>
                Additional shipping charges may apply depending on your location and the size of your order.
              </p>

              {/* Taxes */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Taxes</h2>
              <p>
                You are responsible for all taxes applicable to the delivery of your order.
              </p>

              {/* Damage on Delivery */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Damage on Delivery</h2>
              <p>
                If there is any damage to the items that you ordered on delivery, you must contact us within{' '}
                <strong className="text-[#ff4081]">seven (7) days</strong> from receipt of your order.
              </p>

              {/* Delivery Locations */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Delivery Locations</h2>
              <p>
                We currently deliver <strong>within India only</strong> and the days of delivery depend on various Delivery 
                partners that we work through.
              </p>
              <p className="mt-2">
                Please note that we can't accept delivery to a <strong>P.O. Box address</strong>. Also, it might not be 
                possible for us to deliver to certain locations in some unique circumstances. Should that happen, we will 
                contact you to arrange for delivery to an alternative address.
              </p>

              {/* Address Changes */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Address Changes</h2>
              <p>
                In most cases, once the order is confirmed and payment is made, we will not be able to accommodate changes 
                to the delivery address. However, we will endeavour to accommodate changes where possible.
              </p>

              {/* Delivery Charges Calculation */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Delivery Charges</h2>
              <p>
                Delivery Charges will be calculated based on the weight of the Order received and displayed during checkout.
              </p>

              {/* Proof of Identity */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Proof of Identity</h2>
              <p>
                Upon delivery of the item(s), you or your authorised representative:
              </p>
              <ul className="list-none space-y-2 mt-2 ml-4">
                <li className="flex gap-2">
                  <span className="text-[#4ba9d4] font-bold">•</span> 
                  <span>Must be present to acknowledge receipt for the delivery</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#4ba9d4] font-bold">•</span> 
                  <span>Will be required to produce proof of identity on delivery of item(s)</span>
                </li>
              </ul>

              {/* Privacy Information */}
              <h2 className="text-xl font-black text-[#1d4289] pt-4">Privacy Information</h2>
              <p>
                The personal information that is collected from you in connection with your subscription of 
                thehappyfoodcompany.com or a purchase on thehappyfoodcompany.com will be used in accordance with the 
                Privacy Policy of thehappyfoodcompany.com. Relevant personal Information such as your name, address and 
                phone number will be shared with our delivery service partners in order to deliver the purchased items.
              </p>

              

             

              {/* Contact Information */}
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
                  Effective as of January 13, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
          
      </section>
      {/* SHOP Section */}
              <ShopNowSection/>
    </div>
  );
};

export default DeliveryPolicyPage;