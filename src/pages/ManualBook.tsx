
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Check } from "lucide-react";
import { MuscleGroupFilters } from "@/components/machines/MuscleGroupFilters";
import { DateTimeSelector } from "@/components/machines/DateTimeSelector";
import { gymMachines } from "@/data/gymData";
import { TimeRangePopup } from "@/components/workout/TimeRangePopup";
import { WorkoutChain, WorkoutMachine } from "@/components/workout/WorkoutChain";
import { parseTimeToMinutes } from "@/utils/timeUtils";
import { toast } from "@/hooks/use-toast";
import { SearchBar } from "@/components/machines/SearchBar";
import { MachineList } from "@/components/machines/MachineList";
import { ManualBookHeader } from "@/components/machines/ManualBookHeader";

export default function ManualBook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  // Workout creation state
  const [workoutMachines, setWorkoutMachines] = useState<WorkoutMachine[]>([]);
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(null);
  const [isTimePopupOpen, setIsTimePopupOpen] = useState(false);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  
  // Find the selected machine
  const selectedMachine = selectedMachineId !== null 
    ? gymMachines.find(m => m.id === selectedMachineId) 
    : null;
  
  // Filter machines based on search, filter, and time constraints
  const filteredMachines = gymMachines.filter((machine) => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || machine.muscleGroup === selectedFilter;
    
    let matchesTimeRange = true;
    if (startTime && endTime) {
      matchesTimeRange = machine.startTime >= startTime && machine.endTime <= endTime;
    }
    
    // Additional filtering based on workout
    let isAvailableForWorkout = true;
    if (workoutMachines.length > 0) {
      const lastWorkoutMachine = workoutMachines[workoutMachines.length - 1];
      isAvailableForWorkout = parseTimeToMinutes(machine.startTime) >= parseTimeToMinutes(lastWorkoutMachine.endTime);
    }
    
    return matchesSearch && matchesFilter && matchesTimeRange && isAvailableForWorkout;
  });
  
  // Check if all available time has been booked
  useEffect(() => {
    if (workoutMachines.length > 0 && endTime) {
      const lastMachineEndTime = workoutMachines[workoutMachines.length - 1].endTime;
      if (parseTimeToMinutes(lastMachineEndTime) >= parseTimeToMinutes(endTime)) {
        setIsWorkoutComplete(true);
      } else {
        setIsWorkoutComplete(false);
      }
    } else {
      setIsWorkoutComplete(false);
    }
  }, [workoutMachines, endTime]);
  
  // Handle adding machine to workout
  const handleAddToWorkout = (machineId: number) => {
    setSelectedMachineId(machineId);
    setIsTimePopupOpen(true);
  };
  
  // Handle time selection confirmation
  const handleConfirmTimeSelection = (start: string, end: string) => {
    if (selectedMachine) {
      const newWorkoutMachine: WorkoutMachine = {
        id: selectedMachine.id,
        name: selectedMachine.name,
        startTime: start,
        endTime: end
      };
      
      setWorkoutMachines([...workoutMachines, newWorkoutMachine]);
      setIsTimePopupOpen(false);
      setSelectedMachineId(null);
      
      toast({
        title: "Machine Added",
        description: `${selectedMachine.name} added to your workout from ${start} to ${end}`,
      });
    }
  };
  
  // Handle removing machine from workout
  const handleRemoveMachine = (index: number) => {
    const updatedWorkout = [...workoutMachines];
    const removedMachine = updatedWorkout[index];
    updatedWorkout.splice(index, 1);
    setWorkoutMachines(updatedWorkout);
    
    toast({
      title: "Machine Removed",
      description: `${removedMachine.name} removed from your workout`,
      variant: "destructive",
    });
    
    setIsWorkoutComplete(false);
  };
  
  // Handle workout completion
  const handleCompleteWorkout = () => {
    toast({
      title: "Workout Completed",
      description: `Your workout with ${workoutMachines.length} machines has been scheduled`,
      action: (
        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="h-5 w-5 text-white" />
        </div>
      ),
    });
    
    // Reset workout state
    setWorkoutMachines([]);
    setIsWorkoutComplete(false);
  };
  
  return (
    <MobileLayout>
      <main className="p-6 pb-24">
        <ManualBookHeader />

        <DateTimeSelector 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
        
        {/* Workout Chain */}
        {workoutMachines.length > 0 && (
          <WorkoutChain 
            workoutMachines={workoutMachines} 
            onRemoveMachine={handleRemoveMachine} 
            onCompleteWorkout={handleCompleteWorkout}
            isComplete={isWorkoutComplete}
          />
        )}

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <MuscleGroupFilters 
          selectedFilter={selectedFilter} 
          onFilterChange={setSelectedFilter} 
        />

        <MachineList 
          machines={filteredMachines}
          onAddToWorkout={handleAddToWorkout}
        />
        
        {/* Time Range Selection Popup */}
        {selectedMachine && (
          <TimeRangePopup
            isOpen={isTimePopupOpen}
            onClose={() => setIsTimePopupOpen(false)}
            onConfirm={handleConfirmTimeSelection}
            machineName={selectedMachine.name}
            availableStart={selectedMachine.startTime}
            availableEnd={selectedMachine.endTime}
          />
        )}
      </main>
    </MobileLayout>
  );
}
