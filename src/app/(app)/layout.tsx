import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 overflow-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
