import React, { useState, useEffect } from 'react';
import { Package, CheckCircle, DollarSign, Calendar, Clock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { ProfileDropdown } from '../components/Dashboard/ProfileDropdown';

export const VendorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders'>('analytics');
  const [stats, setStats] = useState({ 
    totalOrders: 0, 
    completedOrders: 0, 
    pendingOrders: 0, 
    processingOrders: 0, 
    totalRevenue: 0, 
    totalSalesValue: 0 
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const usr = localStorage.getItem('user');
    if (usr) setCurrentUser(JSON.parse(usr));
    fetchData();
  }, [activeTab, dateRange]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      let queryParams = '';
      if (dateRange.startDate && dateRange.endDate) {
        queryParams = `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
      }

      if (activeTab === 'analytics') {
        const res = await fetch(`http://localhost:5000/api/vendor/dashboard${queryParams}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setStats(await res.json());
      } else {
        const res = await fetch(`http://localhost:5000/api/vendor/orders`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setOrders(await res.json());
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
      const res = await fetch(`http://localhost:5000/api/vendor/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchData();
    } catch (e) {
      console.error(e);
    }
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
          <Link to="/">
            <img src="/images/logo.png" alt="Happy Food Company" className="h-[50px] object-contain drop-shadow-sm transition-transform hover:scale-105" />
          </Link>
          <ProfileDropdown user={currentUser} onLogout={handleLogout} dashboardType="vendor" />
        </div>
      </header>

      <main className="container mx-auto px-4 mt-6 md:mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Vendor<span className="text-[#FA6011]">Hub</span>
              <span className="bg-orange-100 text-[#FA6011] text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-black border border-orange-200/50">PRO</span>
            </h1>
            <p className="text-gray-500 font-bold text-sm mt-1">Manage your business operations and track performance in real-time.</p>
          </div>
          <div className="flex gap-2 mt-6 md:mt-0 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 flex-1 md:flex-none">
            <button onClick={() => setActiveTab('analytics')} className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${activeTab === 'analytics' ? 'bg-white text-[#FA6011] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>Analytics</button>
            <button onClick={() => setActiveTab('orders')} className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white text-[#FA6011] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>Orders</button>
          </div>
        </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-[#FA6011] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black text-gray-400 tracking-widest uppercase text-xs">Synchronizing Data...</p>
        </div>
      ) : activeTab === 'analytics' ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-200 inline-flex">
            <div className="flex items-center gap-3">
              <Calendar className="text-[#FA6011]" size={20} />
              <span className="font-black text-xs text-gray-400 uppercase tracking-widest">Filter by date</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
              <input type="date" value={dateRange.startDate} onChange={e => setDateRange({...dateRange, startDate: e.target.value})} className="flex-1 md:flex-none border border-gray-200 bg-gray-50 px-4 py-2 rounded-xl font-bold text-xs md:text-sm focus:ring-2 focus:ring-[#FA6011]/20 outline-none transition-all" />
              <span className="text-gray-400 font-black text-xs hidden md:inline">→</span>
              <input type="date" value={dateRange.endDate} onChange={e => setDateRange({...dateRange, endDate: e.target.value})} className="flex-1 md:flex-none border border-gray-200 bg-gray-50 px-4 py-2 rounded-xl font-bold text-xs md:text-sm focus:ring-2 focus:ring-[#FA6011]/20 outline-none transition-all" />
            </div>
            {(dateRange.startDate || dateRange.endDate) && (
              <button onClick={() => setDateRange({startDate: '', endDate: ''})} className="text-xs font-black text-red-500 ml-4 hover:bg-red-50 px-3 py-2 rounded-lg transition-all uppercase tracking-widest">Clear Filter</button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:border-[#FA6011]/30 transition-all group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 border border-orange-100 group-hover:scale-110 transition-transform">
                <Package size={28} className="text-[#FA6011]" />
              </div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Assigned</p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">{stats.totalOrders}</h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                <p className="text-[10px] font-bold text-gray-400">Total volume received</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:border-blue-200 transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:scale-110 transition-transform">
                <Clock size={28} className="text-blue-500" />
              </div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Action Required</p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">{stats.pendingOrders + stats.processingOrders}</h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <p className="text-[10px] font-bold text-gray-400">{stats.pendingOrders} Pending approval</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:border-green-200 transition-all group">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 border border-green-100 group-hover:scale-110 transition-transform">
                <CheckCircle size={28} className="text-green-500" />
              </div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Fulfilled Orders</p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">{stats.completedOrders}</h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                <p className="text-[10px] font-bold text-gray-400">Successfully delivered</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FA6011] to-[#ff3c83] p-8 rounded-[2rem] shadow-lg shadow-orange-100/50 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:rotate-12 transition-transform">
                  <DollarSign size={28} className="text-white" />
                </div>
                <p className="text-[11px] font-black text-white/70 uppercase tracking-widest mb-1">Total Amount</p>
                <h3 className="text-3xl md:text-4xl font-black">₹{stats.totalSalesValue.toLocaleString()}</h3>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                  <p className="text-[10px] font-bold text-white/70">Estimated gross value</p>
                </div>
              </div>
              <DollarSign size={120} className="absolute -right-8 -bottom-8 text-white/5 rotate-12" />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden animate-in slide-in-from-bottom duration-500">
          <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Assignments</h2>
              <p className="text-xs font-bold text-gray-400 mt-1">Manage and update status for all orders assigned to you.</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FA6011] animate-pulse"></span>
              <span className="font-black text-[10px] text-gray-500 uppercase tracking-widest">{orders.length} Current Orders</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Order ID</th>
                  <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Customer Details</th>
                  <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Ordered Items</th>
                  <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Date & Time</th>
                  <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Total Value</th>
                  <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                  <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Fulfillment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map(o => (
                  <tr key={o._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-mono text-xs font-bold text-[#FA6011] bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100/50">#{o._id.slice(-8).toUpperCase()}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm">{o.userId?.fullName || "Anonymous Guest"}</span>
                        <span className="font-bold text-gray-400 text-xs mt-0.5">{o.userId?.email || "No email provided"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1 max-w-[250px]">
                        {o.items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center gap-3">
                            <span className="text-xs font-bold text-slate-700 truncate">{item.title}</span>
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-black">×{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-xs">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span className="font-bold text-gray-400 text-[10px] mt-0.5">{new Date(o.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-slate-900 text-base">₹{o.totalAmount.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border
                        ${o.status === 'pending' ? 'bg-orange-50 text-[#FA6011] border-orange-100' : 
                          o.status === 'cancelled' ? 'bg-red-50 text-red-500 border-red-100' : 
                          o.status === 'delivered' ? 'bg-green-50 text-green-500 border-green-100' :
                          'bg-blue-50 text-blue-500 border-blue-100'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {o.status === 'pending' && (
                          <>
                            <button onClick={() => updateOrderStatus(o._id, 'confirmed')} className="px-4 py-2 bg-[#FA6011] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 shadow-sm transition-all shadow-orange-100/50 active:scale-95">Accept Order</button>
                            <button onClick={() => updateOrderStatus(o._id, 'cancelled')} className="px-4 py-2 bg-white text-red-500 border border-red-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95">Decline</button>
                          </>
                        )}
                        {o.status === 'confirmed' && (
                          <button onClick={() => updateOrderStatus(o._id, 'shipped')} className="px-4 py-2 bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 shadow-sm transition-all shadow-blue-100/50 active:scale-95">Mark Shipped</button>
                        )}
                        {o.status === 'shipped' && (
                           <button onClick={() => updateOrderStatus(o._id, 'delivered')} className="px-4 py-2 bg-green-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 shadow-sm transition-all shadow-green-100/50 active:scale-95">Mark Delivered</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Package size={32} className="text-gray-200" />
                </div>
                <p className="font-black text-gray-300 uppercase tracking-widest text-xs">No assignments found</p>
                <p className="text-[10px] font-bold text-gray-400 mt-1 max-w-[200px]">New orders will appear here as soon as they are assigned to you.</p>
              </div>
            )}
          </div>
        </div>
      )}
      </main>
    </div>
  );
};
