
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const CollapsibleCard = ({ title, icon, children }: CollapsibleCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-[#222222] border border-[#333333] shadow-sm rounded-xl">
      <CardHeader 
        className="pb-2 cursor-pointer py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-base flex items-center justify-between text-white">
          <div className="flex items-center">
            <span className="flex items-center justify-center">{icon}</span>
            <span className="ml-2">{title}</span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-[#1EAEDB] transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#1EAEDB] transition-transform duration-300" />
          )}
        </CardTitle>
      </CardHeader>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <CardContent className="pt-4">
          {children}
        </CardContent>
      </div>
    </Card>
  );
};
