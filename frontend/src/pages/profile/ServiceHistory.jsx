import { useEffect, useState } from "react";
import api from "../../api";
import { CheckCircle, History } from "lucide-react";

const ServiceHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/profile/history")
      .then((res) => {
        setHistory(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ================= EMPTY STATE ================= */
  if (!loading && history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <History className="w-12 h-12 text-neutral-300 mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          No completed services yet
        </h2>
        <p className="text-neutral-500 max-w-md">
          Once you complete a service booking, it will appear here
          for future reference.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* ================= HEADER ================= */}
      <h1 className="text-2xl font-bold mb-2">Service History</h1>
      <p className="text-neutral-600 mb-6 max-w-2xl">
        This section shows a record of all services you have completed.
        You can review service details, dates, and time slots for
        reference or future bookings.
      </p>

      {/* ================= HISTORY LIST ================= */}
      <div className="space-y-4">
        {history.map((b) => (
          <div
            key={b._id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Left Content */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  {b.serviceId?.title || "Service"}
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Date: {b.date} • Time Slot: {b.slot}
                </p>
              </div>

              {/* Right Content */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  {b.status || "Completed"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <p className="text-sm text-neutral-500 mt-10 max-w-2xl">
        Note: Service history is maintained for your reference and
        cannot be edited. For invoices related to completed services,
        please visit the Invoices section.
      </p>
    </div>
  );
};

export default ServiceHistory;
