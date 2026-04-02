"use client";

import useSWR from "swr";
import { getPageViews } from "@/data/page-views";
import { Skeleton } from "./ui/skeleton";

export default function VisitorCount() {
  const {
    data: views,
    isLoading,
    error,
  } = useSWR("page-views", () => getPageViews("/"), {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Reuse the data for 60 seconds
  });

  if (isLoading || error || views === undefined) {
    return <Skeleton className="inline-block h-6 w-7 align-middle" />;
  }

  const getOrdinal = (n: number) => {
    const remainder10 = n % 10;
    const remainder100 = n % 100;
    if (remainder10 === 1 && remainder100 !== 11) return "st";
    if (remainder10 === 2 && remainder100 !== 12) return "nd";
    if (remainder10 === 3 && remainder100 !== 13) return "rd";
    return "th";
  };

  return (
    <>
      {new Intl.NumberFormat().format(views)}
      <sup>{getOrdinal(views)}</sup>
    </>
  );
}
