import * as React from "react";

import { cn } from "@/lib/utils";

import SectionCorners from "./section-corners";

export function SectionWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full py-12 font-geist-sans", className)}>
      <SectionCorners />
      {children}
    </div>
  );
}

export function SectionHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header className={cn("mb-12 px-5 text-center", className)} {...props} />
  );
}

export function SectionTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mb-2 text-2xl font-semibold tracking-tight sm:text-3xl",
        className
      )}
    >
      {title}
    </h2>
  );
}

export function SectionDescription({
  description,
  className,
}: {
  description: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-sm text-balance text-muted-foreground sm:text-base",
        className
      )}
    >
      {description}
    </p>
  );
}

export function SectionContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("", className)} {...props} />;
}
