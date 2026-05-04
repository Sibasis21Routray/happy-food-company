import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);

export const Footer: React.FC = () => {
  const productLinks = {
    cashewRaisin: "cashew-raisin",
    coconutAlmond: "coconut-almond",
    dateAlmondCranberry: "date-almond-cranberry",
    almondCranberry: "almond-cranberry"
  };

  const footerLinks = {
    products: [
      { name: 'Cashew Raisin', path: `/product/${productLinks.cashewRaisin}` },
      { name: 'Coconut Almond', path: `/product/${productLinks.coconutAlmond}` },
      { name: 'Date Almond Cranberry', path: `/product/${productLinks.dateAlmondCranberry}` },
      { name: 'Almond Cranberry', path: `/product/${productLinks.almondCranberry}` },
    ],
    company: [
      { name: 'About', path: '/about-us' },
      { name: 'Our Team', path: '/happy-team' },
      { name: 'Careers', path: '/careers' },
      { name: 'Nutrition', path: 'https://happybarnutrition.org/', external: true },
    ],
    support: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Use', path: '/terms' },
      { name: 'Returns', path: '/returns' },
      { name: 'Contact', path: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
    { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
    { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-6 max-w-[1400px] py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="/images/logo.png" 
                alt="Happy Bar" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              All-natural protein bars crafted with premium ingredients for your everyday adventures.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-gray-700 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-gray-900 font-light text-sm tracking-wide mb-6">
              PRODUCTS
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 text-sm font-light hover:text-gray-700 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link 
                  to="/happy-shop" 
                  className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors duration-300"
                >
                  Shop All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-gray-900 font-light text-sm tracking-wide mb-6">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  {link.external ? (
                    <a 
                      href={link.path} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-gray-400 text-sm font-light hover:text-gray-700 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className="text-gray-400 text-sm font-light hover:text-gray-700 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-gray-900 font-light text-sm tracking-wide mb-6">
              SUPPORT
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 text-sm font-light hover:text-gray-700 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4">
              <a 
                href="mailto:woohoo@thehappyfoodcompany.com" 
                className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors duration-300"
              >
                woohoo@thehappyfoodcompany.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-xs font-light">
            <span>Angstrohm Foods Pvt Ltd</span>
            <span className="hidden md:inline mx-2">•</span>
            <br className="md:hidden" />
            <span>Krishna Arcade, Kodigehalli, Bengaluru - 560092</span>
          </div>
          <div className="text-gray-400 text-xs font-light">
            © {new Date().getFullYear()} Happy Bar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};