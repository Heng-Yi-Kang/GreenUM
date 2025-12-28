import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
export function EditEventDialog({ event, open, onOpenChange, onSave, }) {
    const [formData, setFormData] = useState(event);
    // Update form data when event prop changes
    React.useEffect(() => {
        setFormData(event);
    }, [event]);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsx(DialogContent, { className: "max-w-2xl", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Edit Event" }), _jsx(DialogDescription, { children: "Make changes to your event details below." })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "title", children: "Event Title" }), _jsx(Input, { id: "title", value: formData.title || "", onChange: (e) => setFormData({ ...formData, title: e.target.value }), placeholder: "Enter event title" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Textarea, { id: "description", value: formData.description || "", onChange: (e) => setFormData({ ...formData, description: e.target.value }), placeholder: "Enter event description", rows: 3 })] }), _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "date", children: "Date" }), _jsx(DatePicker, { value: formData.date || "", onChange: (value) => setFormData({ ...formData, date: value }), placeholder: "Select date" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "time", children: "Time" }), _jsx(Input, { id: "time", type: "time", value: formData.time || "", onChange: (e) => setFormData({ ...formData, time: e.target.value }), required: true })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "location", children: "Location" }), _jsx(Input, { id: "location", value: formData.location || "", onChange: (e) => setFormData({ ...formData, location: e.target.value }), placeholder: "Enter event location" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "status", children: "Status" }), _jsxs(Select, { value: formData.status || "upcoming", onValueChange: (value) => setFormData({ ...formData, status: value }), children: [_jsx(SelectTrigger, { id: "status", children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "upcoming", children: "Upcoming" }), _jsx(SelectItem, { value: "ongoing", children: "Ongoing" }), _jsx(SelectItem, { value: "completed", children: "Completed" })] })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(Button, { type: "submit", className: "bg-primary text-primary-foreground", children: "Save Changes" })] })] }) }) }));
}
