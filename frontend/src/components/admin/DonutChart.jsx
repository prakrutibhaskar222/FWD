import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function DonutChart({ data }) {
  const chartData = [
    { name: "Pending", value: data.pending },
    { name: "In Progress", value: data["in-progress"] },
    { name: "Completed", value: data.completed }
  ];

  const COLORS = ["#fbbf24", "#3b82f6", "#10b981"];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-2">Bookings Overview</h3>

      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
