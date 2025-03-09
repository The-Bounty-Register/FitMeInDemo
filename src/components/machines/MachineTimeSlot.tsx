
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MachineTimeSlotProps {
  startTime: string;
  endTime: string;
}

export function MachineTimeSlot({ startTime, endTime }: MachineTimeSlotProps) {
  return (
    <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
      <CardContent className="p-4">
        <h3 className="font-medium text-white mb-3">Current Time Slot</h3>
        <div className="bg-[#1A1A1A] p-3 rounded-md flex justify-between items-center">
          <span className="text-white">{startTime} - {endTime}</span>
          <Button 
            size="sm" 
            className="text-xs"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
