
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileLayout({ children, className }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div
        className={cn(
          "w-full max-w-md h-[844px] bg-background rounded-[2.5rem] shadow-xl overflow-hidden relative",
          className
        )}
      >
        <div className="absolute top-0 left-0 right-0 h-7 bg-background z-10 flex items-center justify-center">
          <div className="w-32 h-[5px] bg-secondary rounded-full" />
        </div>
        <div className="h-full overflow-y-auto scrollbar-hide pt-7">
          {children}
        </div>
      </div>
    </div>
  );
}
