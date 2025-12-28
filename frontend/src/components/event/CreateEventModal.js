"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
const EventModal = ({ isOpen, onClose, onSubmit, initialData, title, userId, }) => {
    const getInitialFormData = () => ({
        title: initialData?.title || "",
        date: initialData?.date || "",
        time: initialData?.time || "",
        location: initialData?.location || "",
        description: initialData?.description || "",
        image_url: initialData?.image_url || "",
    });
    const [formData, setFormData] = useState(getInitialFormData);
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
    const handleSubmit = async (e) => {
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "sm:max-w-125", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: title || (initialData ? "Edit Event" : "Add New Event") }), _jsx(DialogDescription, { children: initialData
                                ? "Update event details below"
                                : "Fill in the details to create a new event" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "title", children: "Event Title" }), _jsx(Input, { id: "title", name: "title", value: formData.title, onChange: handleChange, placeholder: "e.g. Community Beach Cleanup", required: true })] }), _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "date", children: "Date" }), _jsx(DatePicker, { value: formData.date, onChange: (value) => setFormData((prev) => ({ ...prev, date: value })), minDate: initialData ? undefined : new Date(), placeholder: "Select date" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "time", children: "Time" }), _jsx(Input, { id: "time", name: "time", type: "time", value: formData.time, onChange: handleChange, min: !initialData && isToday ? currentTime : undefined, required: true })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Textarea, { id: "description", name: "description", value: formData.description, onChange: handleChange, placeholder: "Brief description of the event...", rows: 3, required: true })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "location", children: "Location" }), _jsx(Input, { id: "location", name: "location", value: formData.location, onChange: handleChange, placeholder: "e.g. Central Park", required: true })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "image_url", children: "Image URL (Optional)" }), _jsx(Input, { id: "image_url", name: "image_url", type: "url", value: formData.image_url, onChange: handleChange, placeholder: "https://example.com/image.jpg" })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "submit", children: initialData ? "Save Changes" : "Create Event" })] })] })] }) }));
};
export default EventModal;
