
import { Dumbbell, User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

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
              "flex flex-col items-center justify-center space-y-1 transition-colors relative",
              isActive
                ? "text-[#1EAEDB]" // Active item is blue
                : "text-[#DDDDDD] hover:text-[#33C3F0]" // Light text with blue hover
            )}
          >
            <Icon size={20} />
            <span className="text-xs font-medium">{label}</span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-4 w-6 h-1 bg-[#1EAEDB] rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
