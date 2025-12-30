import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  CheckCircle,
  Star,
  DollarSign,
  ArrowRight,
  AlertCircle,
  MapPin,
  User,
  Briefcase,
  TrendingUp,
  Bell,
  RefreshCw
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Button, Badge, Alert } from "../../components/ui";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";
import toast from "react-hot-toast";

const API = "http://localhost:5001";
export default function  WorkerDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayJobs: 0,
    upcomingJobs: 0,
    completedJobs: 0,
    inProgressJobs: 0,
    todayEarnings: 0,
    weeklyEarnings: 0,
    rating: 0,
    totalReviews: 0
  });
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  // Auto-refresh functionality
  const refreshDashboardData = async (source = 'manual') => {
    console.log(`Worker dashboard refreshed from ${source}`);
    await fetchDashboardData();
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshDashboardData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 2000,
    }
  );

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      
      const [statsRes, scheduleRes, notificationsRes] = await Promise.all([
        fetch(`${API}/api/workers/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API}/api/workers/schedule/today`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API}/api/workers/notifications`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      // Handle stats
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.data || stats);
      }

      // Handle schedule
      if (scheduleRes.ok) {
        const scheduleData = await scheduleRes.json();
        setTodaySchedule(scheduleData.data || []);
      }

      // Handle notifications
      if (notificationsRes.ok) {
        const notificationsData = await notificationsRes.json();
        setNotifications(notificationsData.data?.slice(0, 5) || []);
      }

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, loading }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className={`p-6 bg-gradient-to-br ${
        color === 'blue' ? 'from-blue-50 to-blue-100 border-blue-200' :
        color === 'green' ? 'from-green-50 to-green-100 border-green-200' :
        color === 'yellow' ? 'from-yellow-50 to-yellow-100 border-yellow-200' :
        color === 'purple' ? 'from-purple-50 to-purple-100 border-purple-200' :
        'from-neutral-50 to-neutral-100 border-neutral-200'
      } hover:shadow-lg transition-shadow duration-300`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className={`text-sm font-medium ${
              color === 'blue' ? 'text-blue-700' :
              color === 'green' ? 'text-green-700' :
              color === 'yellow' ? 'text-yellow-700' :
              color === 'purple' ? 'text-purple-700' :
              'text-neutral-700'
            }`}>{title}</p>
            
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-neutral-200 rounded mt-2 w-16"></div>
              </div>
            ) : (
              <p className={`text-3xl font-bold mt-1 ${
                color === 'blue' ? 'text-blue-900' :
                color === 'green' ? 'text-green-900' :
                color === 'yellow' ? 'text-yellow-900' :
                color === 'purple' ? 'text-purple-900' :
                'text-neutral-900'
              }`}>{value}</p>
            )}
            
            {subtitle && (
              <div className="flex items-center space-x-1 mt-1">
                {trend && (
                  <TrendingUp className={`w-3 h-3 ${
                    trend > 0 ? 'text-green-600' : 'text-red-600'
                  }`} />
                )}
                <p className={`text-xs ${
                  color === 'blue' ? 'text-blue-600' :
                  color === 'green' ? 'text-green-600' :
                  color === 'yellow' ? 'text-yellow-600' :
                  color === 'purple' ? 'text-purple-600' :
                  'text-neutral-600'
                }`}>{subtitle}</p>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
            color === 'blue' ? 'bg-blue-500' :
            color === 'green' ? 'bg-green-500' :
            color === 'yellow' ? 'bg-yellow-500' :
            color === 'purple' ? 'bg-purple-500' :
            'bg-neutral-500'
          }`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const ScheduleItem = ({ job, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-neutral-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex-shrink-0">
        <div className={`w-3 h-3 rounded-full ${
          job.status === 'completed' ? 'bg-green-500' :
          job.status === 'in-progress' ? 'bg-blue-500' :
          job.status === 'pending' ? 'bg-yellow-500' :
          'bg-neutral-400'
        }`}></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-neutral-900 truncate">
            {job.serviceTitle}
          </p>
          <Badge 
            variant={
              job.status === 'completed' ? 'success' :
              job.status === 'in-progress' ? 'primary' :
              job.status === 'pending' ? 'warning' :
              'secondary'
            }
            size="sm"
          >
            {job.status}
          </Badge>
        </div>
        <div className="flex items-center space-x-4 mt-1 text-xs text-neutral-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{job.timeSlot}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>{job.customerName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{job.location}</span>
          </div>
        </div>
      </div>
      <Link to={`/worker/jobs/${job._id}`}>
        <Button variant="ghost" size="sm">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </motion.div>
  );

  const NotificationItem = ({ notification, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-3 rounded-lg border-l-4 ${
        notification.type === 'job_assigned' ? 'border-blue-500 bg-blue-50' :
        notification.type === 'job_cancelled' ? 'border-red-500 bg-red-50' :
        notification.type === 'job_rescheduled' ? 'border-yellow-500 bg-yellow-50' :
        'border-neutral-500 bg-neutral-50'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-2 h-2 rounded-full mt-2 ${
          notification.read ? 'bg-neutral-400' : 'bg-blue-500'
        }`}></div>
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-900">
            {notification.title}
          </p>
          <p className="text-xs text-neutral-600 mt-1">
            {notification.message}
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            {new Date(notification.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </motion.div>
  );

  if (error) {
    return (
      <WorkerLayout>
        <div className="flex items-center justify-center h-64">
          <Alert variant="error" className="max-w-md">
            <AlertCircle className="w-4 h-4" />
            <div>
              <p className="font-medium">Error Loading Dashboard</p>
              <p className="text-sm mt-1">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fetchDashboardData()}
                className="mt-2"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </Alert>
        </div>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Refresh Indicator */}
        <AnimatePresence>
          {isRefreshing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">Refreshing dashboard...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}! 👋
              </h1>
              <p className="text-blue-100">
                {stats.todayJobs > 0 
                  ? `You have ${stats.todayJobs} job${stats.todayJobs > 1 ? 's' : ''} scheduled for today`
                  : "No jobs scheduled for today. Enjoy your free time!"
                }
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-xl font-bold">{stats.rating || '4.8'}</span>
                </div>
                <p className="text-sm text-blue-100">{stats.totalReviews || 0} reviews</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">₹{stats.weeklyEarnings || 0}</p>
                <p className="text-sm text-blue-100">This week</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Jobs"
            value={stats.todayJobs}
            subtitle="Active assignments"
            icon={Calendar}
            color="blue"
            loading={loading}
          />
          <StatCard
            title="Upcoming Jobs"
            value={stats.upcomingJobs}
            subtitle="Next 7 days"
            icon={Clock}
            color="yellow"
            loading={loading}
          />
          <StatCard
            title="Completed"
            value={stats.completedJobs}
            subtitle="This month"
            icon={CheckCircle}
            color="green"
            loading={loading}
          />
          <StatCard
            title="In Progress"
            value={stats.inProgressJobs}
            subtitle="Active jobs"
            icon={Briefcase}
            color="purple"
            loading={loading}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Today's Schedule</h2>
                <Link to="/worker/jobs">
                  <Button variant="outline" size="sm">
                    View All Jobs
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-neutral-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : todaySchedule.length > 0 ? (
                <div className="space-y-3">
                  {todaySchedule.map((job, index) => (
                    <ScheduleItem key={job._id} job={job} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No jobs scheduled</h3>
                  <p className="text-neutral-600">Enjoy your free day or check for new assignments!</p>
                </div>
              )}
            </Card>
          </div>

          {/* Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Notifications */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">Recent Alerts</h3>
                <Link to="/worker/notifications">
                  <Button variant="ghost" size="sm">
                    <Bell className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-12 bg-neutral-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <NotificationItem key={notification._id} notification={notification} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-600">No new notifications</p>
                </div>
              )}
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/worker/availability">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-3" />
                    Update Availability
                  </Button>
                </Link>
                <Link to="/worker/schedule">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-3" />
                    View Schedule
                  </Button>
                </Link>
                <Link to="/worker/earnings">
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-3" />
                    View Earnings
                  </Button>
                </Link>
                <Link to="/worker/reviews">
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-3" />
                    My Reviews
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
          <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
            Dashboard Refreshes: {refreshCount}
          </div>
        )}
      </div>
    </WorkerLayout>
  );
} 
