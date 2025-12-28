import { useState, useCallback } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";
export const useEventRegistration = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isUnregistering, setIsUnregistering] = useState(false);
    const [error, setError] = useState(null);
    // Register for an event
    const registerForEvent = useCallback(async (eventId, data) => {
        setIsRegistering(true);
        setError(null);
        try {
            const response = await axiosInstance.post(`/events/${eventId}/register`, data);
            return response.data.registration;
        }
        catch (err) {
            console.error("Registration error:", err);
            if (axios.isAxiosError(err)) {
                console.error("Axios error details:", {
                    status: err.response?.status,
                    data: err.response?.data,
                    message: err.message,
                });
                const errorMessage = err.response?.data?.error ||
                    err.message ||
                    "Failed to register for event";
                setError(errorMessage);
                throw new Error(errorMessage);
            }
            const errorMessage = "An unexpected error occurred";
            console.error("Non-axios error:", err);
            setError(errorMessage);
            throw new Error(errorMessage);
        }
        finally {
            setIsRegistering(false);
        }
    }, []);
    // Unregister from an event
    const unregisterFromEvent = useCallback(async (eventId, userId) => {
        setIsUnregistering(true);
        setError(null);
        try {
            await axiosInstance.delete(`/events/${eventId}/register/${userId}`);
            return true;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.error || "Failed to unregister from event";
                setError(errorMessage);
            }
            else {
                setError("An unexpected error occurred");
            }
            return false;
        }
        finally {
            setIsUnregistering(false);
        }
    }, []);
    // Get all registrations for an event
    const getEventRegistrations = useCallback(async (eventId) => {
        setError(null);
        try {
            const response = await axiosInstance.get(`/events/${eventId}/registrations`);
            return response.data;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.error || "Failed to fetch registrations";
                setError(errorMessage);
            }
            else {
                setError("An unexpected error occurred");
            }
            return [];
        }
    }, []);
    // Check if user is registered for a specific event
    const checkUserRegistration = useCallback(async (eventId, userId) => {
        try {
            const registrations = await getEventRegistrations(eventId);
            return registrations.some((reg) => reg.user_id === userId);
        }
        catch {
            return false;
        }
    }, [getEventRegistrations]);
    return {
        isRegistering,
        isUnregistering,
        error,
        registerForEvent,
        unregisterFromEvent,
        getEventRegistrations,
        checkUserRegistration,
    };
};
