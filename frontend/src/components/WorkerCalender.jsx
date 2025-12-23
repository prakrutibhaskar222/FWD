export default function WorkerCalendar({ tasks }) {
  const grouped = tasks.reduce((acc, t) => {
    acc[t.date] = acc[t.date] || [];
    acc[t.date].push(t);
    return acc;
  }, {});

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Schedule</h2>

      {Object.keys(grouped).map(date => (
        <div key={date} className="mb-3">
          <p className="font-medium">{date}</p>
          <ul className="text-sm text-gray-600">
            {grouped[date].map(t => (
              <li key={t._id}>{t.serviceTitle} • {t.slot}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
