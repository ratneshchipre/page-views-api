import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import {
  NerdIcon,
  PlusSignIcon,
  SearchFocusIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import VisitorCount from "@/components/visitor-count";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden">
      <div className="relative flex w-full flex-col items-center">
        <SectionCorners />
        <div className="mt-12 mb-6">
          <Logo />
        </div>
        <div className="mb-4 flex justify-center">
          <div className="flex h-8 items-center rounded-full bg-zinc-50 px-4 font-geist-sans text-sm font-medium dark:bg-white/5">
            <span className="font-geist-pixel-square tracking-wide text-muted-foreground">
              You&apos;re the{" "}
              <span className="text-foreground">
                <VisitorCount />
              </span>{" "}
              visitor
            </span>
          </div>
        </div>
        <div className="mb-6 flex flex-col items-center gap-2 px-5 text-center font-geist-sans">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Track page views in seconds
          </h1>
          <p className="text-md text-balance sm:text-lg">
            An open-source API to count visitors on any page. Simple, no setup,
            no dashboard.
          </p>
        </div>
        <div className="mx-auto mb-6 px-4">
          <Link
            href="/docs/getting-started"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "cursor-pointer px-5 font-geist-sans transition-colors active:scale-98"
            )}
          >
            Get Started
          </Link>
        </div>
        <div className="mb-12 flex justify-center">
          <div className="flex h-8 items-center rounded-full bg-zinc-50 px-4 font-geist-pixel-square text-sm font-medium dark:bg-white/5">
            <span className="text-muted-foreground">Backed by</span>
            <span className="ml-1">no one</span>
          </div>
        </div>
      </div>
      <div className="relative w-full border-y py-12 font-geist-sans">
        <SectionCorners />
        <div className="mb-12 px-5 text-center">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Designed for simplicity
          </h2>
          <p className="text-sm text-balance text-muted-foreground sm:text-base">
            Integrate in seconds and start counting instantly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
      <div className="relative w-full py-12 font-geist-sans">
        <SectionCorners />
        <div className="mb-12 px-5 text-center">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Support the project
          </h2>
          <p className="mb-5 text-sm text-balance text-muted-foreground sm:text-base">
            Every contribution helps improve and maintain this API.
          </p>
          <Link
            href="https://github.com/sponsors/ratneshchipre"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "cursor-pointer px-4 font-geist-sans transition-colors active:scale-98"
            )}
          >
            Sponsor my work
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SponsorCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: ZapIcon,
    title: "Quick Integration",
    description:
      "Add a single script tag and start tracking instantly. No manual requests or setup needed.",
  },
  {
    icon: SearchFocusIcon,
    title: "Precision Tracking",
    description:
      "Track specific paths effortlessly and get meaningful insights instantly.",
  },
  {
    icon: NerdIcon,
    title: "Smart Deduplication",
    description:
      "Avoid duplicate counts with built-in visitor deduplication logic.",
  },
];

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-2 border-y border-dashed p-6 last:border-r-0 md:border-r">
      <div className="flex items-center gap-2 text-muted-foreground">
        <HugeiconsIcon icon={icon} strokeWidth={2} className="size-4" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="mt-1.5 text-base font-medium text-foreground">
        {description}
      </p>
    </div>
  );
}

function SponsorCard() {
  return (
    <Link
      href="https://github.com/sponsors/ratneshchipre"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-2 border-y border-dashed p-6 last:border-r-0 md:border-r"
    >
      <HugeiconsIcon
        icon={PlusSignIcon}
        strokeWidth={2}
        className="size-4.5 text-muted-foreground/50 transition-all ease-in-out group-hover:rotate-180 group-hover:text-foreground"
      />
    </Link>
  );
}

export function SectionCorners() {
  return (
    <>
      <div className="absolute -top-px left-0 h-1.5 w-1.5 border-t border-l border-foreground" />
      <div className="absolute -top-px right-0 h-1.5 w-1.5 border-t border-r border-foreground" />
      <div className="absolute -bottom-px left-0 h-1.5 w-1.5 border-b border-l border-foreground" />
      <div className="absolute right-0 -bottom-px h-1.5 w-1.5 border-r border-b border-foreground" />
    </>
  );
}
