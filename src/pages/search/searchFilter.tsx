import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SearchFilter({
  onTypeChange,
}: {
  onTypeChange: (type: string) => void;
}) {
  const { t } = useTranslation();
  const [type, setType] = useState("movie");

  const handleChange = (value: string) => {
    setType(value);
    onTypeChange(value);
  };
  return (
    <Select value={type} onValueChange={handleChange}>
      <SelectTrigger className="w-auto lg:w-[180px]">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="movie">{t("Movies")}</SelectItem>
          <SelectItem value="tv">{t("TVShows")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
