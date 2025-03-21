
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (memberCode: string) => void;
  logout: () => void;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // This effect handles navigation when auth state changes
  // but we prevent it from running during logout to avoid double redirects
  useEffect(() => {
    // Skip this effect during logout process or if already on login page
    if (!isAuthenticated && !isLoggingOut && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoggingOut, location.pathname, navigate]);

  const login = (memberCode: string) => {
    if (memberCode.length === 6 && !isNaN(Number(memberCode))) {
      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
      });
      
      const from = location.state?.from?.pathname || "/";
      const redirectState = location.state?.redirectState;
      
      navigate(from, { state: redirectState });
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit member code",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    // Set logging out state to prevent redirect loop
    setIsLoggingOut(true);
    
    // Use a single navigation with state change
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
    
    // Clear the logging out state after animation completes
    setTimeout(() => {
      setIsLoggingOut(false);
    }, 300); // Reduced timeout to match animation duration
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoggingOut }}>
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
