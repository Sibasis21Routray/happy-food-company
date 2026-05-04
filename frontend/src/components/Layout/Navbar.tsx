import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Package, Heart, Ticket, Gift, Bell, LogOut, Coins, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileHappyBarsOpen, setMobileHappyBarsOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ fullName: string, role: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);
  
  const links = [
    { path: '/', label: 'HOME' },
    { path: '/happy-bars', label: 'COLLECTION', hasDropdown: true },
    { path: '/blog', label: 'JOURNAL' },
    { path: '/happy-shop', label: 'SHOP' },
    { path: '/login', label: user ? user.fullName : 'ACCOUNT', isUserLink: true, hasDropdown: true }
  ];

  const userMenuItems = [
    { label: 'Profile', path: '/my-account', icon: <User size={16} /> },
    { label: 'Points', path: '/points', icon: <Coins size={16} /> },
    { label: 'Orders', path: '/orders', icon: <Package size={16} /> },
    { label: 'Wishlist', path: '/wishlist', icon: <Heart size={16} /> },
    { label: 'Coupons', path: '/coupons', icon: <Ticket size={16} /> },
    { label: 'Gift Cards', path: '/gift-cards', icon: <Gift size={16} /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell size={16} /> },
    { label: 'Logout', path: '/', icon: <LogOut size={16} />, isLogout: true },
  ];

  const happyBarsMenu = [
    { title: 'Cashew Raisin', subtitle: 'Energize your Enjoyment', color: '#4A3E8E', img: '/images/cashew-raisin.png', link: '/product/cashew-raisin' },
    { title: 'Coconut Almond', subtitle: 'Spark your snacking', color: '#E86E24', img: '/images/coconut-almond.png', link: '/product/coconut-almond' },
    { title: 'Date Almond Cranberry', subtitle: 'Fuel your Fun', color: '#C92C3A', img: '/images/date-almond-cranberry.png', link: '/product/date-almond-cranberry' },
    { title: 'Almond Cranberry', subtitle: 'Unleash the Awesome', color: '#902A78', img: '/images/almond-cranberry.png', link: '/product/almond-cranberry' }
  ];

  const fetchCartAndUser = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      try {
        const cartData = await api.cart.get();
        if (cartData.cart) {
          const count = cartData.cart.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
          setCartCount(count);
        }
      } catch (err) {
        console.error('Navbar cart fetch failed:', err);
      }
    } else {
      setUser(null);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartAndUser();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCartCount(0);
    setMobileMenuOpen(false);
    setMobileUserMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileHappyBarsOpen(false);
    setMobileUserMenuOpen(false);
  }, [location]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? 'h-[64px] bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'h-[80px] bg-white border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center w-full max-w-[1400px] h-full">
        {/* Brand Logo */}
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          transition={{ duration: 0.3 }}
          className="h-full flex items-center py-2"
        >
          <Link to={user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'vendor' ? '/vendor/dashboard' : '/'}>
            <img 
              src="/images/logo.png" 
              alt="Happy Bar" 
              className={`object-contain transition-all duration-500 ${scrolled ? 'h-[42px]' : 'h-[56px]'}`}
            />
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-10 items-center h-full">
          {links.map((link, idx) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            const isHappyBars = link.label === 'COLLECTION';
            const isUserLink = link.isUserLink;
            
            if (link.label === 'ACCOUNT' && user) {
              return null;
            }
            
            if (isUserLink && !user && link.label !== 'ACCOUNT') {
              return null;
            }
            
            return (
              <div key={idx} className="relative group flex items-center h-full">
                {(!isHappyBars && !(isUserLink && user)) ? (
                  <Link 
                    to={link.path}
                    className="relative h-full flex items-center"
                  >
                    <span className={`text-[13px] font-light tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-700'
                    }`}>
                      {link.label}
                    </span>
                    
                    <div 
                      className={`absolute bottom-0 left-0 h-px bg-gray-900 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                ) : (
                  <div className="relative h-full flex items-center cursor-default">
                    <span className={`text-[13px] font-light tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-700'
                    }`}>
                      {isHappyBars ? 'COLLECTION' : (user?.fullName?.split(' ')[0] || 'ACCOUNT')}
                    </span>
                    <ChevronDown size={14} className="ml-1 text-gray-400 group-hover:text-gray-700 transition-all duration-300 group-hover:rotate-180" />
                    
                    <div 
                      className={`absolute bottom-0 left-0 h-px bg-gray-900 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </div>
                )}

                {/* Collection Dropdown */}
                {isHappyBars && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[380px] cursor-default z-50">
                    <div className="bg-white shadow-xl border border-gray-100">
                      <div className="p-4 space-y-1">
                        {happyBarsMenu.map((item, i) => (
                          <Link 
                            key={i} 
                            to={item.link} 
                            className="flex gap-5 items-center p-3 hover:bg-gray-50 transition-all duration-300 group/item"
                          >
                            <div className="w-14 h-14 flex items-center justify-center">
                              <img 
                                src={item.img} 
                                alt={item.title} 
                                className="w-full h-full object-contain group-hover/item:scale-105 transition-transform duration-300" 
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-light text-gray-800 text-sm tracking-wide">{item.title}</span>
                              <span className="text-gray-400 text-xs font-light">{item.subtitle}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* User Dropdown */}
                {isUserLink && user && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[220px] cursor-default z-50">
                    <div className="bg-white shadow-xl border border-gray-100">
                      <div className="py-2">
                        {userMenuItems.map((item, i) => (
                          <Link 
                            key={i} 
                            to={item.path} 
                            onClick={item.isLogout ? handleLogout : undefined}
                            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-all duration-300 group/item"
                          >
                            <span className="text-gray-400 group-hover/item:text-gray-700 transition-colors">
                              {item.icon}
                            </span>
                            <span className="text-[13px] font-light text-gray-600 group-hover/item:text-gray-900">
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
          
          {/* Cart Button */}
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="ml-2">
            <Link to="/cart" className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all duration-300">
              <ShoppingCart size={18} strokeWidth={1.5} />
              <span className="text-[13px] font-light tracking-wide">{cartCount}</span>
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-gray-600 p-2 hover:text-gray-900 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-[64px] z-50 bg-white overflow-y-auto"
          >
            <div className="flex flex-col py-8 px-6 gap-1">
              {links.map((link, idx) => {
                if (link.label === 'ACCOUNT' && user) {
                  return null;
                }
                
                const isHappyBars = link.label === 'COLLECTION';
                const isUserLink = link.isUserLink;
                const isMobileDropdownOpen = isHappyBars ? mobileHappyBarsOpen : (isUserLink && user ? mobileUserMenuOpen : false);
                
                return (
                  <div key={idx} className="flex flex-col border-b border-gray-50">
                    <div 
                      className="flex items-center justify-between py-4 cursor-pointer"
                      onClick={() => {
                        if (isHappyBars) {
                          setMobileHappyBarsOpen(!mobileHappyBarsOpen);
                          setMobileUserMenuOpen(false);
                        } else if (isUserLink && user) {
                          setMobileUserMenuOpen(!mobileUserMenuOpen);
                          setMobileHappyBarsOpen(false);
                        } else {
                          navigate(link.path);
                          setMobileMenuOpen(false);
                        }
                      }}
                    >
                      <span className="text-[15px] font-light tracking-wide text-gray-800">
                        {isUserLink && user ? (user.fullName?.split(' ')[0] || 'ACCOUNT') : link.label}
                      </span>
                      {((isHappyBars) || (isUserLink && user)) && (
                        <ChevronDown 
                          size={16} 
                          className={`text-gray-400 transition-transform duration-300 ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      )}
                    </div>

                    {/* Collection Mobile Dropdown */}
                    {isHappyBars && mobileHappyBarsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 pb-4 space-y-3"
                      >
                        {happyBarsMenu.map((item, i) => (
                          <Link
                            key={i}
                            to={item.link}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex gap-4 items-center p-2"
                          >
                            <div className="w-12 h-12 flex items-center justify-center">
                              <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-light text-gray-800">{item.title}</span>
                              <span className="text-gray-400 text-[11px] font-light">{item.subtitle}</span>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}

                    {/* User Mobile Dropdown */}
                    {isUserLink && user && mobileUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 pb-4 space-y-1"
                      >
                        {userMenuItems.map((item, i) => (
                          <Link
                            key={i}
                            to={item.path}
                            onClick={() => {
                              if (item.isLogout) {
                                handleLogout();
                              }
                              setMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-3 py-3"
                          >
                            <span className="text-gray-400">{item.icon}</span>
                            <span className="text-[13px] font-light text-gray-600">{item.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
              
              {/* Mobile Cart */}
              <Link 
                to="/cart" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 mt-6 py-4 border border-gray-200 text-gray-800 text-[13px] font-light tracking-wide hover:border-gray-400 transition-all duration-300"
              >
                <ShoppingCart size={16} strokeWidth={1.5} /> CART ({cartCount})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};