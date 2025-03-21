
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoggingOut } = useAuth();
  const location = useLocation();

  // During logout transition, we always render children
  // This prevents flashes and double redirects
  if (isLoggingOut) {
    return children;
  }

  if (!isAuthenticated) {
    // Only redirect if not logging out
    return <Navigate to="/login" state={{ from: location, redirectState: location.state }} replace />;
  }

  return children;
}
