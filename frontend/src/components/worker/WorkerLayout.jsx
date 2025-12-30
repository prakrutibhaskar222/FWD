import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Settings,
  ChevronDown,
  Home,
  Calendar,
  Briefcase,
  Clock,
  Star,
  DollarSign,
  HelpCircle
} from "lucide-react";
import { useState, useEffect } from "react";

const WorkerLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(2);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [worker, setWorker] = useState(null);

  // Get worker data
  useEffect(() => {
    const workerData = localStorage.getItem("user");
    if (workerData) {
      try {
        setWorker(JSON.parse(workerData));
      } catch (e) {
        console.error("Error parsing worker data:", e);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleBackToMainSite = () => {
    setShowProfileMenu(false);
    navigate("/");
  };

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/worker/dashboard", active: location.pathname === "/worker/dashboard" },
    { icon: Briefcase, label: "My Jobs", path: "/worker/jobs", active: location.pathname.startsWith("/worker/jobs") },
    { icon: Calendar, label: "Schedule", path: "/worker/schedule", active: location.pathname === "/worker/schedule" },
    { icon: Clock, label: "Availability", path: "/worker/availability", active: location.pathname === "/worker/availability" },
    { icon: Star, label: "Reviews", path: "/worker/reviews", active: location.pathname === "/worker/reviews" },
    { icon: DollarSign, label: "Earnings", path: "/worker/earnings", active: location.pathname === "/worker/earnings" },
    { icon: Bell, label: "Notifications", path: "/worker/notifications", active: location.pathname === "/worker/notifications" },
    { icon: Settings, label: "Profile", path: "/worker/profile", active: location.pathname === "/worker/profile" },
    { icon: HelpCircle, label: "Help", path: "/worker/help", active: location.pathname === "/worker/help" },
  ];

  const profileMenuItems = [
    { icon: User, label: "Profile", path: "/worker/profile" },
    { icon: Settings, label: "Settings", path: "/worker/settings" },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        className="fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-neutral-200 shadow-lg lg:shadow-none lg:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">COOLIE</h2>
                <p className="text-sm text-neutral-500">Worker Panel</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Worker Info */}
          <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{worker?.name || 'Worker'}</p>
                <p className="text-sm text-neutral-600">{worker?.skills?.join(', ') || 'Service Provider'}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-neutral-600">4.8 (127 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    item.active
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.active ? 'text-blue-600' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                  {item.label === "Notifications" && notifications > 0 && (
                    <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-neutral-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-neutral-900">
                  {sidebarItems.find(item => item.active)?.label || 'Dashboard'}
                </h1>
                <p className="text-sm text-neutral-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-neutral-600">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-neutral-600">3 Jobs Today</span>
                </div>
              </div>

              {/* Notifications */}
              <Link to="/worker/notifications">
                <motion.button 
                  className="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-5 h-5 text-neutral-600" />
                  {notifications > 0 && (
                    <motion.span 
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {notifications}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* User Profile Menu */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-neutral-900">{worker?.name || 'Worker'}</p>
                    <p className="text-xs text-blue-600 font-medium">Service Provider</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-large border border-neutral-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-neutral-100">
                        <p className="font-medium text-neutral-900">{worker?.name || 'Worker'}</p>
                        <p className="text-sm text-neutral-500">{worker?.email || 'worker@coolie.com'}</p>
                      </div>
                      
                      {profileMenuItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <motion.div
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-neutral-50 transition-colors duration-200"
                            whileHover={{ x: 4 }}
                          >
                            <item.icon className="w-4 h-4 text-neutral-500" />
                            <span className="text-neutral-700">{item.label}</span>
                          </motion.div>
                        </Link>
                      ))}
                      
                      <div className="border-t border-neutral-100 mt-2 pt-2">
                        <motion.button
                          onClick={handleBackToMainSite}
                          className="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-blue-50 transition-colors duration-200 text-blue-600"
                          whileHover={{ x: 4 }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          <span>Back to Main Site</span>
                        </motion.button>
                        
                        <motion.button
                          onClick={logout}
                          className="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-error-50 transition-colors duration-200 text-error-600"
                          whileHover={{ x: 4 }}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-neutral-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Overlay for profile menu */}
      <AnimatePresence>
        {showProfileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfileMenu(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkerLayout;