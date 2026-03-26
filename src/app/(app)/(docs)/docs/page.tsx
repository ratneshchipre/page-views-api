import { redirect } from "next/navigation";

export default function DocsRootPage() {
  return redirect("/docs/getting-started");
}
