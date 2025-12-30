import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, User, Settings, LogOut, Heart, History, FileText, Bell, Shield, BarChart3, Users, Wrench, Calendar, Bookmark } from "lucide-react";
import { Button, Badge } from "./ui";
import ThemeToggle from "./ThemeToggle";
import api from "../api.js";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ================= AUTH STATE ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }

    // Check admin status if logged in
    if (token) {
      api.get("/api/auth/me")
        .then(res => {
          setIsAdmin(res.data.user.role === "admin");
          // Fetch notifications for logged in users
          fetchNotifications();
        })
        .catch(err => {
          console.error("Auth check failed:", err);
        });
    }
  }, []);

  /* ================= NOTIFICATIONS ================= */
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get("/api/notifications");
      if (response.data.success) {
        const notifs = response.data.data || [];
        setNotifications(notifs);
        setUnreadCount(notifs.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // Mock notifications for demo
      const mockNotifications = [
        {
          id: 1,
          title: "Service Booking Confirmed",
          message: "Your electrical repair service has been confirmed for tomorrow at 10:00 AM",
          type: "booking",
          read: false,
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          title: "Payment Successful",
          message: "Payment of ₹1,500 has been processed successfully",
          type: "payment",
          read: false,
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 3,
          title: "Service Completed",
          message: "Your home cleaning service has been completed. Please rate your experience",
          type: "service",
          read: true,
          timestamp: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await api.patch(`/api/notifications/${notificationId}/read`);
      
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
      // Mock update for demo
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await api.patch("/api/notifications/mark-all-read");
      
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      // Mock update for demo
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
    setShowProfileMenu(false);
    setShowAdminMenu(false);
    navigate("/login");
  };

  /* ================= SEARCH ================= */
 
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        setSearchLoading(true);

        // 🔹 USING EXISTING API
        const res = await api.get("/api/services");

        if (res.data?.success) {
          const filtered = res.data.data
            .filter(service =>
              service.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .slice(0, 5);

          setSuggestions(filtered);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Search failed:", err);
        setSuggestions([]);
      } finally {
        setSearchLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[activeIndex];
      navigate(`/service/${selected._id}`);
      setSearchTerm("");
      setSuggestions([]);
      setIsSearchFocused(false);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
      setIsSearchFocused(false);
    }
  };


  const resetSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setActiveIndex(-1);
    setIsSearchFocused(false);
  };

  const handleSuggestionClick = (service) => {
  navigate(`/service/${service._id}`);
  resetSearch();
};


  const navLinks = [
    { name: "Electrical", path: "/electrical", icon: "⚡" },
    { name: "Installation", path: "/installation", icon: "🔧" },
    { name: "Personal", path: "/personal", icon: "👤" },
    { name: "Home Services", path: "/homeservices", icon: "🏠" },
    { name: "Renovation", path: "/renovation", icon: "🎨" },
  ];

  const profileMenuItems = [
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Heart, label: "Favorites", path: "/profile/favorites" },
    { icon: History, label: "History", path: "/profile/history" },
    { icon: FileText, label: "Invoices", path: "/profile/invoices" },
  ];

  const adminMenuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/admin/" },
    { icon: Calendar, label: "Bookings", path: "/admin/bookings" },
    { icon: Users, label: "Workers", path: "/admin/workers" },
    { icon: Wrench, label: "Services", path: "/admin/services" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <>
      <motion.nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 shadow-medium' 
            : 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-100 dark:border-neutral-800 shadow-soft'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/home" className="flex items-center space-x-2 group">
              <motion.div 
                className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-white font-bold text-lg">C</span>
              </motion.div>
              <motion.span 
                className="font-display font-bold text-xl text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                COOLIE
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group"
                >
                  <motion.div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      location.pathname === link.path 
                        ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </motion.div>
                  
                  {/* Active indicator */}
                  {location.pathname === link.path && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary-600 rounded-full"
                      layoutId="activeTab"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ x: '-50%' }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* SEARCH */}
        <div className="relative w-full max-w-md mx-6 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
            placeholder="Search services..."
            className="w-full pl-9 pr-9 py-2 border rounded-lg"
          />

          {/* Loader */}
          {searchLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
          )}

          {/* Suggestions */}
          <AnimatePresence>
            {isSearchFocused && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-50"
              >
                {suggestions.map((service, index) => (
                  <div
                    key={service._id}
                    onMouseDown={() => handleSuggestionClick(service)}
                    className={`px-4 py-3 cursor-pointer ${
                      index === activeIndex
                        ? "bg-primary-50"
                        : "hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{service.title}</p>
                        <p className="text-sm text-neutral-500">
                          {service.category}
                        </p>
                      </div>
                      <Badge>₹{service.price}</Badge>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {/* Admin Menu - Only show for admin users */}
                  {isAdmin && (
                    <div className="relative">
                      <motion.button
                        onClick={() => setShowAdminMenu(!showAdminMenu)}
                        className="flex items-center space-x-2 p-2 rounded-xl hover:bg-primary-50 transition-colors duration-200 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="hidden sm:block font-medium text-primary-600 group-hover:text-primary-700">
                          Admin
                        </span>
                      </motion.button>

                      {/* Admin Dropdown */}
                      <AnimatePresence>
                        {showAdminMenu && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-large border border-neutral-200 py-2 z-50"
                          >
                            <div className="px-4 py-3 border-b border-neutral-100">
                              <div className="flex items-center space-x-2">
                                <Shield className="w-4 h-4 text-primary-600" />
                                <p className="font-medium text-neutral-900">Admin Panel</p>
                              </div>
                              <p className="text-sm text-neutral-500">Manage your platform</p>
                            </div>
                            
                            {adminMenuItems.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setShowAdminMenu(false)}
                              >
                                <motion.div
                                  className="flex items-center space-x-3 px-4 py-3 hover:bg-primary-50 transition-colors duration-200 group"
                                  whileHover={{ x: 4 }}
                                >
                                  <item.icon className="w-4 h-4 text-neutral-500 group-hover:text-primary-600" />
                                  <span className="text-neutral-700 group-hover:text-primary-700">{item.label}</span>
                                </motion.div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Notifications */}
                  <div className="relative">
                    <motion.button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bell className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                      {unreadCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                        >
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </motion.span>
                      )}
                    </motion.button>

                    {/* Notifications Dropdown */}
                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 rounded-xl shadow-large border border-neutral-200 dark:border-neutral-600 max-h-96 overflow-hidden z-50"
                        >
                          <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-600 flex items-center justify-between">
                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Notifications</h3>
                            {unreadCount > 0 && (
                              <button
                                onClick={markAllAsRead}
                                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                              >
                                Mark all read
                              </button>
                            )}
                          </div>
                          
                          <div className="max-h-80 overflow-y-auto">
                            {notifications.length === 0 ? (
                              <div className="px-4 py-8 text-center">
                                <Bell className="w-8 h-8 text-neutral-300 dark:text-neutral-600 mx-auto mb-2" />
                                <p className="text-neutral-500 dark:text-neutral-400">No notifications yet</p>
                              </div>
                            ) : (
                              notifications.map((notification) => (
                                <motion.div
                                  key={notification.id}
                                  className={`px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 cursor-pointer transition-colors duration-200 ${
                                    !notification.read 
                                      ? 'bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30' 
                                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                  }`}
                                  onClick={() => markAsRead(notification.id)}
                                  whileHover={{ x: 4 }}
                                >
                                  <div className="flex items-start space-x-3">
                                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                      !notification.read ? 'bg-primary-500' : 'bg-transparent'
                                    }`} />
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                                        {notification.title}
                                      </p>
                                      <p className="text-neutral-600 dark:text-neutral-400 text-xs mt-1 line-clamp-2">
                                        {notification.message}
                                      </p>
                                      <p className="text-neutral-400 dark:text-neutral-500 text-xs mt-1">
                                        {new Date(notification.timestamp).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              ))
                            )}
                          </div>
                          
                          {notifications.length > 0 && (
                            <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-600">
                              <Link 
                                to="/notifications" 
                                onClick={() => setShowNotifications(false)}
                                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                              >
                                View all notifications →
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile Menu */}
                  <div className="relative">
                    <motion.button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-neutral-100 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="hidden sm:block font-medium text-neutral-700">
                        {user?.name || 'User'}
                      </span>
                    </motion.button>

                    {/* Enhanced Profile Dropdown */}
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
                            <p className="font-medium text-neutral-900">{user?.name}</p>
                            <p className="text-sm text-neutral-500">{user?.email}</p>
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
                              onClick={handleLogout}
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
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {showMobileMenu ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-neutral-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-neutral-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden border-t border-neutral-200 bg-white"
            >
              <div className="container-custom py-4 space-y-4">
                {/* Mobile Search */}
                <div className="md:hidden relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white"
                  />
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <motion.div
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                          location.pathname === link.path
                            ? 'bg-primary-50 text-primary-600 font-medium'
                            : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span>{link.name}</span>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Mobile Admin Menu - Only show for admin users */}
                {isAdmin && (
                  <div className="space-y-2 pt-4 border-t border-neutral-200">
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-primary-600" />
                        <span className="font-medium text-primary-600">Admin Panel</span>
                      </div>
                    </div>
                    {adminMenuItems.map((item, index) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <motion.div
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                            location.pathname === item.path
                              ? 'bg-primary-50 text-primary-600 font-medium'
                              : 'text-neutral-700 hover:bg-primary-50'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navLinks.length + index) * 0.1 }}
                          whileHover={{ x: 4 }}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileMenu(false)}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

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

      {/* Overlay for admin menu */}
      <AnimatePresence>
        {showAdminMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAdminMenu(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;