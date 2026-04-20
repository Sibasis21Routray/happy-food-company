import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileDropdownProps {
  user: {
    fullName: string;
    email: string;
    role: string;
  } | null;
  onLogout: () => void;
  dashboardType: 'admin' | 'vendor';
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout, dashboardType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profilePath = `/${dashboardType}/profile`;

  return (
    <div className="flex items-center gap-6" ref={dropdownRef}>
      {/* Notifications Icon (Optional but present in screenshot) */}
      <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 group p-1 pr-3 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
        >
          <div className="w-10 h-10 bg-[#FA6011] rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <User size={20} />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-bold text-slate-700 leading-tight group-hover:text-[#FA6011] transition-colors truncate max-w-[120px]">{user?.fullName || 'User'}</span>
            <span className="text-[11px] font-medium text-gray-400 leading-none mt-0.5 truncate max-w-[120px]">{user?.email}</span>
          </div>
          <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 rounded-[1.5rem] shadow-2xl py-3 z-[100] animate-in fade-in zoom-in duration-200">
            {/* Extended Header Info (Mobile-friendly version in dropdown) */}
            <div className="px-5 py-4 border-b border-gray-50 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FA6011] rounded-full flex items-center justify-center text-white">
                  <User size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-slate-800 leading-tight truncate max-w-[180px]">{user?.fullName}</span>
                  <span className="text-xs font-bold text-gray-400 truncate max-w-[180px]">{user?.email}</span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="px-2 space-y-1">
              <Link 
                to={profilePath}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-all group"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-[#FA6011] group-hover:shadow-sm transition-all">
                  <User size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black text-slate-700">Profile</span>
                  <span className="text-[10px] font-bold text-gray-400">View your profile</span>
                </div>
              </Link>

              <div className="h-[1px] bg-gray-50 my-2 mx-4" />

              <button 
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-red-50 transition-all group"
              >
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <LogOut size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black text-red-600">Logout</span>
                  <span className="text-[10px] font-bold text-red-400/80">Sign out of your account</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
