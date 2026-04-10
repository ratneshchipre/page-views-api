import { Metadata } from "next";

import NotFound from "@/components/not-found";

export const metadata: Metadata = {
  title: "404 \u2013 Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFoundPage() {
  return <NotFound />;
}
