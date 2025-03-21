
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return <MobileLayout frameColor="#000000">
      <main className="p-6 space-y-6 bg-[#1A1A1A]">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">FitMeIn</h1>
          <p className="text-white text-opacity-90">
            Smart scheduling for a better workout experience
          </p>
        </header>

        <div className="grid gap-4">
          <Card className="p-4 space-y-3 bg-[#222222] border border-[#333333] shadow-sm rounded-xl">
            <div className="flex flex-col items-center text-center space-y-1.5">
              <div className="h-8 w-8 rounded-full bg-[#1EAEDB]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1EAEDB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4"></path>
                  <path d="m16.24 7.76-2.12 2.12"></path>
                  <circle cx="12" cy="12" r="8"></circle>
                  <path d="m12 16 3-3"></path>
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-semibold text-white text-sm">Smart Booking</h2>
                <p className="text-xs text-white text-opacity-90">
                  Let our AI plan your perfect workout schedule
                </p>
              </div>
            </div>
            <Button className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white text-sm py-1.5" onClick={() => navigate("/auto-book")}>
              Book My Workout
            </Button>
          </Card>

          <Card className="p-4 space-y-3 bg-[#222222] border border-[#333333] shadow-sm rounded-xl">
            <div className="flex flex-col items-center text-center space-y-1.5">
              <div className="h-8 w-8 rounded-full bg-[#1EAEDB]/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-[#1EAEDB]" />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-semibold text-white text-sm">Manual Booking</h2>
                <p className="text-xs text-white text-opacity-90">
                  Choose specific machines and time slots
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-black/50 text-white text-sm py-1.5 border-[#333333] hover:bg-[#1EAEDB]/10 hover:text-white hover:border-[#1EAEDB]" onClick={() => navigate("/manual-book")}>
              Create a Workout
            </Button>
          </Card>
        </div>
      </main>
    </MobileLayout>;
}
