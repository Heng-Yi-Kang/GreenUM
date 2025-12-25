"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EditEventDialog } from "@/components/event-management/EditEventModal";
import { useEvents } from "@/hooks/useEvents";
import { useAuth } from "@/context/AuthContext";
import { useEventRegistration } from "@/hooks/useEventRegistration";
import { toast } from "sonner";
import { formatTime12Hour } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees?: number;
  status?: "upcoming" | "ongoing" | "completed";
  description: string;
  image_url?: string;
  created_by?: string;
}

export function EventsTable() {
  const { user } = useAuth();
  const {
    events: allEvents,
    loading,
    fetchEvents,
    updateEvent,
    deleteEvent: deleteEventAPI,
  } = useEvents();
  const { getEventRegistrations } = useEventRegistration();

  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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
      const userEvents = allEvents.filter(
        (event) => event.created_by === user.id
      );

      // Fetch attendee counts for each event
      const eventsWithAttendees = await Promise.all(
        userEvents.map(async (event) => {
          try {
            const registrations = await getEventRegistrations(event.id);
            return {
              ...event,
              attendees: registrations.length,
            };
          } catch (error) {
            console.error(
              `Error fetching attendees for event ${event.id}:`,
              error
            );
            return {
              ...event,
              attendees: 0,
            };
          }
        })
      );

      setEvents(eventsWithAttendees);
    };

    loadAttendeeCounts();
  }, [allEvents, user, getEventRegistrations]);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (selectedEvent) {
      const success = await deleteEventAPI(selectedEvent.id);
      if (success) {
        toast.success("Event deleted successfully");
        setDeleteDialogOpen(false);
        setSelectedEvent(null);
        // Refresh events
        await fetchEvents(true);
      } else {
        toast.error("Failed to delete event");
      }
    }
  };

  const handleEdit = async (updatedEvent: Event) => {
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
    } else {
      toast.error("Failed to update event");
    }
  };

  const getStatusColor = (status: Event["status"]) => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">My Events</h2>
          <p className="text-sm text-muted-foreground">
            Manage and organize your upcoming events
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Event List  */}
      <div className="grid gap-4 lg:gap-6">
        {loading && events.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <p className="text-sm text-muted-foreground">Loading events...</p>
          </Card>
        )}

        {!loading && events.length === 0 && !user && (
          <Card className="p-12 text-center">
            <Calendar className="mx-auto mb-4 size-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Sign in to manage events
            </h3>
            <p className="text-sm text-muted-foreground">
              Sign in with your @greenum.org account to view and manage your
              events
            </p>
          </Card>
        )}

        {!loading &&
          events.length === 0 &&
          user &&
          filteredEvents.length === 0 &&
          searchQuery === "" && (
            <Card className="p-12 text-center">
              <Calendar className="mx-auto mb-4 size-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                No events found
              </h3>
              <p className="text-sm text-muted-foreground">
                You haven't created any events yet. Create your first event from
                the Home page.
              </p>
            </Card>
          )}

        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className={getStatusColor(event.status)}
                    >
                      {event.status || "upcoming"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => {
                      setSelectedEvent(event);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Pencil className="size-3.5" />
                    <span className="sr-only">Edit event</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setSelectedEvent(event);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="size-3.5" />
                    <span className="sr-only">Delete event</span>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                    <Calendar className="size-4 text-green-500" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Date & Time
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {event.date} • {formatTime12Hour(event.time)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                    <MapPin className="size-4 text-green-500" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Location
                    </p>
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {event.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                    <Users className="size-4 text-green-500" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Attendees
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {event.attendees || 0} registered
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedEvent?.title}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedEvent && (
        <EditEventDialog
          key={selectedEvent.id}
          event={selectedEvent}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSave={handleEdit}
        />
      )}
    </div>
  );
}
