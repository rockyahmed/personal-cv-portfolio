import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Bypass Next.js image optimization pipeline entirely.
    // Images are served directly from /public — no cache layer,
    // so replacing a file is reflected immediately on refresh.
    unoptimized: true,
    minimumCacheTTL: 0,
  },
};

export default nextConfig;

