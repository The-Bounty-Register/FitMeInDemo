import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check } from "lucide-react";
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
  
  // If no state is passed and user directly visits /thank-you, show a generic message
  const hasValidState = state && state.date && state.startTime && state.endTime;

  // Save booking to database when component mounts with valid state
  useEffect(() => {
    if (hasValidState && !bookingSaved) {
      try {
        const newBooking = {
          id: Date.now(), // Generate a unique ID
          date: format(new Date(state.date!), "MMMM d, yyyy"),
          time: `${state.startTime} - ${state.endTime}`,
          location: "Main Gym"
        };
        
        // Add booking to database
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

  return (
    <MobileLayout>
      <main className="p-6 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="h-14 w-14 bg-primary rounded-full flex items-center justify-center animate-scale-in">
              <Check className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white">Thank You!</h1>
          
          {hasValidState ? (
            <>
              <p className="text-lg">
                Your workout has been successfully booked.
              </p>
              
              <div className="bg-[#2A2A2A] p-4 rounded-lg max-w-sm mx-auto my-8">
                <p className="text-[#BBBBBB] mb-2">Booking Details:</p>
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
              No booking details available. Would you like to make a new booking?
            </p>
          )}
          
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              onClick={() => navigate("/")}
              className="py-6 text-lg font-semibold shadow-lg"
            >
              Return Home
            </Button>
            {!hasValidState && (
              <Button 
                onClick={() => navigate("/manual-book")}
                variant="outline" 
                className="py-6 text-lg font-semibold shadow-lg bg-[#2A2A2A] border-[#3A3A3A] text-white"
              >
                Make a New Booking
              </Button>
            )}
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
