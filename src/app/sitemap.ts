import type { MetadataRoute } from "next";
import { getGuides } from "@/lib/docs";
import { getAllPosts, getAllTags, getPostsByTag } from "@/lib/blog";
import { getAllTerms } from "@/lib/glossary";

const BASE_URL = "https://lobstermail.ai";
const POSTS_PER_PAGE = 12;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getGuides();
  const posts = getAllPosts();
  const tags = getAllTags();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/compare`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/skill`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/glossary`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Blog pagination pages (page 2+)
  const totalBlogPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const blogPaginationPages: MetadataRoute.Sitemap = [];
  for (let p = 2; p <= totalBlogPages; p++) {
    blogPaginationPages.push({
      url: `${BASE_URL}/blog?page=${p}`,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  const docsPages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/docs/${guide.slug}`,
    lastModified: guide.lastUpdated ? new Date(guide.lastUpdated) : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedDate ? new Date(post.updatedDate) : post.date ? new Date(post.date) : undefined,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = tags
    .filter((tag) => getPostsByTag(tag).length >= 3)
    .map((tag) => ({
      url: `${BASE_URL}/blog/tag/${tag}`,
      changeFrequency: "weekly",
      priority: 0.5,
    }));

  // Tag pagination pages (page 2+ for tags with enough posts)
  const tagPaginationPages: MetadataRoute.Sitemap = [];
  for (const tag of tags) {
    const tagPosts = getPostsByTag(tag);
    if (tagPosts.length < 3) continue;
    const totalTagPages = Math.ceil(tagPosts.length / POSTS_PER_PAGE);
    for (let p = 2; p <= totalTagPages; p++) {
      tagPaginationPages.push({
        url: `${BASE_URL}/blog/tag/${tag}?page=${p}`,
        changeFrequency: "weekly",
        priority: 0.4,
      });
    }
  }

  const glossaryTerms = getAllTerms();
  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
    url: `${BASE_URL}/glossary/${term.slug}`,
    lastModified: term.updatedDate
      ? new Date(term.updatedDate)
      : term.date
        ? new Date(term.date)
        : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...blogPaginationPages,
    ...docsPages,
    ...blogPages,
    ...tagPages,
    ...tagPaginationPages,
    ...glossaryPages,
  ];
}
