import React, { useState, useEffect } from 'react';
import { Users, Truck, DollarSign, Activity, XCircle, Trash, Package, RefreshCw, Search, Clock, CheckCircle } from 'lucide-react';
import PhoneInputModule from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInput = (PhoneInputModule as any).default || PhoneInputModule;
import { useNavigate, Link } from 'react-router-dom';
import { ProfileDropdown } from '../components/Dashboard/ProfileDropdown';

const API = 'http://localhost:5000/api';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'users' | 'orders' | 'revenue'>('overview');
  const [stats, setStats] = useState({
    totalVendors: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    completedOrders: 0
  });

  // Independent Tab States
  const [vendorState, setVendorState] = useState({ data: [], search: '', filter: 'all', sortBy: 'createdAt', sortOrder: 'desc', page: 1, totalPages: 1 });
  const [userState, setUserState] = useState({ data: [], search: '', filter: 'all', sortBy: 'createdAt', sortOrder: 'desc', page: 1, totalPages: 1 });
  const [orderState, setOrderState] = useState({ data: [], search: '', status: 'all', sortBy: 'createdAt', sortOrder: 'desc', page: 1, totalPages: 1 });
  const [revenueState, setRevenueState] = useState({
    data: [],
    search: '',
    startDate: '',
    endDate: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    totalPages: 1,
    totalPeriodRevenue: 0,
    totalPeriodOrders: 0,
    status: 'all'
  });

  const [loading, setLoading] = useState(true);
  const [reassigning, setReassigning] = useState<string | null>(null);
  const [vendors, setVendors] = useState<any[]>([]);
  const [vendorForm, setVendorForm] = useState({ fullName: '', email: '', password: '', mobileNumber: '' });
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usr = localStorage.getItem('user');
    if (usr) setCurrentUser(JSON.parse(usr));
    fetchData();
  }, [activeTab, debouncedSearch,
    vendorState.filter, vendorState.page, vendorState.sortBy, vendorState.sortOrder,
    userState.filter, userState.page, userState.sortBy, userState.sortOrder,
    orderState.status, orderState.page, orderState.sortBy, orderState.sortOrder,
    revenueState.startDate, revenueState.endDate, revenueState.status, revenueState.page, revenueState.sortBy, revenueState.sortOrder
  ]);

  useEffect(() => {
    const searchMap = { vendors: vendorState.search, users: userState.search, orders: orderState.search, revenue: revenueState.search, overview: '' };
    const currentSearch = searchMap[activeTab as keyof typeof searchMap] || '';
    const timer = setTimeout(() => setDebouncedSearch(currentSearch), 500);
    return () => clearTimeout(timer);
  }, [vendorState.search, userState.search, orderState.search, revenueState.search, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      if (activeTab === 'overview') {
        const res = await fetch(`${API}/admin/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setStats(await res.json());
      } else if (activeTab === 'vendors') {
        const qParams = new URLSearchParams({ search: debouncedSearch, filter: vendorState.filter, sortBy: vendorState.sortBy, sortOrder: vendorState.sortOrder, page: vendorState.page.toString() });
        const res = await fetch(`${API}/admin/vendors?${qParams}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          setVendorState(prev => ({ ...prev, data: data.vendors, totalPages: data.pages }));
          setVendors(data.vendors);
        }
      } else if (activeTab === 'users') {
        const qParams = new URLSearchParams({ search: debouncedSearch, filter: userState.filter, sortBy: userState.sortBy, sortOrder: userState.sortOrder, page: userState.page.toString() });
        const res = await fetch(`${API}/admin/users?${qParams}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          setUserState(prev => ({ ...prev, data: data.users, totalPages: data.pages }));
        }
      } else if (activeTab === 'orders' || activeTab === 'revenue') {
        const isRev = activeTab === 'revenue';
        const qParams = new URLSearchParams({
          search: isRev ? revenueState.search : debouncedSearch,
          status: isRev ? revenueState.status : orderState.status,
          sortBy: isRev ? revenueState.sortBy : orderState.sortBy,
          sortOrder: isRev ? revenueState.sortOrder : orderState.sortOrder,
          page: (isRev ? revenueState.page : orderState.page).toString(),
          startDate: isRev ? revenueState.startDate : '',
          endDate: isRev ? revenueState.endDate : ''
        });
        const res = await fetch(`${API}/admin/orders?${qParams}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          if (isRev) {
            setRevenueState(prev => ({
              ...prev,
              data: data.orders,
              totalPages: data.pages,
              totalPeriodOrders: data.total,
              totalPeriodRevenue: data.totalRevenue || 0
            }));
          } else {
            setOrderState(prev => ({ ...prev, data: data.orders, totalPages: data.pages }));
            const vRes = await fetch(`${API}/admin/vendors`, { headers: { Authorization: `Bearer ${token}` } });
            if (vRes.ok) {
              const vData = await vRes.json();
              setVendors(vData.vendors || vData);
            }
          }
        }
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const createVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (vendorForm.mobileNumber.length < 10) {
        alert('Please enter a valid mobile number');
        return;
      }
      const res = await fetch(`${API}/admin/vendors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(vendorForm),
      });
      if (res.ok) {
        setVendorForm({ fullName: '', email: '', password: '', mobileNumber: '' });
        fetchData();
      }
    } catch (e) { console.error(e); }
  };

  const toggleBlock = async (id: string, isBlocked: boolean, type: 'vendors' | 'users') => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/admin/${type}/${id}/block`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isBlocked: !isBlocked })
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
  };

  const reassignVendor = async (orderId: string, vendorId: string) => {
    setReassigning(orderId);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/admin/orders/${orderId}/vendor`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ vendorId }),
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
    finally { setReassigning(null); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans pb-12">
      <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
          <Link to="/admin/dashboard">
            <img src="/images/logo.png" alt="Happy Food Company" className="h-[40px] md:h-[50px] object-contain drop-shadow-sm transition-transform hover:scale-105" />
          </Link>
          <ProfileDropdown user={currentUser} onLogout={handleLogout} dashboardType="admin" />
        </div>
      </header>

      <main className="container mx-auto px-4 mt-6 md:mt-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 mb-8 gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Admin<span className="text-[#FA6011]">Hub</span>
              <span className="bg-orange-100 text-[#FA6011] text-xs px-3 py-1 rounded-full uppercase tracking-widest font-black border border-orange-200/50">PRO</span>
            </h1>
            <p className="text-gray-500 font-bold text-sm md:text-base mt-1">Global ecosystem overview and administrative controls.</p>
          </div>
          <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 w-full lg:w-auto">
            {['overview', 'vendors', 'users', 'orders', 'revenue'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 lg:flex-none px-4 md:px-6 py-2.5 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-[#FA6011] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={<Package size={28} className="text-[#FA6011]" />} label="System Orders" value={stats.totalOrders} trend="Total volume" />
              <StatCard icon={<Users size={28} className="text-pink-500" />} label="Total Users" value={stats.totalVendors + stats.totalUsers} trend={`${stats.totalVendors} Vendors`} color="bg-pink-50" />
              <StatCard icon={<Activity size={28} className="text-blue-500" />} label="Success Rate" value={`${Math.round((stats.completedOrders / stats.totalOrders) * 100) || 0}%`} trend="Delivery success" color="bg-blue-50" />
              <button onClick={() => setActiveTab('revenue')} className="text-left w-full transition-transform active:scale-95 group">
                <div className="bg-gradient-to-br from-[#FA6011] to-[#ff3c83] p-8 rounded-[2rem] shadow-lg shadow-orange-100/50 text-white relative overflow-hidden h-full">
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:rotate-12 transition-transform">
                      <DollarSign size={28} className="text-white" />
                    </div>
                    <p className="text-sm font-black text-white/70 uppercase tracking-widest mb-1">Overall Revenue</p>
                    <h3 className="text-3xl md:text-4xl font-black">₹{stats.totalRevenue.toLocaleString()}</h3>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="bg-white/20 px-2 py-1 rounded text-xs font-black uppercase tracking-tighter">View Ledger →</div>
                    </div>
                  </div>
                  <DollarSign size={120} className="absolute -right-8 -bottom-8 text-white/5 rotate-12" />
                </div>
              </button>
            </div>
          </div>
        ) : activeTab === 'revenue' ? (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                    Revenue Management
                    <span className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full uppercase tracking-widest font-black border border-green-100/50">Ledger</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Period Range</p>
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <input type="date" value={revenueState.startDate} onChange={e => setRevenueState({ ...revenueState, startDate: e.target.value, page: 1 })} className="w-full sm:flex-1 border border-gray-100 bg-gray-50 px-4 py-3 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all" />
                        <span className="text-gray-300 hidden sm:inline">→</span>
                        <input type="date" value={revenueState.endDate} onChange={e => setRevenueState({ ...revenueState, endDate: e.target.value, page: 1 })} className="w-full sm:flex-1 border border-gray-100 bg-gray-50 px-4 py-3 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Status</p>
                      <select 
                        value={revenueState.status} 
                        onChange={e => setRevenueState({ ...revenueState, status: e.target.value, page: 1 })}
                        className="w-full border border-gray-100 bg-gray-50 px-4 py-3 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all appearance-none cursor-pointer"
                      >
                        <option value="all">All except Cancelled</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Search Identifier</p>
                      <div className="relative">
                        <input type="text" placeholder="Filter by TRX or Order ID..." value={revenueState.search} onChange={e => setRevenueState({ ...revenueState, search: e.target.value, page: 1 })} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-orange-100 transition-all shadow-inner" />
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[2rem] text-white w-full xl:max-w-xs relative overflow-hidden shadow-2xl flex flex-col justify-center">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 relative z-10">Filtered Total</p>
                  <h3 className="text-3xl md:text-4xl font-black relative z-10">₹{revenueState.totalPeriodRevenue.toLocaleString()}</h3>
                  <div className="mt-4 flex items-center gap-3 relative z-10">
                    <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
                      <p className="text-xs font-black uppercase text-slate-400">TRX Count</p>
                      <p className="font-black text-base">{revenueState.totalPeriodOrders}</p>
                    </div>
                  </div>
                  <DollarSign size={100} className="absolute -right-8 -bottom-8 text-white/5 -rotate-12" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative min-h-[400px]">
              {loading && <div className="absolute inset-0 bg-white/60 z-10 flex flex-col items-center justify-center"><div className="w-10 h-10 border-4 border-orange-100 border-t-[#FA6011] rounded-full animate-spin mb-4" /><p className="text-xs font-black text-[#FA6011] uppercase tracking-widest">Updating Ledger...</p></div>}
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                  <thead className="bg-[#fcfcfc] border-b border-gray-100">
                    <tr>{['Transaction ID', 'Date & Time', 'Customer', 'Amount Received', 'Status'].map((h) => (<th key={h} className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">{h}</th>))}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {revenueState.data.length > 0 ? revenueState.data.map((o: any) => (
                      <tr key={o._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5"><span className="font-black text-slate-800 uppercase tracking-tighter text-sm">TRX-{o._id.slice(-8)}</span></td>
                        <td className="px-8 py-5"><div className="flex items-center gap-2 font-bold text-gray-500 text-sm"><Clock size={12} className="text-gray-300" />{new Date(o.createdAt).toLocaleString()}</div></td>
                        <td className="px-8 py-5 font-bold text-gray-500 text-sm"><div>{o.userId?.fullName || 'Guest'}</div><div className="text-xs text-gray-400">{o.userId?.email}</div></td>
                        <td className="px-8 py-5"><span className="font-black px-3 py-1 bg-green-50 text-green-600 rounded-lg text-sm">₹{o.totalAmount.toLocaleString()}</span></td>
                        <td className="px-8 py-5">
                          <div className={`flex items-center gap-2 font-black uppercase text-sm tracking-widest ${o.status === 'cancelled' ? 'text-red-500' : 'text-green-600'}`}>
                            {o.status === 'delivered' ? <CheckCircle size={14} /> : o.status === 'cancelled' ? <XCircle size={14} /> : <Clock size={14} />} 
                            {o.status}
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={5} className="py-20 text-center font-black text-gray-300 text-sm uppercase tracking-widest">No matching results</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Page {revenueState.page} of {revenueState.totalPages}</span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button disabled={revenueState.page === 1} onClick={() => setRevenueState(prev => ({ ...prev, page: prev.page - 1 }))} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-sm">Prev</button>
                  <button disabled={revenueState.page === revenueState.totalPages} onClick={() => setRevenueState(prev => ({ ...prev, page: prev.page + 1 }))} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-sm">Next</button>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'vendors' ? (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6">Create New Vendor</h2>
              <form onSubmit={createVendor} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                <input required value={vendorForm.fullName} onChange={e => setVendorForm({ ...vendorForm, fullName: e.target.value })} placeholder="Full Name" className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-100 font-bold text-base" />
                <input required type="email" value={vendorForm.email} onChange={e => setVendorForm({ ...vendorForm, email: e.target.value })} placeholder="Email" className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-100 font-bold text-base" />
                <input required type="password" value={vendorForm.password} onChange={e => setVendorForm({ ...vendorForm, password: e.target.value })} placeholder="Password" className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-100 font-bold text-base" />
                <div className="flex flex-col">
                  <PhoneInput 
                    country={'in'}
                    value={vendorForm.mobileNumber}
                    onChange={(phone: string) => setVendorForm({ ...vendorForm, mobileNumber: phone })}
                    inputClass="!w-full !h-full !p-3 !border !border-gray-200 !rounded-xl !outline-none focus:!ring-2 focus:!ring-orange-100 !font-bold !text-base shadow-none hover:shadow-none"
                    buttonClass="!bg-transparent !border-0 !rounded-l-xl"
                  />
                </div>
                <button type="submit" className="bg-[#ff3c83] text-white px-4 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-110 shadow-sm transition-all sm:col-span-2 xl:col-span-1">Onboard Partner</button>
              </form>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1 w-full">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Vendor Directory</h2>
                  <div className="relative group">
                    <input type="text" placeholder="Search partners..." value={vendorState.search} onChange={(e) => setVendorState(prev => ({ ...prev, search: e.target.value, page: 1 }))} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-base font-bold focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-inner" />
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FA6011]" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto md:mt-10">
                  <select value={vendorState.filter} onChange={(e) => setVendorState(prev => ({ ...prev, filter: e.target.value, page: 1 }))} className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer"><option value="all">Status</option><option value="active">Active</option><option value="blocked">Blocked</option></select>
                  <select value={`${vendorState.sortBy}-${vendorState.sortOrder}`} onChange={(e) => { const [sortBy, sortOrder] = e.target.value.split('-'); setVendorState(prev => ({ ...prev, sortBy, sortOrder, page: 1 })); }} className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer"><option value="createdAt-desc">Newest</option><option value="fullName-asc">A-Z</option></select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                  <thead className="bg-[#fcfcfc] border-b border-gray-100">
                    <tr>{['Vendor', 'Contact Details', 'Status', 'Actions'].map((h) => (<th key={h} className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">{h}</th>))}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {vendorState.data.map((v: any) => (
                      <tr key={v._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5 font-bold text-slate-800">{v.fullName}</td>
                        <td className="px-8 py-5 font-bold text-gray-500"><div>{v.email}</div><div>{v.mobileNumber}</div></td>
                        <td className="px-8 py-5"><span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${v.isBlocked ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>{v.isBlocked ? 'Blocked' : 'Active'}</span></td>
                        <td className="px-8 py-5"><button onClick={() => toggleBlock(v._id, v.isBlocked, 'vendors')} className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${v.isBlocked ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{v.isBlocked ? 'Unblock' : 'Block'}</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm font-black text-gray-400">Page {vendorState.page} of {vendorState.totalPages}</span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button disabled={vendorState.page === 1} onClick={() => setVendorState(prev => ({ ...prev, page: prev.page - 1 }))} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest">Prev</button>
                  <button disabled={vendorState.page === vendorState.totalPages} onClick={() => setVendorState(prev => ({ ...prev, page: prev.page + 1 }))} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest">Next</button>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'orders' ? (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div className="flex-1 w-full">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Centralized Orders</h2>
                  <div className="relative group">
                    <input type="text" placeholder="Search for orders..." value={orderState.search} onChange={(e) => setOrderState(prev => ({ ...prev, search: e.target.value, page: 1 }))} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-base font-bold focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-inner" />
                    <Package size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FA6011]" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 w-full xl:w-auto xl:mt-10">
                  <select value={orderState.status} onChange={(e) => setOrderState(prev => ({ ...prev, status: e.target.value, page: 1 }))} className="flex-1 xl:flex-none px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest focus:ring-2 focus:ring-orange-100 outline-none shadow-sm cursor-pointer"><option value="all">Status</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select>
                  <select value={`${orderState.sortBy}-${orderState.sortOrder}`} onChange={(e) => { const [sortBy, sortOrder] = e.target.value.split('-'); setOrderState(prev => ({ ...prev, sortBy, sortOrder, page: 1 })); }} className="flex-1 xl:flex-none px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer"><option value="createdAt-desc">Newest</option><option value="totalAmount-desc">Value (High)</option></select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 h-[600px] flex flex-col relative">
              <div className="flex-1 overflow-x-auto text-sm">
                <table className="w-full text-left min-w-[1000px]">
                  <thead className="bg-[#fcfcfc] border-b border-gray-100 sticky top-0 z-10">
                    <tr>{['Order Info', 'Customer', 'Items Ordered', 'Amount', 'Vendor Assigned', 'Status', 'Actions'].map((h) => (<th key={h} className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">{h}</th>))}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orderState.data.map((o: any) => (
                      <tr key={o._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-4"><span className="font-black text-slate-800">#{o._id.slice(-6).toUpperCase()}</span></td>
                        <td className="px-8 py-4 font-bold text-gray-500"><div>{o.userId?.fullName}</div><div className="text-xs">{o.userId?.email}</div></td>
                        <td className="px-8 py-4"><div className="flex flex-col gap-1 max-w-[180px]">{o.items?.map((item: any, i: number) => (<div key={i} className="flex justify-between items-center bg-gray-50/50 px-2 py-1 rounded text-sm font-bold text-gray-600 truncate">{item.title} <span className="text-[#FA6011] ml-1">×{item.quantity}</span></div>))}</div></td>
                        <td className="px-8 py-4 font-black">₹{o.totalAmount}</td>
                        <td className="px-8 py-4">
                          {reassigning === o._id ? (
                            <select onChange={(e) => reassignVendor(o._id, e.target.value)} className="w-full px-2 py-1 border border-orange-200 rounded-lg outline-none" defaultValue={o.vendorId?._id || ""}><option value="">Assign...</option>{vendors.map((v: any) => (<option key={v._id} value={v._id}>{v.fullName}</option>))}</select>
                          ) : (
                            <div className="flex items-center gap-2"><span className={`px-2 py-1 rounded-lg text-sm font-black uppercase tracking-widest ${o.vendorId ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'}`}>{o.vendorId?.fullName || "Unassigned"}</span><button onClick={() => setReassigning(o._id)} className="text-gray-300 hover:text-[#FA6011]"><RefreshCw size={12} /></button></div>
                          )}
                        </td>
                        <td className="px-8 py-4"><span className={`px-2 py-1 rounded-full text-sm font-black uppercase ${o.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{o.status}</span></td>
                        <td className="px-8 py-4"><button onClick={() => navigate(`/orders/${o._id}`)} className="text-[#FA6011] font-black uppercase text-sm hover:underline">View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm font-black text-gray-400">Page {orderState.page} of {orderState.totalPages}</span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button disabled={orderState.page === 1} onClick={() => setOrderState(prev => ({ ...prev, page: prev.page - 1 }))} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest">Prev</button>
                  <button disabled={orderState.page === orderState.totalPages} onClick={() => setOrderState(prev => ({ ...prev, page: prev.page + 1 }))} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest">Next</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1 w-full">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 tracking-tight flex items-center gap-2">Active Customers</h2>
                  <div className="relative group"><input type="text" placeholder="Search customers..." value={userState.search} onChange={(e) => setUserState(prev => ({ ...prev, search: e.target.value, page: 1 }))} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-base font-bold focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-inner" /><Users size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FA6011] transition-colors" /></div>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto md:mt-12">
                  <select value={userState.filter} onChange={(e) => setUserState(prev => ({ ...prev, filter: e.target.value, page: 1 }))} className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer"><option value="all">Status</option><option value="active">Active</option><option value="blocked">Blocked</option></select>
                  <select value={`${userState.sortBy}-${userState.sortOrder}`} onChange={(e) => { const [sortBy, sortOrder] = e.target.value.split('-'); setUserState(prev => ({ ...prev, sortBy, sortOrder, page: 1 })); }} className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer"><option value="createdAt-desc">Newest First</option></select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
              <div className="overflow-x-auto text-sm">
                <table className="w-full text-left min-w-[800px]">
                  <thead className="bg-[#fcfcfc] border-b border-gray-100">
                    <tr>{['Customer Name', 'Email', 'Contact', 'Status', 'Actions'].map((h) => (<th key={h} className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">{h}</th>))}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-bold text-gray-600">
                    {userState.data.map((u: any) => (
                      <tr key={u._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5 text-slate-800">{u.fullName}</td>
                        <td className="px-8 py-5 text-gray-500">{u.email}</td>
                        <td className="px-8 py-5 text-gray-500">{u.mobileNumber}</td>
                        <td className="px-8 py-5"><span className={`px-2 py-1 rounded-full text-sm font-black uppercase border ${u.isBlocked ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>{u.isBlocked ? 'Blocked' : 'Active'}</span></td>
                        <td className="px-8 py-5"><button onClick={() => toggleBlock(u._id, u.isBlocked, 'users')} className={`px-4 py-2 rounded-xl text-sm font-black uppercase ${u.isBlocked ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{u.isBlocked ? 'Unblock' : 'Block'}</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Page {userState.page} of {userState.totalPages}</span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button disabled={userState.page === 1} onClick={() => setUserState(prev => ({ ...prev, page: prev.page - 1 }))} className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest transition-all">Prev</button>
                  <button disabled={userState.page === userState.totalPages} onClick={() => setUserState(prev => ({ ...prev, page: prev.page + 1 }))} className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest transition-all">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string | number, trend: string, color?: string, dark?: boolean }> = ({ icon, label, value, trend, color, dark }) => (
  <div className={`${dark ? 'text-white' : 'bg-white'} p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:border-[#FA6011]/30 transition-all group ${color || ''}`}>
    <div className={`w-14 h-14 ${dark ? 'bg-white/20' : (color || 'bg-orange-50')} rounded-2xl flex items-center justify-center mb-6 border ${dark ? 'border-white/20' : 'border-gray-100'} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className={`text-sm font-black ${dark ? 'text-white/70' : 'text-gray-400'} uppercase tracking-widest mb-1`}>{label}</p>
    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>{value}</h3>
    <div className="mt-4 flex items-center gap-2">
      <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-white/40' : 'bg-orange-400'}`}></span>
      <p className={`text-sm font-bold ${dark ? 'text-white/70' : 'text-gray-400'}`}>{trend}</p>
    </div>
  </div>
);
