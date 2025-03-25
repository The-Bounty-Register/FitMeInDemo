
import { Booking } from "@/data/bookingsDatabase";

// Extended booking interface to include machines
export interface ExtendedBooking extends Booking {
  machines: {
    machine: string;
    description: string;
    sets: number;
    reps: string;
    startTime: string;
    endTime: string;
  }[];
}
