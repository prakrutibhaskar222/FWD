import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Settings,
  Trash2,
  RefreshCw
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Button, Badge } from "../../components/ui";
import toast from "react-hot-toast";

export default function WorkerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [preferences, setPreferences] = useState({
    jobAssigned: true,
    jobCancelled: true,
    jobRescheduled: true,
    paymentReceived: true,
    reviewReceived: true,
    systemUpdates: false
  });

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Mock data
      const mockNotifications = [
        {
          id: 1,
          type: 'job_assigned',
          title: 'New Job Assigned',
          message: 'You have been assigned a new electrical repair job for tomorrow at 10:00 AM.',
          read: false,
          timestamp: new Date().toISOString(),
          actionUrl: '/worker/jobs/1'
        },
        {
          id: 2,
          type: 'job_cancelled',
          title: 'Job Cancelled',
          message: 'The plumbing service job scheduled for today has been cancelled by the customer.',
          read: false,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          actionUrl: '/worker/jobs/2'
        },
        {
          id: 3,
          type: 'payment_received',
          title: 'Payment Received',
          message: 'You have received ₹1,500 for the electrical repair job completed yesterday.',
          read: true,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          actionUrl: '/worker/earnings'
        },
        {
          id: 4,
          type: 'review_received',
          title: 'New Review',
          message: 'John Doe left a 5-star review for your home cleaning service.',
          read: true,
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          actionUrl: '/worker/reviews'
        },
        {
          id: 5,
          type: 'job_rescheduled',
          title: 'Job Rescheduled',
          message: 'Your appliance installation job has been rescheduled to Friday at 2:00 PM.',
          read: true,
          timestamp: new Date(Date.now() - 259200000).toISOString(),
          actionUrl: '/worker/jobs/5'
        }
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'job_assigned':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'job_cancelled':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'job_rescheduled':
        return <Calendar className="w-5 h-5 text-yellow-600" />;
      case 'payment_received':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'review_received':
        return <User className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-neutral-600" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'job_assigned':
        return 'border-blue-200 bg-blue-50';
      case 'job_cancelled':
        return 'border-red-200 bg-red-50';
      case 'job_rescheduled':
        return 'border-yellow-200 bg-yellow-50';
      case 'payment_received':
        return 'border-green-200 bg-green-50';
      case 'review_received':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-neutral-200 bg-neutral-50';
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    toast.success("Marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast.success("Notification deleted");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  const getFilteredNotifications = () => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === filter);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <WorkerLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 bg-neutral-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </WorkerLayout>
    );
  }

  const filteredNotifications = getFilteredNotifications();

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-neutral-900">Notifications</h1>
              {unreadCount > 0 && (
                <Badge variant="primary">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            <p className="text-neutral-600 mt-1">Stay updated with your job alerts and updates</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="job_assigned">Job Assigned</option>
              <option value="job_cancelled">Job Cancelled</option>
              <option value="payment_received">Payments</option>
              <option value="review_received">Reviews</option>
            </select>
            <Button variant="outline" size="sm" onClick={fetchNotifications}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredNotifications.length > 0 ? (
              <AnimatePresence>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-l-4 ${getNotificationColor(notification.type)} ${
                      !notification.read ? 'shadow-md' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-neutral-900">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-neutral-700 text-sm leading-relaxed">
                              {notification.message}
                            </p>
                            <p className="text-xs text-neutral-500 mt-2">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                title="Mark as read"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Delete notification"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {notification.actionUrl && (
                          <div className="mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.location.href = notification.actionUrl}
                            >
                              View Details
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <Card className="p-12 text-center">
                <Bell className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No notifications</h3>
                <p className="text-neutral-600">
                  {filter === 'all' 
                    ? "You're all caught up! No new notifications."
                    : `No ${filter.replace('_', ' ')} notifications found.`
                  }
                </p>
              </Card>
            )}

            {filteredNotifications.length > 0 && (
              <div className="flex justify-center pt-4">
                <Button variant="outline" onClick={clearAll}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Notifications
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notification Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Total</span>
                  <span className="font-medium">{notifications.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Unread</span>
                  <Badge variant="primary" size="sm">{unreadCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Today</span>
                  <span className="font-medium">
                    {notifications.filter(n => {
                      const today = new Date().toDateString();
                      return new Date(n.timestamp).toDateString() === today;
                    }).length}
                  </span>
                </div>
              </div>
            </Card>

            {/* Notification Preferences */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">Preferences</h3>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {Object.entries(preferences).map(([key, enabled]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-neutral-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, [key]: !enabled }))}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        enabled ? 'bg-blue-500' : 'bg-neutral-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        enabled ? 'translate-x-5' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
              
              <Button variant="primary" size="sm" className="w-full mt-4">
                Save Preferences
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-3" />
                  View Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-3" />
                  Check Reviews
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="w-4 h-4 mr-3" />
                  View Earnings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}