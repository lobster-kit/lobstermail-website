import type { NextConfig } from "next";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    const fileRedirects: Array<{ source: string; destination: string; permanent: boolean }> = [];
    const redirectsPath = join(process.cwd(), "redirects.json");
    if (existsSync(redirectsPath)) {
      try {
        const data = JSON.parse(readFileSync(redirectsPath, "utf-8"));
        for (const r of data.redirects ?? []) {
          fileRedirects.push({
            source: r.source,
            destination: r.destination,
            permanent: true,
          });
        }
      } catch {}
    }

    return [
      // www → non-www canonical redirect
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.lobstermail.ai" }],
        destination: "https://lobstermail.ai/:path*",
        permanent: true,
      },
      ...fileRedirects,
    ];
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
