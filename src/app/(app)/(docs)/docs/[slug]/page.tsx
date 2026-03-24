import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts } from "@/data/docs";
import { MDX } from "@/components/mdx";
import { Prose } from "@/components/ui/typography";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getAllPosts().find((post) => post.slug === slug);

  if (!post) {
    return notFound();
  }

  const { title, description, image, createdAt, updatedAt } = post.metadata;

  const ogImage = image || "/images/opengraph-image.png";

  return {
    title,
    description,
    // image: ogImage,
    // type: "article",
    // publishedTime: toIsoDate(createdAt),
    // modifiedTime: toIsoDate(updatedAt),
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;
  const post = getAllPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Prose className="font-geist-sans">
        <div>
          <MDX code={post.content} />
        </div>
      </Prose>
    </div>
  );
}

function toIsoDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}
