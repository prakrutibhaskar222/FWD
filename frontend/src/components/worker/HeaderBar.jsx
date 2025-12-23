import React from "react";
import { FiBell } from "react-icons/fi";

export default function HeaderBar() {
  return (
    <header className="bg-white p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            placeholder="Search..."
            className="border rounded px-3 py-1 text-sm"
          />
        </div>

        <button className="p-2 rounded hover:bg-gray-100">
          <FiBell size={18} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <span className="text-sm">Admin</span>
        </div>
      </div>
    </header>
  );
}
