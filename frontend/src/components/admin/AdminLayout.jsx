import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User,
  Settings,
  Heart,
  History,
  FileText,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";

import AdminSidebar from "./AdminSidebar";
import QuickActions from "./QuickActions";
import AdminFAB from "./AdminFAB";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(3); // mock count
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(null);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
  if (window.innerWidth >= 1024) {
    setSidebarOpen(true);
  }
}, []);


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const profileMenuItems = [
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Heart, label: "Favorites", path: "/profile/favorites" },
    { icon: History, label: "History", path: "/profile/history" },
    { icon: FileText, label: "Invoices", path: "/profile/invoices" },
    { icon: Settings, label: "Admin Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : "-100%",
        }}
        className="
          fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-neutral-200
          lg:static lg:translate-x-0 lg:z-auto
        "
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold">COOLIE</h2>
              <p className="text-sm text-neutral-500">Admin Panel</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2"
            >
              <X />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-6 border-b">
            <QuickActions />
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <AdminSidebar />
          </div>
        </div>
      </motion.aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b px-6 py-4 flex justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2"
            >
              <Menu />
            </button>

            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                placeholder="Search admin..."
                className="pl-9 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2">
              <Bell />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-2 border rounded-xl"
              >
                <User />
                <ChevronDown />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow z-50"
                  >
                    <div className="px-4 py-3 border-b">
                      <p className="font-medium">{user?.name || "Admin"}</p>
                      <p className="text-sm text-neutral-500">
                        {user?.email || "admin@coolie.com"}
                      </p>
                    </div>

                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    ))}

                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        <AdminFAB />
      </div>
    </div>
  );
};

export default AdminLayout;
