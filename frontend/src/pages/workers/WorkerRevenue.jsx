import React, { useEffect, useState } from "react";

export default function WorkerRevenue() {
  const API = "http://localhost:5001";
  const workerId = localStorage.getItem("workerId");

  const [revenue, setRevenue] = useState([]);

  const fetchRevenue = async () => {
    const res = await fetch(`${API}/api/workers/${workerId}/revenue`);
    const data = await res.json();
    if (data.success) setRevenue(data.data);
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Revenue</h1>

      {revenue.map((r) => (
        <div key={r._id} className="shadow p-4 mb-3 rounded bg-white">
          <h2 className="font-bold">{r.serviceTitle}</h2>
          <p>Date: {r.date}</p>
          <p>Earnings: ₹{r.earning}</p>
        </div>
      ))}
    </div>
  );
}
