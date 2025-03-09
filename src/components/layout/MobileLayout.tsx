
import { cn } from "@/lib/utils";
import { BottomNav } from "./BottomNav";
import { createContext, useContext, useRef } from "react";
import { Slideshow } from "@/components/auth/Slideshow";

// Create a context to provide the container reference
export const MobileLayoutContext = createContext<{
  containerRef: React.RefObject<HTMLDivElement> | null;
}>({
  containerRef: null
});

// Hook to use the container reference
export function useMobileContainer() {
  return useContext(MobileLayoutContext);
}
interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  frameColor?: string;
  showNav?: boolean; // Add optional prop to control nav visibility
}
export function MobileLayout({
  children,
  className,
  frameColor = "#222",
  showNav = true // Default to showing nav
}: MobileLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  return <MobileLayoutContext.Provider value={{
    containerRef
  }}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#121212]/0">
        {/* Add Slideshow as background */}
        <Slideshow />
        <div className={cn("w-full max-w-md h-[844px] rounded-[3rem] shadow-2xl overflow-hidden relative", "border-[14px]", className)} style={{
        borderColor: frameColor
      }}>
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-7 rounded-b-3xl z-10" style={{
          backgroundColor: frameColor
        }} />
          
          {/* Screen content */}
          <div className="h-full flex flex-col bg-[#1A1A1A] rounded-[2rem] overflow-hidden relative">
            {/* Status bar - transparent background */}
            <div className="h-7 z-10 bg-[#121212]/0" />
            {/* Main content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide relative" ref={containerRef}>
              {children}
            </div>
            {/* Bottom Nav - only show if showNav is true */}
            {showNav && <BottomNav />}
          </div>

          {/* Side buttons */}
          <div className="absolute top-[100px] -right-[14px] w-[2px] h-16" style={{
          backgroundColor: frameColor
        }} />
          <div className="absolute top-[150px] -left-[14px] w-[2px] h-12" style={{
          backgroundColor: frameColor
        }} />
          <div className="absolute top-[180px] -left-[14px] w-[2px] h-12" style={{
          backgroundColor: frameColor
        }} />
        </div>
      </div>
    </MobileLayoutContext.Provider>;
}
