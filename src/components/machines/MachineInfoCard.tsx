
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, MapPin, Users } from "lucide-react";

interface MachineInfoCardProps {
  description: string;
  location: string;
  count: number;
}

export function MachineInfoCard({ description, location, count }: MachineInfoCardProps) {
  return (
    <div className="space-y-4">
      <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Info className="h-5 w-5 text-primary mb-1" />
            <h3 className="font-medium text-white mb-1">Description</h3>
            <p className="text-[#BBBBBB] text-sm">{description}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <MapPin className="h-5 w-5 text-primary mb-1" />
            <h3 className="font-medium text-white mb-1">Location</h3>
            <p className="text-[#BBBBBB] text-sm">{location}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Users className="h-5 w-5 text-primary mb-1" />
            <h3 className="font-medium text-white mb-1">Availability</h3>
            <p className="text-[#BBBBBB] text-sm">{count} machines available at the gym</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
