import React from "react";
import { Link } from "react-router";
import { FaTachometerAlt, FaClipboardList, FaCogs, FaUsers } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-6">
        <div className="text-2xl font-bold mb-6">COOLIE Admin</div>

        <nav className="space-y-2">
          <Link to="/admin" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FaTachometerAlt /> <span>Dashboard</span>
          </Link>

          <Link to="/admin/bookings" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FaClipboardList /> <span>Bookings</span>
          </Link>

          <Link to="/admin/services" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FaCogs /> <span>Services</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
