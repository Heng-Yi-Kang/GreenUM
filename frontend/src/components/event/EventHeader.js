import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Filter, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {} from "@/hooks/useEvents";
import CreateEventModal from "@/components/event/CreateEventModal";
const EventHeader = ({ createEvent, updateEvent, fetchEvents }) => {
    const { isAdmin, user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const handleCreateEvent = async (eventData) => {
        const result = await createEvent(eventData);
        if (result) {
            await fetchEvents(); // Refetch to sync all components
            return true;
        }
        else {
            alert("Failed to create event");
            return false;
        }
    };
    const handleUpdateEvent = async (eventData) => {
        if (!editingEvent)
            return false;
        const success = await updateEvent(editingEvent.id, eventData);
        if (success) {
            setEditingEvent(null);
            await fetchEvents(); // Refetch to sync all components
            return true;
        }
        else {
            alert("Failed to update event");
            return false;
        }
    };
    const openAddModal = () => {
        setEditingEvent(null);
        setIsModalOpen(true);
    };
    const handleModalSubmit = async (formData) => {
        if (editingEvent) {
            return await handleUpdateEvent(formData);
        }
        else {
            return await handleCreateEvent(formData);
        }
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: "Upcoming Events" }), _jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm mt-1", children: "Manage and participate in sustainable activities" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("button", { className: "flex items-center px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm transition-all", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), "Filter"] }), isAdmin && (_jsxs("button", { onClick: openAddModal, className: "flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 transition-all", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add Event"] }))] })] }), isAdmin && (_jsx(CreateEventModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onSubmit: handleModalSubmit, initialData: editingEvent, userId: user?.id }))] }));
};
export default EventHeader;
