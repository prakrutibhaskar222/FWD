const tasks = [
  { id: 1, title: "AC Repair", status: "pending" },
  { id: 2, title: "Plumbing", status: "in-progress" },
  { id: 3, title: "Cleaning", status: "completed" }
];

export default function TaskList() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-semibold mb-4">Today’s Tasks</h2>

      <ul className="divide-y">
        {tasks.map(task => (
          <li
            key={task.id}
            className="py-3 flex justify-between items-center"
          >
            <p className="font-medium">{task.title}</p>
            <span className={`badge ${task.status}`}>
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
