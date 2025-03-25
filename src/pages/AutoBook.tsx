import { useState, useEffect } from "react";
import { format, addDays, addMinutes } from "date-fns";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { PageTransition } from "@/components/layout/PageTransition";
import { Dumbbell, ChevronRight, ChevronLeft, Clock, CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { addBooking } from "@/data/bookingsDatabase";
import { useNavigate } from "react-router-dom";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { toast } from "sonner";

const screenVariants = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: -200,
    transition: {
      duration: 0.3,
    },
  },
};

const TimePickerSelect = ({ value, onChange }: { value: string, onChange: (time: string) => void }) => {
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  
  const [selectedHour, selectedMinute] = value.split(':');
  
  return (
    <div className="flex gap-2 justify-center">
      <ScrollArea className="h-40 w-16 rounded-md border border-[#333333] bg-[#222222]">
        <div className="p-4">
          {hours.map((hour) => (
            <div
              key={hour}
              className={cn(
                "cursor-pointer py-1 text-center rounded-md hover:bg-[#333333]",
                hour === selectedHour 
                  ? "bg-[#1EAEDB]/20 text-[#1EAEDB]" 
                  : "text-[#C8C8C9]" // Changed from default to light grey #C8C8C9 for non-selected items
              )}
              onClick={() => onChange(`${hour}:${selectedMinute}`)}
            >
              {hour}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center text-lg">:</div>
      <ScrollArea className="h-40 w-16 rounded-md border border-[#333333] bg-[#222222]">
        <div className="p-4">
          {minutes.map((minute) => (
            <div
              key={minute}
              className={cn(
                "cursor-pointer py-1 text-center rounded-md hover:bg-[#333333]",
                minute === selectedMinute 
                  ? "bg-[#1EAEDB]/20 text-[#1EAEDB]" 
                  : "text-[#C8C8C9]" // Changed from default to light grey #C8C8C9 for non-selected items
              )}
              onClick={() => onChange(`${selectedHour}:${minute}`)}
            >
              {minute}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default function AutoBook() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  const [duration, setDuration] = useState(60);
  const [workoutGoal, setWorkoutGoal] = useState("");
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState<any[]>([]);
  const [hasReplacements, setHasReplacements] = useState(false);
  const [exercisesToReplace, setExercisesToReplace] = useState<number[]>([]);

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Select Date";
      case 2: return "Select Time";
      case 3: return "Workout Duration";
      case 4: return "Workout Goal";
      case 5: return "Preferences";
      case 6: return "Creating Workout";
      case 7: return "Your Workout Plan";
      default: return "Smart Booking";
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        
        if (exercisesToReplace.length > 0) {
          const updatedWorkout = [...workout];
          
          exercisesToReplace.forEach(index => {
            if (updatedWorkout[index]) {
              const alternatives = [
                {
                  machine: "Cable Crossovers",
                  description: "Focus on chest definition with cable flyes",
                  sets: 3,
                  reps: "12-15",
                  weight: "15"
                },
                {
                  machine: "Incline DB Press",
                  description: "Target upper chest with higher incline",
                  sets: 4,
                  reps: "8-10",
                  weight: "20"
                },
                {
                  machine: "Machine Flyes",
                  description: "Isolate chest with machine flyes",
                  sets: 3,
                  reps: "12-15",
                  weight: "40"
                },
                {
                  machine: "Push-ups",
                  description: "Bodyweight exercise for chest and core",
                  sets: 4,
                  reps: "15-20",
                  weight: ""
                },
                {
                  machine: "Leg Extensions",
                  description: "Isolate quadriceps with controlled movement",
                  sets: 3,
                  reps: "12-15",
                  weight: "50"
                }
              ];
              
              const randomIndex = Math.floor(Math.random() * alternatives.length);
              updatedWorkout[index] = {
                ...alternatives[randomIndex],
                replaced: !updatedWorkout[index].replaced,
                startTime: updatedWorkout[index].startTime,
                endTime: updatedWorkout[index].endTime
              };
            }
          });
          
          setWorkout(updatedWorkout);
          setExercisesToReplace([]);
          
          const stillHasReplacements = updatedWorkout.some(ex => ex.replaced);
          setHasReplacements(stillHasReplacements);
          
          toast.success("Workout updated with new exercises!");
        } else {
          generateWorkout();
        }
        
        setStep(7);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [loading, exercisesToReplace]);

  const generateWorkout = () => {
    const mockExercises = [
      {
        machine: "Bench Press",
        description: "Barbell bench press focusing on upper chest",
        sets: 4,
        reps: "8-10",
        weight: "70"
      },
      {
        machine: "Incline Dumbbell Press",
        description: "Target upper chest with dumbbell press on incline bench",
        sets: 3,
        reps: "10-12",
        weight: "22"
      },
      {
        machine: "Cable Flyes",
        description: "Cable crossovers for chest definition",
        sets: 3,
        reps: "12-15",
        weight: "15"
      },
      {
        machine: "Ab Crunch Machine",
        description: "Targeted ab workout using the crunch machine",
        sets: 3,
        reps: "15-20",
        weight: ""
      },
      {
        machine: "Hanging Leg Raises",
        description: "Advanced ab exercise for lower abs",
        sets: 3,
        reps: "12-15",
        weight: ""
      }
    ];

    const startTimeObj = time.split(':').map(Number);
    const startDateTime = new Date();
    startDateTime.setHours(startTimeObj[0], startTimeObj[1], 0, 0);
    
    const exerciseDuration = Math.floor(duration / mockExercises.length);
    
    const workoutWithTimes = mockExercises.map((exercise, index) => {
      const exerciseStartTime = addMinutes(startDateTime, index * exerciseDuration);
      const exerciseEndTime = addMinutes(exerciseStartTime, exerciseDuration);
      
      return {
        ...exercise,
        startTime: format(exerciseStartTime, 'HH:mm'),
        endTime: format(exerciseEndTime, 'HH:mm'),
        replaced: false
      };
    });
    
    setWorkout(workoutWithTimes);
    setHasReplacements(false);
  };

  const handleNext = () => {
    if (step === 5) {
      setLoading(true);
      setStep(6);
      return;
    }
    
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirm = () => {
    if (selectedDate) {
      const booking = {
        id: Date.now(),
        date: format(selectedDate, 'MMMM d, yyyy'),
        time: `${time} - ${calculateEndTime(time, duration)}`,
        location: "Smart Workout",
        machines: workout.map(exercise => ({
          machine: exercise.machine,
          description: exercise.description || "Workout exercise",
          sets: exercise.sets,
          reps: exercise.reps,
          startTime: exercise.startTime,
          endTime: exercise.endTime
        }))
      };
      
      addBooking(booking);
      
      toast.success("Workout booked successfully!");
      
      navigate('/thank-you');
    }
  };

  const handleToggleReplaceExercise = (index: number) => {
    const updatedWorkout = [...workout];
    updatedWorkout[index] = {
      ...updatedWorkout[index],
      replaced: !updatedWorkout[index].replaced
    };
    
    setWorkout(updatedWorkout);
    
    const hasAnyReplacement = updatedWorkout.some(ex => ex.replaced);
    setHasReplacements(hasAnyReplacement);
  };

  const handleRedoWorkout = () => {
    const indicesToReplace = workout
      .map((exercise, index) => exercise.replaced ? index : -1)
      .filter(index => index !== -1);
    
    if (indicesToReplace.length > 0) {
      setExercisesToReplace(indicesToReplace);
      setLoading(true);
      setStep(6);
    }
  };

  const calculateEndTime = (startTime: string, durationMinutes: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };

  const disabledDates = {
    before: new Date(),
    after: addDays(new Date(), 5),
  };

  return (
    <MobileLayout frameColor="#000000" forceScroll={step === 7}>
      <main className="p-6 pb-24 bg-[#1A1A1A] min-h-full">
        <header className="space-y-2 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-white">{getStepTitle()}</h1>
            {step > 1 && step < 6 && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrev}
                className="h-8 w-8 text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
          </div>
        </header>

        {step === 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariants}
            className="space-y-6"
          >
            <div className="flex justify-center mb-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={disabledDates}
                className="rounded-md border border-[#333333] bg-[#222222]"
              />
            </div>
            <Button
              onClick={handleNext}
              className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
              disabled={!selectedDate}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariants}
            className="space-y-6"
          >
            <div className="bg-[#222222] p-4 rounded-lg border border-[#333333] mb-6">
              <div className="flex items-center mb-3">
                <CalendarIcon className="mr-2 h-4 w-4 text-[#1EAEDB]" />
                <span className="text-sm text-white">{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
              </div>
            </div>
            
            <div className="text-center mb-3">
              <p className="text-white mb-4">Select your workout start time:</p>
              <TimePickerSelect value={time} onChange={setTime} />
            </div>
            
            <Button
              onClick={handleNext}
              className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariants}
            className="space-y-6"
          >
            <div className="bg-[#222222] p-4 rounded-lg border border-[#333333] mb-6">
              <div className="flex items-center mb-3">
                <CalendarIcon className="mr-2 h-4 w-4 text-[#1EAEDB]" />
                <span className="text-sm text-white">{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-[#1EAEDB]" />
                <span className="text-sm text-white">Starting at {time}</span>
              </div>
            </div>
            
            <div className="text-white mb-6">
              <p className="mb-4">How long do you want to work out?</p>
              <div className="px-2">
                <Slider
                  defaultValue={[duration]}
                  max={180}
                  min={30}
                  step={30}
                  onValueChange={(value) => setDuration(value[0])}
                />
                <div className="flex justify-between mt-2 text-sm text-[#BBBBBB]">
                  <span>30m</span>
                  <span>60m</span>
                  <span>90m</span>
                  <span>120m</span>
                  <span>150m</span>
                  <span>180m</span>
                </div>
              </div>
              <div className="text-center mt-6 text-xl font-semibold text-[#1EAEDB]">
                {duration} minutes
              </div>
            </div>
            
            <Button
              onClick={handleNext}
              className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariants}
            className="space-y-6"
          >
            <div className="bg-[#222222] p-4 rounded-lg border border-[#333333] mb-6">
              <div className="flex items-center mb-3">
                <CalendarIcon className="mr-2 h-4 w-4 text-[#1EAEDB]" />
                <span className="text-sm text-white">{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center mb-3">
                <Clock className="mr-2 h-4 w-4 text-[#1EAEDB]" />
                <span className="text-sm text-white">{time} - {calculateEndTime(time, duration)}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-white">{duration} minutes workout</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="block text-white">
                What are your workout goals today?
                <span className="block text-xs text-[#BBBBBB] mt-1">
                  (Max 20 words - e.g. "I would like to train chest with a focus on upper chest and add some abs exercises at the end")
                </span>
              </label>
              <Textarea
                value={workoutGoal}
                onChange={(e) => setWorkoutGoal(e.target.value)}
                placeholder="Describe your workout goals..."
                className="h-32 bg-[#222222] text-white border-[#333333]"
              />
              <div className="text-right text-xs text-[#BBBBBB]">
                {workoutGoal.split(/\s+/).filter(Boolean).length}/20 words
              </div>
            </div>
            
            <Button
              onClick={handleNext}
              className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
              disabled={!workoutGoal.trim() || workoutGoal.split(/\s+/).filter(Boolean).length > 20}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariants}
            className="space-y-6"
          >
            <div className="bg-[#222222] p-4 rounded-lg border border-[#333333] mb-6">
              <div className="flex items-center mb-3">
                <CalendarIcon className="mr-2 h-4 w-4 text-[#1EAEDB]" />
                <span className="text-sm text-white">{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center mb-3">
                <Clock className="mr-2 h-4 w-4 text-[#1EAEDB]" />
                <span className="text-sm text-white">{time} - {calculateEndTime(time, duration)}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-white">{duration} minutes workout</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="block text-white">
                Do you have any preferences for machines or exercises?
                <span className="block text-xs text-[#BBBBBB] mt-1">
                  (E.g. "I don't like training with back machines")
                </span>
              </label>
              <Textarea
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="Describe your preferences..."
                className="h-32 bg-[#222222] text-white border-[#333333]"
              />
            </div>
            
            <Button
              onClick={handleNext}
              className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
            >
              Create My Workout <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariants}
            className="flex flex-col items-center justify-center h-[60vh]"
          >
            <div className="animate-spin mb-6">
              <Dumbbell className="h-16 w-16 text-[#1EAEDB]" />
            </div>
            <p className="text-white text-lg text-center">
              {exercisesToReplace.length > 0 
                ? "Updating your workout..." 
                : "Your workout is being curated..."}
            </p>
            <p className="text-[#BBBBBB] text-sm text-center mt-2">
              {exercisesToReplace.length > 0 
                ? "We're finding alternatives for selected exercises" 
                : "We're building a personalized plan based on your preferences"}
            </p>
          </motion.div>
        )}

        {step === 7 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariants}
            className="space-y-6"
          >
            <div className="bg-[#222222] p-4 rounded-lg border border-[#333333] mb-6">
              <div className="flex items-center mb-3">
                <CalendarIcon className="mr-2 h-4 w-4 text-[#1EAEDB]" />
                <span className="text-sm text-white">{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center mb-3">
                <Clock className="mr-2 h-4 w-4 text-[#1EAEDB]" />
                <span className="text-sm text-white">{time} - {calculateEndTime(time, duration)}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-white">{duration} minutes workout</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-white text-lg font-semibold">Your Personalized Workout Plan</h2>
              <div className="space-y-2">
                {workout.map((exercise, index) => (
                  <ExerciseCard 
                    key={index} 
                    exercise={exercise} 
                    index={index} 
                    onToggleReplace={handleToggleReplaceExercise}
                  />
                ))}
              </div>
            </div>
            
            <Button
              onClick={hasReplacements ? handleRedoWorkout : handleConfirm}
              className={cn(
                "w-full",
                hasReplacements 
                  ? "bg-destructive hover:bg-destructive/90 text-white" 
                  : "bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
              )}
            >
              {hasReplacements ? "Redo My Workout" : "Book This Workout"}
            </Button>
          </motion.div>
        )}
      </main>
    </MobileLayout>
  );
}
