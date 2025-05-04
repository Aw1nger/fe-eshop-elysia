"use client";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeBtn = ({ className }: { className?: string }) => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      className={cn("items-center justify-center", className)}
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden size-5 opacity-100 transition-all duration-300 dark:block starting:opacity-0" />
      <Moon className="block size-5 opacity-100 transition-all duration-300 dark:hidden starting:opacity-0" />
      <span className="sr-only">Переключатель темы</span>
    </Button>
  );
};
