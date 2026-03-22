export default async function DocsPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;

  return <div>DocsPage</div>;
}
