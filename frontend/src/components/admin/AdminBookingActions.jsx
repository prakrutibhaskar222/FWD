import { useState } from "react";
import { CheckCircle, UserPlus, CreditCard } from "lucide-react";
import api from "../../api";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  "pending",
  "assigned",
  "in-progress",
  "completed",
  "cancelled",
];

const AdminBookingActions = ({ booking, workers, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  /* ================= ASSIGN WORKER ================= */
  const assignWorker = async (workerId) => {
    try {
      setLoading(true);
      const res = await api.patch(
        `/api/admin/bookings/${booking._id}/assign-worker`,
        { workerId }
      );
      toast.success("Worker assigned");
      onUpdate(res.data.data);
    } catch {
      toast.error("Failed to assign worker");
    } finally {
      setLoading(false);
    }
  };

  /* ================= MARK PAYMENT ================= */
  const markPayment = async () => {
    try {
      setLoading(true);
      const res = await api.patch(
        `/api/admin/bookings/${booking._id}/payment`,
        {
          paymentStatus:
            booking.paymentStatus === "paid" ? "pending" : "paid",
        }
      );
      toast.success("Payment updated");
      onUpdate(res.data.data);
    } catch {
      toast.error("Payment update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHANGE STATUS ================= */
  const changeStatus = async (status) => {
    try {
      setLoading(true);
      const res = await api.patch(
        `/api/admin/bookings/${booking._id}/status`,
        { status }
      );
      toast.success("Status updated");
      onUpdate(res.data.data);
    } catch {
      toast.error("Status update failed");
    } finally {
      setLoading(false);
    }
  };

  const isCompleted = booking.status === "completed";

  return (
    <div className="flex flex-wrap gap-3">
      {/* ================= STATUS ================= */}
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-neutral-500" />
        <select
          value={booking.status}
          disabled={isCompleted || loading}
          onChange={(e) => changeStatus(e.target.value)}
          className="border rounded-lg px-2 py-1 text-sm disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("-", " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* ================= PAYMENT ================= */}
      <button
        onClick={markPayment}
        disabled={loading}
        className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm border transition ${
          booking.paymentStatus === "paid"
            ? "bg-green-50 text-green-700 border-green-300"
            : "bg-yellow-50 text-yellow-700 border-yellow-300"
        }`}
      >
        <CreditCard className="w-4 h-4" />
        {booking.paymentStatus === "paid" ? "Paid" : "Mark Paid"}
      </button>

      {/* ================= WORKER ================= */}
      <div className="flex items-center gap-2">
        <UserPlus className="w-4 h-4 text-neutral-500" />
        <select
          disabled={loading}
          value={booking.workerId || ""}
          onChange={(e) => assignWorker(e.target.value)}
          className="border rounded-lg px-2 py-1 text-sm"
        >
          <option value="">Assign Worker</option>
          {workers.map((w) => (
            <option key={w._id} value={w._id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AdminBookingActions;
