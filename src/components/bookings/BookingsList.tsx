
import React from "react";
import { Calendar } from "lucide-react";
import { ExtendedBooking } from "@/types/booking";
import { toast } from "sonner";
import { deleteBooking } from "@/data/bookingsDatabase";

interface BookingsListProps {
  bookings: ExtendedBooking[];
  onViewBooking: (booking: ExtendedBooking) => void;
  onBookingsChange: () => void;
}

export function BookingsList({ bookings, onViewBooking, onBookingsChange }: BookingsListProps) {
  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent card click
    try {
      // Delete booking from database
      deleteBooking(id);
      
      // Notify parent component about the change
      onBookingsChange();
      
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking. Please try again.");
    }
  };
  
  return (
    <div className="rounded-lg bg-[#222222] border border-[#333333] p-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#1EAEDB]" />
          <h2 className="font-medium text-white">Upcoming Bookings</h2>
        </div>
      </div>
      
      <ul className="space-y-3">
        {bookings.map(booking => (
          <li 
            key={booking.id} 
            className="flex justify-between items-start bg-[#2A2A2A] p-3 rounded-lg cursor-pointer hover:bg-[#333333] transition-colors"
            onClick={() => onViewBooking(booking)}
          >
            <div>
              <p className="font-medium text-white">{booking.date}</p>
              <p className="text-sm text-[#BBBBBB]">{booking.location}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-[#1EAEDB]">{booking.time}</div>
              <button 
                onClick={(e) => handleDelete(e, booking.id)}
                className="text-xs text-red-400 mt-1 opacity-75 hover:opacity-100"
              >
                Cancel
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
