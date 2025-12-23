import React from "react";

export default function WorkerTaskCard({ task, reload }) {
  const API = "http://localhost:5001";

  const updateStatus = async (status) => {
    await fetch(`${API}/api/bookings/${task._id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    reload();
  };

  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <h2 className="font-bold text-lg">{task.serviceTitle}</h2>
      <p className="text-gray-600">Customer: {task.customerName}</p>
      <p>Date: {task.date}</p>
      <p>Slot: {task.slot}</p>

      <div className="mt-3 flex gap-2">
        {task.status === "pending" && (
          <button
            className="btn bg-blue-500 text-white px-3 py-1"
            onClick={() => updateStatus("in-progress")}
          >
            Start Job
          </button>
        )}

        {task.status === "in-progress" && (
          <button
            className="btn bg-green-500 text-white px-3 py-1"
            onClick={() => updateStatus("completed")}
          >
            Mark Completed
          </button>
        )}
      </div>
    </div>
  );
}
