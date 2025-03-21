
import { useEffect, useState } from "react";
import { Dumbbell, LogOut, MapPin, ThumbsDown, Calendar } from "lucide-react";
import { CollapsibleCard } from "./CollapsibleCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getAllBookings, Booking } from "@/data/bookingsDatabase";

interface Workout {
  id: number;
  date: string;
  duration: string;
  location: string;
}

interface Penalty {
  id: number;
  date: string;
  reason: string;
  amount: string;
}

interface ProfileSectionsProps {
  pastWorkouts: Workout[];
  gyms: string[];
  penalties: Penalty[];
  upcomingBookings?: Booking[]; // Add upcomingBookings as an optional prop
}

export const ProfileSections = ({ 
  pastWorkouts, 
  gyms, 
  penalties,
  upcomingBookings: propUpcomingBookings
}: ProfileSectionsProps) => {
  const { logout } = useAuth();
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  
  // Load bookings from database
  useEffect(() => {
    try {
      // Get user bookings from database
      const userBookings = getAllBookings();
      console.log("Profile - loaded bookings:", userBookings);
      
      setUpcomingBookings(userBookings);
    } catch (error) {
      console.error("Error loading bookings in profile:", error);
    }
  }, []);
  
  return (
    <>
      {/* Upcoming Bookings Section */}
      <CollapsibleCard 
        title="Upcoming Bookings" 
        icon={<Calendar className="w-5 h-5 mr-0 text-[#1EAEDB]" />}
      >
        {upcomingBookings.length > 0 ? (
          <ul className="space-y-3">
            {upcomingBookings.map(booking => (
              <li key={booking.id} className="flex justify-between items-start bg-[#2A2A2A] p-3 rounded-lg">
                <div>
                  <p className="font-medium text-white">{booking.date}</p>
                  <p className="text-sm text-[#BBBBBB]">{booking.location}</p>
                </div>
                <div className="text-sm text-[#1EAEDB]">{booking.time}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#BBBBBB] text-sm">No upcoming bookings</p>
        )}
      </CollapsibleCard>
      
      {/* Past Workouts */}
      <CollapsibleCard 
        title="Past Workouts" 
        icon={<Dumbbell className="w-5 h-5 mr-0 text-[#1EAEDB]" />}
      >
        <ul className="space-y-3">
          {pastWorkouts.map(workout => (
            <li key={workout.id} className="flex justify-between items-start bg-[#2A2A2A] p-3 rounded-lg">
              <div>
                <p className="font-medium text-white">{workout.date}</p>
                <p className="text-sm text-[#BBBBBB]">{workout.location}</p>
              </div>
              <div className="text-sm text-[#BBBBBB]">{workout.duration}</div>
            </li>
          ))}
        </ul>
      </CollapsibleCard>
      
      {/* Gyms */}
      <CollapsibleCard 
        title="My Gyms" 
        icon={<MapPin className="w-5 h-5 mr-0 text-[#1EAEDB]" />}
      >
        <div className="flex flex-wrap gap-2">
          {gyms.map((gym, idx) => (
            <span 
              key={idx} 
              className="bg-[#2A2A2A] px-3 py-1 rounded-full text-sm text-white"
            >
              {gym}
            </span>
          ))}
        </div>
      </CollapsibleCard>
      
      {/* Penalties */}
      <CollapsibleCard 
        title="Penalties" 
        icon={<ThumbsDown className="w-5 h-5 mr-0 text-[#1EAEDB]" />}
      >
        {penalties.length > 0 ? (
          <ul className="space-y-3">
            {penalties.map(penalty => (
              <li key={penalty.id} className="flex justify-between items-start bg-[#2A2A2A] p-3 rounded-lg">
                <div>
                  <p className="font-medium text-white">{penalty.date}</p>
                  <p className="text-sm text-[#BBBBBB]">{penalty.reason}</p>
                </div>
                <div className="text-sm text-red-400">{penalty.amount}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#BBBBBB] text-sm">No penalties</p>
        )}
      </CollapsibleCard>
      
      {/* Logout Button right after Penalties section */}
      <Button 
        variant="destructive" 
        className="w-full mt-6"
        onClick={logout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </>
  );
}
