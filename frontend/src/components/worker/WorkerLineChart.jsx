import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", hours: 5 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 4 },
  { day: "Thu", hours: 7 },
  { day: "Fri", hours: 5 }
];

export default function WorkLineChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-semibold mb-3">Hours Worked (Week)</h2>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="hours"
            stroke="#22C55E"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
