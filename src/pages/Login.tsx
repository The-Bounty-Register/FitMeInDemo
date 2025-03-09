
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [memberCode, setMemberCode] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(memberCode);
  };

  return (
    <MobileLayout className="bg-transparent" showNav={false}>
      <main className="flex items-center justify-center min-h-full p-6">
        <Card className="w-full max-w-sm bg-[#1A1A1A]/80 backdrop-blur border-[#333333]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
            <CardDescription className="text-[#BBBBBB]">
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
                  className="text-center text-2xl tracking-widest bg-[#222222] border-[#333333] text-white"
                  maxLength={6}
                />
              </div>
              <Button type="submit" className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </MobileLayout>
  );
}
