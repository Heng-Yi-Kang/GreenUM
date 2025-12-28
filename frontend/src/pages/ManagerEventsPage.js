import { jsx as _jsx } from "react/jsx-runtime";
import { EventsTable } from "@/components/event-management/EventTable";
export default function ManagerEventsPage() {
    return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsx(EventsTable, {}) }));
}
