import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Fix workspace root warning when pnpm lockfile exists in parent
  outputFileTracingRoot: path.join(process.cwd()),
  async headers() {
    return [
      {
        source: "/projects/world-of-hyatt/videos/:path*",
        headers: [{ key: "Content-Type", value: "video/mp4" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/work/bond-sai", destination: "/work/world-of-hyatt", permanent: true },
    ];
  },
};

export default nextConfig;
