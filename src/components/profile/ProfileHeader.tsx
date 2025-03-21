
import { Trophy, User } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  workoutScore: number;
}

export const ProfileHeader = ({ name, workoutScore }: ProfileHeaderProps) => {
  return (
    <>
      <header className="space-y-2 mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Profile</h1>
          <p className="text-[#BBBBBB]">
            Manage your account and preferences
          </p>
        </div>
      </header>
      
      {/* User Profile */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-[#222222] shadow-md flex items-center justify-center">
          <User className="w-8 h-8 text-[#1EAEDB]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{name}</h2>
          <div className="flex items-center space-x-1 mt-1">
            <Trophy className="w-4 h-4 text-[#1EAEDB]" />
            <span className="text-sm text-[#BBBBBB]">Workout Score: {workoutScore}</span>
          </div>
        </div>
      </div>
    </>
  );
};
