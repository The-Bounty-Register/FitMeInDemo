
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { muscleGroups } from "@/data/gymData";

interface MuscleGroupFiltersProps {
  selectedFilter: string;
  onFilterChange: (filterId: string) => void;
}

export function MuscleGroupFilters({ selectedFilter, onFilterChange }: MuscleGroupFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
      {muscleGroups.map((group) => (
        <Button
          key={group.id}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full flex-shrink-0 px-4 border-[#3A3A3A]",
            selectedFilter === group.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
          )}
          onClick={() => onFilterChange(group.id)}
        >
          {group.label}
        </Button>
      ))}
    </div>
  );
}
