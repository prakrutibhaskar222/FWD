import React from "react";

export default function StatCard({ title, value, delta, children }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
        <div className="text-sm text-gray-500">{delta}</div>
      </div>
      {children}
    </div>
  );
}
