import { useEffect, useMemo, useState } from "react";
import api from "../../api";
import {
  FileText,
  CheckCircle,
  Download,
  Filter,
} from "lucide-react";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minAmount, setMinAmount] = useState("");
  const [fromDate, setFromDate] = useState("");

  useEffect(() => {
    api
      .get("/api/profile/invoices")
      .then((res) => {
        setInvoices(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ================= DERIVED DATA ================= */
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const amountOk = minAmount
        ? inv.price >= Number(minAmount)
        : true;
      const dateOk = fromDate
        ? new Date(inv.createdAt) >= new Date(fromDate)
        : true;
      return amountOk && dateOk;
    });
  }, [invoices, minAmount, fromDate]);

  const totalSpent = filteredInvoices.reduce(
    (sum, inv) => sum + inv.price,
    0
  );

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        <div className="h-6 w-40 bg-neutral-200 rounded animate-pulse" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 bg-neutral-200 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* ================= EMPTY STATE ================= */
  if (!filteredInvoices.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <FileText className="w-12 h-12 text-neutral-300 mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          No invoices found
        </h2>
        <p className="text-neutral-500 max-w-md">
          Your completed service invoices will appear here once
          payments are processed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ================= HEADER ================= */}
      <h1 className="text-2xl font-bold mb-2">My Invoices</h1>
      <p className="text-neutral-600 mb-6 max-w-2xl">
        This section contains a record of all your completed
        service payments. You can filter invoices, view payment
        details, and download invoices for your reference.
      </p>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-neutral-500">Total Invoices</p>
          <p className="text-2xl font-bold">
            {filteredInvoices.length}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-neutral-500">Total Spent</p>
          <p className="text-2xl font-bold text-primary-600">
            ₹{totalSpent}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-neutral-500">Payment Status</p>
          <p className="text-2xl font-bold text-green-600">
            All Paid
          </p>
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-500" />
          <span className="text-sm font-medium text-neutral-700">
            Filters
          </span>
        </div>

        <input
          type="number"
          placeholder="Min amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* ================= INVOICE LIST ================= */}
      <div className="space-y-4">
        {filteredInvoices.map((inv) => (
          <div
            key={inv._id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Left */}
              <div>
                <h3 className="text-lg font-semibold">
                  {inv.serviceTitle}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Invoice Date:{" "}
                  {new Date(inv.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-neutral-500">
                    Amount Paid
                  </p>
                  <p className="text-xl font-bold">
                    ₹{inv.price}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Paid
                </span>

                {/* Download (UI ready) */}
                <button
                  className="p-2 rounded-lg border hover:bg-neutral-50"
                  title="Download Invoice"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= FOOTER TEXT ================= */}
      <p className="text-sm text-neutral-500 mt-8 max-w-2xl">
        Note: Invoices are generated automatically after a
        service is completed and payment is confirmed. You may
        download invoices for personal records or reimbursement
        purposes.
      </p>
    </div>
  );
};

export default Invoices;
