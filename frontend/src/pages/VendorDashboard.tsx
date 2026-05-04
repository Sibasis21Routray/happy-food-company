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
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/vendor/dashboard">
            <img src="/images/logo.png" alt="Happy Food Company" className="h-10 object-contain" />
          </Link>
          <ProfileDropdown user={currentUser} onLogout={handleLogout} dashboardType="vendor" />
        </div>
      </header>

      <main className="container mx-auto px-6 mt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-light text-gray-800">Vendor Dashboard</h1>
          <div className="w-12 h-px bg-gray-300 mt-2" />
          <p className="text-gray-400 text-sm font-light mt-2">Manage operations and performance in real-time</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-8">
          {['analytics', 'orders', 'revenue'].map((tab) => (
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

        {activeTab === 'analytics' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-100 p-6">
              <Package size={20} className="text-gray-400 mb-4" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Assigned</p>
              <h3 className="text-2xl font-light text-gray-800">{stats.totalOrders}</h3>
            </div>
            <div className="bg-white border border-gray-100 p-6">
              <Clock size={20} className="text-gray-400 mb-4" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Action Required</p>
              <h3 className="text-2xl font-light text-gray-800">{stats.pendingOrders + stats.processingOrders}</h3>
            </div>
            <div className="bg-white border border-gray-100 p-6">
              <CheckCircle size={20} className="text-gray-400 mb-4" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Fulfilled</p>
              <h3 className="text-2xl font-light text-gray-800">{stats.completedOrders}</h3>
            </div>
            <button onClick={() => setActiveTab('revenue')} className="bg-gray-800 border border-gray-800 p-6 text-left hover:bg-gray-700 transition-all">
              <DollarSign size={20} className="text-gray-300 mb-4" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Revenue</p>
              <h3 className="text-2xl font-light text-white">₹{stats.totalSalesValue.toLocaleString()}</h3>
              <p className="text-xs text-gray-400 mt-2">View Ledger →</p>
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
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Period Earnings</p>
                  <h3 className="text-2xl font-light text-gray-800">₹{revenueState.overallTotalRevenue.toLocaleString()}</h3>
                  <p className="text-xs text-gray-400 mt-1">{revenueState.totalPeriodOrders} orders</p>
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
                      <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50">
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
        ) : (
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <input type="text" placeholder="Search orders..." value={assignmentState.search} onChange={(e) => setAssignmentState(prev => ({ ...prev, search: e.target.value, page: 1 }))} className="w-full px-4 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none pl-10" />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
                </div>
                <select value={assignmentState.status} onChange={(e) => setAssignmentState(prev => ({ ...prev, status: e.target.value, page: 1 }))} className="px-3 py-2 border border-gray-200 text-sm focus:border-gray-400 focus:outline-none bg-white">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Order ID</th>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Customer</th>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Items</th>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Amount</th>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Status</th>
                      <th className="px-5 py-4 text-xs font-light text-gray-400 uppercase tracking-wide">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentState.data.map((o: any) => (
                      <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-4 text-sm text-gray-600 font-mono">{o._id.slice(-8)}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{o.userId?.fullName || 'Guest'}</td>
                        <td className="px-5 py-4 text-sm text-gray-500">{o.items?.length} items</td>
                        <td className="px-5 py-4 text-sm font-medium text-gray-800">₹{o.totalAmount}</td>
                        <td className="px-5 py-4">
                          <select 
                            value={o.status} 
                            onChange={(e) => updateOrderStatus(o._id, e.target.value)} 
                            className="px-2 py-1 border border-gray-200 text-xs font-light focus:border-gray-400 focus:outline-none bg-white"
                          >
                            {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
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
          </div>
        )}
      </main>
    </div>
  );
};