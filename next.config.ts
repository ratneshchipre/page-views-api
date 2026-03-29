import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/docs/:slug.mdx",
        destination: "/docs.mdx/:slug",
      },
    ];
  },
};

export default nextConfig;
