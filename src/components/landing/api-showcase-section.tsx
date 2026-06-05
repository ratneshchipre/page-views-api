import VisitorCount from "@/components/visitor-count";

import { SectionContent, SectionWrapper } from "./section";

export default function ApiShowcaseSection() {
  return (
    <SectionWrapper className="border-t">
      <SectionContent className="flex justify-center">
        <div className="flex h-8 items-center rounded-full bg-zinc-50 px-4 font-geist-sans text-sm font-medium dark:bg-white/5">
          <span className="font-geist-pixel-square tracking-wide text-muted-foreground">
            You&apos;re the{" "}
            <span className="text-foreground">
              <VisitorCount />
            </span>{" "}
            visitor
          </span>
        </div>
      </SectionContent>
    </SectionWrapper>
  );
}
