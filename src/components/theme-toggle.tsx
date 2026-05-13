"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useHotkeys } from "react-hotkeys-hook";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoonIcon, Sun01Icon } from "@hugeicons/core-free-icons";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const handleToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useHotkeys("d", handleToggle);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Skeleton className={cn("size-9 rounded-md", className)} />;
  }

  const Icon = resolvedTheme === "dark" ? MoonIcon : Sun01Icon;

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-9 cursor-pointer rounded-md hover:bg-accent",
          className
        )}
        onClick={handleToggle}
        aria-label="Toggle Mode"
      >
        <HugeiconsIcon icon={Icon} strokeWidth={2} className="size-4" />
        <span className="sr-only">Toggle Theme</span>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="py-2 pr-2 pl-3 font-geist-mono text-[0.85rem]"
      >
        <div className="flex items-center gap-2.5">
          Toggle Mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
