import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EventCard from "../components/event/EventCard";
import EventCardSkeleton from "../components/event/EventCardSkeleton";
import { useEvents } from "../hooks/useEvents";
import EventDetailsModal from "@/components/event/EventDetailsModal";
import EventHeader from "@/components/event/EventHeader";
import Stats from "@/components/stats/Stats";
import { EventsEmpty } from "@/components/event/EventEmpty";
const EventsPage = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    // Use custom hook for event operations
    const { events, loading, error, createEvent, updateEvent, fetchEvents } = useEvents();
    // Check if we're redirected from auth with an event ID to open
    useEffect(() => {
        const eventId = location.state?.eventId;
        if (eventId && events.length > 0) {
            const event = events.find((e) => e.id === eventId);
            if (event) {
                setSelectedEvent(event);
                // Clear the state to prevent reopening on refresh
                navigate(location.pathname, { replace: true });
            }
        }
    }, [location.state, events, navigate, location.pathname]);
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(EventHeader, { createEvent: createEvent, updateEvent: updateEvent, fetchEvents: fetchEvents }), _jsx(Stats, { eventsLength: events.length }), _jsxs("div", { children: [_jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: loading ? (
                        // Show 6 skeleton cards while loading
                        Array.from({ length: 6 }).map((_, index) => (_jsx(EventCardSkeleton, {}, index)))) : error ? (_jsxs("div", { className: "col-span-full text-center py-10 text-red-500 dark:text-red-400", children: ["Error: ", error] })) : events.length === 0 ? (_jsx("div", { className: "col-span-full", children: _jsx(EventsEmpty, {}) })) : (events.map((event) => (_jsx(EventCard, { id: event.id, title: event.title, description: event.description, date: event.date, time: event.time, location: event.location, image_url: event.image_url, onClick: () => setSelectedEvent(event) }, event.id)))) }), _jsx(EventDetailsModal, { event: selectedEvent, open: !!selectedEvent, onOpenChange: () => setSelectedEvent(null) })] })] }));
};
export default EventsPage;
