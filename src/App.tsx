
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Index from "./pages/Index";
import AutoBook from "./pages/AutoBook";
import ManualBook from "./pages/ManualBook";
import MachineDetail from "./pages/MachineDetail";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/NotFound";
import { RequireAuth } from "./components/auth/RequireAuth";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <RequireAuth>
              <Index />
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
          path="/machine-detail/:id"
          element={
            <RequireAuth>
              <MachineDetail />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
