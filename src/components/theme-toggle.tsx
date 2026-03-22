"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoonIcon, Sun01Icon } from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className={cn("size-8 rounded-md", className)} />;
  }

  const handleToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const Icon = resolvedTheme === "dark" ? MoonIcon : Sun01Icon;

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-8 cursor-pointer rounded-md hover:bg-accent",
          className
        )}
        onClick={handleToggle}
        aria-label="Toggle Mode"
      >
        <HugeiconsIcon icon={Icon} strokeWidth={2} className="size-4" />
        <span className="sr-only">Toggle Theme</span>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={3} className="font-geist-mono">
        <p>Toggle Mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
