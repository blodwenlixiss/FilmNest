import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function SearchFilter({
  onTypeChange,
}: {
  onTypeChange: (type: string) => void;
}) {
  const [type, setType] = useState("movie");

  const handleChange = (value: string) => {
    setType(value);
    onTypeChange(value); // Notify parent about the type change
  };
  return (
    <Select value={type} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="movie">Movie</SelectItem>
          <SelectItem value="tv">Tv Show</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
