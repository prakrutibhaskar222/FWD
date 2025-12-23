export default function Notifications({ notifications }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map(n => (
            <li key={n._id} className="text-sm">
              {n.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
