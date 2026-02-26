import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  tags: string[];
  image?: string;
  author?: string;
  content: string;
  readingTime: number;
}

function getReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "").replace(/[#*`~\[\]()]/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 238));
}

export const getAllPosts = cache(function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      updatedDate: data.updatedDate,
      tags: data.tags ?? [],
      image: data.image,
      author: data.author,
      content,
      readingTime: getReadingTime(content),
    };
  });

  return posts.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });
});

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    updatedDate: data.updatedDate,
    tags: data.tags ?? [],
    image: data.image,
    author: data.author,
    content,
    readingTime: getReadingTime(content),
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

const POSTS_PER_PAGE = 12;

export function getPaginatedPosts(page: number) {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return { posts, currentPage, totalPages, totalPosts: allPosts.length };
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagSet = new Set<string>();
  for (const post of allPosts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string) {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getPaginatedPostsByTag(tag: string, page: number) {
  const allPosts = getPostsByTag(tag);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return { posts, currentPage, totalPages, totalPosts: allPosts.length };
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return [];

  const allPosts = getAllPosts().filter((p) => p.slug !== slug);
  const scored = allPosts.map((p) => ({
    post: p,
    score: p.tags.filter((t) => post.tags.includes(t)).length,
  }));

  scored.sort(
    (a, b) =>
      b.score - a.score ||
      new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
  );

  return scored.slice(0, limit).map((s) => s.post);
}

export function getAdjacentPosts(slug: string) {
  const allPosts = getAllPosts();
  const index = allPosts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index < allPosts.length - 1 ? allPosts[index + 1] : null,
    next: index > 0 ? allPosts[index - 1] : null,
  };
}

export function getPostsByAuthor(authorName: string): BlogPost[] {
  return getAllPosts().filter((p) => p.author === authorName);
}

export function extractFaqItems(
  content: string
): { question: string; answer: string }[] {
  const regex = /<FAQItem\s+question="([^"]+)">\s*([\s\S]*?)\s*<\/FAQItem>/g;
  const items: { question: string; answer: string }[] = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const answer = match[2]
      .replace(/<[^>]*>/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    items.push({ question: match[1], answer });
  }

  return items;
}
