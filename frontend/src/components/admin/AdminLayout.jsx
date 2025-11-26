import React from "react";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
