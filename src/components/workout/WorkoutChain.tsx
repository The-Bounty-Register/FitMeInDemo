
import React from "react";
import { X, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMobileContainer } from "@/components/layout/MobileLayout";
import { Switch } from "@/components/ui/switch";

export interface WorkoutMachine {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  replaced?: boolean;
}

interface WorkoutChainProps {
  workoutMachines: WorkoutMachine[];
  onRemoveMachine: (index: number) => void;
  onReplaceExercise?: (index: number) => void;
  onCompleteWorkout?: (event: React.MouseEvent) => void;
  hasReplacements?: boolean;
  isComplete?: boolean;
}

export function WorkoutChain({
  workoutMachines,
  onRemoveMachine,
  onReplaceExercise,
  onCompleteWorkout,
  hasReplacements = false,
  isComplete = false
}: WorkoutChainProps) {
  const [openMachineIndex, setOpenMachineIndex] = React.useState<number | null>(null);
  const { containerRef } = useMobileContainer();

  const handleDotClick = (index: number) => {
    setOpenMachineIndex(index);
  };

  const handleCloseDialog = () => {
    setOpenMachineIndex(null);
  };

  const handleRemove = () => {
    if (openMachineIndex !== null) {
      onRemoveMachine(openMachineIndex);
      setOpenMachineIndex(null);
    }
  };

  const handleReplace = () => {
    if (openMachineIndex !== null && onReplaceExercise) {
      onReplaceExercise(openMachineIndex);
      setOpenMachineIndex(null);
    }
  };

  if (workoutMachines.length === 0) {
    return null;
  }

  const selectedMachine = openMachineIndex !== null ? workoutMachines[openMachineIndex] : null;

  return (
    <div className="mb-6 mt-2">
      <div className="flex items-center justify-center mb-2">
        <p className="text-sm text-[#BBBBBB]">Your workout plan</p>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="flex items-center">
          {workoutMachines.map((machine, index) => (
            <React.Fragment key={`${machine.id}-${index}`}>
              <div 
                className={`w-4 h-4 rounded-full ${machine.replaced ? 'bg-destructive' : 'bg-primary'} cursor-pointer flex items-center justify-center animate-fade-in`}
                onClick={() => handleDotClick(index)}
              >
                {index === openMachineIndex && (
                  <div className="w-2 h-2 rounded-full bg-white animate-scale-in"></div>
                )}
              </div>
              
              {index < workoutMachines.length - 1 && (
                <div className={`w-12 h-0.5 ${machine.replaced || workoutMachines[index + 1].replaced ? 'bg-destructive' : 'bg-primary'} origin-left animate-[scale-x_0.3s_ease-out] motion-safe:animate-[width_0.3s_ease-out]`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {workoutMachines.length > 0 && (
        <div className="flex justify-center mt-4">
          <Button 
            onClick={onCompleteWorkout}
            className={`px-8 ${hasReplacements ? 'bg-destructive hover:bg-destructive/90' : ''}`}
            type="button"
          >
            {hasReplacements ? "Redo My Workout" : "Complete Workout"}
          </Button>
        </div>
      )}

      <Dialog open={openMachineIndex !== null} onOpenChange={(open) => !open && handleCloseDialog()}>
        {selectedMachine && (
          <DialogContent 
            className="bg-[#1A1A1A] border-[#3A3A3A] text-white"
            container={containerRef?.current}
          >
            <DialogHeader>
              <DialogTitle className="text-white">{selectedMachine.name}</DialogTitle>
              <DialogDescription className="text-gray-400">View machine details</DialogDescription>
            </DialogHeader>
            
            <div className="py-2">
              <div className="flex items-center gap-2 text-[#BBBBBB] mb-2">
                <Info className="h-4 w-4 text-primary" />
                <span>Machine Details</span>
              </div>
              
              <div className="p-3 border border-[#3A3A3A] rounded-md bg-[#2A2A2A]">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-xs text-[#BBBBBB]">Start Time:</div>
                  <div className="text-xs text-white font-medium">{selectedMachine.startTime}</div>
                  
                  <div className="text-xs text-[#BBBBBB]">End Time:</div>
                  <div className="text-xs text-white font-medium">{selectedMachine.endTime}</div>
                  
                  <div className="text-xs text-[#BBBBBB]">Duration:</div>
                  <div className="text-xs text-white font-medium">
                    {calculateDuration(selectedMachine.startTime, selectedMachine.endTime)} minutes
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="space-x-2">
              {onReplaceExercise && (
                <Button 
                  variant="outline"
                  className={`${selectedMachine.replaced ? 'bg-destructive text-white hover:bg-destructive/90' : 'bg-[#2A2A2A] border-[#3A3A3A] text-white'}`}
                  onClick={handleReplace}
                >
                  {selectedMachine.replaced ? "Undo Replacement" : "Replace Exercise"}
                </Button>
              )}
              <Button 
                variant="outline" 
                className="bg-[#2A2A2A] border-[#3A3A3A] text-white"
                onClick={handleCloseDialog}
              >
                Close
              </Button>
              <Button 
                variant="destructive"
                onClick={handleRemove}
              >
                <X className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

function calculateDuration(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  
  return endTotalMinutes - startTotalMinutes;
}
