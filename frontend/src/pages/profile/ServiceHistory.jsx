import { useEffect, useState } from "react";
import api from "../../api";

const ServiceHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/api/profile/history").then((res) => {
      setHistory(res.data.data || []);
    });
  }, []);

  if (!history.length)
    return <div className="p-6">No completed services yet.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Service History</h1>

      {history.map((b) => (
        <div key={b._id} className="border rounded p-4 mb-3">
          <h2 className="font-semibold">{b.serviceId.title}</h2>
          <p className="text-sm">
            Date: {b.date} | Slot: {b.slot}
          </p>
          <p className="text-sm text-green-600">
            Status: {b.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ServiceHistory;
