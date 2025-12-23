import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WorkerDashboard() {
  const API = "http://localhost:5001";
  const workerId = localStorage.getItem("workerId");

  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    revenue: 0,
    todayTasks: 0,
  });

  const fetchStats = async () => {
    const res = await fetch(`${API}/api/workers/${workerId}/stats`);
    const data = await res.json();
    if (data.success) setStats(data.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Worker Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Pending Tasks" value={stats.pending} />
        <StatCard title="Completed Tasks" value={stats.completed} />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} />
        <StatCard title="Today’s Tasks" value={stats.todayTasks} />
      </div>

      <div className="mt-6 flex gap-4">
        <Link to="/worker/tasks" className="btn bg-blue-500 text-white px-4 py-2">
          View All Tasks
        </Link>
        <Link to="/worker/revenue" className="btn bg-green-500 text-white px-4 py-2">
          Revenue
        </Link>
        <Link to="/worker/calendar" className="btn bg-purple-500 text-white px-4 py-2">
          Calendar
        </Link>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="shadow p-4 rounded-xl bg-white">
      <h2 className="text-md font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
