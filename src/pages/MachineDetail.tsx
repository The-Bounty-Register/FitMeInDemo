
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MachineInfoCard } from "@/components/machines/MachineInfoCard";
import { gymMachines } from "@/data/gymData";

export default function MachineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState(null);
  
  useEffect(() => {
    if (id) {
      const machineId = parseInt(id);
      const foundMachine = gymMachines.find(m => m.id === machineId);
      setMachine(foundMachine);
    }
  }, [id]);

  if (!machine) {
    return (
      <MobileLayout>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-white">Machine not found</h2>
          <Button 
            className="mt-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2" />
            Go Back
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <main className="p-6 pb-24">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-[#2A2A2A] border-[#3A3A3A] text-white hover:bg-[#3A3A3A]"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <header className="space-y-2 mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">{machine.name}</h1>
          <p className="text-[#BBBBBB] capitalize">
            {machine.muscleGroup} Machine
          </p>
        </header>

        <MachineInfoCard 
          description={machine.description}
          location={machine.location}
          count={machine.count}
        />
      </main>
    </MobileLayout>
  );
}
