import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

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
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all events
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (fetchError) throw fetchError;

      setEvents(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new event
  const createEvent = useCallback(async (eventData: CreateEventData): Promise<Event | null> => {
    setError(null);

    try {
      const { data, error: createError } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (createError) throw createError;

      if (data) {
        setEvents((prev) => [...prev, data]);
      }

      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to create event');
      console.error('Error creating event:', err);
      return null;
    }
  }, []);

  // Update an existing event
  const updateEvent = useCallback(async (id: string, eventData: UpdateEventData): Promise<boolean> => {
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', id);

      if (updateError) throw updateError;

      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? { ...event, ...eventData } : event
        )
      );

      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update event');
      console.error('Error updating event:', err);
      return false;
    }
  }, []);

  // Delete an event
  const deleteEvent = useCallback(async (id: string): Promise<boolean> => {
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setEvents((prev) => prev.filter((event) => event.id !== id));

      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete event');
      console.error('Error deleting event:', err);
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
