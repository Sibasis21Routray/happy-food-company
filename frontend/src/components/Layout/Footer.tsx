import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-1.1 0-2 .9-2 2v1h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Footer: React.FC = () => {
  const productLinks = {
    cashewRaisin: "cashew-raisin",
    coconutAlmond: "coconut-almond",
    dateAlmondCranberry: "date-almond-cranberry",
    almondCranberry: "almond-cranberry"
  };

  return (
    <footer className="relative w-full overflow-hidden pt-32 pb-12 mt-auto">
      <div className="container mx-auto px-6 relative z-10">
        {/* 2. Top Links - 4 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left mb-20">
          
          {/* Column 1 - Products */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-[#133863] font-bold text-lg mb-6 tracking-tight">
              Products
            </h4>
            <div className="flex flex-col gap-3">
              <Link to={`/product/${productLinks.cashewRaisin}`} className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Cashew Raisin
              </Link>
              <Link to={`/product/${productLinks.coconutAlmond}`} className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Coconut Almond
              </Link>
              <Link to={`/product/${productLinks.dateAlmondCranberry}`} className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Date Almond Cranberry
              </Link>
              <Link to={`/product/${productLinks.almondCranberry}`} className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Almond Cranberry
              </Link>
              <Link to="/happy-shop" className="text-[#ef4444] font-bold hover:scale-105 transform inline-block transition-all text-sm">
                Buy Now
              </Link>
            </div>
          </div>
          
          {/* Column 2 - About Us */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-[#133863] font-bold text-lg mb-6 tracking-tight">
              About Us
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/about-us" className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                The Company
              </Link>
              <Link to="/happy-team" className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Our Happy Team
              </Link>
              <Link to="/careers" className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Careers
              </Link>
              <a href="https://happybarnutrition.org/" target="_blank" rel="noreferrer" className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Nutrition Inc.
              </a>
            </div>
          </div>
          
          {/* Column 3 - Quick Links */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-[#133863] font-bold text-lg mb-6 tracking-tight">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/privacy" className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Terms of Use
              </Link>
              <Link to="/returns" className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Returns Policy
              </Link>
              <Link to="/contact" className="text-[#5a7184] font-semibold hover:text-[#0ea5e9] transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Column 4 - Contact & Social */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-[#133863] font-bold text-lg mb-6 tracking-tight">
              Connect With Us
            </h4>
            <div className="flex flex-col gap-3 mb-6">
              <a href="mailto:woohoo@thehappyfoodcompany.com" className="text-[#ef4444] font-bold text-sm hover:underline decoration-2 underline-offset-4">
                woohoo@thehappyfoodcompany.com
              </a>
            </div>
            
            <div className="flex gap-4 mt-2">
              <motion.a
                href="https://facebook.com"
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#133863] shadow-sm hover:shadow-md transition-all"
              >
                <FacebookIcon />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#133863] shadow-sm hover:shadow-md transition-all"
              >
                <InstagramIcon />
              </motion.a>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar - Address & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-blue-200/50 gap-6">
          <div className="text-center md:text-left text-[#5a7184] text-[12px] font-semibold leading-relaxed">
            <p>Angstrohm Foods Pvt Ltd</p>
            <p>Krishna Arcade, Kodigehalli,</p>
            <p>Bengaluru, India 560092</p>
          </div>

          <div className="order-2 md:order-2">
            <Link to="/">
              <img src="/images/logo.png" alt="Happy Bar Logo" className="h-12 w-auto object-contain hover:opacity-80 transition-opacity" />
            </Link>
          </div>

          <div className="text-center md:text-right text-[#5a7184] text-[12px] font-semibold">
            <p>&copy; {new Date().getFullYear()} Happy Bar</p>
            <p>All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};