
import { Dumbbell, User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { icon: Dumbbell, label: "FitMeIn", path: "/" },
    { icon: Calendar, label: "Bookings", path: "/bookings" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="h-16 bg-[#222222] border-t border-[#333333] flex items-center justify-around px-6">
      {navItems.map(({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 transition-colors",
              isActive
                ? "text-[#1EAEDB]" // Active item is blue
                : "text-[#DDDDDD] hover:text-[#33C3F0]" // Light text with blue hover
            )}
          >
            <Icon size={20} />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
