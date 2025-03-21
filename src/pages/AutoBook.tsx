
import { MobileLayout } from "@/components/layout/MobileLayout";

export default function AutoBook() {
  return (
    <MobileLayout frameColor="#000000">
      <main className="p-6 pb-24">
        <header className="space-y-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">Smart Booking</h1>
          <p className="text-[#BBBBBB]">
            Let our AI plan your perfect workout schedule
          </p>
        </header>
        <div className="text-center text-[#BBBBBB] mt-12">
          Smart booking feature coming soon
        </div>
      </main>
    </MobileLayout>
  );
}
