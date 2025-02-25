import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const { toast } = useToast();

  const login = (memberCode: string) => {
    // In a real app, this would validate against a backend
    if (memberCode.length === 6 && !isNaN(Number(memberCode))) {
      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
      });
      navigate("/fitmein");
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