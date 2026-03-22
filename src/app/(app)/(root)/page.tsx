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
      <div className="mx-auto mb-12 px-4">
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
      <div className="mb-12 w-full border-y"></div>
    </div>
  );
}
