
import React from "react";
import { Dumbbell, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ExerciseProps {
  exercise: {
    machine: string;
    description: string;
    sets: number;
    reps: string;
    weight?: string;
    startTime?: string;
    endTime?: string;
    replaced?: boolean;
  };
  index: number;
  onToggleReplace?: (index: number) => void;
}

export function ExerciseCard({ exercise, index, onToggleReplace }: ExerciseProps) {
  const handleToggle = () => {
    if (onToggleReplace) {
      onToggleReplace(index);
    }
  };
  
  return (
    <Card className={cn(
      "p-4 border mb-3 animate-fade-in transition-colors", 
      exercise.replaced ? "bg-[#2A1A1A] border-destructive" : "bg-[#222222] border-[#333333]"
    )} style={{ animationDelay: `${index * 150}ms` }}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
            exercise.replaced ? "bg-destructive/10" : "bg-[#1EAEDB]/10" 
          )}>
            <Dumbbell className={cn(
              "h-5 w-5",
              exercise.replaced ? "text-destructive" : "text-[#1EAEDB]"
            )} />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">{exercise.machine}</h3>
            <p className="text-white text-opacity-90 text-sm">{exercise.description}</p>
            <div className="mt-2 text-xs text-[#BBBBBB]">
              {exercise.sets} sets • {exercise.reps} reps
            </div>
            {exercise.startTime && exercise.endTime && (
              <div className="mt-1 flex items-center gap-1 text-xs">
                <Clock className={cn(
                  "h-3 w-3",
                  exercise.replaced ? "text-destructive" : "text-[#1EAEDB]"
                )} />
                <span className={cn(
                  exercise.replaced ? "text-destructive" : "text-[#1EAEDB]"
                )}>
                  {exercise.startTime} - {exercise.endTime}
                </span>
              </div>
            )}
          </div>
        </div>
        {onToggleReplace && (
          <div className="flex-shrink-0">
            <Switch 
              checked={!!exercise.replaced}
              onCheckedChange={handleToggle}
              className={exercise.replaced ? "data-[state=checked]:bg-destructive" : ""}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
