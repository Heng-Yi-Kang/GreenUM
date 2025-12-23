"use client";

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
  if (!event) return null;

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
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              Register Now
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Add to Calendar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
