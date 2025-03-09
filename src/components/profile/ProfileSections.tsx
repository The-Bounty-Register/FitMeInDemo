
import { Calendar, Dumbbell, MapPin, ThumbsDown } from "lucide-react";
import { CollapsibleCard } from "./CollapsibleCard";

interface Workout {
  id: number;
  date: string;
  duration: string;
  location: string;
}

interface Booking {
  id: number;
  date: string;
  time: string;
  location: string;
}

interface Penalty {
  id: number;
  date: string;
  reason: string;
  amount: string;
}

interface ProfileSectionsProps {
  upcomingBookings: Booking[];
  pastWorkouts: Workout[];
  gyms: string[];
  penalties: Penalty[];
}

export const ProfileSections = ({ 
  upcomingBookings, 
  pastWorkouts, 
  gyms, 
  penalties 
}: ProfileSectionsProps) => {
  return (
    <>
      {/* Upcoming Bookings */}
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
    </>
  );
};
