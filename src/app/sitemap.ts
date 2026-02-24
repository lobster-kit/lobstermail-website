import type { MetadataRoute } from "next";
import { getGuides } from "@/lib/docs";
import { getAllPosts, getAllTags } from "@/lib/blog";

const BASE_URL = "https://lobstermail.ai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getGuides();
  const posts = getAllPosts();
  const tags = getAllTags();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const docsPages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/docs/${guide.slug}`,
    lastModified: guide.lastUpdated ? new Date(guide.lastUpdated) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${BASE_URL}/blog/tag/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticPages, ...docsPages, ...blogPages, ...tagPages];
}
