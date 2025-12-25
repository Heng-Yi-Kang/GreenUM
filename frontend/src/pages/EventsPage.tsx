import { useState } from "react";
import EventCard from "../components/event/EventCard";
import EventCardSkeleton from "../components/event/EventCardSkeleton";

import { useEvents, type Event } from "../hooks/useEvents";
import EventDetailsModal from "@/components/event/EventDetailsModal";
import EventHeader from "@/components/event/EventHeader";
import Stats from "@/components/stats/Stats";
import { EventsEmpty } from "@/components/event/EventEmpty";

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { events, loading, error, createEvent, updateEvent, fetchEvents } = useEvents();

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
