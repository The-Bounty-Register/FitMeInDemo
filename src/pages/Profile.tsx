
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSections } from "@/components/profile/ProfileSections";
import { userData } from "@/data/profileData";
import { Booking } from "@/data/bookingsDatabase";

// Extend userData to ensure upcomingBookings match the Booking type
const extendedUserData = {
  ...userData,
  upcomingBookings: userData.upcomingBookings.map(booking => {
    // Check if the booking already has machines property
    if ('machines' in booking) {
      return booking as Booking;
    }
    // Add machines property if it doesn't exist
    return {
      ...booking,
      machines: [] // Add empty machines array for profile data
    } as Booking;
  })
};

export default function Profile() {
  return (
    <MobileLayout frameColor="#000000">
      <main className="p-6 space-y-6 bg-[#1A1A1A]">
        <ProfileHeader 
          name={extendedUserData.name} 
          workoutScore={extendedUserData.workoutScore} 
        />
        
        <ProfileSections 
          upcomingBookings={extendedUserData.upcomingBookings}
          pastWorkouts={extendedUserData.pastWorkouts}
          gyms={extendedUserData.gyms}
          penalties={extendedUserData.penalties}
        />
      </main>
    </MobileLayout>
  );
}
