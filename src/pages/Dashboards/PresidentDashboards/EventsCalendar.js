// EventsCalendar.jsx
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  { title: "All-Zone Meeting", start: new Date(), end: new Date() },
  { title: "Program Launch", start: new Date(), end: new Date() },
];

export function EventsCalendar() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 h-full">
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 300 }}
      />
    </div>
  );
}
