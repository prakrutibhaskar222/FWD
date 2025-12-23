import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Pending", value: 2 },
  { name: "In Progress", value: 1 },
  { name: "Completed", value: 1 }
];

const COLORS = ["#FDBA2D", "#3B82F6", "#22C55E"];

export default function StatusDonut() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-semibold mb-3">Task Status</h2>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
