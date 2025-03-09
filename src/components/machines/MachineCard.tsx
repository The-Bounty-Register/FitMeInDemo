
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Info, Users, Plus } from "lucide-react";

interface MachineCardProps {
  machine: {
    id: number;
    name: string;
    muscleGroup: string;
    startTime: string;
    endTime: string;
    description: string;
    location: string;
    count: number;
  };
  onAddToWorkout?: (machineId: number) => void;
}

export function MachineCard({ machine, onAddToWorkout }: MachineCardProps) {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    navigate(`/machine-detail/${machine.id}`);
  };

  const handleAddToWorkout = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToWorkout) {
      onAddToWorkout(machine.id);
    }
  };
  
  return (
    <Card 
      className="bg-[#2A2A2A] border-[#3A3A3A] hover:bg-[#333333] transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-medium text-white">{machine.name}</h3>
            <div className="text-sm text-[#BBBBBB] capitalize">{machine.muscleGroup}</div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">
                {machine.startTime}-{machine.endTime}
              </span>
            </div>
            <button 
              className="w-6 h-6 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors" 
              onClick={handleAddToWorkout}
            >
              <Plus className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-start gap-1">
            <MapPin className="h-3 w-3 text-[#BBBBBB] mt-0.5 flex-shrink-0" />
            <span className="text-xs text-[#BBBBBB] line-clamp-1">{machine.location}</span>
          </div>
          <div className="flex items-start gap-1">
            <Users className="h-3 w-3 text-[#BBBBBB] mt-0.5 flex-shrink-0" />
            <span className="text-xs text-[#BBBBBB]">{machine.count} available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
