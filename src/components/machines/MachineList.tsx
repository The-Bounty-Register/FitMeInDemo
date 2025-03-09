
import React from "react";
import { MachineCard } from "@/components/machines/MachineCard";

interface MachineListProps {
  machines: Array<{
    id: number;
    name: string;
    muscleGroup: string;
    startTime: string;
    endTime: string;
    description: string;
    location: string;
    count: number;
  }>;
  onAddToWorkout: (machineId: number) => void;
}

export function MachineList({ machines, onAddToWorkout }: MachineListProps) {
  return (
    <div className="space-y-3">
      {machines.length > 0 ? (
        machines.map((machine) => (
          <MachineCard 
            key={machine.id} 
            machine={machine} 
            onAddToWorkout={onAddToWorkout}
          />
        ))
      ) : (
        <div className="text-center text-[#BBBBBB] py-8">
          No machines found matching your criteria
        </div>
      )}
    </div>
  );
}
