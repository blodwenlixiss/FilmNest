import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "../utlis/darkTheme";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {theme === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-muted rounded-md" align="center">
        {theme === "light" ? (
          <DropdownMenuItem
            className="p-2 cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="p-2 cursor-pointer"
            onClick={() => setTheme("light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
