
import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function EmptyBookings() {
  const navigate = useNavigate();
  
  return (
    <div className="text-center text-[#BBBBBB] mt-12 p-8 bg-[#222222] rounded-lg border border-[#333333]">
      <Calendar className="h-10 w-10 mx-auto mb-3 text-[#1EAEDB]" />
      <p className="text-white font-medium mb-1">No upcoming bookings</p>
      <p className="mb-6">Schedule a workout to see your bookings here</p>
      <Button onClick={() => navigate("/manual-book")}>
        Book a Workout
      </Button>
    </div>
  );
}
