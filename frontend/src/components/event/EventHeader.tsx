import { useState } from "react";
import { Filter, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { type Event, type CreateEventData, type UpdateEventData } from "@/hooks/useEvents";
import CreateEventModal from "@/components/event/CreateEventModal";

interface EventHeaderProps {
  createEvent: (eventData: CreateEventData) => Promise<Event | null>;
  updateEvent: (id: string, eventData: UpdateEventData) => Promise<boolean>;
  fetchEvents: () => Promise<void>;
}

const EventHeader = ({ createEvent, updateEvent, fetchEvents }: EventHeaderProps) => {
  const { isAdmin, user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleCreateEvent = async (eventData: CreateEventData) => {
    const result = await createEvent(eventData);

    if (result) {
      setIsModalOpen(false);
      await fetchEvents(); // Refetch to sync all components
    } else {
      alert("Failed to create event");
    }
  };

  const handleUpdateEvent = async (eventData: UpdateEventData) => {
    if (!editingEvent) return;

    const success = await updateEvent(editingEvent.id, eventData);

    if (success) {
      setIsModalOpen(false);
      setEditingEvent(null);
      await fetchEvents(); // Refetch to sync all components
    } else {
      alert("Failed to update event");
    }
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: CreateEventData) => {
    if (editingEvent) {
      handleUpdateEvent(formData);
    } else {
      handleCreateEvent(formData);
    }
  };

  return (
    <div>
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

      {isAdmin && (
        <CreateEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={editingEvent}
          userId={user?.id}
        />
      )}
    </div>
  );
};

export default EventHeader;
