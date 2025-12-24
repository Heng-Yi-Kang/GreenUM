import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEventRegistration } from "@/hooks/useEventRegistration";
import EventCard from "@/components/event/EventCard";
import EventCardSkeleton from "@/components/event/EventCardSkeleton";
import EventDetailsModal from "@/components/event/EventDetailsModal";
import { EventsEmpty } from "@/components/event/EventEmpty";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PromptAuth } from "@/components/prompt/promptAuth";

export default function GoingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getUserRegistrations } = useEventRegistration();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const fetchRegistrations = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getUserRegistrations(user.id);
      console.log("User registrations:", data);
      setRegistrations(data);
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
    } finally {
      setLoading(false);
    }
  }, [user, getUserRegistrations]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleCardClick = (event: any) => {
    setSelectedEvent(event);
  };

  return (
    <>
      {user ? (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Your Events</h1>
              <p className="text-muted-foreground mt-1">
                Events you have registered to attend
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))
            ) : registrations.length === 0 ? (
              <div className="col-span-full">
                <EventsEmpty
                  title="No upcoming events"
                  description="You haven't registered for any events yet. Check out the events page to find confirmed activities!"
                />
                <div className="flex justify-center mt-6">
                  <Button onClick={() => navigate("/")}>Browse Events</Button>
                </div>
              </div>
            ) : (
              registrations.map((reg) => (
                <EventCard
                  key={reg.id}
                  id={reg.event.id}
                  title={reg.event.title}
                  description={reg.event.description}
                  date={reg.event.date}
                  time={reg.event.time}
                  location={reg.event.location}
                  image_url={reg.event.image_url}
                  onClick={() => handleCardClick(reg.event)}
                />
              ))
            )}
          </div>

          <EventDetailsModal
            event={selectedEvent}
            open={!!selectedEvent}
            onOpenChange={() => setSelectedEvent(null)}
            showUnregister={true}
            onRegistrationChange={fetchRegistrations}
          />
        </div>
      ) : (
        <PromptAuth />
      )}
    </>
  );
}
