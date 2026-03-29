import type { MetadataRoute } from "next";
import { getAllPosts } from "@/data/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const posts = getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/docs/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt || post.metadata.createdAt),
  }));

  const routes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogPosts];
}
