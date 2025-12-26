import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkers = async () => {
    try {
      const res = await api.get("/api/admin/workers");
      console.log("Workers API response:", res.data);

      if (res.data?.success && Array.isArray(res.data.data)) {
        setWorkers(res.data.data);
      } else {
        setWorkers([]);
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error("Failed to load workers:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Unauthorized. Please login again.");
      } else {
        setError("Failed to load workers");
      }
    } finally {
      // ✅ THIS IS WHAT STOPS THE SPINNER
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Workers</h2>

        <Link
          to="/admin/workers/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Worker
        </Link>
      </div>

      {loading && <p>Loading workers…</p>}

      {!loading && error && (
        <p className="text-red-600">{error}</p>
      )}

      {!loading && !error && (
        <div className="bg-white shadow rounded">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Username (Email)</th>
                <th className="p-2 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {workers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No workers found
                  </td>
                </tr>
              ) : (
                workers.map((w) => (
                  <tr key={w._id} className="border-b">
                    <td className="p-2">{w.name}</td>
                    <td className="p-2">{w.email}</td>
                    <td className="p-2">{w.phone || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminWorkers;
