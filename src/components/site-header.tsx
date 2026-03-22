import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import SiteHeaderWrapper from "./site-header-wrapper";
import DesktopNav from "./layout/desktop-nav";
import { NAV_ITEMS } from "@/config/site";
import NavItemGitHub from "./nav-item-github";
import { Separator } from "@/components/ui/separator";
import Logo from "./logo";

export default function SiteHeader() {
  return (
    <SiteHeaderWrapper className="sticky top-0 z-50 flex h-16 shrink-0 items-center overflow-hidden border-x border-t bg-background px-5 max-md:px-4">
      <div className="flex w-full items-center justify-between gap-4 font-geist-sans">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-7.5 w-7.5 rounded-md" svgClassName="h-4 w-4" />
            <p className="text-[1.1rem] font-semibold tracking-tight max-sm:hidden">
              Page Views API
            </p>
          </Link>
          <DesktopNav items={NAV_ITEMS} />
        </div>
        <div className="flex items-center gap-2">
          <NavItemGitHub />
          <div className="flex items-center justify-center">
            <Separator orientation="vertical" className="h-5" />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}
