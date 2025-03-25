import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, Star, Dumbbell } from "lucide-react";
import { toast } from "sonner";
import { addBooking } from "@/data/bookingsDatabase";

interface LocationState {
  date?: Date;
  startTime?: string;
  endTime?: string;
  machineCount?: number;
}

export default function ThankYouPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [bookingSaved, setBookingSaved] = useState(false);
  
  const hasValidState = state && state.date && state.startTime && state.endTime;

  useEffect(() => {
    if (hasValidState && !bookingSaved) {
      try {
        const newBooking = {
          id: Date.now(),
          date: format(new Date(state.date!), "MMMM d, yyyy"),
          time: `${state.startTime} - ${state.endTime}`,
          location: "Main Gym",
          machines: []
        };
        
        addBooking(newBooking);
        console.log("Booking saved to database:", newBooking);
        setBookingSaved(true);
        toast.success("Your booking has been saved!");
      } catch (error) {
        console.error("Error saving booking:", error);
        toast.error("Failed to save your booking. Please try again.");
      }
    }
  }, [hasValidState, state, bookingSaved]);

  const motivationalMessages = [
    "Hooray! Your workout is now booked! We look forward to seeing you crush those goals! 💪",
    "Awesome! Your session is confirmed! Time to show that gym who's boss! 🔥",
    "Booking confirmed! Remember: sweat is just your fat crying! 😎",
    "You're all set! Get ready to turn those dreams into muscles! 💯",
    "Workout locked in! Your future self is already thanking you! 🙌"
  ];
  
  const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
  const motivationalMessage = motivationalMessages[randomIndex];

  return (
    <MobileLayout>
      <main className="p-6 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative h-24 w-24 mx-auto mb-4">
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="h-14 w-14 bg-primary rounded-full flex items-center justify-center animate-pulse">
                  <Check className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            
            <div className="absolute -top-2 -right-2 animate-bounce delay-100">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce delay-300">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="absolute top-1/2 -right-4 animate-pulse">
              <Dumbbell className="h-7 w-7 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white">You're All Set!</h1>
          
          {hasValidState ? (
            <>
              <p className="text-lg text-white px-4 leading-relaxed">
                {motivationalMessage}
              </p>
              
              <div className="bg-[#2A2A2A] p-4 rounded-lg max-w-sm mx-auto my-6 border border-[#3A3A3A] shadow-lg">
                <p className="text-[#BBBBBB] mb-2 font-semibold">Booking Details:</p>
                <p className="mb-2">
                  <span className="text-[#BBBBBB]">Date:</span> {format(new Date(state.date!), "PPPP")}
                </p>
                <p className="mb-2">
                  <span className="text-[#BBBBBB]">Time:</span> {state.startTime} - {state.endTime}
                </p>
                <p className="mb-2">
                  <span className="text-[#BBBBBB]">Machines:</span> {state.machineCount || 0}
                </p>
              </div>
            </>
          ) : (
            <p className="text-lg text-[#BBBBBB]">
              Ready to get your sweat on at the gym!
            </p>
          )}
          
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              onClick={() => navigate("/")}
              className="py-6 text-lg font-semibold shadow-lg"
            >
              Return Home
            </Button>
            {hasValidState && (
              <Button 
                onClick={() => navigate("/bookings")}
                variant="outline" 
                className="py-6 text-lg font-semibold shadow-lg bg-[#2A2A2A] border-[#3A3A3A] text-white"
              >
                View All Bookings
              </Button>
            )}
          </div>
        </div>
      </main>
    </MobileLayout>
  );
}
