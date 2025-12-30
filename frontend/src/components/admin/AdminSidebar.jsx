import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  Users,
  Wrench,
  Settings,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Dashboard", path: "/admin", icon: BarChart3 },
    { label: "Bookings", path: "/admin/bookings", icon: Calendar },
    { label: "Workers", path: "/admin/workers", icon: Users },
    { label: "Services", path: "/admin/services", icon: Wrench },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <nav className="space-y-2">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
            location.pathname === link.path
              ? "bg-primary-50 text-primary-600 font-medium"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <link.icon className="w-4 h-4" />
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default AdminSidebar;
