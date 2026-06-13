"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  variant?: "default" | "circular";
}) {
  if (variant === "circular") {
    return (
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative inline-flex items-center justify-center",
          className
        )}
        value={value}
        {...props}
      >
        <svg className="block h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            className="fill-none stroke-border"
            strokeWidth={15}
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className="fill-none stroke-foreground/90"
            strokeWidth={15}
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * (value || 0)) / 100}
          />
        </svg>
      </ProgressPrimitive.Root>
    );
  }

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
