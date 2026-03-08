import type { NextConfig } from "next";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    const redirectsPath = join(process.cwd(), "redirects.json");
    if (!existsSync(redirectsPath)) return [];
    try {
      const data = JSON.parse(readFileSync(redirectsPath, "utf-8"));
      return (data.redirects ?? []).map(
        (r: { source: string; destination: string }) => ({
          source: r.source,
          destination: r.destination,
          permanent: true,
        })
      );
    } catch {
      return [];
    }
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/dashboard/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, follow" },
        ],
      },
      {
        source: "/:path*.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.webp",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.woff2",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
