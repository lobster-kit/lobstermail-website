import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/dashboard/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "anthropic-ai"],
        allow: ["/blog/", "/docs/"],
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
    ],
    sitemap: "https://lobstermail.ai/sitemap.xml",
  };
}
