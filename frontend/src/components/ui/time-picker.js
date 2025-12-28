"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
export function TimePicker({ value = "", onChange, disabled = false, minTime, className, }) {
    const [hours, setHours] = React.useState("00");
    const [minutes, setMinutes] = React.useState("00");
    const prevValueRef = React.useRef(value);
    // Initialize from value prop only when it changes externally
    React.useEffect(() => {
        // Only update if value changed from outside (not from our own onChange)
        if (value && value !== prevValueRef.current) {
            const [h, m] = value.split(":");
            setHours(h || "00");
            setMinutes(m || "00");
            prevValueRef.current = value;
        }
    }, [value]);
    const handleHoursChange = (e) => {
        let val = e.target.value.replace(/\D/g, "");
        // Allow empty or partial input
        if (val === "") {
            setHours("00");
            if (onChange) {
                const newValue = `00:${minutes.padStart(2, "0")}`;
                prevValueRef.current = newValue;
                onChange(newValue);
            }
            return;
        }
        if (val.length > 2)
            val = val.slice(0, 2);
        const num = parseInt(val);
        if (num > 23)
            val = "23";
        // Don't pad while typing - just use the raw value
        setHours(val);
        // For onChange callback, pad the value
        const paddedHours = val.padStart(2, "0");
        const paddedMinutes = minutes.padStart(2, "0");
        if (onChange) {
            const newValue = `${paddedHours}:${paddedMinutes}`;
            prevValueRef.current = newValue;
            onChange(newValue);
        }
    };
    const handleMinutesChange = (e) => {
        let val = e.target.value.replace(/\D/g, "");
        // Allow empty or partial input
        if (val === "") {
            setMinutes("00");
            if (onChange) {
                const newValue = `${hours.padStart(2, "0")}:00`;
                prevValueRef.current = newValue;
                onChange(newValue);
            }
            return;
        }
        if (val.length > 2)
            val = val.slice(0, 2);
        const num = parseInt(val);
        if (num > 59)
            val = "59";
        // Don't pad while typing - just use the raw value
        setMinutes(val);
        // For onChange callback, pad the value
        const paddedHours = hours.padStart(2, "0");
        const paddedMinutes = val.padStart(2, "0");
        if (onChange) {
            const newValue = `${paddedHours}:${paddedMinutes}`;
            prevValueRef.current = newValue;
            onChange(newValue);
        }
    };
    return (_jsxs("div", { className: cn("flex items-end gap-2", className), children: [_jsxs("div", { className: "grid gap-1 flex-1", children: [_jsx(Label, { htmlFor: "hours", className: "text-xs text-muted-foreground", children: "HH" }), _jsx(Input, { id: "hours", type: "text", inputMode: "numeric", value: hours, onChange: handleHoursChange, disabled: disabled, className: "w-full text-center", placeholder: "00", maxLength: 2 })] }), _jsx("span", { className: "text-xl font-semibold pb-2", children: ":" }), _jsxs("div", { className: "grid gap-1 flex-1", children: [_jsx(Label, { htmlFor: "minutes", className: "text-xs text-muted-foreground", children: "MM" }), _jsx(Input, { id: "minutes", type: "text", inputMode: "numeric", value: minutes, onChange: handleMinutesChange, disabled: disabled, className: "w-full text-center", placeholder: "00", maxLength: 2 })] })] }));
}
