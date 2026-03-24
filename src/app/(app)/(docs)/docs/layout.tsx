export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden">
      <div className="mx-auto px-5">{children}</div>
    </div>
  );
}
