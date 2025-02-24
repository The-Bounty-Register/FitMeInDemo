
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/layout/BottomNav";

export default function Bookings() {
  return (
    <MobileLayout>
      <main className="p-6 pb-24">
        <header className="space-y-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage your upcoming sessions
          </p>
        </header>
        <div className="text-center text-muted-foreground mt-12">
          Bookings feature coming soon
        </div>
      </main>
      <BottomNav />
    </MobileLayout>
  );
}
