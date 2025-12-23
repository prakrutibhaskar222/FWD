import React, { useEffect, useState } from "react";

export default function WorkerCalendar() {
  const API = "http://localhost:5001";
  const workerId = localStorage.getItem("workerId");

  const [days, setDays] = useState([]);

  const fetchCalendar = async () => {
    const res = await fetch(`${API}/api/workers/${workerId}/calendar`);
    const data = await res.json();
    if (data.success) setDays(data.data);
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Calendar</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {days.map((d) => (
          <div key={d.date} className="shadow p-3 rounded bg-white">
            <h2 className="font-semibold">{d.date}</h2>
            <p className="text-gray-600">{d.total} tasks</p>
          </div>
        ))}
      </div>
    </div>
  );
}
