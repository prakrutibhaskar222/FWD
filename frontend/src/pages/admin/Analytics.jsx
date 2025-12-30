import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  DollarSign,
  Briefcase,
  Clock,
  Star,
  Download,
  RefreshCw,
  Filter
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";
import { Button, Card, Badge } from "../../components/ui";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";
import toast from "react-hot-toast";

const API = "http://localhost:5001";

export default function Analytics() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30d");

  // Auto-refresh functionality
  const refreshAnalyticsData = async (source = 'manual') => {
    console.log(`Analytics refreshed from ${source}`);
    await fetchAllData();
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshAnalyticsData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 3000,
    }
  );

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, servicesRes, workersRes] = await Promise.all([
        fetch(`${API}/api/bookings`),
        fetch(`${API}/api/services`),
        fetch(`${API}/api/workers`)
      ]);

      const [bookingsData, servicesData, workersData] = await Promise.all([
        bookingsRes.json(),
        servicesRes.json(),
        workersRes.json()
      ]);

      if (bookingsData.success) setBookings(bookingsData.data || []);
      if (servicesData.success) setServices(servicesData.data || []);
      if (workersData.success) setWorkers(workersData.data || []);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Calculate comprehensive analytics
  const analytics = useMemo(() => {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    // Filter bookings by date range
    const recentBookings = bookings.filter(b => new Date(b.createdAt) >= last30Days);
    const weeklyBookings = bookings.filter(b => new Date(b.createdAt) >= last7Days);
    const previousMonthBookings = bookings.filter(b => {
      const date = new Date(b.createdAt);
      return date >= lastMonth && date < last30Days;
    });

    // Revenue calculations
    const totalRevenue = recentBookings
      .filter(b => b.status === "completed" && b.paid)
      .reduce((sum, b) => sum + (b.price || 0), 0);

    const previousRevenue = previousMonthBookings
      .filter(b => b.status === "completed" && b.paid)
      .reduce((sum, b) => sum + (b.price || 0), 0);

    const revenueGrowth = previousRevenue > 0 
      ? ((totalRevenue - previousRevenue) / previousRevenue * 100).toFixed(1)
      : "0";

    // Booking statistics
    const totalBookings = recentBookings.length;
    const completedBookings = recentBookings.filter(b => b.status === "completed").length;
    const cancelledBookings = recentBookings.filter(b => b.status === "cancelled").length;
    const pendingBookings = recentBookings.filter(b => b.status === "pending").length;

    const completionRate = totalBookings > 0 ? (completedBookings / totalBookings * 100).toFixed(1) : "0";
    const cancellationRate = totalBookings > 0 ? (cancelledBookings / totalBookings * 100).toFixed(1) : "0";

    // Service performance
    const serviceStats = services.map(service => {
      const serviceBookings = recentBookings.filter(b => b.serviceId === service._id);
      const serviceRevenue = serviceBookings
        .filter(b => b.status === "completed" && b.paid)
        .reduce((sum, b) => sum + (b.price || 0), 0);
      
      return {
        id: service._id,
        name: service.title,
        bookings: serviceBookings.length,
        revenue: serviceRevenue,
        completionRate: serviceBookings.length > 0 
          ? (serviceBookings.filter(b => b.status === "completed").length / serviceBookings.length * 100).toFixed(1)
          : "0"
      };
    }).sort((a, b) => b.revenue - a.revenue);

    // Worker performance
    const workerStats = workers.map(worker => {
      const workerBookings = recentBookings.filter(b => b.workerAssigned === worker.name);
      const workerRevenue = workerBookings
        .filter(b => b.status === "completed" && b.paid)
        .reduce((sum, b) => sum + (b.price || 0), 0);

      return {
        id: worker._id,
        name: worker.name,
        bookings: workerBookings.length,
        revenue: workerRevenue,
        completionRate: workerBookings.length > 0 
          ? (workerBookings.filter(b => b.status === "completed").length / workerBookings.length * 100).toFixed(1)
          : "0"
      };
    }).sort((a, b) => b.revenue - a.revenue);

    // Daily booking trends
    const dailyTrends = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const dayBookings = bookings.filter(b => b.createdAt.split('T')[0] === dateStr);
      
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        bookings: dayBookings.length,
        revenue: dayBookings
          .filter(b => b.status === "completed" && b.paid)
          .reduce((sum, b) => sum + (b.price || 0), 0)
      };
    });

    // Average metrics
    const avgBookingValue = completedBookings > 0 
      ? (totalRevenue / completedBookings).toFixed(0)
      : "0";

    const avgResponseTime = "2.5"; // Mock data - would calculate from actual response times
    const customerSatisfaction = "4.8"; // Mock data - would calculate from ratings

    return {
      totalRevenue,
      revenueGrowth: parseFloat(revenueGrowth),
      totalBookings,
      completedBookings,
      cancelledBookings,
      pendingBookings,
      completionRate: parseFloat(completionRate),
      cancellationRate: parseFloat(cancellationRate),
      serviceStats: serviceStats.slice(0, 10),
      workerStats: workerStats.slice(0, 10),
      dailyTrends,
      avgBookingValue: parseFloat(avgBookingValue),
      avgResponseTime: parseFloat(avgResponseTime),
      customerSatisfaction: parseFloat(customerSatisfaction)
    };
  }, [bookings, services, workers]);

  const exportAnalytics = () => {
    const csvData = [
      ["Metric", "Value"],
      ["Total Revenue (30 days)", `₹${analytics.totalRevenue}`],
      ["Revenue Growth", `${analytics.revenueGrowth}%`],
      ["Total Bookings", analytics.totalBookings],
      ["Completion Rate", `${analytics.completionRate}%`],
      ["Cancellation Rate", `${analytics.cancellationRate}%`],
      ["Average Booking Value", `₹${analytics.avgBookingValue}`],
      ["Customer Satisfaction", `${analytics.customerSatisfaction}/5`],
      ["", ""],
      ["Top Services", ""],
      ...analytics.serviceStats.slice(0, 5).map(s => [s.name, `₹${s.revenue}`]),
      ["", ""],
      ["Top Workers", ""],
      ...analytics.workerStats.slice(0, 5).map(w => [w.name, `₹${w.revenue}`])
    ];

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Analytics</h1>
          <p className="text-neutral-600 mt-1">Comprehensive insights into your business performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={exportAnalytics}
            autoRefresh={true}
            refreshDelay={1000}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => refreshAnalyticsData('manual')}
            disabled={isRefreshing}
            autoRefresh={true}
            refreshDelay={1500}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Revenue (30d)"
          value={`₹${analytics.totalRevenue.toLocaleString()}`}
          change={`${analytics.revenueGrowth > 0 ? '+' : ''}${analytics.revenueGrowth}% vs last month`}
          changeType={analytics.revenueGrowth >= 0 ? "positive" : "negative"}
          icon={<DollarSign className="w-6 h-6" />}
          color="success"
          loading={loading}
        />
        
        <StatsCard
          title="Completion Rate"
          value={`${analytics.completionRate}%`}
          change={`${analytics.completedBookings} completed`}
          changeType="positive"
          icon={<TrendingUp className="w-6 h-6" />}
          color="primary"
          loading={loading}
        />
        
        <StatsCard
          title="Avg Booking Value"
          value={`₹${analytics.avgBookingValue}`}
          change="Per completed booking"
          changeType="positive"
          icon={<Briefcase className="w-6 h-6" />}
          color="info"
          loading={loading}
        />
        
        <StatsCard
          title="Customer Satisfaction"
          value={`${analytics.customerSatisfaction}/5`}
          change="Average rating"
          changeType="positive"
          icon={<Star className="w-6 h-6" />}
          color="warning"
          loading={loading}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Cancellation Rate</p>
              <p className="text-2xl font-bold text-red-600">{analytics.cancellationRate}%</p>
              <p className="text-sm text-neutral-500">{analytics.cancelledBookings} cancelled</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-blue-600">{analytics.avgResponseTime}h</p>
              <p className="text-sm text-neutral-500">Time to assignment</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Pending Bookings</p>
              <p className="text-2xl font-bold text-yellow-600">{analytics.pendingBookings}</p>
              <p className="text-sm text-neutral-500">Awaiting assignment</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Services */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Top Services (30 days)</h3>
            <Badge variant="primary">Revenue</Badge>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 bg-neutral-200 rounded animate-pulse flex-1 mr-4"></div>
                  <div className="h-4 bg-neutral-200 rounded animate-pulse w-16"></div>
                </div>
              ))
            ) : (
              analytics.serviceStats.slice(0, 8).map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{service.name}</p>
                      <p className="text-sm text-neutral-500">{service.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">₹{service.revenue.toLocaleString()}</p>
                    <p className="text-sm text-neutral-500">{service.completionRate}% completion</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </Card>

        {/* Top Workers */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Top Workers (30 days)</h3>
            <Badge variant="success">Performance</Badge>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 bg-neutral-200 rounded animate-pulse flex-1 mr-4"></div>
                  <div className="h-4 bg-neutral-200 rounded animate-pulse w-16"></div>
                </div>
              ))
            ) : (
              analytics.workerStats.slice(0, 8).map((worker, index) => (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{worker.name}</p>
                      <p className="text-sm text-neutral-500">{worker.bookings} jobs</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">₹{worker.revenue.toLocaleString()}</p>
                    <p className="text-sm text-neutral-500">{worker.completionRate}% completion</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Daily Trends */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">Daily Booking Trends (30 days)</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="primary">Bookings</Badge>
            <Badge variant="success">Revenue</Badge>
          </div>
        </div>
        
        {loading ? (
          <div className="h-64 bg-neutral-200 rounded animate-pulse"></div>
        ) : (
          <div className="h-64 flex items-end space-x-1">
            {analytics.dailyTrends.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary-200 rounded-t"
                  style={{ 
                    height: `${Math.max(4, (day.bookings / Math.max(...analytics.dailyTrends.map(d => d.bookings))) * 200)}px` 
                  }}
                ></div>
                <div className="text-xs text-neutral-500 mt-2 transform -rotate-45 origin-left">
                  {day.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Analytics Refreshes: {refreshCount}
        </div>
      )}
    </AdminLayout>
  );
}