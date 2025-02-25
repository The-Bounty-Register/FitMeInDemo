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
          "w-full max-w-md h-[844px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative",
          // Phone frame styling
          "border-[14px] border-slate-100",
          // Inner shadow for depth
          "before:absolute before:inset-0 before:shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] before:pointer-events-none",
          className
        )}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-7 bg-slate-100 rounded-b-3xl z-20" />
        
        {/* Screen content */}
        <div className="h-full flex flex-col bg-background rounded-[2rem] overflow-hidden">
          {/* Status bar */}
          <div className="flex-1 overflow-y-auto scrollbar-hide pt-7 pb-16">
            {children}
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute top-[100px] -right-[14px] w-[2px] h-16 bg-zinc-700" />
        <div className="absolute top-[150px] -left-[14px] w-[2px] h-12 bg-zinc-700" />
        <div className="absolute top-[180px] -left-[14px] w-[2px] h-12 bg-zinc-700" />
      </div>
    </div>
  );
}