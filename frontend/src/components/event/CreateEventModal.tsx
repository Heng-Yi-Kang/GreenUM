"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";

interface EventFormData {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image_url?: string;
  created_by?: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: EventFormData) => Promise<boolean>;
  initialData?: EventFormData | null;
  title?: string;
  userId?: string;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  userId,
}) => {
  const getInitialFormData = (): EventFormData => ({
    title: initialData?.title || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    location: initialData?.location || "",
    description: initialData?.description || "",
    image_url: initialData?.image_url || "",
  });

  const [formData, setFormData] = useState<EventFormData>(getInitialFormData);

  // Get today's date in YYYY-MM-DD format
  const today = useMemo(() => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  }, []);

  // Get current time in HH:MM format
  const currentTime = useMemo(() => {
    const date = new Date();
    return date.toTimeString().slice(0, 5);
  }, []);

  // Check if selected date is today
  const isToday = formData.date === today;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = { ...formData };
    // Add created_by only for new events (not when editing)
    if (!initialData && userId) {
      eventData.created_by = userId;
    }

    const success = await onSubmit(eventData);

    if (success) {
      // Reset form only on successful submission
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        image_url: "",
      });
      onClose();
    }
    // If failed, keep the form data so user can retry
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>
            {title || (initialData ? "Edit Event" : "Add New Event")}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update event details below"
              : "Fill in the details to create a new event"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Community Beach Cleanup"
              required
            />
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <DatePicker
                value={formData.date}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, date: value }))
                }
                minDate={initialData ? undefined : new Date()}
                placeholder="Select date"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                min={!initialData && isToday ? currentTime : undefined}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the event..."
              rows={3}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Central Park"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image_url">Image URL (Optional)</Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Save Changes" : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
