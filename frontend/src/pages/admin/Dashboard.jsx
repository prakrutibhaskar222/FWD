import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Filter,
  MoreVertical
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";
import DataTable from "../../components/admin/DataTable";
import { Button, Card, Badge } from "../../components/ui";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";
import toast from "react-hot-toast";

const API = "http://localhost:5001";

export default function Dashboard() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("7d");

  // Auto-refresh functionality
  const refreshDashboardData = async (source = 'manual') => {
    console.log(`Dashboard refreshed from ${source}`);
    await fetchAllData();
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshDashboardData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 2000,
    }
  );

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [servicesRes, bookingsRes, workersRes] = await Promise.all([
        fetch(`${API}/api/services`),
        fetch(`${API}/api/bookings`),
        fetch(`${API}/api/workers`)
      ]);

      const [servicesData, bookingsData, workersData] = await Promise.all([
        servicesRes.json(),
        bookingsRes.json(),
        workersRes.json()
      ]);

      if (servicesData.success) setServices(servicesData.data || []);
      if (bookingsData.success) setBookings(bookingsData.data || []);
      if (workersData.success) setWorkers(workersData.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Calculate metrics
  const metrics = useMemo(() => {
    const today = new Date();
    const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(b => b.status === "completed").length;
    const pendingBookings = bookings.filter(b => b.status === "pending").length;
    const todayBookings = bookings.filter(b => {
      const bookingDate = new Date(b.createdAt);
      return bookingDate.toDateString() === today.toDateString();
    }).length;

    const totalRevenue = bookings
      .filter(b => b.status === "completed" && b.paid)
      .reduce((sum, b) => sum + (b.price || 0), 0);

    const pendingRevenue = bookings
      .filter(b => b.status === "completed" && !b.paid)
      .reduce((sum, b) => sum + (b.price || 0), 0);

    const activeWorkers = workers.filter(w => w.status === "available").length;
    const totalWorkers = workers.length;

    // Calculate growth rates
    const last7DaysBookings = bookings.filter(b => new Date(b.createdAt) >= last7Days).length;
    const previous7DaysBookings = bookings.filter(b => {
      const date = new Date(b.createdAt);
      return date >= new Date(last7Days.getTime() - 7 * 24 * 60 * 60 * 1000) && date < last7Days;
    }).length;

    const bookingGrowth = previous7DaysBookings > 0 
      ? ((last7DaysBookings - previous7DaysBookings) / previous7DaysBookings * 100).toFixed(1)
      : "0";

    return {
      totalBookings,
      completedBookings,
      pendingBookings,
      todayBookings,
      totalRevenue,
      pendingRevenue,
      activeWorkers,
      totalWorkers,
      bookingGrowth: parseFloat(bookingGrowth),
      completionRate: totalBookings > 0 ? ((completedBookings / totalBookings) * 100).toFixed(1) : "0"
    };
  }, [bookings, workers]);

  // Recent bookings for table
  const recentBookings = useMemo(() => {
    return bookings
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
      .map(booking => ({
        id: booking._id,
        customer: booking.customerName,
        phone: booking.customerPhone,
        service: booking.serviceTitle || "Unknown Service",
        date: new Date(booking.createdAt).toLocaleDateString(),
        time: booking.slot || "Not scheduled",
        status: booking.status,
        amount: booking.price || 0,
        paid: booking.paid,
        worker: booking.workerAssigned || "Unassigned"
      }));
  }, [bookings]);

  const bookingColumns = [
    {
      key: "customer",
      title: "Customer",
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-neutral-900">{value}</div>
          <div className="text-sm text-neutral-500">{row.phone}</div>
        </div>
      )
    },
    {
      key: "service",
      title: "Service",
      sortable: true
    },
    {
      key: "date",
      title: "Date",
      sortable: true
    },
    {
      key: "time",
      title: "Time",
      sortable: false
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (value) => (
        <Badge 
          variant={
            value === "completed" ? "success" :
            value === "pending" ? "warning" :
            value === "in-progress" ? "primary" :
            "secondary"
          }
        >
          {value}
        </Badge>
      )
    },
    {
      key: "amount",
      title: "Amount",
      sortable: true,
      render: (value) => `₹${value}`
    },
    {
      key: "paid",
      title: "Payment",
      sortable: true,
      render: (value) => (
        <Badge variant={value ? "success" : "warning"}>
          {value ? "Paid" : "Pending"}
        </Badge>
      )
    }
  ];

  const handleBookingAction = (booking) => {
    // Handle booking actions
    console.log("Booking action:", booking);
  };

  const exportDashboardData = () => {
    const csvData = [
      ["Metric", "Value"],
      ["Total Bookings", metrics.totalBookings],
      ["Completed Bookings", metrics.completedBookings],
      ["Pending Bookings", metrics.pendingBookings],
      ["Total Revenue", `₹${metrics.totalRevenue}`],
      ["Pending Revenue", `₹${metrics.pendingRevenue}`],
      ["Active Workers", metrics.activeWorkers],
      ["Total Workers", metrics.totalWorkers],
      ["Completion Rate", `${metrics.completionRate}%`]
    ];

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-metrics.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
                <p className="text-neutral-600">Welcome back! Here's your business overview</p>
              </div>
            </div>
            
            {/* Quick Stats Summary */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700">
                  {metrics.activeWorkers} Active Workers
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700">
                  {metrics.todayBookings} Today's Bookings
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700">
                  {metrics.pendingBookings} Pending
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 focus:outline-none bg-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={exportDashboardData}
              className="bg-white hover:bg-neutral-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              onClick={() => refreshDashboardData('manual')}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatsCard
            title="Total Bookings"
            value={metrics.totalBookings}
            change={`${metrics.bookingGrowth > 0 ? '+' : ''}${metrics.bookingGrowth}% vs last week`}
            changeType={metrics.bookingGrowth >= 0 ? "positive" : "negative"}
            icon={<Calendar className="w-6 h-6" />}
            color="primary"
            loading={loading}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatsCard
            title="Total Revenue"
            value={`₹${metrics.totalRevenue.toLocaleString()}`}
            change={`₹${metrics.pendingRevenue} pending`}
            changeType="positive"
            icon={<DollarSign className="w-6 h-6" />}
            color="success"
            loading={loading}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatsCard
            title="Active Workers"
            value={`${metrics.activeWorkers}/${metrics.totalWorkers}`}
            change={`${((metrics.activeWorkers / metrics.totalWorkers) * 100).toFixed(0)}% available`}
            changeType="positive"
            icon={<Users className="w-6 h-6" />}
            color="info"
            loading={loading}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatsCard
            title="Completion Rate"
            value={`${metrics.completionRate}%`}
            change={`${metrics.completedBookings} completed`}
            changeType="positive"
            icon={<CheckCircle className="w-6 h-6" />}
            color="purple"
            loading={loading}
          />
        </motion.div>
      </div>

      {/* Enhanced Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Today's Bookings</p>
                <p className="text-3xl font-bold text-blue-900">{metrics.todayBookings}</p>
                <p className="text-xs text-blue-600 mt-1">
                  {((metrics.todayBookings / metrics.totalBookings) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Pending Bookings</p>
                <p className="text-3xl font-bold text-yellow-900">{metrics.pendingBookings}</p>
                <p className="text-xs text-yellow-600 mt-1">
                  Requires attention
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Services</p>
                <p className="text-3xl font-bold text-green-900">{services.length}</p>
                <p className="text-xs text-green-600 mt-1">
                  Available categories
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Recent Bookings Table */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">Recent Bookings</h2>
                <p className="text-sm text-neutral-600 mt-1">Latest customer bookings and their status</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.location.href = '/admin/bookings'}
              >
                View All Bookings
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <DataTable
              data={recentBookings}
              columns={bookingColumns}
              loading={loading}
              searchable={true}
              exportable={true}
              pagination={false}
              onRowClick={handleBookingAction}
              actions={(row) => (
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              )}
            />
          </div>
        </Card>
      </motion.div>

      {/* Enhanced Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 px-6 py-4 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900">Quick Actions</h3>
            <p className="text-sm text-neutral-600 mt-1">Frequently used admin functions</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4 w-full bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200"
                  onClick={() => window.location.href = '/admin/workers/add'}
                >
                  <Users className="w-5 h-5 mr-3 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium text-blue-900">Add Worker</div>
                    <div className="text-sm text-blue-600">Register new worker</div>
                  </div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4 w-full bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200"
                  onClick={() => window.location.href = '/admin/services'}
                >
                  <Briefcase className="w-5 h-5 mr-3 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium text-green-900">Manage Services</div>
                    <div className="text-sm text-green-600">Add or edit services</div>
                  </div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4 w-full bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:from-yellow-100 hover:to-yellow-200"
                  onClick={() => window.location.href = '/admin/workers/verify'}
                >
                  <CheckCircle className="w-5 h-5 mr-3 text-yellow-600" />
                  <div className="text-left">
                    <div className="font-medium text-yellow-900">Verify Workers</div>
                    <div className="text-sm text-yellow-600">Review pending verifications</div>
                  </div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4 w-full bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200"
                  onClick={() => window.location.href = '/admin/analytics'}
                >
                  <TrendingUp className="w-5 h-5 mr-3 text-purple-600" />
                  <div className="text-left">
                    <div className="font-medium text-purple-900">View Analytics</div>
                    <div className="text-sm text-purple-600">Detailed reports</div>
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Dashboard Refreshes: {refreshCount}
        </div>
      )}
    </AdminLayout>
  );
}