import StatCard from "./WorkerStatCard";

export default function WorkerStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Today Tasks" value="3" />
      <StatCard title="Completed" value="1" />
      <StatCard title="Hours Worked" value="5h 20m" />
      <StatCard title="Pending Tasks" value="2" />
    </div>
  );
}
