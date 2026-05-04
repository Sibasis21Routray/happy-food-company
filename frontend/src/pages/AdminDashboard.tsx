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
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/admin/dashboard">
            <img src="/images/logo.png" alt="Happy Food Company" className="h-10 object-contain" />
          </Link>
          <ProfileDropdown user={currentUser} onLogout={handleLogout} dashboardType="admin" />
        </div>
      </header>

      <main className="container mx-auto px-6 mt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-light text-gray-800">Admin Dashboard</h1>
          <div className="w-12 h-px bg-gray-300 mt-2" />
          <p className="text-gray-400 text-sm font-light mt-2">Global ecosystem overview and administrative controls</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-8">
          {['overview', 'vendors', 'users', 'orders', 'revenue'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2.5 text-sm font-light tracking-wide transition-all ${
                activeTab === tab 
                  ? 'text-gray-800 border-b-2 border-gray-800' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-100 p-6">
              <Package size={20} className="text-gray-400 mb-4" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Orders</p>
              <h3 className="text-2xl font-light text-gray-800">{stats.totalOrders}</h3>
            </div>
            <div className="bg-white border border-gray-100 p-6">
              <Users size={20} className="text-gray-400 mb-4" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Users</p>
              <h3 className="text-2xl font-light text-gray-800">{stats.totalVendors + stats.totalUsers}</h3>
              <p className="text-xs text-gray-400 mt-1">{stats.totalVendors} Vendors</p>
            </div>
            <div className="bg-white border border-gray-100 p-6">
              <Activity size={20} className="text-gray-400 mb-4" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Success Rate</p>
              <h3 className="text-2xl font-light text-gray-800">{Math.round((stats.completedOrders / stats.totalOrders) * 100) || 0}%</h3>
            </div>
            <button onClick={() => setActiveTab('revenue')} className="bg-gray-800 border border-gray-800 p-6 text-left hover:bg-gray-700 transition-all">
              <DollarSign size={20} className="text-gray-300 mb-4" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Revenue</p>
              <h3 className="text-2xl font-light text-white">₹{stats.totalRevenue.toLocaleString()}</h3>
              <p className="text-xs text-gray-400 mt-2">View Details →</p>
            </button>
          </div>
        ) : activeTab === 'revenue' ? (
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 p-6">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Start Date</label>
                    <input type="date" value={revenueState.startDate} onChange={e => setRevenueState({ ...revenueState, startDate: e.target.value, page: 1 })} className="w-full px-3 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">End Date</label>
                    <input type="date" value={revenueState.endDate} onChange={e => setRevenueState({ ...revenueState, endDate: e.target.value, page: 1 })} className="w-full px-3 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Status</label>
                    <select value={revenueState.status} onChange={e => setRevenueState({ ...revenueState, status: e.target.value, page: 1 })} className="w-full px-3 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none bg-white">
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Filtered Total</p>
                  <h3 className="text-2xl font-light text-gray-800">₹{revenueState.totalPeriodRevenue.toLocaleString()}</h3>
                  <p className="text-xs text-gray-400 mt-1">{revenueState.totalPeriodOrders} transactions</p>
                </div>
                <div className="relative">
                  <input type="text" placeholder="Search by Order ID..." value={revenueState.search} onChange={e => setRevenueState({ ...revenueState, search: e.target.value, page: 1 })} className="w-full px-4 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none pl-10" />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Order ID</th>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Date</th>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Customer</th>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Amount</th>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueState.data.map((o: any) => (
                      <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                        <td className="px-5 py-4 text-sm text-gray-600 font-mono">{o._id.slice(-8)}</td>
                        <td className="px-5 py-4 text-sm text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{o.userId?.fullName || 'Guest'}</td>
                        <td className="px-5 py-4 text-sm font-medium text-gray-800">₹{o.totalAmount.toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-light uppercase ${o.status === 'delivered' ? 'text-green-600' : o.status === 'cancelled' ? 'text-red-500' : 'text-gray-500'}`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'vendors' ? (
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 p-6">
              <h2 className="text-lg font-light text-gray-800 mb-4">Create New Vendor</h2>
              <form onSubmit={createVendor} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <input required value={vendorForm.fullName} onChange={e => setVendorForm({ ...vendorForm, fullName: e.target.value })} placeholder="Full Name" className="px-3 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none" />
                <input required type="email" value={vendorForm.email} onChange={e => setVendorForm({ ...vendorForm, email: e.target.value })} placeholder="Email" className="px-3 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none" />
                <input required type="password" value={vendorForm.password} onChange={e => setVendorForm({ ...vendorForm, password: e.target.value })} placeholder="Password" className="px-3 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none" />
                <PhoneInput country={'in'} value={vendorForm.mobileNumber} onChange={(phone: string) => setVendorForm({ ...vendorForm, mobileNumber: phone })} inputClass="!w-full !px-3 !py-2 !border !border-gray-200 !text-sm focus:!border-gray-400 !outline-none" buttonClass="!bg-transparent !border-0" />
                <button type="submit" className="bg-gray-800 text-white text-sm font-light py-2 hover:bg-gray-700 transition-all">Create Vendor</button>
              </form>
            </div>

            <div className="bg-white border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <input type="text" placeholder="Search vendors..." value={vendorState.search} onChange={(e) => setVendorState(prev => ({ ...prev, search: e.target.value, page: 1 }))} className="w-full px-4 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none pl-10" />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
                </div>
                <select value={vendorState.filter} onChange={(e) => setVendorState(prev => ({ ...prev, filter: e.target.value, page: 1 }))} className="px-3 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none bg-white">
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-xs font-light text-gray-400 uppercase tracking-wide">Name</th>
                      <th className="px-4 py-3 text-xs font-light text-gray-400 uppercase tracking-wide">Email</th>
                      <th className="px-4 py-3 text-xs font-light text-gray-400 uppercase tracking-wide">Mobile</th>
                      <th className="px-4 py-3 text-xs font-light text-gray-400 uppercase tracking-wide">Status</th>
                      <th className="px-4 py-3 text-xs font-light text-gray-400 uppercase tracking-wide">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorState.data.map((v: any) => (
                      <tr key={v._id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{v.fullName}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{v.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{v.mobileNumber}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-light uppercase ${v.isBlocked ? 'text-red-500' : 'text-green-600'}`}>
                            {v.isBlocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleBlock(v._id, v.isBlocked, 'vendors')} className={`px-3 py-1 text-xs font-light text-white ${v.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'} transition-all`}>
                            {v.isBlocked ? 'Unblock' : 'Block'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'orders' ? (
          <div className="bg-white border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <input type="text" placeholder="Search orders..." value={orderState.search} onChange={(e) => setOrderState(prev => ({ ...prev, search: e.target.value, page: 1 }))} className="w-full px-4 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none pl-10" />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Order ID</th>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Customer</th>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Items</th>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Amount</th>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Vendor</th>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Status</th>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderState.data.map((o: any) => (
                    <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm text-gray-600 font-mono">{o._id.slice(-8)}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{o.userId?.fullName || 'Guest'}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{o.items?.length} items</td>
                      <td className="px-5 py-4 text-sm font-medium text-gray-800">₹{o.totalAmount}</td>
                      <td className="px-5 py-4">
                        {reassigning === o._id ? (
                          <select onChange={(e) => reassignVendor(o._id, e.target.value)} className="px-2 py-1 border border-gray-200 text-sm" defaultValue={o.vendorId?._id || ""}>
                            <option value="">Assign...</option>
                            {vendors.map((v: any) => (<option key={v._id} value={v._id}>{v.fullName}</option>))}
                          </select>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{o.vendorId?.fullName || "Unassigned"}</span>
                            <button onClick={() => setReassigning(o._id)} className="text-gray-400 hover:text-gray-600">
                              <RefreshCw size={12} strokeWidth={1.5} />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-light uppercase ${o.status === 'delivered' ? 'text-green-600' : o.status === 'cancelled' ? 'text-red-500' : 'text-gray-500'}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button onClick={() => navigate(`/orders/${o._id}`)} className="text-gray-500 text-sm hover:text-gray-700">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'users' ? (
          <div className="bg-white border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <input type="text" placeholder="Search users..." value={userState.search} onChange={(e) => setUserState(prev => ({ ...prev, search: e.target.value, page: 1 }))} className="w-full px-4 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none pl-10" />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Name</th>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Email</th>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Mobile</th>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Status</th>
                    <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userState.data.map((u: any) => (
                    <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm text-gray-700">{u.fullName}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{u.email}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{u.mobileNumber}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-light uppercase ${u.isBlocked ? 'text-red-500' : 'text-green-600'}`}>
                          {u.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button onClick={() => toggleBlock(u._id, u.isBlocked, 'users')} className={`px-3 py-1 text-xs font-light text-white ${u.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'} transition-all`}>
                          {u.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};