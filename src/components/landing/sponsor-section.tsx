import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
  SectionWrapper,
} from "./section";

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

export default function SponsorSection() {
  return (
    <SectionWrapper>
      <SectionHeader className="mb-5!">
        <SectionTitle title="Support the project" />
        <SectionDescription description="Every contribution helps improve and maintain this API." />
      </SectionHeader>
      <div className="mb-12 flex justify-center">
        <Link
          href="https://github.com/sponsors/ratneshchipre"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "px-4 transition-colors active:scale-98"
          )}
        >
          Sponsor my work
        </Link>
      </div>
      <SectionContent className="grid grid-cols-1 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SponsorCard key={i} />
        ))}
      </SectionContent>
    </SectionWrapper>
  );
}
