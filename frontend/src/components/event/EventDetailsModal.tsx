import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin } from "lucide-react";
import { formatTime12Hour } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useEventRegistration } from "@/hooks/useEventRegistration";
import { toast } from "sonner";

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
}

export default function EventDetailsModal({
  event,
  open,
  onOpenChange,
}: EventDetailsModalProps) {
  const { user, isAdmin } = useAuth();
  const { isRegistering, registerForEvent, checkUserRegistration } = useEventRegistration();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(false);

  // Check if user is already registered when modal opens
  useEffect(() => {
    const checkRegistration = async () => {
      if (!user || !event || !open) {
        setIsRegistered(false);
        return;
      }

      setIsCheckingRegistration(true);
      try {
        const registered = await checkUserRegistration(event.id, user.id);
        setIsRegistered(registered);
      } catch (error) {
        console.error('Error checking registration status:', error);
        setIsRegistered(false);
      } finally {
        setIsCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [user, event, open, checkUserRegistration]);

  if (!event) return null;

  const handleRegister = async () => {
    if (!user) {
      toast.error("Please sign in to register for events");
      return;
    }

    console.log('User attempting to register:', {
      userId: user.id,
      userEmail: user.email,
      eventId: event.id
    });

    try {
      await registerForEvent(event.id, {
        user_id: user.id,
        user_email: user.email || "",
      });

      setIsRegistered(true);
      toast.success("Successfully registered for the event!");
    } catch (error) {
      console.error('Registration failed in component:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to register';
      toast.error(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative -mx-6 -mt-6 mb-6 h-64 overflow-hidden">
          <img
            src={event.imageUrl || event.image_url || "/placeholder.svg"}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-top from-black/80 via-black/40 to-transparent" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            {event.title}
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
            <h3 className="mb-2 text-lg font-semibold">About this event</h3>
            <p className="leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            {/* Only show Register Now button for regular users (not admins) */}
            {user && !isAdmin && (
              <Button
                onClick={handleRegister}
                disabled={isRegistering || isRegistered || isCheckingRegistration}
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
            {!user && (
              <Button
                onClick={() => toast.error("Please sign in to register for events")}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Register Now
              </Button>
            )}
            <Button variant="outline" className="flex-1 bg-transparent">
              Add to Calendar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
