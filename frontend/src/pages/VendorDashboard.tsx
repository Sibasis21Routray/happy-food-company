import React, { useState, useEffect } from 'react';
import { Package, CheckCircle, DollarSign, Calendar, Clock, Search, XCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { ProfileDropdown } from '../components/Dashboard/ProfileDropdown';

const API = 'http://localhost:5000/api';

export const VendorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'revenue'>('analytics');
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    processingOrders: 0,
    totalRevenue: 0,
    totalSalesValue: 0
  });

  // Independent States
  const [assignmentState, setAssignmentState] = useState({
    data: [],
    search: '',
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    totalPages: 1,
    totalOrders: 0
  });

  const [revenueState, setRevenueState] = useState({
    data: [],
    search: '',
    startDate: '',
    endDate: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    totalPages: 1,
    totalPeriodOrders: 0,
    overallTotalRevenue: 0,
    status: 'all'
  });

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const usr = localStorage.getItem('user');
    if (usr) setCurrentUser(JSON.parse(usr));
    fetchData();
  }, [activeTab, debouncedSearch,
    assignmentState.status, assignmentState.page, assignmentState.sortBy, assignmentState.sortOrder,
    revenueState.startDate, revenueState.endDate, revenueState.status, revenueState.page, revenueState.sortBy, revenueState.sortOrder
  ]);

  useEffect(() => {
    const searchMap = { orders: assignmentState.search, revenue: revenueState.search, analytics: '' };
    const currentSearch = searchMap[activeTab as keyof typeof searchMap] || '';
    const timer = setTimeout(() => setDebouncedSearch(currentSearch), 500);
    return () => clearTimeout(timer);
  }, [assignmentState.search, revenueState.search, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      if (activeTab === 'analytics') {
        const res = await fetch(`${API}/vendor/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setStats(await res.json());
      } else if (activeTab === 'orders' || activeTab === 'revenue') {
        const isRev = activeTab === 'revenue';
        const qParams = new URLSearchParams({
          search: isRev ? revenueState.search : debouncedSearch,
          status: isRev ? revenueState.status : assignmentState.status,
          sortBy: isRev ? revenueState.sortBy : assignmentState.sortBy,
          sortOrder: isRev ? revenueState.sortOrder : assignmentState.sortOrder,
          page: (isRev ? revenueState.page : assignmentState.page).toString(),
          startDate: isRev ? revenueState.startDate : '',
          endDate: isRev ? revenueState.endDate : ''
        });
        const res = await fetch(`${API}/vendor/orders?${qParams}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          if (isRev) {
            setRevenueState(prev => ({
              ...prev, 
              data: data.orders, 
              totalPages: data.pages,
              totalPeriodOrders: data.total,
              overallTotalRevenue: data.totalRevenue || 0
            }));
          } else {
            setAssignmentState(prev => ({
              ...prev,
              data: data.orders,
              totalPages: data.pages,
              totalOrders: data.total
            }));
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/vendor/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
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
          <Link to="/vendor/dashboard">
            <img src="/images/logo.png" alt="Happy Food Company" className="h-[40px] md:h-[50px] object-contain drop-shadow-sm transition-transform hover:scale-105" />
          </Link>
          <ProfileDropdown user={currentUser} onLogout={handleLogout} dashboardType="vendor" />
        </div>
      </header>

      <main className="container mx-auto px-4 mt-6 md:mt-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 mb-8 gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Vendor<span className="text-[#FA6011]">Hub</span>
              <span className="bg-orange-100 text-[#FA6011] text-xs px-3 py-1 rounded-full uppercase tracking-widest font-black border border-orange-200/50">PRO</span>
            </h1>
            <p className="text-gray-500 font-bold text-sm md:text-base mt-1">Manage operations and performance in real-time.</p>
          </div>
          <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 w-full lg:w-auto">
            {['analytics', 'orders', 'revenue'].map((tab) => (
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

        {activeTab === 'analytics' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={<Package size={28} className="text-[#FA6011]" />} label="Total Assigned" value={stats.totalOrders} trend="Total volume" />
              <StatCard icon={<Clock size={28} className="text-pink-500" />} label="Action Required" value={stats.pendingOrders + stats.processingOrders} trend="Pending approval" color="bg-pink-50" />
              <StatCard icon={<CheckCircle size={28} className="text-orange-500" />} label="Fulfilled" value={stats.completedOrders} trend="Delivered successfully" color="bg-orange-50" />
              <button onClick={() => setActiveTab('revenue')} className="text-left w-full transition-transform active:scale-95 group">
                <div className="bg-gradient-to-br from-[#FA6011] to-[#ff3c83] p-8 rounded-[2rem] shadow-lg shadow-orange-100/50 text-white relative overflow-hidden h-full">
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:rotate-12 transition-transform">
                      <DollarSign size={28} className="text-white" />
                    </div>
                    <p className="text-sm font-black text-white/70 uppercase tracking-widest mb-1">Total Revenue</p>
                    <h3 className="text-3xl md:text-4xl font-black">₹{stats.totalSalesValue.toLocaleString()}</h3>
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
                    Financial Ledger
                    <span className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full uppercase tracking-widest font-black border border-green-100/50">Settled</span>
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
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Filter Ledger</p>
                      <div className="relative">
                        <input type="text" placeholder="By Order ID..." value={revenueState.search} onChange={e => setRevenueState({ ...revenueState, search: e.target.value, page: 1 })} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-orange-100 transition-all shadow-inner" />
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[2rem] text-white w-full xl:max-w-xs relative overflow-hidden shadow-2xl flex flex-col justify-center">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 relative z-10">Period Earnings</p>
                  <h3 className="text-3xl md:text-4xl font-black relative z-10">₹{revenueState.overallTotalRevenue.toLocaleString()}</h3>
                  <div className="mt-4 flex items-center gap-3 relative z-10">
                    <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
                      <p className="text-xs font-black uppercase text-slate-400">Total Orders</p>
                      <p className="font-black text-base">{revenueState.totalPeriodOrders}</p>
                    </div>
                  </div>
                  <DollarSign size={100} className="absolute -right-8 -bottom-8 text-white/5 -rotate-12" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative min-h-[400px]">
              {loading && <div className="absolute inset-0 bg-white/60 z-10 flex flex-col items-center justify-center"><div className="w-10 h-10 border-4 border-orange-100 border-t-[#FA6011] rounded-full animate-spin mb-4" /><p className="text-xs font-black text-[#FA6011] uppercase tracking-widest">Searching Ledger...</p></div>}
              <div className="overflow-x-auto text-sm">
                <table className="w-full text-left min-w-[800px]">
                  <thead className="bg-[#fcfcfc] border-b border-gray-100">
                    <tr>{['Transaction ID', 'Date & Time', 'Customer', 'Amount Received', 'Status'].map((h) => (<th key={h} className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">{h}</th>))}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-bold text-gray-600">
                    {revenueState.data.length > 0 ? revenueState.data.map((o: any) => (
                      <tr key={o._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5 text-slate-900">TRX-{o._id.slice(-8).toUpperCase()}</td>
                        <td className="px-8 py-5"><div className="flex items-center gap-2"><Clock size={12} className="text-gray-300" />{new Date(o.createdAt).toLocaleString()}</div></td>
                        <td className="px-8 py-5 font-bold text-slate-700">{o.userId?.fullName || 'Guest'}</td>
                        <td className="px-8 py-5"><span className="font-black px-3 py-1 bg-green-50 text-green-600 rounded-lg">₹{o.totalAmount.toLocaleString()}</span></td>
                        <td className="px-8 py-5">
                          <div className={`flex items-center gap-2 font-black uppercase text-sm tracking-widest ${o.status === 'cancelled' ? 'text-red-500' : 'text-green-600'}`}>
                            {o.status === 'delivered' ? <CheckCircle size={14} /> : o.status === 'cancelled' ? <XCircle size={14} /> : <Clock size={14} />} 
                            {o.status}
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={5} className="py-20 text-center font-black text-gray-300 text-sm uppercase tracking-widest">No matching transactions</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm font-black text-gray-400">Page {revenueState.page} of {revenueState.totalPages}</span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button disabled={revenueState.page === 1} onClick={() => setRevenueState(prev => ({ ...prev, page: prev.page - 1 }))} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest">Prev</button>
                  <button disabled={revenueState.page === revenueState.totalPages} onClick={() => setRevenueState(prev => ({ ...prev, page: prev.page + 1 }))} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest">Next</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1 w-full">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                    Active Assignments
                    <span className="bg-orange-50 text-[#FA6011] text-xs px-3 py-1 rounded-full uppercase tracking-widest font-black border border-orange-100/50 ml-2">{assignmentState.totalOrders} items</span>
                  </h2>
                  <div className="relative group">
                    <input type="text" placeholder="Search orders..." value={assignmentState.search} onChange={(e) => setAssignmentState(prev => ({ ...prev, search: e.target.value, page: 1 }))} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-base font-bold focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-inner" />
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FA6011]" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto md:mt-12">
                  <select value={assignmentState.status} onChange={(e) => setAssignmentState(prev => ({ ...prev, status: e.target.value, page: 1 }))} className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer"><option value="all">Status</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select>
                  <select value={`${assignmentState.sortBy}-${assignmentState.sortOrder}`} onChange={(e) => { const [sortBy, sortOrder] = e.target.value.split('-'); setAssignmentState(prev => ({ ...prev, sortBy, sortOrder, page: 1 })); }} className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer"><option value="createdAt-desc">Newest</option></select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
              <div className="overflow-x-auto text-sm">
                <table className="w-full text-left min-w-[1000px]">
                  <thead className="bg-[#fcfcfc] border-b border-gray-100">
                    <tr>{['Order Info', 'Customer', 'Items Ordered', 'Amount', 'Status Tracking', 'Actions'].map((h) => (<th key={h} className="px-8 py-5 text-sm font-black text-gray-400 uppercase tracking-widest">{h}</th>))}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-bold text-gray-600">
                    {assignmentState.data.map((o: any) => (
                      <tr key={o._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-4 text-slate-800 text-sm">#{o._id.slice(-6).toUpperCase()}</td>
                        <td className="px-8 py-4 font-bold text-gray-500 text-sm">{o.userId?.fullName || 'Guest'}</td>
                        <td className="px-8 py-4"><div className="flex flex-col gap-1 max-w-[200px]">{o.items?.map((item: any, i: number) => (<div key={i} className="flex justify-between items-center text-sm text-gray-600">{item.title} <span className="text-[#FA6011] ml-2">×{item.quantity}</span></div>))}</div></td>
                        <td className="px-8 py-4 font-black">₹{o.totalAmount}</td>
                        <td className="px-8 py-4">
                          <select value={o.status} onChange={(e) => updateOrderStatus(o._id, e.target.value)} className="w-full px-3 py-1.5 rounded-lg border-orange-100 bg-orange-50/30 text-[#FA6011] text-sm font-black uppercase outline-none transition-all">{['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => (<option key={s} value={s}>{s}</option>))}</select>
                        </td>
                        <td className="px-8 py-4"><button onClick={() => navigate(`/orders/${o._id}`)} className="text-[#FA6011] font-black uppercase text-sm hover:underline">Track</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm font-black text-gray-400">Page {assignmentState.page} of {assignmentState.totalPages}</span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button disabled={assignmentState.page === 1} onClick={() => setAssignmentState(prev => ({ ...prev, page: prev.page - 1 }))} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest">Prev</button>
                  <button disabled={assignmentState.page === assignmentState.totalPages} onClick={() => setAssignmentState(prev => ({ ...prev, page: prev.page + 1 }))} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string | number, trend: string, color?: string }> = ({ icon, label, value, trend, color }) => (
  <div className={`bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:border-[#FA6011]/30 transition-all group`}>
    <div className={`w-14 h-14 ${color || 'bg-orange-50'} rounded-2xl flex items-center justify-center mb-6 border border-gray-100 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900">{value}</h3>
    <div className="mt-4 flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
      <p className="text-sm font-bold text-gray-400">{trend}</p>
    </div>
  </div>
);
