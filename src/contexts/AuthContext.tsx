
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (memberCode: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if user is already authenticated when the app loads
  useEffect(() => {
    // If not on login page and not authenticated, redirect to login
    if (!isAuthenticated && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const login = (memberCode: string) => {
    // In a real app, this would validate against a backend
    if (memberCode.length === 6 && !isNaN(Number(memberCode))) {
      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
      });
      
      // Get the redirect path or default to home page
      const from = location.state?.from?.pathname || "/";
      navigate(from); // Navigate to the intended page after login
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit member code",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
