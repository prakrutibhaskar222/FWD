import { useEffect, useState } from "react";
import api from "../../api.js";
 
export default function WorkerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [clockedIn, setClockedIn] = useState(false);
  const [timesheet, setTimesheet] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [taskRes, statusRes, timeRes] = await Promise.all([
        api.get("/workers/tasks"),
        api.get("/workers/attendance/status"),
        api.get(`/workers/attendance/timesheet?start=${today()}&end=${today()}`)
      ]);

      setTasks(taskRes.data);
      setClockedIn(statusRes.data.clockedIn);
      setTimesheet(timeRes.data.timesheet);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };
 
  const handleClock = async (type) => {
    try {
      await api.post("/workers/attendance/clock", { type });
      setClockedIn(type === "in");
    } catch {
      alert("Clock action failed");
    }
  };
 
  const updateTaskStatus = async (id, status) => {
    try {
      await api.put(`/workers/tasks/${id}/status`, { status });
      setTasks(tasks.map(t => t._id === id ? { ...t, status } : t));
    } catch {
      alert("Failed to update task");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Worker Dashboard</h1>

        <div className="flex gap-2">
          {!clockedIn ? (
            <button onClick={() => handleClock("in")} className="btn-green">
              Clock In
            </button>
          ) : (
            <button onClick={() => handleClock("out")} className="btn-red">
              Clock Out
            </button>
          )}
        </div>
      </header>

      {/* TIMESHEET SUMMARY */}
      <TimesheetSummary timesheet={timesheet} />

      {/* TASK LIST */}
      <TaskList tasks={tasks} onStatusChange={updateTaskStatus} />
    </div>
  );
}
 

function TimesheetSummary({ timesheet }) {
  if (!timesheet) return null;

  const minutes = timesheet.summary.totalMinutes;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Today’s Timesheet</h2>
      <p className="text-lg">{hours}h {mins}m worked</p>
    </div>
  );
}

function TaskList({ tasks, onStatusChange }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-4">Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned</p>
      ) : (
        <ul className="divide-y">
          {tasks.map(task => (
            <li key={task._id} className="py-3 flex flex-col sm:flex-row sm:justify-between gap-2">
              <div>
                <p className="font-medium">{task.serviceTitle}</p>
                <p className="text-sm text-gray-500">{task.date} • {task.slot}</p>
              </div>

              <div className="flex gap-2">
                {task.status !== "completed" && (
                  <button
                    onClick={() => onStatusChange(task._id, nextStatus(task.status))}
                    className="btn-blue"
                  >
                    {task.status === "pending" ? "Start" : "Complete"}
                  </button>
                )}
                <StatusBadge status={task.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: "bg-gray-200 text-gray-700",
    "in-progress": "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${map[status]}`}>
      {status}
    </span>
  );
}

function Loading() {
  return (
    <div className="h-screen flex items-center justify-center text-gray-500">
      Loading dashboard...
    </div>
  );
}
 

const today = () => new Date().toISOString().split("T")[0];

const nextStatus = (status) => {
  if (status === "pending") return "in-progress";
  if (status === "in-progress") return "completed";
  return status;
};
