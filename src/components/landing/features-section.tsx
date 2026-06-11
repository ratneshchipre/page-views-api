import { NerdIcon, SearchFocusIcon, ZapIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
  SectionWrapper,
} from "./section";

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

export default function FeaturesSection() {
  return (
    <SectionWrapper className="border-y">
      <SectionHeader>
        <SectionTitle title="Designed for simplicity" />
        <SectionDescription description="Integrate in seconds and start counting instantly." />
      </SectionHeader>
      <SectionContent className="grid grid-cols-1 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </SectionContent>
    </SectionWrapper>
  );
}
