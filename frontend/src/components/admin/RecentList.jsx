import React from "react";

export default function RecentList({ items = [] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-3">Recent Bookings</h3>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it._id} className="flex justify-between items-start">
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-gray-500">{it.service}</div>
            </div>
            <div className="text-sm text-gray-500">{new Date(it.createdAt).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
