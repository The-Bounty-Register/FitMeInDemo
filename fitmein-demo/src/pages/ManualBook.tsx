
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/layout/BottomNav";

export default function ManualBook() {
  return (
    <MobileLayout>
      <main className="p-6 pb-24">
        <header className="space-y-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Manual Booking</h1>
          <p className="text-muted-foreground">
            Choose specific machines and time slots
          </p>
        </header>
        <div className="text-center text-muted-foreground mt-12">
          Manual booking feature coming soon
        </div>
      </main>
      <BottomNav />
    </MobileLayout>
  );
}
