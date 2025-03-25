
import { useState, useEffect } from "react";
import { MobileLayout } from "../components/layout/MobileLayout";
import { getAllBookings } from "@/data/bookingsDatabase";
import { toast } from "sonner";
import { BookingsList } from "@/components/bookings/BookingsList";
import { EmptyBookings } from "@/components/bookings/EmptyBookings";
import { BookingDetailsDialog } from "@/components/bookings/BookingDetailsDialog";
import { Booking } from "@/data/bookingsDatabase";

export default function Bookings() {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  
  // Load bookings from database when component mounts
  const loadBookings = () => {
    try {
      // Get user bookings from database
      const userBookings = getAllBookings();
      console.log("Loaded bookings:", userBookings);
      setAllBookings(userBookings);
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast.error("Failed to load bookings");
    }
  };
  
  useEffect(() => {
    loadBookings();
    
    // Add event listener to update bookings when localStorage changes
    window.addEventListener('storage', loadBookings);
    
    return () => {
      window.removeEventListener('storage', loadBookings);
    };
  }, []);
  
  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setDialogOpen(true);
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
            <BookingsList 
              bookings={allBookings} 
              onViewBooking={handleViewBooking}
              onBookingsChange={loadBookings}
            />
          </div>
        ) : (
          <EmptyBookings />
        )}
      </main>

      {/* Booking Details Dialog */}
      <BookingDetailsDialog
        booking={selectedBooking}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onBookingDeleted={loadBookings}
      />
    </MobileLayout>
  );
}
