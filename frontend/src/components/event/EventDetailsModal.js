import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { formatTime12Hour } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useEventRegistration } from "@/hooks/useEventRegistration";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export default function EventDetailsModal({ event, open, onOpenChange, }) {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const { isRegistering, registerForEvent, checkUserRegistration, getEventRegistrations, } = useEventRegistration();
    const [isRegistered, setIsRegistered] = useState(false);
    const [isCheckingRegistration, setIsCheckingRegistration] = useState(false);
    const [attendeeCount, setAttendeeCount] = useState(0);
    // Check if user is already registered and fetch attendee count when modal opens
    useEffect(() => {
        const checkRegistration = async () => {
            if (!event || !open) {
                setIsRegistered(false);
                setAttendeeCount(0);
                return;
            }
            try {
                const registrations = await getEventRegistrations(event.id);
                setAttendeeCount(registrations.length);
            }
            catch (error) {
                console.error("Error fetching attendee count:", error);
                setAttendeeCount(0);
            }
            // Check user registration status
            if (!user) {
                setIsRegistered(false);
                return;
            }
            setIsCheckingRegistration(true);
            try {
                const registered = await checkUserRegistration(event.id, user.id);
                setIsRegistered(registered);
            }
            catch (error) {
                console.error("Error checking registration status:", error);
                setIsRegistered(false);
            }
            finally {
                setIsCheckingRegistration(false);
            }
        };
        checkRegistration();
    }, [user, event, open, checkUserRegistration, getEventRegistrations]);
    if (!event)
        return null;
    const handleRegister = async () => {
        if (!user) {
            toast.error("Please sign in to register for events");
            return;
        }
        try {
            await registerForEvent(event.id, {
                user_id: user.id,
                user_email: user.email || "",
            });
            setIsRegistered(true);
            setAttendeeCount((prev) => prev + 1);
            toast.success("Successfully registered for the event!");
        }
        catch (error) {
            console.error("Registration failed in component:", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to register";
            toast.error(`Registration failed: ${errorMessage}`);
        }
    };
    const handleAddToCalendar = () => {
        // Format date and time for ICS file
        const eventDate = new Date(event.date);
        const [hours, minutes] = event.time.split(":");
        eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        // Format dates in ICS format (YYYYMMDDTHHMMSS)
        const formatICSDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hour = String(date.getHours()).padStart(2, "0");
            const minute = String(date.getMinutes()).padStart(2, "0");
            const second = String(date.getSeconds()).padStart(2, "0");
            return `${year}${month}${day}T${hour}${minute}${second}`;
        };
        // Calculate end time (1 hour after start)
        const endDate = new Date(eventDate);
        endDate.setHours(endDate.getHours() + 1);
        // Create ICS content
        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//GreenUM//Event Calendar//EN",
            "CALSCALE:GREGORIAN",
            "BEGIN:VEVENT",
            `DTSTART:${formatICSDate(eventDate)}`,
            `DTEND:${formatICSDate(endDate)}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
            `LOCATION:${event.location}`,
            `UID:${event.id}@greenum.org`,
            `DTSTAMP:${formatICSDate(new Date())}`,
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR",
        ].join("\r\n");
        // Create blob and download
        const blob = new Blob([icsContent], {
            type: "text/calendar;charset=utf-8",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${event.title
            .replace(/[^a-z0-9]/gi, "_")
            .toLowerCase()}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        toast.success("Calendar event downloaded!");
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "relative -mx-6 -mt-6 mb-6 h-64 overflow-hidden", children: [_jsx("img", { src: event.imageUrl ||
                                event.image_url ||
                                "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80", alt: event.title, className: "h-full w-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-top from-black/80 via-black/40 to-transparent" })] }), _jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-3xl font-bold flex items-center gap-3 flex-wrap", children: _jsx("span", { children: event.title }) }), _jsx(DialogDescription, { className: "sr-only", children: "Event details and information" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsxs("div", { className: "flex items-center gap-2 rounded-md bg-secondary px-3 py-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: new Date(event.date).toLocaleDateString("en-US", {
                                                weekday: "long",
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            }) })] }), _jsxs("div", { className: "flex items-center gap-2 rounded-md bg-secondary px-3 py-2", children: [_jsx(Clock, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: formatTime12Hour(event.time) })] }), _jsxs("div", { className: "flex items-center gap-2 rounded-md bg-secondary px-3 py-2", children: [_jsx(MapPin, { className: "h-5 w-5 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: event.location })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "About this event" }), _jsx("p", { className: "leading-relaxed text-muted-foreground", children: event.description })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Attendees" }), _jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [_jsx(Users, { className: "h-4 w-4" }), _jsxs("span", { className: "text-sm font-medium", children: [attendeeCount, " ", attendeeCount === 1 ? "person" : "people"] })] })] }), attendeeCount == 0 && (_jsx("p", { className: "text-sm text-muted-foreground", children: "Be the first to register for this event!" }))] }), _jsxs("div", { className: "flex gap-3", children: [user && !isAdmin && (_jsx(Button, { onClick: handleRegister, disabled: isRegistering || isRegistered || isCheckingRegistration, className: "flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed", children: isCheckingRegistration
                                        ? "Checking..."
                                        : isRegistering
                                            ? "Registering..."
                                            : isRegistered
                                                ? "Registered ✓"
                                                : "Register Now" })), !user && (_jsx(Button, { onClick: () => {
                                        navigate("/auth", { state: { eventId: event.id } });
                                    }, className: "flex-1 bg-green-600 hover:bg-green-700", children: "Register Now" })), _jsx(Button, { variant: "outline", className: "flex-1 bg-transparent", onClick: handleAddToCalendar, children: "Add to Calendar" })] })] })] }) }));
}
