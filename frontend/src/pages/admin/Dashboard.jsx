import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../api";
import toast from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";


const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
  </div>
);

const exportCSV = () => {
  const rows = data.recentBookings.map((b) => ({
    Customer: b.customerName,
    Service: b.serviceId?.title || "",
    Status: b.status,
    Amount: b.price || 0,
    Date: new Date(b.createdAt).toLocaleDateString()
  }));

  const csv =
    Object.keys(rows[0]).join(",") +
    "\n" +
    rows.map((r) => Object.values(r).join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "bookings_report.csv";
  link.click();
};


const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/admin/overview")
      .then((res) => setData(res.data.data))
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <AdminLayout><p>Loading dashboard…</p></AdminLayout>;
  if (!data) return null;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="flex flex-wrap gap-3 mb-6">

      <a href="/admin/workers/verify" className="btn bg-blue-600 text-white">
        Verify Workers
      </a>

      <a href="/admin/bookings" className="btn bg-gray-800 text-white">
        View Bookings
      </a>

      <a href="/admin/workers" className="btn bg-green-600 text-white">
        Manage Workers
      </a>

      <a href="/admin/services" className="btn bg-purple-600 text-white">
        Manage Services
      </a>
    </div>

      <button
        onClick={exportCSV}
        className="btn bg-black text-white mb-4"
      >
        Export Bookings CSV
      </button>



      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={data.users} />
        <StatCard title="Total Workers" value={data.workers} />
        <StatCard title="Pending Verifications" value={data.pendingWorkers} />
        <StatCard title="Total Revenue (₹)" value={data.revenue} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
  <div className="bg-white p-4 rounded shadow h-72">
    <h3 className="font-semibold mb-2">Bookings (Last 7 Days)</h3>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.charts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id.day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="bookings" stroke="#2563eb" />
      </LineChart>
    </ResponsiveContainer>
  </div>

      <div className="bg-white p-4 rounded shadow h-72">
        <h3 className="font-semibold mb-2">Revenue (₹)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.charts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id.day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#16a34a" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>


      {/* BOOKINGS STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Bookings" value={data.bookings.total} />
        <StatCard title="Completed Bookings" value={data.bookings.completed} />
        <StatCard title="Active / Pending" value={data.bookings.pending} />
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

        {data.recentBookings.length === 0 && (
          <p className="text-sm text-gray-500">No recent bookings</p>
        )}

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Service</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.recentBookings.map((b) => (
              <tr key={b._id} className="border-b">
                <td className="p-2">{b.customerName}</td>
                <td className="p-2">
                  {b.serviceId?.title || "—"}
                </td>
                <td className="p-2 capitalize">{b.status}</td>
                <td className="p-2">₹{b.price || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded shadow p-4 mt-8">
        <h2 className="text-lg font-semibold mb-4">
          Top Performing Workers
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Rating</th>
              <th className="text-left p-2">Earnings (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.topWorkers.map((w) => (
              <tr key={w._id} className="border-b">
                <td className="p-2">{w.name}</td>
                <td className="p-2">{w.rating.toFixed(1)}</td>
                <td className="p-2">₹{w.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;
