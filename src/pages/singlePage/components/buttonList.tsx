import { Button } from "@/components/ui/button";
import React from "react";

interface ButtonListProps {
  onMove: (
    currentTable: "planned" | "in_progress" | "watched",
    targetTable: "planned" | "in_progress" | "watched"
  ) => void;
  disabled: boolean;
}

export const ButtonList: React.FC<ButtonListProps> = ({ onMove, disabled }) => {
  return (
    <>
      <Button
        disabled={disabled}
        onClick={() => onMove("planned", "in_progress")}
        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-500 transition"
      >
        Add to Planned
      </Button>
      <Button
        onClick={() => onMove("planned", "watched")}
        disabled={disabled}
        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-500 transition"
      >
        Add to In Progress
      </Button>
      <Button
        onClick={() => onMove("in_progress", "watched")}
        disabled={disabled}
        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-500 transition"
      >
        Add to Watched
      </Button>
    </>
  );
};
