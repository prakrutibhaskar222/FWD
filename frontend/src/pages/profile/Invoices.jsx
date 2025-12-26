import { useEffect, useState } from "react";
import api from "../../api";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.get("/api/profile/invoices").then((res) => {
      setInvoices(res.data.data || []);
    });
  }, []);

  if (!invoices.length)
    return <div className="p-6">No invoices available.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>

      {invoices.map((inv) => (
        <div key={inv._id} className="border rounded p-4 mb-3">
          <p><b>Service:</b> {inv.serviceTitle}</p>
          <p><b>Amount:</b> ₹{inv.price}</p>
          <p className="text-green-600">Paid</p>
          <p className="text-sm text-gray-500">
            {new Date(inv.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Invoices;
