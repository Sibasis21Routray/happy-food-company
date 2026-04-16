import React from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, Ticket, Gift } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
}

const AccountPlaceholder: React.FC<PlaceholderProps> = ({ title, icon, subtitle }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-10">
    <motion.div 
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      className="w-32 h-32 bg-orange-100 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-lg shadow-orange-100/50"
    >
      {React.cloneElement(icon as React.ReactElement<any>, { size: 60, color: '#FD6804' })}
    </motion.div>
    <h1 className="text-4xl font-black text-[#1e3a8a] mb-4 tracking-tight uppercase">{title}</h1>
    <p className="text-gray-400 font-bold max-w-md mx-auto">{subtitle}</p>
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-10 px-10 py-4 bg-[#ff3c83] text-white font-black rounded-2xl shadow-xl shadow-pink-100 tracking-widest text-sm"
      onClick={() => window.location.href = '/happy-shop'}
    >
      START SHOPPING
    </motion.button>
  </div>
);

export const OrdersPage = () => (
  <div className="pt-32 bg-[#f8faff] min-h-screen">
    <AccountPlaceholder 
      title="My Orders" 
      icon={<Package />} 
      subtitle="You haven't placed any orders yet. Time to get some Happy Bars!"
    />
  </div>
);

export const WishlistPage = () => (
  <div className="pt-32 bg-[#f8faff] min-h-screen">
    <AccountPlaceholder 
      title="My Wishlist" 
      icon={<Heart />} 
      subtitle="Your wishlist is lonely. Save your favorite bars here!"
    />
  </div>
);

export const CouponsPage = () => (
  <div className="pt-32 bg-[#f8faff] min-h-screen">
    <AccountPlaceholder 
      title="My Coupons" 
      icon={<Ticket />} 
      subtitle="No coupons available right now. Keep an eye out for special deals!"
    />
  </div>
);

export const GiftCardsPage = () => (
  <div className="pt-32 bg-[#f8faff] min-h-screen">
    <AccountPlaceholder 
      title="Gift Cards" 
      icon={<Gift />} 
      subtitle="Send the gift of happiness! Gift cards will be available soon."
    />
  </div>
);
