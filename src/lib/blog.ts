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
  tags: string[];
  image?: string;
  content: string;
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
      tags: data.tags ?? [],
      image: data.image,
      content,
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
    tags: data.tags ?? [],
    image: data.image,
    content,
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
