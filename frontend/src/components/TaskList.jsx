import { api } from "../api";
import { useEffect, useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/workers/tasks").then(res => setTasks(res.data));
  }, []);

  return (
    <ul>
      {tasks.map(t => (
        <li key={t._id}>
          {t.title} — {t.status}
        </li>
      ))}
    </ul>
  );
}
