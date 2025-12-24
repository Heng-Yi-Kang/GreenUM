import { useState, useCallback } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  user_email: string;
  registered_at: string;
}

export interface RegisterEventData {
  user_id: string;
  user_email: string;
}

export const useEventRegistration = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isUnregistering, setIsUnregistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Register for an event
  const registerForEvent = useCallback(
    async (eventId: string, data: RegisterEventData): Promise<EventRegistration | null> => {
      setIsRegistering(true);
      setError(null);

      try {
        console.log('Registering for event:', eventId, data);
        const response = await axiosInstance.post<{
          message: string;
          registration: EventRegistration;
        }>(`/events/${eventId}/register`, data);

        console.log('Registration successful:', response.data);
        return response.data.registration;
      } catch (err) {
        console.error('Registration error:', err);
        if (axios.isAxiosError(err)) {
          console.error('Axios error details:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
          });
          const errorMessage = err.response?.data?.error || err.message || "Failed to register for event";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
        const errorMessage = "An unexpected error occurred";
        console.error('Non-axios error:', err);
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsRegistering(false);
      }
    },
    []
  );

  // Unregister from an event
  const unregisterFromEvent = useCallback(
    async (eventId: string, userId: string): Promise<boolean> => {
      setIsUnregistering(true);
      setError(null);

      try {
        await axiosInstance.delete(`/events/${eventId}/register/${userId}`);
        return true;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errorMessage = err.response?.data?.error || "Failed to unregister from event";
          setError(errorMessage);
        } else {
          setError("An unexpected error occurred");
        }
        return false;
      } finally {
        setIsUnregistering(false);
      }
    },
    []
  );

  // Get all registrations for an event
  const getEventRegistrations = useCallback(
    async (eventId: string): Promise<EventRegistration[]> => {
      setError(null);

      try {
        const response = await axiosInstance.get<EventRegistration[]>(
          `/events/${eventId}/registrations`
        );
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errorMessage = err.response?.data?.error || "Failed to fetch registrations";
          setError(errorMessage);
        } else {
          setError("An unexpected error occurred");
        }
        return [];
      }
    },
    []
  );

  // Check if user is registered for a specific event
  const checkUserRegistration = useCallback(
    async (eventId: string, userId: string): Promise<boolean> => {
      try {
        const registrations = await getEventRegistrations(eventId);
        return registrations.some((reg) => reg.user_id === userId);
      } catch {
        return false;
      }
    },
    [getEventRegistrations]
  );

  // Get all registrations for a user
  const getUserRegistrations = useCallback(
    async (userId: string): Promise<any[]> => {
      setError(null);
      try {
        const response = await axiosInstance.get<any[]>(
          `/users/${userId}/registrations`
        );
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error('Axios error details:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
          });
          const errorMessage = err.response?.data?.error || "Failed to fetch user registrations";
          setError(errorMessage);
        } else {
          setError("An unexpected error occurred");
        }
        return [];
      }
    },
    []
  );

  return {
    isRegistering,
    isUnregistering,
    error,
    registerForEvent,
    unregisterFromEvent,
    getEventRegistrations,
    checkUserRegistration,
    getUserRegistrations,
  };
};
