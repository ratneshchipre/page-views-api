import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden">
      <div className="mt-12 mb-6">
        <Logo />
      </div>
      <div className="mb-6 flex flex-col items-center gap-2 px-5 text-center font-geist-sans">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Track page views in seconds
        </h1>
        <p className="text-md text-balance sm:text-lg">
          A simple API to count visitors on any page. No setup, no dashboard.
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
        <div className="flex h-8 items-center rounded-full bg-zinc-50 px-4 font-geist-sans text-sm font-medium dark:bg-white/5">
          <span className="text-muted-foreground">Backed by</span>
          <span className="ml-1">no one</span>
        </div>
      </div>
      <div className="mb-12 w-full border-y px-5 py-12 text-center font-geist-sans">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Supported by the Best
        </h2>
        <p className="text-sm text-balance text-muted-foreground sm:text-base">
          Your sponsorship means a lot to open-source projects, including Page
          Views API.
        </p>
      </div>
    </div>
  );
}
