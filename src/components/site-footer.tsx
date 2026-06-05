import Link from "next/link";

import SectionCorners from "@/components/landing/section-corners";
import { SOURCE_CODE_GITHUB_URL } from "@/config/site";

import Logo from "./logo";

export default function SiteFooter() {
  return (
    <footer className="relative pb-2.5 after:absolute after:-inset-x-px after:bottom-0 after:h-2 after:bg-background">
      <div className="relative flex flex-col items-center justify-between gap-5 border-y p-6 font-geist-sans md:flex-row">
        <SectionCorners />
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-7.5 w-7.5 rounded-md" svgClassName="h-4 w-4" />
          <p className="text-[1.1rem] font-semibold tracking-tight max-sm:hidden">
            Page Views API
          </p>
        </Link>
        <p className="text-center text-sm text-balance text-muted-foreground">
          Built by{" "}
          <a
            className="font-medium text-foreground underline-offset-4 hover:underline"
            href="https://ratneshc.com"
            target="_blank"
            rel="noopener"
          >
            Ratnesh
          </a>
          . The source code is available on{" "}
          <a
            className="font-medium text-foreground underline-offset-4 hover:underline"
            href={SOURCE_CODE_GITHUB_URL}
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
