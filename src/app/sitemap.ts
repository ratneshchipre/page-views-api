import type { MetadataRoute } from "next";
import { getAllPosts } from "@/data/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://page-views-api.ratneshc.com";
  const posts = getAllPosts();

  const docs = posts.map((post) => ({
    url: `${baseUrl}/docs/${post.slug}`,
    lastModified: new Date(
      post.metadata.updatedAt || post.metadata.createdAt
    ).toISOString(),
  }));

  const routes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...docs];
}
