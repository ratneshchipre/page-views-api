"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem as NavItemType } from "@/types/nav";
import { cn } from "@/lib/utils";

function NavItem({
  title,
  href,
  className,
}: NavItemType & { className?: string }) {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-2 py-1.5 font-geist-sans text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
        isActive ? "text-foreground" : "text-muted-foreground",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {title}
    </Link>
  );
}

export default function Nav({
  items,
  className,
}: {
  items: NavItemType[];
  className?: string;
}) {
  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {items.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
