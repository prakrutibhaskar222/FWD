export default function TaskList({ tasks, onStatusChange }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned</p>
      ) : (
        <ul className="divide-y">
          {tasks.map(task => (
            <li key={task._id} className="py-3 flex justify-between">
              <div>
                <p className="font-medium">{task.serviceTitle}</p>
                <p className="text-sm text-gray-500">
                  {task.date} • {task.slot}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {task.status !== "completed" && (
                  <button
                    className="btn-blue"
                    onClick={() =>
                      onStatusChange(task._id, nextStatus(task.status))
                    }
                  >
                    {task.status === "pending" ? "Start" : "Complete"}
                  </button>
                )}
                <span className="badge">{task.status}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const nextStatus = (status) => {
  if (status === "pending") return "in-progress";
  if (status === "in-progress") return "completed";
};
