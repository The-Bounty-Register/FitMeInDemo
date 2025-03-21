
import { useState, useEffect } from "react";
import { MobileLayout } from "../components/layout/MobileLayout";
import { Calendar, Plus } from "lucide-react";
import { userData } from "@/data/profileData";
import { getAllBookings, deleteBooking, Booking } from "@/data/bookingsDatabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();
  
  // Load bookings from database when component mounts
  useEffect(() => {
    const loadBookings = () => {
      try {
        // Get user bookings from database
        const userBookings = getAllBookings();
        console.log("Loaded bookings:", userBookings);
        
        // Set all bookings
        setAllBookings(userBookings);
      } catch (error) {
        console.error("Error loading bookings:", error);
        toast.error("Failed to load bookings");
      }
    };
    
    loadBookings();
    
    // Add event listener to update bookings when localStorage changes
    window.addEventListener('storage', loadBookings);
    
    return () => {
      window.removeEventListener('storage', loadBookings);
    };
  }, []);
  
  const handleDelete = (id: number) => {
    try {
      // Delete booking from database
      deleteBooking(id);
      
      // Update state
      setAllBookings(allBookings.filter(booking => booking.id !== id));
      
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking. Please try again.");
    }
  };
  
  const handleAddBooking = () => {
    navigate("/manual-book");
  };
  
  return (
    <MobileLayout frameColor="#000000">
      <main className="p-6 pb-24">
        <header className="space-y-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">My Bookings</h1>
          <p className="text-[#BBBBBB]">
            View and manage your upcoming sessions
          </p>
        </header>
        
        {allBookings.length > 0 ? (
          <div className="space-y-6">
            <div className="rounded-lg bg-[#222222] border border-[#333333] p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#1EAEDB]" />
                  <h2 className="font-medium text-white">Upcoming Bookings</h2>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleAddBooking}
                  className="h-8 px-3"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Book
                </Button>
              </div>
              
              <ul className="space-y-3">
                {allBookings.map(booking => (
                  <li key={booking.id} className="flex justify-between items-start bg-[#2A2A2A] p-3 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{booking.date}</p>
                      <p className="text-sm text-[#BBBBBB]">{booking.location}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm text-[#1EAEDB]">{booking.time}</div>
                      <button 
                        onClick={() => handleDelete(booking.id)}
                        className="text-xs text-red-400 mt-1 opacity-75 hover:opacity-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-[#BBBBBB] mt-12 p-8 bg-[#222222] rounded-lg border border-[#333333]">
            <Calendar className="h-10 w-10 mx-auto mb-3 text-[#1EAEDB]" />
            <p className="text-white font-medium mb-1">No upcoming bookings</p>
            <p className="mb-6">Schedule a workout to see your bookings here</p>
            <Button onClick={handleAddBooking}>
              <Plus className="h-4 w-4 mr-1" />
              Book a Workout
            </Button>
          </div>
        )}
      </main>
    </MobileLayout>
  );
}
