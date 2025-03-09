
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSections } from "@/components/profile/ProfileSections";
import { userData } from "@/data/profileData";

export default function Profile() {
  return (
    <MobileLayout frameColor="#222">
      <main className="p-6 space-y-6 bg-[#1A1A1A]">
        <ProfileHeader 
          name={userData.name} 
          workoutScore={userData.workoutScore} 
        />
        
        <ProfileSections 
          upcomingBookings={userData.upcomingBookings}
          pastWorkouts={userData.pastWorkouts}
          gyms={userData.gyms}
          penalties={userData.penalties}
        />
      </main>
    </MobileLayout>
  );
}
