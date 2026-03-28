import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts } from "@/data/docs";
import { MDX } from "@/components/mdx";
import { Prose } from "@/components/ui/typography";
import { LLMCopyButtonWithViewOptions } from "@/components/ai/page-actions";

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
    <div className="flex flex-col pt-8">
      <Prose className="font-geist-sans">
        <div className="flex items-start justify-between gap-5 max-sm:flex-col max-sm:gap-1">
          <div>
            <h1 className="-mb-2 text-3xl font-semibold tracking-tight">
              {post.metadata.title.includes("|")
                ? post.metadata.title.split("|")[0].trim()
                : post.metadata.title}
            </h1>
            <p className="text-muted-foreground max-sm:text-sm">
              Updated on:{" "}
              {post.metadata.updatedAt
                ? new Date(post.metadata.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : ""}
            </p>
          </div>
          <LLMCopyButtonWithViewOptions
            markdownUrl={`/docs/${post.slug}.mdx`}
          />
        </div>
        <div className="-mt-5">
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
