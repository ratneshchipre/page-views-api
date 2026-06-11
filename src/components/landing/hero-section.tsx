import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/logo";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
  SectionWrapper,
} from "./section";

export default function HeroSection() {
  return (
    <SectionWrapper className="flex flex-col items-center py-0!">
      <div className="mt-12 mb-6">
        <Logo />
      </div>
      <SectionHeader className="mb-6! flex flex-col items-center">
        <SectionTitle title="Track page views in seconds" />
        <SectionDescription
          description="An open-source API to count visitors on any page. Simple, no setup, no dashboard."
          className="text-md! text-foreground! sm:text-lg!"
        />
      </SectionHeader>
      <SectionContent>
        <div className="mx-auto mb-6 px-4">
          <Link
            href="/docs/getting-started"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-5 font-geist-sans transition-colors active:scale-98"
            )}
          >
            Get Started
          </Link>
        </div>
        <div className="mb-12 flex justify-center">
          <div className="flex h-8 items-center rounded-full bg-zinc-50 px-4 font-geist-pixel-square text-sm font-medium tracking-wide dark:bg-white/5">
            <span className="text-muted-foreground">Backed by</span>
            <span className="ml-1">no one</span>
          </div>
        </div>
      </SectionContent>
    </SectionWrapper>
  );
}
