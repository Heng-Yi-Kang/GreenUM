import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url?: string;
  created_at?: string;
  created_by?: string;
  status?: "upcoming" | "ongoing" | "completed";
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url?: string;
  created_by?: string;
  status?: "upcoming" | "ongoing" | "completed";
}

export type UpdateEventData = Partial<CreateEventData>;

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all events
  const fetchEvents = useCallback(async (includeCompleted = false) => {
    setLoading(true);
    setError(null);

    try {
      const url = includeCompleted
        ? "/api/events?include_completed=true"
        : "/api/events";

      const response = await fetch(url, { credentials: "include" });
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Failed to fetch events" }));
        throw new Error(errorData.error || "Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data || []);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to fetch events";
      setError(errorMsg);
      console.error("Error fetching events:", errorMsg);

      // Show helpful message if it's a database schema error
      if (errorMsg.includes("does not exist") || errorMsg.includes("column")) {
        console.error(
          "⚠️ Database migration needed! Run the SQL in RUN-THIS-FIRST.md"
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new event
  const createEvent = useCallback(
    async (eventData: CreateEventData): Promise<Event | null> => {
      setError(null);

      try {
        const { data, error: createError } = await supabase
          .from("events")
          .insert([eventData])
          .select()
          .single();

        if (createError) throw createError;

        if (data) {
          setEvents((prev) => [...prev, data]);
        }

        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create event");
        console.error("Error creating event:", err);
        return null;
      }
    },
    []
  );

  // Update an existing event
  const updateEvent = useCallback(
    async (id: string, eventData: UpdateEventData): Promise<boolean> => {
      setError(null);

      try {
        const response = await fetch(`/api/events/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to update event");

        const updatedEvent = await response.json();

        setEvents((prev) =>
          prev.map((event) =>
            event.id === id ? { ...event, ...updatedEvent } : event
          )
        );

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update event");
        console.error("Error updating event:", err);
        return false;
      }
    },
    []
  );

  // Delete an event
  const deleteEvent = useCallback(async (id: string): Promise<boolean> => {
    setError(null);

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete event");

      setEvents((prev) => prev.filter((event) => event.id !== id));

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
      console.error("Error deleting event:", err);
      return false;
    }
  }, []);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
