export default function TimesheetSummary({ timesheet }) {
  if (!timesheet?.summary) return null;

  const mins = timesheet.summary.totalMinutes;
  const h = Math.floor(mins / 60);
  const m = mins % 60;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold">Today’s Timesheet</h2>
      <p className="text-lg">{h}h {m}m worked</p>
    </div>
  );
}
