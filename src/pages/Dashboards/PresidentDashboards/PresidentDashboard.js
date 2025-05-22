// PresidentDashboard.jsx
import { ZonePerformance } from "./ZonePerformance";
import { RecentActivities } from "./RecentActivities";
import { ApprovalPanel } from "./ApprovalPanel";
import { EventsCalendar } from "./EventsCalendar";
import { DocumentCenter } from "./DocumentCenter";

export default function PresidentDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">President Dashboard</h1>

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ZonePerformance />
        <RecentActivities />
      </div>

      {/* Approvals & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApprovalPanel />
        <EventsCalendar />
      </div>

      {/* Document Repository */}
      <DocumentCenter />
    </div>
  );
}
