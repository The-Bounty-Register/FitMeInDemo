import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RequireAuth } from "./components/auth/RequireAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AutoBook from "./pages/AutoBook";
import ManualBook from "./pages/ManualBook";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Navigate to="/fitmein" replace />
                </RequireAuth>
              }
            />
            <Route
              path="/fitmein"
              element={
                <RequireAuth>
                  <Index />
                </RequireAuth>
              }
            />
            <Route
              path="/auto-book"
              element={
                <RequireAuth>
                  <AutoBook />
                </RequireAuth>
              }
            />
            <Route
              path="/manual-book"
              element={
                <RequireAuth>
                  <ManualBook />
                </RequireAuth>
              }
            />
            <Route
              path="/bookings"
              element={
                <RequireAuth>
                  <Bookings />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;