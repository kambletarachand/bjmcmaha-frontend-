// RecentActivities.jsx
const activities = [
  { id: 1, action: "VP of West uploaded event report", time: "2 hrs ago" },
  { id: 2, action: "Budget request submitted", time: "1 day ago" },
];

export function RecentActivities() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 h-full">
      <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
      <ul className="space-y-3">
        {activities.map((item) => (
          <li key={item.id} className="text-sm">
            <span className="font-medium">{item.action}</span>
            <span className="text-gray-500 ml-2">({item.time})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
