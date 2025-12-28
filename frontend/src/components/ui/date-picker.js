"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
export function DatePicker({ value, onChange, disabled = false, minDate, placeholder = "Pick a date", className, }) {
    const [date, setDate] = React.useState(value ? new Date(value) : undefined);
    React.useEffect(() => {
        if (value) {
            setDate(new Date(value));
        }
    }, [value]);
    const handleSelect = (selectedDate) => {
        setDate(selectedDate);
        if (selectedDate && onChange) {
            // Convert to YYYY-MM-DD format
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
            const day = String(selectedDate.getDate()).padStart(2, "0");
            onChange(`${year}-${month}-${day}`);
        }
    };
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className), disabled: disabled, children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), date ? format(date, "PPP") : _jsx("span", { children: placeholder })] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: date, onSelect: handleSelect, disabled: (date) => {
                        if (minDate && date < minDate) {
                            return true;
                        }
                        return false;
                    }, initialFocus: true }) })] }));
}
