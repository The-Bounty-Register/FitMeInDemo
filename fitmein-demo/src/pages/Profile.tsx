
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/layout/BottomNav";
import { User } from "lucide-react";

export default function Profile() {
  return (
    <MobileLayout>
      <main className="p-6 pb-24">
        <header className="space-y-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </header>
        <div className="flex flex-col items-center justify-center gap-4 mt-12">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="text-center text-muted-foreground">
            Profile feature coming soon
          </div>
        </div>
      </main>
      <BottomNav />
    </MobileLayout>
  );
}
