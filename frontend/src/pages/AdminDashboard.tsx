import React, { useState, useEffect } from 'react';
import { Users, Truck, DollarSign, Activity, XCircle, Trash, Package, RefreshCw } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { ProfileDropdown } from '../components/Dashboard/ProfileDropdown';

const API = 'http://localhost:5000/api';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'users' | 'orders'>('overview');
  const [stats, setStats] = useState({ 
    totalVendors: 0, 
    totalUsers: 0, 
    totalOrders: 0, 
    totalRevenue: 0, 
    completedOrders: 0 
  });
  const [vendors, setVendors] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reassigning, setReassigning] = useState<string | null>(null);
  const navigate = useNavigate();

  const [vendorForm, setVendorForm] = useState({ fullName: '', email: '', password: '', mobileNumber: '' });
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const usr = localStorage.getItem('user');
    if (usr) setCurrentUser(JSON.parse(usr));
    fetchData();
  }, [activeTab]);

  const token = () => localStorage.getItem('token') || '';

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!token()) return navigate('/login');

      if (activeTab === 'overview') {
        const res = await fetch(`${API}/admin/dashboard`, { headers: { Authorization: `Bearer ${token()}` } });
        if (res.ok) setStats(await res.json());
      } else if (activeTab === 'vendors') {
        const res = await fetch(`${API}/admin/vendors`, { headers: { Authorization: `Bearer ${token()}` } });
        if (res.ok) setVendors(await res.json());
      } else if (activeTab === 'users') {
        const res = await fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${token()}` } });
        if (res.ok) setUsers(await res.json());
      } else if (activeTab === 'orders') {
        const [ordersRes, vendorsRes] = await Promise.all([
          fetch(`${API}/admin/orders`, { headers: { Authorization: `Bearer ${token()}` } }),
          fetch(`${API}/admin/vendors`, { headers: { Authorization: `Bearer ${token()}` } }),
        ]);
        if (ordersRes.ok) {
          const data = await ordersRes.json();
          setOrders(Array.isArray(data) ? data : (data.orders ?? []));
        }
        if (vendorsRes.ok) setVendors(await vendorsRes.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const createVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/vendors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify(vendorForm),
      });
      if (res.ok) {
        setVendorForm({ fullName: '', email: '', password: '', mobileNumber: '' });
        fetchData();
      } else {
        alert(await res.text());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleBlock = async (id: string, isBlocked: boolean, type: 'users' | 'vendors') => {
    try {
      await fetch(`${API}/admin/${type}/${id}/block`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ isBlocked: !isBlocked }),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteVendor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vendor?')) return;
    try {
      await fetch(`${API}/admin/vendors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token()}` },
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const reassignVendor = async (orderId: string, vendorId: string) => {
    setReassigning(orderId);
    try {
      const res = await fetch(`${API}/admin/orders/${orderId}/vendor`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ vendorId }),
      });
      if (res.ok) {
        const { order } = await res.json();
        setOrders(prev => prev.map(o => (o._id === orderId ? order : o)));
      } else {
        alert('Failed to reassign vendor');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setReassigning(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const TAB_LABELS: { key: typeof activeTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'vendors',  label: 'Vendors' },
    { key: 'orders',   label: 'Orders' },
    { key: 'users',    label: 'Users' },
  ];

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans pb-12">
      <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
          <Link to="/">
            <img src="/images/logo.png" alt="Happy Food Company" className="h-[50px] object-contain drop-shadow-sm transition-transform hover:scale-105" />
          </Link>
          <ProfileDropdown user={currentUser} onLogout={handleLogout} dashboardType="admin" />
        </div>
      </header>

      <main className="container mx-auto px-4 mt-6 md:mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Admin<span className="text-[#FA6011]">Hub</span>
              <span className="bg-orange-100 text-[#FA6011] text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-black border border-orange-200/50">PRO</span>
            </h1>
            <p className="text-gray-500 font-bold text-sm mt-1">Global management console for platform operations and partners.</p>
          </div>
          <div className="flex gap-2 mt-6 md:mt-0 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 flex-wrap">
            {TAB_LABELS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${activeTab === key ? 'bg-white text-[#FA6011] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-[#FA6011] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-black text-gray-400 tracking-widest uppercase text-xs">Synchronizing Core Data...</p>
          </div>
        ) : activeTab === 'overview' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:border-[#FA6011]/30 transition-all group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 border border-orange-100 group-hover:scale-110 transition-transform">
                <Activity size={28} className="text-[#FA6011]" />
              </div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Platform Volume</p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">{stats.totalOrders}</h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                <p className="text-[10px] font-bold text-gray-400">Total orders processed</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:border-blue-200 transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:scale-110 transition-transform">
                <Users size={28} className="text-blue-500" />
              </div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Base Growth</p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">{stats.totalUsers}</h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <p className="text-[10px] font-bold text-gray-400">Active customer accounts</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:border-green-200 transition-all group">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 border border-green-100 group-hover:scale-110 transition-transform">
                <Truck size={28} className="text-green-500" />
              </div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Partner Network</p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">{stats.totalVendors}</h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                <p className="text-[10px] font-bold text-gray-400">Onboarded vendor partners</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FA6011] to-[#ff3c83] p-8 rounded-[2rem] shadow-lg shadow-orange-100/50 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:rotate-12 transition-transform">
                  <DollarSign size={28} className="text-white" />
                </div>
                <p className="text-[11px] font-black text-white/70 uppercase tracking-widest mb-1">Overall Revenue</p>
                <h3 className="text-3xl md:text-4xl font-black">₹{stats.totalRevenue.toLocaleString()}</h3>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                  <p className="text-[10px] font-bold text-white/70">Total marketplace turnover</p>
                </div>
              </div>
              <DollarSign size={120} className="absolute -right-8 -bottom-8 text-white/5 rotate-12" />
            </div>
          </div>

        ) : activeTab === 'vendors' ? (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">Create New Vendor</h2>
              <form onSubmit={createVendor} className="flex flex-col md:flex-row gap-4">
                <input required value={vendorForm.fullName} onChange={e => setVendorForm({...vendorForm, fullName: e.target.value})} placeholder="Full Name" className="flex-1 p-3 border border-gray-200 rounded-xl min-w-[200px] outline-none focus:ring-2 focus:ring-orange-100 transition-all font-bold text-sm" />
                <input required type="email" value={vendorForm.email} onChange={e => setVendorForm({...vendorForm, email: e.target.value})} placeholder="Email Address" className="flex-1 p-3 border border-gray-200 rounded-xl min-w-[200px] outline-none focus:ring-2 focus:ring-orange-100 transition-all font-bold text-sm" />
                <input required type="password" value={vendorForm.password} onChange={e => setVendorForm({...vendorForm, password: e.target.value})} placeholder="Password" className="flex-1 p-3 border border-gray-200 rounded-xl min-w-[200px] outline-none focus:ring-2 focus:ring-orange-100 transition-all font-bold text-sm" />
                <input required value={vendorForm.mobileNumber} onChange={e => setVendorForm({...vendorForm, mobileNumber: e.target.value})} placeholder="Mobile Number" className="flex-1 p-3 border border-gray-200 rounded-xl min-w-[200px] outline-none focus:ring-2 focus:ring-orange-100 transition-all font-bold text-sm" />
                <button type="submit" className="bg-[#ff3c83] text-white px-8 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-sm shadow-pink-100 transition-all">Onboard Partner</button>
              </form>
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Vendor Management</h2>
                <div className="text-[10px] bg-white px-3 py-1 rounded-full font-black text-gray-500 uppercase tracking-widest border border-gray-200">{vendors.length} Partners</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/80">
                      <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Partner Details</th>
                      <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Contact Email</th>
                      <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                      <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {vendors.map(v => (
                      <tr key={v._id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-6 font-black text-slate-900 text-sm">{v.fullName}</td>
                        <td className="px-8 py-6 text-gray-500 font-bold text-xs">{v.email}</td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${v.isBlocked ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-500 border-green-100'}`}>
                            {v.isBlocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td className="px-8 py-6 flex justify-end gap-2">
                          <button onClick={() => toggleBlock(v._id, v.isBlocked, 'vendors')} className="p-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-all active:scale-95" title={v.isBlocked ? 'Unblock' : 'Block'}><XCircle size={18} /></button>
                          <button onClick={() => deleteVendor(v._id)} className="p-2 bg-red-50 rounded-xl text-red-500 hover:bg-red-100 transition-all active:scale-95" title="Delete"><Trash size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        ) : activeTab === 'orders' ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden animate-in slide-in-from-bottom duration-500">
            <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
              <div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Global Orders</h2>
                <p className="text-xs font-bold text-gray-400 mt-1">Monitor all platform traffic and manage vendor assignments.</p>
              </div>
              <button onClick={fetchData} className="p-3 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-[#FA6011] hover:border-orange-100 transition-all shadow-sm active:scale-95" title="Force Refresh"><RefreshCw size={18} /></button>
            </div>
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Package size={48} className="text-gray-200 mb-4" />
                <p className="font-black text-gray-300 uppercase tracking-widest text-xs">Platform is quiet</p>
                <p className="text-[10px] font-bold text-gray-400 mt-1">No orders have been placed on the marketplace yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[1000px]">
                  <thead>
                    <tr className="bg-gray-50/80">
                      <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Order & Date</th>
                      <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Customer</th>
                      <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Items</th>
                      <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Total Value</th>
                      <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                      <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Vendor Assignment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map(order => {
                      const date = order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '—';
                      const time = order.createdAt 
                        ? new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                        : '';
                      const currentVendorId = order.vendorId?._id ?? order.vendorId ?? '';
                      return (
                        <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex flex-col">
                              <span className="font-mono text-[10px] font-bold text-[#FA6011] bg-orange-50 px-2 py-1 rounded-md border border-orange-100/50 w-fit">#{order._id.slice(-8).toUpperCase()}</span>
                              <span className="font-bold text-slate-800 text-xs mt-2">{date}</span>
                              <span className="text-[10px] text-gray-400 font-bold">{time}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col">
                              <span className="font-black text-slate-900 text-sm uppercase tracking-tight">{order.userId?.fullName || 'Anonymous'}</span>
                              <span className="font-bold text-gray-400 text-xs mt-0.5">{order.userId?.email}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col gap-1 max-w-[200px]">
                              {order.items?.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between items-center bg-gray-50/50 px-2 py-1 rounded border border-gray-100">
                                  <span className="text-[10px] font-bold text-gray-600 truncate">{item.title}</span>
                                  <span className="text-[9px] font-black text-orange-400 ml-2">×{item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-8 py-6 font-black text-slate-900 text-base">₹{order.totalAmount?.toLocaleString()}</td>
                          <td className="px-8 py-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border
                              ${order.status === 'pending' ? 'bg-orange-50 text-[#FA6011] border-orange-100' : 
                                order.status === 'cancelled' ? 'bg-red-50 text-red-500 border-red-100' : 
                                order.status === 'delivered' ? 'bg-green-50 text-green-500 border-green-100' :
                                'bg-blue-50 text-blue-500 border-blue-100'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <select
                                value={currentVendorId}
                                disabled={reassigning === order._id}
                                onChange={e => reassignVendor(order._id, e.target.value)}
                                className="border border-gray-200 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest bg-white focus:outline-none focus:ring-2 focus:ring-[#FA6011]/20 disabled:opacity-50 appearance-none cursor-pointer"
                              >
                                <option value="">— Unassigned —</option>
                                {vendors.map(v => (
                                  <option key={v._id} value={v._id}>{v.fullName.toUpperCase()}</option>
                                ))}
                              </select>
                              {reassigning === order._id && (
                                <RefreshCw size={14} className="animate-spin text-[#FA6011]" />
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden animate-in slide-in-from-bottom duration-500">
            <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Customers</h2>
              <div className="text-[10px] bg-white px-3 py-1 rounded-full font-black text-gray-500 uppercase tracking-widest border border-gray-200">{users.length} Users</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Customer Name</th>
                    <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Email Address</th>
                    <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                    <th className="px-8 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6 font-black text-slate-900 text-sm">{u.fullName}</td>
                      <td className="px-8 py-6 text-gray-500 font-bold text-xs">{u.email}</td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${u.isBlocked ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-500 border-green-100'}`}>
                          {u.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => toggleBlock(u._id, u.isBlocked, 'users')} className="p-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-all active:scale-95" title={u.isBlocked ? 'Unblock' : 'Block'}><XCircle size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
