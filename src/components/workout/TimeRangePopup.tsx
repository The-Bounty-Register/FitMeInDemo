
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatTimeToFiveMinInterval, parseTimeToMinutes, formatMinutesToTime } from "@/utils/timeUtils";
import { useMobileContainer } from "@/components/layout/MobileLayout";

interface TimeRangePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (start: string, end: string) => void;
  machineName: string;
  availableStart: string;
  availableEnd: string;
}

export function TimeRangePopup({
  isOpen,
  onClose,
  onConfirm,
  machineName,
  availableStart,
  availableEnd
}: TimeRangePopupProps) {
  // Get the container reference
  const { containerRef } = useMobileContainer();
  
  // Convert time strings to minutes for the slider
  const startMinutes = parseTimeToMinutes(availableStart);
  const endMinutes = parseTimeToMinutes(availableEnd);
  
  // State for the selected range (in minutes)
  const [selectedRange, setSelectedRange] = useState<[number, number]>([startMinutes, startMinutes + 15]);
  
  useEffect(() => {
    // Reset the selection when the dialog opens
    if (isOpen) {
      setSelectedRange([startMinutes, Math.min(startMinutes + 15, endMinutes)]);
    }
  }, [isOpen, startMinutes, endMinutes]);
  
  const handleSliderChange = (value: number[]) => {
    setSelectedRange([value[0], value[1]]);
  };
  
  const handleConfirm = () => {
    onConfirm(
      formatMinutesToTime(selectedRange[0]),
      formatMinutesToTime(selectedRange[1])
    );
  };

  // Calculate step size for 5-minute intervals
  const step = 5;
  
  // Format time labels
  const startTimeLabel = formatMinutesToTime(selectedRange[0]);
  const endTimeLabel = formatMinutesToTime(selectedRange[1]);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="bg-[#1A1A1A] border-[#3A3A3A] text-white max-w-[90%] w-[320px] mx-auto fixed"
        container={containerRef?.current}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Set workout time for {machineName}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-8">
            <Slider
              defaultValue={[startMinutes, startMinutes + 15]}
              value={selectedRange}
              min={startMinutes}
              max={endMinutes}
              step={step}
              onValueChange={handleSliderChange}
              className="mt-6"
            />
          </div>
          
          <div className="flex justify-between text-sm text-[#BBBBBB]">
            <div>Available from: {availableStart}</div>
            <div>To: {availableEnd}</div>
          </div>
          
          <div className="mt-6 p-3 border border-[#3A3A3A] rounded-md bg-[#2A2A2A]">
            <div className="text-center">
              <div className="text-xs text-[#BBBBBB]">Selected Time</div>
              <div className="text-xl font-semibold text-primary mt-1">
                {startTimeLabel} - {endTimeLabel}
              </div>
              <div className="text-xs text-[#BBBBBB] mt-1">
                Duration: {Math.round((selectedRange[1] - selectedRange[0]) / 5) * 5} minutes
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Add to Workout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
