import SiteHeader from "@/components/site-header";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 overflow-hidden">{children}</main>
      {/* <SiteFooter /> */}
    </>
  );
}
