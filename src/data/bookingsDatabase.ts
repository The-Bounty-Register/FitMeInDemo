
// Type definition for a booking
export interface Booking {
  id: number;
  date: string;
  time: string;
  location: string;
}

// Function to get all bookings
export function getAllBookings(): Booking[] {
  try {
    // Get bookings from localStorage
    const storedBookings = localStorage.getItem('userBookings');
    return storedBookings ? JSON.parse(storedBookings) : [];
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    return [];
  }
}

// Function to add a new booking
export function addBooking(booking: Booking): void {
  try {
    // Get existing bookings
    const existingBookings = getAllBookings();
    
    // Add new booking at the beginning of the array
    const updatedBookings = [booking, ...existingBookings];
    
    // Store in localStorage
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    console.log("Booking saved successfully:", booking);
  } catch (error) {
    console.error("Error saving booking:", error);
    throw error;
  }
}

// Function to delete a booking by id
export function deleteBooking(id: number): void {
  try {
    // Get existing bookings
    const existingBookings = getAllBookings();
    
    // Filter out the booking with the matching id
    const updatedBookings = existingBookings.filter(booking => booking.id !== id);
    
    // Update localStorage
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    console.log("Booking deleted successfully:", id);
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}
