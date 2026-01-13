import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EventCard from "../components/event/EventCard";
import EventCardSkeleton from "../components/event/EventCardSkeleton";

import { useEvents, type Event } from "../hooks/useEvents";
import EventDetailsModal from "@/components/event/EventDetailsModal";
import EventHeader from "@/components/event/EventHeader";
import Stats from "@/components/stats/Stats";
import { EventsEmpty } from "@/components/event/EventEmpty";

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const hasProcessedEventRef = useRef(false);

  // Use custom hook for event operations
  const { events, loading, error, createEvent, updateEvent, fetchEvents } =
    useEvents();

  // Check if we're redirected from auth with an event ID to open
  useEffect(() => {
    const eventId = (location.state as { eventId?: string })?.eventId;

    // Only process if we haven't already processed this event
    if (eventId && events.length > 0 && !hasProcessedEventRef.current) {
      const event = events.find((e) => e.id === eventId);
      if (event) {
        hasProcessedEventRef.current = true;

        // Schedule state updates in a microtask to avoid cascading renders
        queueMicrotask(() => {
          setSelectedEvent(event);
          navigate(location.pathname, { replace: true, state: {} });
        });
      }
    }

    // Reset the ref when eventId is cleared
    if (!eventId && hasProcessedEventRef.current) {
      hasProcessedEventRef.current = false;
    }
  }, [location.state, events, navigate, location.pathname]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <EventHeader
        createEvent={createEvent}
        updateEvent={updateEvent}
        fetchEvents={fetchEvents}
      />

      {/* Stats Info Cards */}
      <Stats eventsLength={events.length} />

      {/* Fetch EVENTS */}
      <div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))
          ) : error ? (
            <div className="col-span-full text-center py-10 text-red-500 dark:text-red-400">
              Error: {error}
            </div>
          ) : events.length === 0 ? (
            <div className="col-span-full">
              <EventsEmpty />
            </div>
          ) : (
            events.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                time={event.time}
                location={event.location}
                image_url={event.image_url}
                onClick={() => setSelectedEvent(event)}
              />
            ))
          )}
        </div>

        <EventDetailsModal
          event={selectedEvent}
          open={!!selectedEvent}
          onOpenChange={() => setSelectedEvent(null)}
        />
      </div>
    </div>
  );
};

export default EventsPage;
