// ApprovalPanel.jsx
import { Button } from "@/components/ui/button";

const requests = [
  { id: 1, type: "Budget", from: "Treasurer", amount: "₹10,000", status: "pending" },
  { id: 2, type: "Event", from: "VP North", name: "Health Camp", status: "pending" },
];

export function ApprovalPanel() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req.id} className="border p-3 rounded-lg">
            <div className="font-semibold">{req.type} Request from {req.from}</div>
            <div className="text-sm text-gray-500">{req.amount || req.name}</div>
            <div className="mt-2 flex gap-2">
              <Button variant="default">Approve</Button>
              <Button variant="destructive">Reject</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
