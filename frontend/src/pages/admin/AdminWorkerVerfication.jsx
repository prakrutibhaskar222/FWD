import { useEffect, useState } from "react";
import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";
import toast from "react-hot-toast";

const AdminWorkerVerification = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkers = async () => {
    try {
      const res = await api.get("/api/admin/workers/pending");
      setWorkers(res.data.data);
    } catch {
      toast.error("Failed to load workers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await api.put(`/api/admin/workers/${id}/verify`, { action });
      toast.success(`Worker ${action}d`);
      setWorkers((prev) => prev.filter((w) => w._id !== id));
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">
        Pending Worker Verification
      </h2>

      {loading && <p>Loading...</p>}

      {!loading && workers.length === 0 && (
        <p>No pending workers</p>
      )}

      <div className="grid gap-4">
        {workers.map((w) => (
          <div
            key={w._id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{w.name}</h3>
              <p className="text-sm text-gray-600">{w.email}</p>
              <p className="text-sm">Phone: {w.phone || "—"}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleAction(w._id, "approve")}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(w._id, "reject")}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminWorkerVerification;
