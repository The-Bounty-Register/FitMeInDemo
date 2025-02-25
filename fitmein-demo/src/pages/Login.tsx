import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slideshow } from "@/components/auth/Slideshow";

export default function Login() {
  const [memberCode, setMemberCode] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(memberCode);
  };

  return (
    <MobileLayout className="bg-transparent">
      <Slideshow />
      <main className="flex items-center justify-center min-h-full p-6">
        <Card className="w-full max-w-sm bg-white/80 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Enter your member code to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={memberCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setMemberCode(value);
                  }}
                  className="text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </MobileLayout>
  );
}