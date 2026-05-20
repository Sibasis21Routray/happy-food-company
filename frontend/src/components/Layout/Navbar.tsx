import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, UserCircle } from 'lucide-react';
import { api } from '../../services/api';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ fullName: string, role: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);
  
  // Custom navigation structure: Bars -> Cashew Raisin, Shop -> Happy Shop
  const links = [
    { path: '/', label: 'Home' },
    { path: '/product/cashew-raisin', label: 'Product' },
    { path: '/blog', label: 'Journal' },
    { path: '/happy-shop', label: 'Shop' }
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setCartCount(0);
    navigate('/login');
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    fetchCartAndUser();
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine correct landing profile page based on backend authentication parameters
  const getAccountRedirectPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'vendor') return '/vendor/dashboard';
    return '/my-account';
  };

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <header 
        className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b ${
          scrolled 
            ? 'h-[64px] bg-white/98 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-black' 
            : 'h-[80px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-black'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between w-full h-full gap-4">
          
          {/* Column 1: Brand Logo */}
          <div className="flex-shrink-0 h-full flex items-center justify-start py-2">
            <Link to={user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'vendor' ? '/vendor/dashboard' : '/'}>
              <img 
                src="/images/logo.png" 
                alt="Happy Bar" 
                className={`object-contain transition-all duration-500 ${scrolled ? 'h-[42px]' : 'h-[56px]'}`}
              />
            </Link>
          </div>
          
          {/* Column 2: Desktop Navigation */}
          <nav className="hidden md:flex flex-grow items-center justify-center h-full overflow-x-auto no-scrollbar px-4">
            <div className="flex gap-10 items-center h-full whitespace-nowrap min-w-max">
              {links.map((link, idx) => {
                const isActive = location.pathname === link.path;
                
                return (
                  <div key={idx} className="relative flex items-center h-full flex-shrink-0">
                    <Link 
                      to={link.path}
                      className="relative h-full flex items-center"
                    >
                      <span className={`text-[19px] font-medium tracking-normal ${
                        isActive ? 'text-gray-900 font-semibold' : 'text-gray-900/80'
                      }`}>
                        {link.label}
                      </span>
                      
                      {isActive && (
                        <div className="absolute bottom-0 left-0 h-px bg-gray-900 w-full" />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Column 3: Utility Group Icons - Desktop Only */}
          <div className="hidden md:flex flex-shrink-0 items-center justify-end gap-6 h-full">
            
            {/* Account Redirect Trigger */}
            <div className="flex items-center h-full">
              <Link 
                to={getAccountRedirectPath()} 
                className="flex items-center gap-1 text-gray-900/80 transition-all duration-300 font-medium text-[16px]"
              >
                <User size={25} strokeWidth={2} className="mr-1" />
                {user && (
                  <span className="max-w-[80px] truncate">
                    {user.fullName.split(' ')[0]}
                  </span>
                )}
              </Link>
            </div>

            {/* Shopping Cart Trigger */}
            <div className="flex items-center h-full">
              <Link to="/cart" className="relative flex items-center gap-1 text-gray-900/80 font-medium text-[16px]">
                <ShoppingCart size={25} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center text-gray-900"
          >
            {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

        </div>

        {/* Mobile Menu - Includes Avatar, Login/Logout, and Cart */}
        {mobileMenuOpen && (
          <div className="md:hidden h-screen fixed  left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="flex flex-col py-4">
              
              {/* User Avatar Section - Only show when user is logged in */}
              {user && (
                <div className="px-6 py-4 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCircle size={32} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.fullName}</p>
                      <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              {links.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-6 py-4 text-[17px] font-medium transition-colors ${
                      isActive 
                        ? 'text-gray-900 font-semibold bg-gray-50' 
                        : 'text-gray-900/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Cart Option for Mobile */}
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-4 text-[17px] font-medium text-gray-900/80 flex items-center justify-between border-t border-gray-100 mt-2"
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart size={20} />
                  Cart
                </span>
                {cartCount > 0 && (
                  <span className="bg-black text-white rounded-full text-[12px] w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Login/Logout Option */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-6 py-4 text-[17px] font-medium text-red-600 flex items-center gap-3 border-t border-gray-100"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-4 text-[17px] font-medium text-gray-900/80 flex items-center gap-3 border-t border-gray-100"
                >
                  <User size={20} />
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};