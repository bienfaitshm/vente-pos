"use client";

import * as React from "react";
import { subDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface DatePickerWithPresetsProps {
  value?: Date;
  onChange?(value: Date): void;
}

export const DatePickerWithPresets: React.FC<DatePickerWithPresetsProps> = ({
  value = new Date(),
}) => {
  const [date, setDate] = React.useState<Date>(value);

  return (
    <div className="flex items-center gap-2">
      <Select
        onValueChange={(value) => setDate(subDays(new Date(), parseInt(value)))}
      >
        <SelectTrigger className="h-8 rounded-lg border">
          <SelectValue placeholder="Ajourd'hui" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="0">Aujourd&apos;hui</SelectItem>
          <SelectItem value="1">hiers</SelectItem>
          <SelectItem value="3">Il y&apos; 3 jours</SelectItem>
          <SelectItem value="7">Il y&apos; une semaine</SelectItem>
          <SelectItem value="30">Il y&apos; une un moi</SelectItem>
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(!date && "text-muted-foreground")}
          >
            <CalendarIcon />
            {date ? format(date, "dd/MM/yyyy") : <span>Choisir une date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <div className="rounded-md border">
            <Calendar mode="single" selected={date} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
