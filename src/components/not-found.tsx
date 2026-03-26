"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export default function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center gap-4",
        className
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-geist-pixel-square text-8xl">404</h1>
        <p className="font-geist-sans text-lg font-medium">Page Not Found</p>
      </div>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "default" }),
          "font-geist-sans transition-colors hover:bg-primary/80! active:scale-98"
        )}
      >
        Go to Home
        <HugeiconsIcon
          icon={ArrowRight02Icon}
          strokeWidth={2}
          className="size-4"
        />
      </Link>
    </div>
  );
}
