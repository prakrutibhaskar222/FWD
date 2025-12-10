import React, { useEffect, useState } from "react";
import WorkerTaskCard from "../../components/WorkerTaskCard";

export default function WorkerTasks() {
  const workerId = localStorage.getItem("workerId");
  const API = "http://localhost:5001";

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch(`${API}/api/workers/${workerId}/tasks`);
    const data = await res.json();
    if (data.success) setTasks(data.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {tasks.length === 0 ? <p>No tasks assigned.</p> : null}

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((t) => (
          <WorkerTaskCard key={t._id} task={t} reload={fetchTasks} />
        ))}
      </div>
    </div>
  );
}
