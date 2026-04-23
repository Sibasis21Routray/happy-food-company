import React from 'react';
import { Link } from 'react-router-dom';

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-1.1 0-2 .9-2 2v1h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Footer: React.FC = () => {
  // Define product IDs based on your actual product slugs or IDs
  // Update these with your actual product identifiers
  const productLinks = {
    cashewRaisin: "cashew-raisin", // or use actual product ID like "prod_001"
    coconutAlmond: "coconut-almond",
    dateAlmondCranberry: "date-almond-cranberry",
    almondCranberry: "almond-cranberry"
  };

  return (
    <footer className="relative w-full overflow-hidden text-center pt-20 pb-8 mt-auto min-h-[480px] flex flex-col justify-end">
      {/* Exact Vector Background (3 color bands wrapping over a solid base) */}
      <div className="absolute inset-0 z-0 pattern-bottom">
        <svg viewBox="0 0 1440 480" preserveAspectRatio="none" className="w-full h-full block">
          {/* Base Light Blue */}
          <rect width="1440" height="480" fill="#66C9F3" />
          
          {/* Top Darker Blue Wave */}
          <path fill="#48BCEE" d="M0,0 L1440,0 L1440,120 C1100,80 800,160 450,180 C200,195 100,240 0,300 Z" />
          
          {/* Yellow Sand Wave */}
          <path fill="#FDC34F" d="M0,450 C300,380 600,410 900,410 C1100,410 1300,430 1440,460 L1440,480 L0,480 Z" />
          
          {/* Bottom Cream Wave */}
          <path fill="#F8DA81" d="M0,480 C300,420 600,460 900,440 C1100,435 1300,450 1440,480 L0,480 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-[1200px]">
        {/* Top Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center mb-14">
          
          {/* Products */}
          <div className="flex flex-col items-center">
            <h4 className="text-[#133863] font-black text-lg sm:text-[16px] underline decoration-2 underline-offset-4 mb-4 tracking-wide font-sans">Products</h4>
            <div className="flex flex-col gap-1.5 font-bold text-white text-[13.5px]">
              <Link to={`/product/${productLinks.cashewRaisin}`} className="hover:text-blue-100 transition-colors">
                Cashew Raisin
              </Link>
              <Link to={`/product/${productLinks.coconutAlmond}`} className="hover:text-blue-100 transition-colors">
                Coconut Almond
              </Link>
              <Link to={`/product/${productLinks.dateAlmondCranberry}`} className="hover:text-blue-100 transition-colors">
                Date Almond Cranberry
              </Link>
              <Link to={`/product/${productLinks.almondCranberry}`} className="hover:text-blue-100 transition-colors">
                Almond Cranberry
              </Link>
              <Link to="/happy-shop" className="text-[#ED2024] hover:text-[#d3181b] transition-colors mt-0.5 font-black tracking-wide">
                Buy Now
              </Link>
            </div>
          </div>

          {/* About Us */}
          <div className="flex flex-col items-center">
             <h4 className="text-[#133863] font-black text-lg sm:text-[16px] underline decoration-2 underline-offset-4 mb-4 tracking-wide font-sans">About Us</h4>
             <div className="flex flex-col gap-1.5 font-bold text-white text-[13.5px]">
               <Link to="/about-us" className="hover:text-blue-100 transition-colors">The Company</Link>
               <Link to="/happy-team" className="hover:text-blue-100 transition-colors">Our Happy Team</Link>
               <Link to="/careers" className="hover:text-blue-100 transition-colors">Careers</Link>
               <a
  href="https://happybarnutrition.org/"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-blue-100 transition-colors"
>
  Happy Bar Nutrition Inc.
</a>
             </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
             <h4 className="text-[#133863] font-black text-lg sm:text-[16px] underline decoration-2 underline-offset-4 mb-4 tracking-wide font-sans">Quick Links</h4>
             <div className="flex flex-col gap-1.5 font-bold text-white text-[13.5px]">
               <Link to="/privacy" className="hover:text-blue-100 transition-colors">Privacy Policy</Link>
               <Link to="/terms" className="hover:text-blue-100 transition-colors">Terms of Use</Link>
               <Link to="/returns" className="hover:text-blue-100 transition-colors">Returns and Refunds</Link>
               <Link to="/delivery" className="hover:text-blue-100 transition-colors">Delivery Policy</Link>
               <Link to="/contact" className="hover:text-blue-100 transition-colors">Contact Us</Link>
             </div>
          </div>
        </div>

        {/* Bottom Contacts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center mt-2 mb-10 w-full px-2">
           {/* Email */}
           <div className="font-bold text-[#ED2024] text-[13.5px] flex justify-center md:justify-center">
             <a href="mailto:woohoo@thehappyfoodcompany.com" className="hover:underline tracking-tight">woohoo@thehappyfoodcompany.com</a>
           </div>

           {/* Logo */}
           <div className="flex justify-center">
             <Link to="/">
               <img src="/images/logo.png" alt="Happy Bar Logo" className="h-[40px] md:h-[45px] object-contain drop-shadow-sm hover:opacity-80 transition-opacity cursor-pointer" />
             </Link>
           </div>

           {/* Address */}
           <div className="font-bold text-[#ED2024] text-[13.5px] leading-[1.25] flex flex-col justify-center md:justify-center items-center">
             <span>Angstrohm Foods Pvt Ltd</span>
             <span>3rd Floor, Krishna Arcade,</span>
             <span>No. 17, S K Nagar, Kodigehalli,</span>
             <span>Bengaluru, Karnataka, 560092</span>
             <span>INDIA</span>
           </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-6 relative z-20">
           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#133863] hover:opacity-80 transition-opacity">
             <FacebookIcon />
           </a>
           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#133863] hover:opacity-80 transition-opacity">
             <InstagramIcon />
           </a>
        </div>
      </div>
    </footer>
  );
};