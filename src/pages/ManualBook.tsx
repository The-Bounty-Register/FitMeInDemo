
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { MuscleGroupFilters } from "@/components/machines/MuscleGroupFilters";
import { DateTimeSelector } from "@/components/machines/DateTimeSelector";
import { gymMachines } from "@/data/gymData";
import { TimeRangePopup } from "@/components/workout/TimeRangePopup";
import { WorkoutChain, WorkoutMachine } from "@/components/workout/WorkoutChain";
import { parseTimeToMinutes } from "@/utils/timeUtils";
import { toast } from "sonner";
import { SearchBar } from "@/components/machines/SearchBar";
import { MachineList } from "@/components/machines/MachineList";
import { ManualBookHeader } from "@/components/machines/ManualBookHeader";

export default function ManualBook() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const [workoutMachines, setWorkoutMachines] = useState<WorkoutMachine[]>([]);
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(null);
  const [isTimePopupOpen, setIsTimePopupOpen] = useState(false);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  
  const selectedMachine = selectedMachineId !== null 
    ? gymMachines.find(m => m.id === selectedMachineId) 
    : null;
  
  const filteredMachines = gymMachines.filter((machine) => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || machine.muscleGroup === selectedFilter;
    
    let matchesTimeRange = true;
    if (startTime && endTime) {
      matchesTimeRange = machine.startTime >= startTime && machine.endTime <= endTime;
    }
    
    let isAvailableForWorkout = true;
    if (workoutMachines.length > 0) {
      const lastWorkoutMachine = workoutMachines[workoutMachines.length - 1];
      isAvailableForWorkout = parseTimeToMinutes(machine.startTime) >= parseTimeToMinutes(lastWorkoutMachine.endTime);
    }
    
    return matchesSearch && matchesFilter && matchesTimeRange && isAvailableForWorkout;
  });
  
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
  
  const handleAddToWorkout = (machineId: number) => {
    setSelectedMachineId(machineId);
    setIsTimePopupOpen(true);
  };
  
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
      
      toast.success(`${selectedMachine.name} added to your workout from ${start} to ${end}`);
    }
  };
  
  const handleRemoveMachine = (index: number) => {
    const updatedWorkout = [...workoutMachines];
    const removedMachine = updatedWorkout[index];
    updatedWorkout.splice(index, 1);
    setWorkoutMachines(updatedWorkout);
    
    toast.error(`${removedMachine.name} removed from your workout`);
    
    setIsWorkoutComplete(false);
  };
  
  const handleCompleteWorkout = (event: React.MouseEvent) => {
    event.preventDefault();
    
    console.log("Completing workout and navigating to thank you page");
    
    const bookingData = {
      date: selectedDate,
      startTime: startTime,
      endTime: endTime,
      machineCount: workoutMachines.length
    };
    
    toast.success(`Your workout with ${workoutMachines.length} machines has been scheduled`, {
      icon: <Check className="h-5 w-5 text-white" />,
    });
    
    navigate("/thank-you", { state: bookingData });
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
