import type { NextConfig } from "next";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const nextConfig: NextConfig = {
  async redirects() {
    const redirectsPath = join(process.cwd(), "..", "state", "redirects.json");
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
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
