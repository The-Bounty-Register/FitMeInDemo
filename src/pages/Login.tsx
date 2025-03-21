
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
          <CardContent className="space-y-6">
            {/* QR Code Section */}
            <div className="flex flex-col items-center space-y-3 pb-2">
              <img 
                src="/lovable-uploads/9104fc23-0151-4ebc-9a0a-d2da0b519608.png" 
                alt="QR Code" 
                className="w-48 h-48 rounded-lg border-2 border-[#333333] bg-white p-2"
              />
              <p className="text-sm text-[#BBBBBB] text-center">Use above to enter the gym</p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#333333]"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#1A1A1A] px-2 text-[#888888]">OR ENTER CODE MANUALLY</span>
              </div>
            </div>
            
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
