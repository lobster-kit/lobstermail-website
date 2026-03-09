import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { type GlossaryCategory } from "./glossary-categories";

export { GLOSSARY_CATEGORIES, type GlossaryCategory } from "./glossary-categories";

const GLOSSARY_DIR = path.join(process.cwd(), "content/glossary");

export interface GlossaryTerm {
  slug: string;
  title: string;
  shortDefinition: string;
  category: GlossaryCategory;
  relatedTerms: string[];
  relatedBlogSlugs: string[];
  date: string;
  updatedDate?: string;
  content: string;
}

function parseTerm(filename: string): GlossaryTerm {
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(GLOSSARY_DIR, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title ?? slug,
    shortDefinition: data.shortDefinition ?? "",
    category: data.category ?? "trending-ai",
    relatedTerms: data.relatedTerms ?? [],
    relatedBlogSlugs: data.relatedBlogSlugs ?? [],
    date: data.date ?? "",
    updatedDate: data.updatedDate,
    content,
  };
}

export const getAllTerms = cache(function getAllTerms(): GlossaryTerm[] {
  if (!fs.existsSync(GLOSSARY_DIR)) return [];

  const files = fs.readdirSync(GLOSSARY_DIR).filter((f) => f.endsWith(".mdx"));
  const terms = files.map(parseTerm);

  return terms.sort((a, b) =>
    a.title.localeCompare(b.title, "en", { sensitivity: "base" })
  );
});

export function getTermBySlug(slug: string): GlossaryTerm | null {
  const filePath = path.join(GLOSSARY_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseTerm(`${slug}.mdx`);
}

export function getAllTermSlugs(): string[] {
  if (!fs.existsSync(GLOSSARY_DIR)) return [];
  return fs
    .readdirSync(GLOSSARY_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getTermsByCategory(category: string): GlossaryTerm[] {
  return getAllTerms().filter((t) => t.category === category);
}

export function getAlphabetIndex(): Map<string, GlossaryTerm[]> {
  const map = new Map<string, GlossaryTerm[]>();
  for (const term of getAllTerms()) {
    const letter = term.title[0].toUpperCase();
    const group = map.get(letter) ?? [];
    group.push(term);
    map.set(letter, group);
  }
  return map;
}
