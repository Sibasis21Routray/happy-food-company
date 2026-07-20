import React, { useState, useEffect } from 'react';
import { Users, Truck, DollarSign, Activity, XCircle, Trash, Package, RefreshCw, Search, Clock, CheckCircle, TrendingUp, ShoppingCart, MoreVertical, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate, Link } from 'react-router-dom';
import { ProfileDropdown } from '../components/Dashboard/ProfileDropdown';
import { OrderDetailsModal } from '../components/Dashboard/OrderDetailsModal';

const API = `${import.meta.env.VITE_API_URL}`;

const chartData = [
  { name: 'Lab', revenue: 700, sales: 900 },
  { name: 'Lab', revenue: 720, sales: 850 },
  { name: 'Lab', revenue: 650, sales: 880 },
  { name: 'Lab', revenue: 850, sales: 750 },
  { name: 'Lab', revenue: 800, sales: 1000 },
  { name: 'Lab', revenue: 1100, sales: 850 },
  { name: 'Lab', revenue: 850, sales: 900 },
  { name: 'Lab', revenue: 950, sales: 850 },
  { name: 'Lab', revenue: 750, sales: 950 },
  { name: 'Lab', revenue: 680, sales: 980 },
  { name: 'Lab', revenue: 800, sales: 1100 },
  { name: 'Lab', revenue: 900, sales: 1150 },
  { name: 'Lab', revenue: 750, sales: 1050 },
  { name: 'Lab', revenue: 850, sales: 1000 },
  { name: 'Lab', revenue: 820, sales: 1050 },
  { name: 'Lab', revenue: 950, sales: 1000 },
  { name: 'Lab', revenue: 850, sales: 1400 },
  { name: 'Lab', revenue: 900, sales: 1200 },
  { name: 'Lab', revenue: 1300, sales: 950 },
  { name: 'Lab', revenue: 800, sales: 900 },
  { name: 'Lab', revenue: 700, sales: 850 },
  { name: 'Lab', revenue: 750, sales: 600 },
  { name: 'Lab', revenue: 900, sales: 800 },
  { name: 'Lab', revenue: 800, sales: 900 },
  { name: 'Lab', revenue: 1000, sales: 850 },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'orders' | 'revenue'>('overview');
  const [expandedOrder, setExpandedOrder] = useState<any>(null);
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
  const [overviewOrderState, setOverviewOrderState] = useState({ data: [], limit: 5, page: 1, totalPages: 1, total: 0 });
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [expandedAddressUser, setExpandedAddressUser] = useState<any>(null);
  const navigate = useNavigate();

  // Initialize user
  useEffect(() => {
    const usr = localStorage.getItem('user');
    if (usr) setCurrentUser(JSON.parse(usr));
  }, []);

  // Handle debounced search
  useEffect(() => {
    const searchMap = { 
      vendors: vendorState.search, 
      users: userState.search, 
      orders: orderState.search, 
      revenue: revenueState.search, 
      overview: '' 
    };
    const currentSearch = searchMap[activeTab as keyof typeof searchMap] || '';
    const timer = setTimeout(() => setDebouncedSearch(currentSearch), 500);
    return () => clearTimeout(timer);
  }, [vendorState.search, userState.search, orderState.search, revenueState.search, activeTab]);

  // Fetch data when tab changes or dependencies change
  useEffect(() => {
    fetchData();
  }, [
    activeTab,
    debouncedSearch,
    // Overview dependencies
    overviewOrderState.page, overviewOrderState.limit,
    // User dependencies
    userState.filter, userState.page, userState.sortBy, userState.sortOrder,
    // Order dependencies
    orderState.status, orderState.page, orderState.sortBy, orderState.sortOrder,
    // Revenue dependencies
    revenueState.startDate, revenueState.endDate, revenueState.status, 
    revenueState.page, revenueState.sortBy, revenueState.sortOrder
  ]);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    
    try {
      console.log(`Fetching data for tab: ${activeTab}`);

      if (activeTab === 'overview') {
        // Fetch dashboard stats
        const res = await fetch(`${API}/admin/dashboard`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }

        // Fetch recent orders
        const orderRes = await fetch(
          `${API}/admin/orders?page=${overviewOrderState.page}&limit=${overviewOrderState.limit}`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (orderRes.ok) {
          const data = await orderRes.json();
          setOverviewOrderState(prev => ({ 
            ...prev, 
            data: data.orders || [], 
            total: data.total || 0, 
            totalPages: data.pages || 1 
          }));
        }
      } 
      else if (activeTab === 'users') {
        const qParams = new URLSearchParams({ 
          search: debouncedSearch, 
          filter: userState.filter, 
          sortBy: userState.sortBy, 
          sortOrder: userState.sortOrder, 
          page: userState.page.toString() 
        });
        const res = await fetch(`${API}/admin/users?${qParams}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        if (res.ok) {
          const data = await res.json();
          setUserState(prev => ({ 
            ...prev, 
            data: data.users || [], 
            totalPages: data.pages || 1 
          }));
        }
      } 
      else if (activeTab === 'orders') {
        // Build query parameters for orders
        const qParams = new URLSearchParams({
          page: orderState.page.toString(),
          limit: '10'
        });
        
        if (orderState.status !== 'all') {
          qParams.append('status', orderState.status);
        }
        
        if (debouncedSearch) {
          qParams.append('search', debouncedSearch);
        }
        
        if (orderState.sortBy) {
          qParams.append('sortBy', orderState.sortBy);
          qParams.append('sortOrder', orderState.sortOrder);
        }

        console.log('Fetching orders with params:', qParams.toString());
        console.log('API URL:', `${API}/admin/orders?${qParams}`);
        
        const res = await fetch(`${API}/admin/orders?${qParams}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        
        if (res.ok) {
          const data = await res.json();
          console.log('Orders data received:', data);
          
          setOrderState(prev => ({ 
            ...prev, 
            data: data.orders || [], 
            totalPages: data.pages || 1 
          }));
        } else {
          console.error('Failed to fetch orders:', await res.text());
        }
      } 
      else if (activeTab === 'revenue') {
        const qParams = new URLSearchParams({
          page: revenueState.page.toString(),
          limit: '10'
        });
        
        if (revenueState.status !== 'all') {
          qParams.append('status', revenueState.status);
        }
        
        if (revenueState.search) {
          qParams.append('search', revenueState.search);
        }
        
        if (revenueState.startDate) {
          qParams.append('startDate', revenueState.startDate);
        }
        
        if (revenueState.endDate) {
          qParams.append('endDate', revenueState.endDate);
        }
        
        if (revenueState.sortBy) {
          qParams.append('sortBy', revenueState.sortBy);
          qParams.append('sortOrder', revenueState.sortOrder);
        }

        const res = await fetch(`${API}/admin/orders?${qParams}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        
        if (res.ok) {
          const data = await res.json();
          
          // Fix: Parse totalRevenue if it's a string
          let totalRevenue = data.totalRevenue || 0;
          if (typeof totalRevenue === 'string') {
            totalRevenue = parseFloat(totalRevenue.replace(/[^0-9.]/g, '')) || 0;
          }
          
          setRevenueState(prev => ({
            ...prev,
            data: data.orders || [],
            totalPages: data.pages || 1,
            totalPeriodOrders: data.total || 0,
            totalPeriodRevenue: totalRevenue
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("Failed to update status");

      const updatedOrderRes = await res.json();

      if (expandedOrder && expandedOrder.id === orderId) {
        setExpandedOrder(updatedOrderRes.order);
      }
      fetchData(); // Refresh the data tables
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Helper function to get order display ID
  const getOrderDisplayId = (order: any) => {
    return order.orderNumber ? `#${String(order.orderNumber).padStart(4, '0')}` : order.id?.slice(0, 8) || 'N/A';
  };

  // Helper function to get customer name
  const getCustomerName = (order: any) => {
    return order.userName || order.user?.fullName || order.userId?.fullName || 'Guest';
  };

  // Helper function to get customer email
  const getCustomerEmail = (order: any) => {
    return order.userEmail || order.user?.email || order.userId?.email || '';
  };

  // Helper function to format status for display
  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      'pending': { label: 'Pending', color: 'bg-amber-50 text-amber-700' },
      'confirmed': { label: 'Confirmed', color: 'bg-blue-50 text-blue-700' },
      'processing': { label: 'Processing', color: 'bg-indigo-50 text-indigo-700' },
      'shipped': { label: 'Shipped', color: 'bg-purple-50 text-purple-700' },
      'out for delivery': { label: 'Out for Delivery', color: 'bg-cyan-50 text-cyan-700' },
      'delivered': { label: 'Delivered', color: 'bg-emerald-50 text-emerald-700' },
      'cancelled': { label: 'Cancelled', color: 'bg-rose-50 text-rose-700' },
      'refunded': { label: 'Refunded', color: 'bg-gray-50 text-gray-700' },
    };
    return statusMap[status?.toLowerCase()] || { label: status || 'Unknown', color: 'bg-gray-50 text-gray-700' };
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
          <p className="text-gray-400 text-md font-light mt-2">Global ecosystem overview and administrative controls</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-8">
          {['overview', 'users', 'orders', 'revenue'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                console.log(`Switching to tab: ${tab}`);
                setActiveTab(tab as any);
                // Reset page to 1 when switching tabs
                if (tab === 'orders') {
                  setOrderState(prev => ({ ...prev, page: 1 }));
                }
              }}
              className={`px-6 py-2.5 text-md font-light tracking-wide transition-all ${activeTab === tab
                  ? 'text-gray-800 border-b-2 border-gray-800'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' ? (
          <div className="space-y-6">
            {/* Overview content - same as before */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex items-start gap-4">
                <div className="bg-green-100 text-green-500 p-3 rounded-xl">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    ₹{stats.totalRevenue ? stats.totalRevenue.toLocaleString() : '0'}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 font-medium flex items-center">
                    {stats.totalOrders > 0 ? `${stats.totalOrders}+ Orders` : ''}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex items-start gap-4">
                <div className="bg-indigo-100 text-indigo-500 p-3 rounded-xl">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Total Customers</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {stats.totalUsers ? stats.totalUsers.toLocaleString() : '0'}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 font-medium flex items-center">
                    Last week
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex items-start gap-4">
                <div className="bg-orange-100 text-orange-500 p-3 rounded-xl">
                  <ShoppingCart size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {stats.totalOrders ? stats.totalOrders.toLocaleString() : '0'}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 font-medium flex items-center">
                    Last week
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Status of amazon growth</h2>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
                    <span className="text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                    <span className="text-gray-600">Sales</span>
                  </div>
                  <MoreVertical size={18} className="text-gray-400 cursor-pointer ml-2" />
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fb923c" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} tickFormatter={(value) => `₹${value / 1000}k`} dx={-10} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => [`₹${value}`, undefined]}
                      itemStyle={{ fontWeight: 600 }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#fb923c" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
                    <Area type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800">Last Orders</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 bg-white shadow-sm w-full sm:w-64" />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm">
                    <Filter size={16} /> Filters
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-6 py-4 text-sm font-semibold text-gray-800">ID</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-800">Name</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-800">Date</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-800">Tracking</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-800">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overviewOrderState.data.length > 0 ? overviewOrderState.data.map((o: any) => (
                      <tr key={o.id || o._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-500">{getOrderDisplayId(o)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-800">{getCustomerName(o)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {new Date(o.createdAt).toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${getStatusDisplay(o.status).color}`}>
                            {getStatusDisplay(o.status).label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">₹{o.totalAmount}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-50 flex items-center justify-between text-sm font-medium text-gray-500 bg-gray-50/30">
                <div className="flex items-center gap-2">
                  Showing
                  <select
                    value={overviewOrderState.limit}
                    onChange={(e) => setOverviewOrderState(prev => ({ ...prev, limit: Number(e.target.value), page: 1 }))}
                    className="border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none shadow-sm cursor-pointer hover:border-gray-300"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                  </select>
                  of {overviewOrderState.total}
                </div>
                <div className="flex gap-1">
                  <button
                    disabled={overviewOrderState.page === 1}
                    onClick={() => setOverviewOrderState(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm text-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >{'<'}</button>

                  {Array.from({ length: Math.min(overviewOrderState.totalPages, 5) }).map((_, idx) => {
                    const p = idx + 1;
                    return (
                      <button
                        key={p}
                        onClick={() => setOverviewOrderState(prev => ({ ...prev, page: p }))}
                        className={`w-8 h-8 flex items-center justify-center rounded-md transition-all shadow-sm ${overviewOrderState.page === p
                            ? 'bg-orange-400 text-white font-semibold'
                            : 'hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm text-gray-600'
                          }`}
                      >
                        {p}
                      </button>
                    );
                  })}

                  <button
                    disabled={overviewOrderState.page === overviewOrderState.totalPages}
                    onClick={() => setOverviewOrderState(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm text-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >{'>'}</button>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'orders' ? (
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
              <div className="relative w-full max-w-md">
                <input 
                  type="text" 
                  placeholder="Search orders..." 
                  value={orderState.search} 
                  onChange={(e) => {
                    setOrderState(prev => ({ ...prev, search: e.target.value, page: 1 }));
                  }} 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-gray-800 focus:bg-white transition-all outline-none pl-10" 
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
              </div>
              <select
                value={orderState.status}
                onChange={(e) => setOrderState(prev => ({ ...prev, status: e.target.value, page: 1 }))}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:border-gray-800 focus:bg-white transition-all outline-none min-w-[150px]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-gray-100">
                      <tr>
                        <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Order ID</th>
                        <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Date</th>
                        <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Customer</th>
                        {/* <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Items</th> */}
                        <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Amount</th>
                        <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Payment</th>
                        <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Status</th>
                        <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderState.data.length > 0 ? (
                        orderState.data.map((o: any) => (
                          <tr key={o.id || o._id} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="px-5 py-4 text-md text-gray-600 font-mono">{getOrderDisplayId(o)}</td>
                            <td className="px-5 py-4 text-md text-gray-500">
                              {new Date(o.createdAt).toLocaleDateString()} <br />
                              <span className="text-xs text-gray-400">{new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </td>
                            <td className="px-5 py-4 text-md text-gray-600">
                              {getCustomerName(o)}
                              {getCustomerEmail(o) && (
                                <div className="text-xs text-gray-400">{getCustomerEmail(o)}</div>
                              )}
                            </td>
                            {/* <td className="px-5 py-4 text-md text-gray-500">{o.items?.length || 0} items</td> */}
                            <td className="px-5 py-4 text-md font-medium text-gray-800">₹{Number(o.totalAmount).toLocaleString()}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${
                                o.paymentMethod?.toLowerCase() === 'online' ? 'bg-indigo-50 text-indigo-700' : 
                                o.paymentMethod?.toLowerCase() === 'cod' ? 'bg-gray-100 text-gray-600' :
                                'bg-gray-50 text-gray-500'
                              }`}>
                                {o.paymentMethod?.toLowerCase() === 'online' ? <DollarSign size={12} strokeWidth={2.5} /> : <Package size={12} strokeWidth={2.5} />}
                                {o.paymentMethod || 'COD'}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex flex-col items-start gap-2">
                                <select
                                  value={o.status?.toLowerCase() || 'pending'}
                                  onChange={(e) => handleStatusChange(o.id || o._id, e.target.value)}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200 border-0 ${getStatusDisplay(o.status).color}`}
                                >
                                  <option value="pending">PENDING</option>
                                  <option value="confirmed">CONFIRMED</option>
                                  <option value="processing">PROCESSING</option>
                                  <option value="shipped">SHIPPED</option>
                                  <option value="out for delivery">OUT FOR DELIVERY</option>
                                  <option value="delivered">DELIVERED</option>
                                  <option value="cancelled">CANCELLED</option>
                                  <option value="refunded">REFUNDED</option>
                                </select>
                                {o.razorpayDetails?.paymentId && (
                                  <span className="text-[10px] font-mono text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-200" title="Transaction ID">
                                    Txn: {o.razorpayDetails.paymentId}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <button onClick={() => setExpandedOrder(o)} className="text-gray-500 text-md hover:text-gray-700">View</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="px-5 py-8 text-center text-gray-500">
                            No orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {orderState.totalPages > 1 && (
                  <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Page {orderState.page} of {orderState.totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setOrderState(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                        disabled={orderState.page === 1}
                        className="px-3 py-1 border border-gray-200 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous                      </button>
                      <button
                        onClick={() => setOrderState(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                        disabled={orderState.page === orderState.totalPages}
                        className="px-3 py-1 border border-gray-200 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : activeTab === 'revenue' ? (
          <div className="space-y-6">
            {/* Revenue content - same as before */}
            <div className="bg-white border border-gray-100 p-6 shadow-sm rounded-xl">
              <div className="flex flex-col gap-6">
                {/* Summary Card */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl text-white flex items-center justify-between shadow-md">
                  <div>
                    <p className="text-sm text-gray-300 uppercase tracking-wide mb-1 flex items-center gap-2">
                      <DollarSign size={16} /> Filtered Revenue
                    </p>
                    <h3 className="text-4xl font-light tracking-tight">₹{revenueState.totalPeriodRevenue.toLocaleString()}</h3>
                    <p className="text-sm text-gray-400 mt-2">{revenueState.totalPeriodOrders} transactions matched</p>
                  </div>
                  <div className="hidden sm:block opacity-20">
                    <Activity size={80} strokeWidth={1} />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-end gap-4">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Start Date</label>
                    <input type="date" value={revenueState.startDate} onChange={e => setRevenueState({ ...revenueState, startDate: e.target.value, page: 1 })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-gray-800 focus:bg-white transition-all outline-none" />
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">End Date</label>
                    <input type="date" value={revenueState.endDate} onChange={e => setRevenueState({ ...revenueState, endDate: e.target.value, page: 1 })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-gray-800 focus:bg-white transition-all outline-none" />
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Status</label>
                    <select value={revenueState.status} onChange={e => setRevenueState({ ...revenueState, status: e.target.value, page: 1 })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-gray-800 focus:bg-white transition-all outline-none">
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="out for delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                  <div className="flex-2 min-w-[250px] relative">
                    <input type="text" placeholder="Search by Order ID..." value={revenueState.search} onChange={e => setRevenueState({ ...revenueState, search: e.target.value, page: 1 })} className="w-full px-4 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-gray-800 focus:bg-white transition-all outline-none" />
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Order ID</th>
                      <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Date</th>
                      <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Customer</th>
                      <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Amount</th>
                      <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueState.data.map((o: any) => (
                      <tr key={o.id || o._id} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                        <td className="px-5 py-4 text-md text-gray-600 font-mono">{getOrderDisplayId(o)}</td>
                        <td className="px-5 py-4 text-md text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="px-5 py-4 text-md text-gray-600">{getCustomerName(o)}</td>
                        <td className="px-5 py-4 text-md font-medium text-gray-800">₹{Number(o.totalAmount).toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusDisplay(o.status).color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              o.status?.toLowerCase() === 'delivered' ? 'bg-emerald-500' :
                              o.status?.toLowerCase() === 'confirmed' ? 'bg-blue-500' :
                              o.status?.toLowerCase() === 'cancelled' ? 'bg-rose-500' :
                              'bg-amber-500'
                            }`}></span>
                            {getStatusDisplay(o.status).label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'users' ? (
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="relative w-full max-w-md">
                <input type="text" placeholder="Search users..." value={userState.search} onChange={(e) => setUserState(prev => ({ ...prev, search: e.target.value, page: 1 }))} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-gray-800 focus:bg-white transition-all outline-none pl-10" />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Name</th>
                    <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Email</th>
                    <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Mobile</th>
                    <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Address</th>
                    <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Status</th>
                    <th className="px-5 py-4 text-sm font-light text-gray-400 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userState.data.map((u: any) => (
                    <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-4 text-md text-gray-700">{u.fullName}</td>
                      <td className="px-5 py-4 text-md text-gray-500">{u.email}</td>
                      <td className="px-5 py-4 text-md text-gray-500">{u.mobileNumber}</td>
                      <td className="px-5 py-4 text-md text-gray-500 max-w-[200px] truncate cursor-pointer hover:text-gray-800" onClick={() => setExpandedAddressUser(u)}>
                        {u.savedAddresses && u.savedAddresses.length > 0
                          ? `${u.savedAddresses[0].streetAddress}, ${u.savedAddresses[0].city}`
                          : 'No Address'}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-sm font-light uppercase ${u.isBlocked ? 'text-red-500' : 'text-green-600'}`}>
                          {u.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button onClick={() => toggleBlock(u._id, u.isBlocked, 'users')} className={`px-3 py-1 text-sm font-light text-white ${u.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'} transition-all`}>
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

      {/* Address Modal */}
      {expandedAddressUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-light text-gray-800">Saved Addresses</h2>
              <button onClick={() => setExpandedAddressUser(null)} className="text-gray-400 hover:text-gray-800">
                <XCircle size={24} strokeWidth={1.5} />
              </button>
            </div>
            <div className="space-y-4">
              {expandedAddressUser.savedAddresses && expandedAddressUser.savedAddresses.length > 0 ? (
                expandedAddressUser.savedAddresses.map((addr: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 p-4 rounded-sm bg-gray-50">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{addr.type || 'Address'}</span>
                      {addr.isSaved && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Saved</span>}
                    </div>
                    <p className="text-sm font-medium text-gray-800">{addr.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{addr.streetAddress}, {addr.locality}</p>
                    <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pinCode}</p>
                    <p className="text-sm text-gray-600 mt-1">Phone: {addr.phone}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No saved addresses found for this user.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {expandedOrder && (
        <OrderDetailsModal
          order={expandedOrder}
          onClose={() => setExpandedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};