
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return <MobileLayout frameColor="#222">
      <main className="p-6 space-y-8 bg-[#1A1A1A]">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">FitMeIn</h1>
          <p className="text-white text-opacity-90">
            Smart scheduling for a better workout experience
          </p>
        </header>

        <div className="grid gap-4">
          <Card className="p-6 space-y-4 bg-[#222222] border border-[#333333] shadow-sm rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#1EAEDB]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1EAEDB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4"></path>
                  <path d="m16.24 7.76-2.12 2.12"></path>
                  <circle cx="12" cy="12" r="8"></circle>
                  <path d="m12 16 3-3"></path>
                </svg>
              </div>
              <div className="space-y-1">
                <h2 className="font-semibold text-white">Smart Booking</h2>
                <p className="text-sm text-white text-opacity-90">
                  Let our AI plan your perfect workout schedule
                </p>
              </div>
            </div>
            <Button className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white" onClick={() => navigate("/auto-book")}>
              Book My Workout
            </Button>
          </Card>

          <Card className="p-6 space-y-4 bg-[#222222] border border-[#333333] shadow-sm rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#1EAEDB]/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[#1EAEDB]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-semibold text-white">Manual Booking</h2>
                <p className="text-sm text-white text-opacity-90">
                  Choose specific machines and time slots
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-black/50 text-white border-[#333333] hover:bg-[#1EAEDB]/10 hover:text-white hover:border-[#1EAEDB]" onClick={() => navigate("/manual-book")}>
              Create a Workout
            </Button>
          </Card>

          <Card className="p-6 space-y-4 bg-[#222222] border border-[#333333] shadow-sm rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-[#1EAEDB]/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-[#1EAEDB]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-semibold text-white">My Bookings</h2>
                <p className="text-sm text-white text-opacity-90">
                  View and manage your upcoming sessions
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-black/50 text-white border-[#333333] hover:bg-[#1EAEDB]/10 hover:text-white hover:border-[#1EAEDB]" onClick={() => navigate("/bookings")}>
              View Bookings
            </Button>
          </Card>
        </div>
      </main>
    </MobileLayout>;
}
