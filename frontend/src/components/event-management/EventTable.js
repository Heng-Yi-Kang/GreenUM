"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { EditEventDialog } from "@/components/event-management/EditEventModal";
import { useEvents } from "@/hooks/useEvents";
import { useAuth } from "@/context/AuthContext";
import { useEventRegistration } from "@/hooks/useEventRegistration";
import { toast } from "sonner";
import { formatTime12Hour } from "@/lib/utils";
export function EventsTable() {
    const { user } = useAuth();
    const { events: allEvents, loading, fetchEvents, updateEvent, deleteEvent: deleteEventAPI, } = useEvents();
    const { getEventRegistrations } = useEventRegistration();
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    // Fetch events with attendee counts
    useEffect(() => {
        const loadEventsWithAttendees = async () => {
            await fetchEvents(true); // Include completed events for managers
        };
        loadEventsWithAttendees();
    }, [fetchEvents]);
    // Filter events created by current user and add attendee counts
    useEffect(() => {
        const loadAttendeeCounts = async () => {
            if (!user || !allEvents.length) {
                setEvents([]);
                return;
            }
            // Filter events created by the current user
            const userEvents = allEvents.filter((event) => event.created_by === user.id);
            // Fetch attendee counts for each event
            const eventsWithAttendees = await Promise.all(userEvents.map(async (event) => {
                try {
                    const registrations = await getEventRegistrations(event.id);
                    return {
                        ...event,
                        attendees: registrations.length,
                    };
                }
                catch (error) {
                    console.error(`Error fetching attendees for event ${event.id}:`, error);
                    return {
                        ...event,
                        attendees: 0,
                    };
                }
            }));
            setEvents(eventsWithAttendees);
        };
        loadAttendeeCounts();
    }, [allEvents, user, getEventRegistrations]);
    const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleDelete = async () => {
        if (selectedEvent) {
            const success = await deleteEventAPI(selectedEvent.id);
            if (success) {
                toast.success("Event deleted successfully");
                setDeleteDialogOpen(false);
                setSelectedEvent(null);
                // Refresh events
                await fetchEvents(true);
            }
            else {
                toast.error("Failed to delete event");
            }
        }
    };
    const handleEdit = async (updatedEvent) => {
        const success = await updateEvent(updatedEvent.id, {
            title: updatedEvent.title,
            description: updatedEvent.description,
            date: updatedEvent.date,
            time: updatedEvent.time,
            location: updatedEvent.location,
            status: updatedEvent.status,
            image_url: updatedEvent.image_url,
        });
        if (success) {
            toast.success("Event updated successfully");
            setEditDialogOpen(false);
            setSelectedEvent(null);
            // Refresh events
            await fetchEvents(true);
        }
        else {
            toast.error("Failed to update event");
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "upcoming":
                return "bg-green-500/10 text-green-500 border-green-500/20";
            case "ongoing":
                return "bg-chart-3/10 text-chart-3 border-chart-3/20";
            case "completed":
                return "bg-muted text-muted-foreground border-border";
            default:
                return "bg-muted text-muted-foreground border-border";
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold text-foreground", children: "My Events" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Manage and organize your upcoming events" })] }), _jsxs("div", { className: "relative w-full sm:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { type: "text", placeholder: "Search events...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-9" })] })] }), _jsxs("div", { className: "grid gap-4 lg:gap-6", children: [loading && events.length === 0 && (_jsxs(Card, { className: "p-12 text-center", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" }) }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Loading events..." })] })), !loading && events.length === 0 && !user && (_jsxs(Card, { className: "p-12 text-center", children: [_jsx(Calendar, { className: "mx-auto mb-4 size-12 text-muted-foreground" }), _jsx("h3", { className: "mb-2 text-lg font-semibold text-foreground", children: "Sign in to manage events" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in with your @greenum.org account to view and manage your events" })] })), !loading &&
                        events.length === 0 &&
                        user &&
                        filteredEvents.length === 0 &&
                        searchQuery === "" && (_jsxs(Card, { className: "p-12 text-center", children: [_jsx(Calendar, { className: "mx-auto mb-4 size-12 text-muted-foreground" }), _jsx("h3", { className: "mb-2 text-lg font-semibold text-foreground", children: "No events found" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "You haven't created any events yet. Create your first event from the Home page." })] })), filteredEvents.map((event) => (_jsx(Card, { className: "overflow-hidden bg-card p-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex-1 space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "text-lg font-semibold text-foreground", children: event.title }), _jsx(Badge, { variant: "outline", className: getStatusColor(event.status), children: event.status || "upcoming" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: event.description })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs(Button, { variant: "ghost", size: "icon", className: "size-8 shrink-0", onClick: () => {
                                                        setSelectedEvent(event);
                                                        setEditDialogOpen(true);
                                                    }, children: [_jsx(Pencil, { className: "size-3.5" }), _jsx("span", { className: "sr-only", children: "Edit event" })] }), _jsxs(Button, { variant: "ghost", size: "icon", className: "size-8 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10", onClick: () => {
                                                        setSelectedEvent(event);
                                                        setDeleteDialogOpen(true);
                                                    }, children: [_jsx(Trash2, { className: "size-3.5" }), _jsx("span", { className: "sr-only", children: "Delete event" })] })] })] }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10", children: _jsx(Calendar, { className: "size-4 text-green-500" }) }), _jsxs("div", { className: "min-w-0 space-y-0.5", children: [_jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Date & Time" }), _jsxs("p", { className: "text-sm font-medium text-foreground", children: [event.date, " \u2022 ", formatTime12Hour(event.time)] })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10", children: _jsx(MapPin, { className: "size-4 text-green-500" }) }), _jsxs("div", { className: "min-w-0 space-y-0.5", children: [_jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Location" }), _jsx("p", { className: "text-sm font-medium text-foreground line-clamp-1", children: event.location })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10", children: _jsx(Users, { className: "size-4 text-green-500" }) }), _jsxs("div", { className: "min-w-0 space-y-0.5", children: [_jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Attendees" }), _jsxs("p", { className: "text-sm font-medium text-foreground", children: [event.attendees || 0, " registered"] })] })] })] })] }) }, event.id)))] }), _jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Delete Event" }), _jsxs(AlertDialogDescription, { children: ["Are you sure you want to delete \"", selectedEvent?.title, "\"? This action cannot be undone."] })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { onClick: handleDelete, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })] })] }) }), selectedEvent && (_jsx(EditEventDialog, { event: selectedEvent, open: editDialogOpen, onOpenChange: setEditDialogOpen, onSave: handleEdit }, selectedEvent.id))] }));
}
