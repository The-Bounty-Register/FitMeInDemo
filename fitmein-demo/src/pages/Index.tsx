
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <main className="p-6 pb-24 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">FitMeIn</h1>
          <p className="text-muted-foreground">
            Smart scheduling for a better workout experience
          </p>
        </header>

        <div className="grid gap-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="font-semibold">Smart Booking</h2>
                <p className="text-sm text-muted-foreground">
                  Let our AI plan your perfect workout schedule
                </p>
              </div>
            </div>
            <Button className="w-full" onClick={() => navigate("/auto-book")}>
              Book My Workout
            </Button>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="font-semibold">Manual Booking</h2>
                <p className="text-sm text-muted-foreground">
                  Choose specific machines and time slots
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/manual-book")}
            >
              Book a Machine
            </Button>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h2 className="font-semibold">My Bookings</h2>
                <p className="text-sm text-muted-foreground">
                  View and manage your upcoming sessions
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/bookings")}
            >
              View Bookings
            </Button>
          </Card>
        </div>
      </main>
      <BottomNav />
    </MobileLayout>
  );
}
