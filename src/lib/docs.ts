import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const DOCS_DIR = path.join(process.cwd(), "content/docs");

export interface GuideMeta {
  title: string;
  slug: string;
  order: number;
  description: string;
  lastUpdated: string;
}

export interface Guide extends GuideMeta {
  content: string; // raw MDX
}

export const getGuides = cache(function getGuides(): GuideMeta[] {
  if (!fs.existsSync(DOCS_DIR)) return [];

  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".mdx"));

  const guides = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(DOCS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title ?? slug,
      order: data.order ?? 99,
      description: data.description ?? "",
      lastUpdated: data.lastUpdated ?? "",
    };
  });

  return guides.sort((a, b) => a.order - b.order);
});

export function getGuide(slug: string): Guide | null {
  const filePath = path.join(DOCS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title ?? slug,
    order: data.order ?? 99,
    description: data.description ?? "",
    lastUpdated: data.lastUpdated ?? "",
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
