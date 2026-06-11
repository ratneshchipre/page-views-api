import * as React from "react";
import { getGitHubStargazerCount } from "@/data/github-stargazers";

import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
  SectionWrapper,
} from "./section";

const metrics = [
  {
    value: "25+",
    label: "Websites Using",
  },
  {
    value: "4.2K+",
    label: "Unique Visitors Tracked",
  },
];

async function GitHubStarsMetricCard() {
  const count = await getGitHubStargazerCount();
  return <MetricCard value={String(count)} label="GitHub Stars" />;
}

interface MetricCardProps {
  value: string;
  label: string;
}

function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 border-y border-dashed p-6 last:border-r-0 md:border-r">
      <p className="text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-base font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

export default function MetricsSection() {
  return (
    <SectionWrapper className="border-b">
      <SectionHeader>
        <SectionTitle title="Tracking across the web" />
        <SectionDescription description="A look at how Page Views API is being used across real projects." />
      </SectionHeader>
      <SectionContent className="grid grid-cols-1 md:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
        <React.Suspense
          fallback={<MetricCard value="—" label="GitHub Stars" />}
        >
          <GitHubStarsMetricCard />
        </React.Suspense>
      </SectionContent>
    </SectionWrapper>
  );
}
