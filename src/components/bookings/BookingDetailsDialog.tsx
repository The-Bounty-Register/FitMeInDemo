
import React from "react";
import { Info, Clock, X } from "lucide-react";
import { Booking } from "@/data/bookingsDatabase";
import { deleteBooking } from "@/data/bookingsDatabase";
import { Button } from "@/components/ui/button";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface BookingDetailsDialogProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingDeleted: () => void;
}

export function BookingDetailsDialog({ 
  booking, 
  open, 
  onOpenChange, 
  onBookingDeleted 
}: BookingDetailsDialogProps) {
  const handleDelete = () => {
    if (!booking) return;
    
    try {
      // Delete booking from database
      deleteBooking(booking.id);
      
      // Close dialog
      onOpenChange(false);
      
      // Notify parent that booking was deleted
      onBookingDeleted();
      
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking. Please try again.");
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
        {booking && (
          <>
            <DialogHeader>
              <DialogTitle className="text-white">Booking Details</DialogTitle>
              <DialogDescription className="text-gray-400">View your workout information</DialogDescription>
            </DialogHeader>
            
            <div className="py-2">
              <div className="flex items-center gap-2 text-[#BBBBBB] mb-2">
                <Info className="h-4 w-4 text-primary" />
                <span>Workout Information</span>
              </div>
              
              <div className="p-4 border border-[#3A3A3A] rounded-md bg-[#2A2A2A]">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-sm text-[#BBBBBB]">Date:</div>
                  <div className="text-sm text-white font-medium">{booking.date}</div>
                  
                  <div className="text-sm text-[#BBBBBB]">Time:</div>
                  <div className="text-sm text-white font-medium">{booking.time}</div>
                  
                  <div className="text-sm text-[#BBBBBB]">Location:</div>
                  <div className="text-sm text-white font-medium">{booking.location}</div>
                </div>
              </div>
              
              {/* Workout Machines Section */}
              <div className="mt-5">
                <div className="flex items-center gap-2 text-[#BBBBBB] mb-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Workout Machines</span>
                </div>
                
                {booking.machines && booking.machines.length > 0 ? (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                    {booking.machines.map((machine, idx) => (
                      <ExerciseCard 
                        key={idx}
                        exercise={machine}
                        index={idx}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center bg-[#2A2A2A] rounded-md">
                    <p className="text-[#BBBBBB]">No specific machines assigned to this workout.</p>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter className="space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row justify-end mt-4">
              <Button 
                variant="outline" 
                className="bg-[#2A2A2A] border-[#3A3A3A] text-white"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDelete}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel Booking
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
