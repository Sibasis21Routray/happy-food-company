import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Package, Heart, Ticket, Gift, Bell, LogOut, Coins, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState<{ fullName: string } | null>(null);

  const links = [
    { path: '/', label: 'HOME' },
    { path: '/happy-bars', label: 'HAPPY BARS' },
    { path: '/blog', label: 'BLOG' },
    { path: '/happy-shop', label: 'HAPPY SHOP' },
    { path: '/login', label: user ? user.fullName.split(' ')[0] : 'LOGIN', isUserLink: true }
  ];

  const userMenuItems = [
    { label: 'My Profile', path: '/my-account', icon: <User size={18} color="#FD6804" /> },
    { label: 'Happy Points', path: '/points', icon: <Coins size={18} color="#FD6804" /> },
    { label: 'Orders', path: '/orders', icon: <Package size={18} color="#FD6804" /> },
    { label: 'Wishlist', path: '/wishlist', icon: <Heart size={18} color="#FD6804" /> },
    { label: 'Coupons', path: '/coupons', icon: <Ticket size={18} color="#FD6804" /> },
    { label: 'Gift Cards', path: '/gift-cards', icon: <Gift size={18} color="#FD6804" /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell size={18} color="#FD6804" /> },
    { label: 'Logout', path: '/login', icon: <LogOut size={18} color="#FD6804" />, isLogout: true },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const happyBarsMenu = [
    { title: 'CASHEW RAISIN', subtitle: 'Energize your Enjoyment!', color: 'text-[#4A3E8E]', img: '/images/cashew-raisin.png', link: '/product/cashew-raisin' },
    { title: 'COCONUT ALMOND', subtitle: 'Spark your snacking!', color: 'text-[#E86E24]', img: '/images/coconut-almond.png', link: '/product/coconut-almond' },
    { title: 'DATE ALMOND CRANBERRY', subtitle: 'Fuel your Fun!', color: 'text-[#C92C3A]', img: '/images/date-almond-cranberry.png', link: '/product/date-almond-cranberry' },
    { title: 'ALMOND CRANBERRY', subtitle: 'Unleash the Awesome!', color: 'text-[#902A78]', img: '/images/almond-cranberry.png', link: '/product/almond-cranberry' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? 'h-[70px] bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-gray-100' 
          : 'h-[85px] bg-white border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center w-full max-w-[1400px] h-full">
        {/* Brand Logo */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring' }} className="h-full flex items-center py-2">
          <Link to="/">
            <img 
              src="/images/logo.png" 
              alt="Happy Bar Logo" 
              className={`object-contain transition-all duration-300 drop-shadow-sm ${scrolled ? 'h-[50px]' : 'h-[70px]'}`}
            />
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 xl:gap-10 items-center h-full relative">
          {links.map((link, idx) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            const isHappyBars = link.label === 'HAPPY BARS';
            const isUserLink = link.isUserLink;
            
            return (
              <div key={idx} className="relative group flex items-center h-full">
                <Link 
                  to={isHappyBars || (isUserLink && user) ? '#' : link.path} 
                  onClick={(e) => { if (isHappyBars || (isUserLink && user)) e.preventDefault(); }}
                  className={`relative h-full flex items-center pt-1 gap-1.5 ${isHappyBars || (isUserLink && user) ? 'cursor-default' : ''}`}
                >
                  <span className={`font-black tracking-[0.1em] text-[13px] xl:text-[14px] transition-colors duration-300 ${
                    isActive ? 'text-[#ff6b00]' : 'text-[#dd5d36] group-hover:text-[#ff6b00]'
                  }`}>
                    {link.label}
                  </span>
                  {isUserLink && user && (
                    <ChevronDown size={14} className="text-[#dd5d36] group-hover:text-[#ff6b00] transition-transform group-hover:rotate-180" />
                  )}
                  
                  {/* Active/Hover Underline Indicator */}
                  <div 
                    className={`absolute bottom-0 left-0 h-1.5 w-full bg-[#ff6b00] rounded-t-lg transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>

                {/* --- MEGA MENU DROPDOWN FOR HAPPY BARS --- */}
                {isHappyBars && (
                  <div className="absolute top-[80%] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[420px] pt-8 cursor-default z-50 pointer-events-none group-hover:pointer-events-auto">
                    <div className="relative bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-5 border border-gray-100/80">
                      {/* Top arrow pointer */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 rounded-[4px] border-l border-t border-gray-100/80"></div>
                      
                      <div className="flex flex-col gap-2 relative z-10">
                        {happyBarsMenu.map((item, i) => (
                          <Link key={i} to={item.link} className="flex gap-6 items-center group/item hover:bg-orange-50/50 p-3 rounded-[1.5rem] transition-colors overflow-visible">
                            <div className="w-[90px] h-14 flex items-center justify-center shrink-0">
                               <img src={item.img} alt={item.title} className="max-w-[130%] max-h-[160%] object-contain group-hover/item:scale-[1.15] group-hover/item:-rotate-3 transition-transform duration-300 drop-shadow-md z-20 relative" />
                            </div>
                            <div className="flex flex-col justify-center translate-y-0.5">
                               <span className={`font-black text-[14px] tracking-widest ${item.color} leading-none mb-1.5 uppercase`}>{item.title}</span>
                               <span className="font-extrabold text-gray-400 text-[11px] tracking-widest leading-none block">{item.subtitle}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- USER PROFILE DROPDOWN --- */}
                {isUserLink && user && (
                  <div className="absolute top-[80%] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[260px] pt-8 cursor-default z-50 pointer-events-none group-hover:pointer-events-auto">
                    <div className="relative bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-3 border border-gray-100/80">
                      {/* Top arrow pointer */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 rounded-[4px] border-l border-t border-gray-100/80"></div>
                      
                      <div className="flex flex-col relative z-10">
                        {userMenuItems.map((item, i) => (
                          <Link 
                            key={i} 
                            to={item.path} 
                            onClick={item.isLogout ? handleLogout : undefined}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-orange-50/70 rounded-2xl transition-all group/item"
                          >
                            <span className="group-hover/item:scale-110 transition-transform">
                              {item.icon}
                            </span>
                            <span className="font-bold text-[14px] text-gray-600 group-hover/item:text-gray-900 tracking-tight">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="ml-4 h-full flex items-center">
            <Link to="/happy-shop" className="flex items-center gap-2 bg-gradient-to-r from-[#ff6b00] to-[#f3521b] text-white px-6 py-2.5 rounded-full hover:shadow-[0_8px_20px_rgba(255,107,0,0.3)] transition-all">
              <ShoppingCart size={18} strokeWidth={3} />
              <span className="font-black tracking-[0.1em] text-[13px]">0 Items</span>
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="lg:hidden text-[#ff6b00] p-2 hover:bg-orange-50 rounded-full transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[100%] left-0 w-full bg-white shadow-2xl border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col py-6 px-8 gap-4">
              {links.map((link, idx) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                const isHappyBars = link.label === 'HAPPY BARS';
                return (
                  <Link 
                    key={idx} 
                    to={isHappyBars ? '#' : link.path} 
                    onClick={(e) => {
                      if (isHappyBars) {
                        e.preventDefault();
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={`font-black tracking-[0.1em] text-[14px] py-4 border-b border-gray-50 flex items-center justify-between ${isActive ? 'text-[#ff6b00]' : 'text-[#cf5f3c]'}`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#ff6b00]" />}
                  </Link>
                );
              })}
              <Link 
                to="/happy-shop" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 bg-[#ff6b00] text-white px-5 py-4 rounded-full mt-6 font-black tracking-[0.1em] text-sm shadow-md"
              >
                <ShoppingCart size={18} strokeWidth={3} /> VIEW CART (0 Items)
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
