"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  minTime?: string;
  className?: string;
}

export function TimePicker({
  value = "",
  onChange,
  disabled = false,
  minTime,
  className,
}: TimePickerProps) {
  const [hours, setHours] = React.useState<string>("00");
  const [minutes, setMinutes] = React.useState<string>("00");
  const prevValueRef = React.useRef<string>(value);

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

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (val.length > 2) val = val.slice(0, 2);
    const num = parseInt(val);
    if (num > 23) val = "23";

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

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (val.length > 2) val = val.slice(0, 2);
    const num = parseInt(val);
    if (num > 59) val = "59";

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

  return (
    <div className={cn("flex items-end gap-2", className)}>
      <div className="grid gap-1 flex-1">
        <Label htmlFor="hours" className="text-xs text-muted-foreground">
          HH
        </Label>
        <Input
          id="hours"
          type="text"
          inputMode="numeric"
          value={hours}
          onChange={handleHoursChange}
          disabled={disabled}
          className="w-full text-center"
          placeholder="00"
          maxLength={2}
        />
      </div>
      <span className="text-xl font-semibold pb-2">:</span>
      <div className="grid gap-1 flex-1">
        <Label htmlFor="minutes" className="text-xs text-muted-foreground">
          MM
        </Label>
        <Input
          id="minutes"
          type="text"
          inputMode="numeric"
          value={minutes}
          onChange={handleMinutesChange}
          disabled={disabled}
          className="w-full text-center"
          placeholder="00"
          maxLength={2}
        />
      </div>
    </div>
  );
}
