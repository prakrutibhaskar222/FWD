import React from "react";

export default function StatusProgress({ status }) {
  const statusMap = {
    pending: { percent: 30, color: "bg-yellow-500" },
    "in-progress": { percent: 60, color: "bg-blue-500" },
    completed: { percent: 100, color: "bg-green-600" },
  };

  const current = statusMap[status] || statusMap.pending;

  return (
    <div className="w-full mt-2">
      <div className="h-2 bg-gray-300 rounded-full">
        <div
          className={`h-2 ${current.color} rounded-full`}
          style={{ width: `${current.percent}%` }}
        ></div>
      </div>

      <p className="text-sm mt-1 font-semibold text-gray-700 capitalize">
        {status}
      </p>
    </div>
  );
}
