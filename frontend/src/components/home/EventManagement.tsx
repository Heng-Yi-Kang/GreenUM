import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const upcomingEvents = [
  {
    title: "Campus Tree Planting",
    date: "March 15, 2024",
    time: "9:00 AM",
    location: "Main Campus Grounds",
    attendees: 45,
    maxAttendees: 50,
    category: "Outdoor",
  },
  {
    title: "Sustainable Fashion Workshop",
    date: "March 18, 2024",
    time: "2:00 PM",
    location: "Student Center",
    attendees: 28,
    maxAttendees: 30,
    category: "Workshop",
  },
];

export function EventManagement() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 mb-4">
              <Calendar className="h-4 w-4" />
              Event Management
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-balance mb-6">
              Discover and join sustainable activities
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed mb-6">
              Browse through a curated list of eco-friendly events happening
              across campus. From tree planting to workshops, find activities
              that match your interests and schedule.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Easy Registration</h4>
                  <p className="text-sm text-muted-foreground">
                    Register for events with a single click and get instant
                    confirmation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Real-time Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    See who's attending and track available spots in real-time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Calendar Sync</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync events to your preferred calendar app.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {event.title}
                      </CardTitle>
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {event.date} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    </div>
                    <Link to="/events">
                      <Button className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
