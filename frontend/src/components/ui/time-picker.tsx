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

  // Initialize from value prop
  React.useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setHours(h || "00");
      setMinutes(m || "00");
    }
  }, [value]);

  // Notify parent of changes
  React.useEffect(() => {
    const timeString = `${hours}:${minutes}`;
    if (onChange && timeString !== value) {
      onChange(timeString);
    }
  }, [hours, minutes]);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) val = val.slice(0, 2);
    const num = parseInt(val) || 0;
    if (num > 23) val = "23";
    setHours(val.padStart(2, "0"));
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) val = val.slice(0, 2);
    const num = parseInt(val) || 0;
    if (num > 59) val = "59";
    setMinutes(val.padStart(2, "0"));
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
