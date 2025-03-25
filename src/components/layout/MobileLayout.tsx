
import { cn } from "@/lib/utils";
import { BottomNav } from "./BottomNav";
import { createContext, useContext, useEffect, useRef } from "react";
import { Slideshow } from "@/components/auth/Slideshow";
import { PageTransition } from "./PageTransition";

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
  forceScroll?: boolean; // Add optional prop to force scrolling
}

export function MobileLayout({
  children,
  className,
  frameColor = "#000000", // Changed from #222 to pure black
  showNav = true, // Default to showing nav
  forceScroll = false // Default to respecting overflow settings
}: MobileLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent body scrolling when component mounts
  useEffect(() => {
    if (!forceScroll) {
      // Save original styles
      const originalStyle = window.getComputedStyle(document.body).overflow;
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
      
      // Restore original styles when component unmounts
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [forceScroll]);

  return (
    <MobileLayoutContext.Provider value={{
      containerRef
    }}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#121212]/0 overflow-hidden mainPageCSSMagic">
        {/* Add Slideshow as background */}
        <Slideshow />
        <div className={cn(
          "w-full max-w-[380px] h-[700px] rounded-[3rem] overflow-hidden relative", 
          "border-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.65)]", // Increased shadow opacity from 0.55 to 0.65
          className
        )} style={{
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
            {/* Main content - allow scrolling within this container */}
            <div className="flex-1 overflow-y-auto scrollbar-hide relative" ref={containerRef}>
              <PageTransition>
                {children}
              </PageTransition>
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
    </MobileLayoutContext.Provider>
  );
}
