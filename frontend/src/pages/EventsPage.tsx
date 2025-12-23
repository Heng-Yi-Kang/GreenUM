import { useState } from "react";
import { Plus, Calendar, Filter } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import EventCard from "../components/event/EventCard";
import EventCardSkeleton from "../components/event/EventCardSkeleton";

import { useEvents, type Event } from "../hooks/useEvents";
import CreateEventModal from "@/components/event/CreateEventModal";
import EventDetailsModal from "@/components/event/EventDetailsModal";

const EventsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { isAdmin } = useAuth();

  // Use custom hook for event operations
  const { events, loading, error, createEvent, updateEvent } = useEvents();

  const handleCreateEvent = async (eventData: any) => {
    const result = await createEvent(eventData);

    if (result) {
      setIsModalOpen(false);
    } else {
      alert("Failed to create event");
    }
  };

  const handleUpdateEvent = async (eventData: any) => {
    if (!editingEvent) return;

    const success = await updateEvent(editingEvent.id, eventData);

    if (success) {
      setIsModalOpen(false);
      setEditingEvent(null);
    } else {
      alert("Failed to update event");
    }
  };

  // const handleDeleteEvent = async (id: string) => {
  //   if (!window.confirm("Are you sure you want to delete this event?")) return;

  //   const success = await deleteEvent(id);

  //   if (!success) {
  //     alert("Failed to delete event");
  //   }
  // };

  const openAddModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  // const openEditModal = (id: string) => {
  //   const eventToEdit = events.find((ev) => ev.id === id);
  //   if (eventToEdit) {
  //     setEditingEvent(eventToEdit);
  //     setIsModalOpen(true);
  //   }
  // };

  const handleModalSubmit = (formData: any) => {
    if (editingEvent) {
      handleUpdateEvent(formData);
    } else {
      handleCreateEvent(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Upcoming Events
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage and participate in sustainable activities
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm transition-all">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>

          {/* Only show Add Event if admin */}
          {isAdmin && (
            <button
              onClick={openAddModal}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </button>
          )}
        </div>
      </div>

      {/* Stats/Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg shadow-green-600/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full text-white">
              This Month
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{events.length}</div>
          <div className="text-green-100 text-sm">Active Events</div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Total Participants
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100"></div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
            <span></span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Impact Score
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100"></div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1"></div>
        </div>
      </div>

      {/* Events Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            Loading events...
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-10 text-red-500">
            Error: {error}
          </div>
        ) : events.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            No events found.{" "}
            {isAdmin ? "Add the first one!" : "Check back later."}
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
              onEdit={openEditModal}
              onDelete={handleDeleteEvent}
            />
          ))
        )}
      </div> */}
      <div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Show 6 skeleton cards while loading
            Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))
          ) : error ? (
            <div className="col-span-full text-center py-10 text-red-500 dark:text-red-400">
              Error: {error}
            </div>
          ) : events.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
              No events found.{" "}
              {isAdmin ? "Add the first one!" : "Check back later."}
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

      {/* Modal only accessible if admin */}
      {isAdmin && (
        <CreateEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={editingEvent}
        />
      )}
    </div>
  );
};

export default EventsPage;
