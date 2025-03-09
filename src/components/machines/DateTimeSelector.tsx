
import React from "react";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Timer } from "lucide-react";
import { timeSlots } from "@/data/gymData";
import { useMobileContainer } from "@/components/layout/MobileLayout";

interface DateTimeSelectorProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
}

export function DateTimeSelector({
  selectedDate,
  setSelectedDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: DateTimeSelectorProps) {
  const disabledDates = {
    before: new Date(),
    after: addDays(new Date(), 5),
  };
  
  const { containerRef } = useMobileContainer();

  return (
    <>
      <div className="mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-[#2A2A2A] border-[#3A3A3A] text-white justify-start hover:bg-[#3A3A3A]"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-auto p-0 bg-[#1A1A1A] border-[#3A3A3A] max-w-[95%] mx-auto" 
            container={containerRef?.current}
            align="center"
            sideOffset={5}
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDates}
              initialFocus
              className="p-3 pointer-events-auto text-white"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <Select value={startTime} onValueChange={setStartTime}>
            <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
              <div className="flex items-center">
                <Timer className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Start time" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={endTime} onValueChange={setEndTime}>
            <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
              <div className="flex items-center">
                <Timer className="mr-2 h-4 w-4" />
                <SelectValue placeholder="End time" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
              {timeSlots
                .filter((time) => !startTime || time > startTime)
                .map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
