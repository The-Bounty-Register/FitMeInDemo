import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}