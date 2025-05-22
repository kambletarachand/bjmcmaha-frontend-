// ZonePerformance.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { zone: "North", events: 12, reports: 10 },
  { zone: "South", events: 15, reports: 13 },
  { zone: "East", events: 10, reports: 8 },
  { zone: "West", events: 14, reports: 11 },
];

export function ZonePerformance() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Zone-wise Performance</h2>
      <BarChart width={400} height={250} data={data}>
        <XAxis dataKey="zone" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="events" fill="#4F46E5" />
      </BarChart>
    </div>
  );
}
