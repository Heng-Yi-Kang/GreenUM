import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { formatTime12Hour } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useEventRegistration } from "@/hooks/useEventRegistration";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  image_url?: string;
}

interface EventDetailsModalProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showUnregister?: boolean;
  onRegistrationChange?: () => void;
}

export default function EventDetailsModal({
  event,
  open,
  onOpenChange,
  showUnregister = false,
  onRegistrationChange,
}: EventDetailsModalProps) {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const {
    isRegistering,

    isUnregistering,
    registerForEvent,
    unregisterFromEvent,

    checkUserRegistration,
    getEventRegistrations,
  } = useEventRegistration();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState<number>(0);

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
      } catch (error) {
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
      } catch (error) {
        console.error("Error checking registration status:", error);
        setIsRegistered(false);
      } finally {
        setIsCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [user, event, open, checkUserRegistration, getEventRegistrations]);

  if (!event) return null;

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
      onRegistrationChange?.();
    } catch (error) {
      console.error("Registration failed in component:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to register";
      toast.error(`Registration failed: ${errorMessage}`);
    }
  };

  const handleUnregister = async () => {
    if (!user || !event) return;

    try {
      const success = await unregisterFromEvent(event.id, user.id);
      if (success) {
        setIsRegistered(false);
        toast.success("Successfully unregistered from the event");
        onRegistrationChange?.();
      } else {
        toast.error("Failed to unregister from the event");
      }
    } catch (error) {
      console.error("Unregistration failed:", error);
      toast.error("An error occurred during unregistration");
    }
  };

  const handleAddToCalendar = () => {
    // Format date and time for ICS file
    const eventDate = new Date(event.date);
    const [hours, minutes] = event.time.split(":");
    eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Format dates in ICS format (YYYYMMDDTHHMMSS)
    const formatICSDate = (date: Date) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative -mx-6 -mt-6 mb-6 h-64 overflow-hidden">
          <img
            src={
              event.imageUrl ||
              event.image_url ||
              "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            }
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-top from-black/80 via-black/40 to-transparent" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-3 flex-wrap">
            <span>{event.title}</span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Event details and information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">
                {formatTime12Hour(event.time)}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{event.location}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">About this event</h3>
            <p className="leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Attendees</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {attendeeCount} {attendeeCount === 1 ? "person" : "people"}
                </span>
              </div>
            </div>
            {attendeeCount == 0 && (
              <p className="text-sm text-muted-foreground">
                Be the first to register for this event!
              </p>
            )}
          </div>
          <div className="flex gap-3">
            {/* Only show Register/Unregister button for regular users (not admins) */}
            {user && !isAdmin && (
              <>
                {isRegistered && showUnregister ? (
                  <Button
                    onClick={handleUnregister}
                    disabled={isUnregistering}
                    variant="destructive"
                    className="flex-1"
                  >
                    {isUnregistering ? "Unregistering..." : "Not going anymore"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleRegister}
                    disabled={
                      isRegistering || isRegistered || isCheckingRegistration
                    }
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCheckingRegistration
                      ? "Checking..."
                      : isRegistering
                      ? "Registering..."
                      : isRegistered
                      ? "Registered ✓"
                      : "Register Now"}
                  </Button>
                )}
              </>
            )}
            {!user && (
              <Button
                onClick={() =>
                  toast.error("Please sign in to register for events")
                }
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Register Now
              </Button>
            )}
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={handleAddToCalendar}
            >
              Add to Calendar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
