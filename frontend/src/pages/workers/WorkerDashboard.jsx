import { useEffect, useState } from "react";
import api from "../../api";

import TaskList from "../../components/TaskList";
import TimesheetSummary from "../../components/TimesheetSummary";
import WorkerCalendar from "../../components/WorkerCalender";
import Notifications from "../../components/Notifications";
import Loading from "../../components/Loading";

export default function WorkerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [timesheet, setTimesheet] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [clockedIn, setClockedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [taskRes, timeRes, notifRes] = await Promise.all([
        api.get("/workers/tasks"),
        api.get(`/workers/timesheet?start=${today()}&end=${today()}`),
        api.get("/workers/notifications")
      ]);

      setTasks(taskRes.data);
      setTimesheet(timeRes.data);
      setNotifications(notifRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClock = async (type) => {
    await api.post("/workers/attendance", { type });
    setClockedIn(type === "in");
    loadDashboard();
  };

  const updateTaskStatus = async (id, status) => {
    await api.put(`/workers/tasks/${id}`, { status });
    setTasks(tasks =>
      tasks.map(t => (t._id === id ? { ...t, status } : t))
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Worker Dashboard</h1>

        {!clockedIn ? (
          <button onClick={() => handleClock("in")} className="btn-green">
            Clock In
          </button>
        ) : (
          <button onClick={() => handleClock("out")} className="btn-red">
            Clock Out
          </button>
        )}
      </header>

      <TimesheetSummary timesheet={timesheet} />

      <div className="grid md:grid-cols-2 gap-6">
        <TaskList tasks={tasks} onStatusChange={updateTaskStatus} />
        <WorkerCalendar tasks={tasks} />
      </div>

      <Notifications notifications={notifications} />
    </div>
  );
}

const today = () => new Date().toISOString().split("T")[0];
