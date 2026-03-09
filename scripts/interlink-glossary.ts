/**
 * Scans all blog posts and inserts glossary links for the first
 * unlinked mention of each glossary term per post.
 *
 * Usage: npx tsx scripts/interlink-glossary.ts [--dry-run]
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const GLOSSARY_DIR = path.join(process.cwd(), "content/glossary");
const DRY_RUN = process.argv.includes("--dry-run");

interface TermEntry {
  slug: string;
  title: string;
  /** Patterns to match in blog text (title + common variations) */
  patterns: string[];
}

function loadGlossaryTerms(): TermEntry[] {
  if (!fs.existsSync(GLOSSARY_DIR)) return [];
  const files = fs.readdirSync(GLOSSARY_DIR).filter((f) => f.endsWith(".mdx"));

  return files.map((f) => {
    const slug = f.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(GLOSSARY_DIR, f), "utf-8");
    const { data } = matter(raw);
    const title = (data.title as string) ?? slug;

    // Build match patterns: the full title and the slug-derived form
    const patterns: string[] = [title];

    // If title has parenthetical like "DKIM (DomainKeys Identified Mail)",
    // also match just the acronym
    const acronymMatch = title.match(/^([A-Z0-9]{2,})\s*\(/);
    if (acronymMatch) {
      patterns.push(acronymMatch[1]);
    }

    return { slug, title, patterns };
  });
}

/** Check if a position in text is inside a markdown link, code block, or heading */
function isProtectedPosition(
  text: string,
  matchStart: number,
  matchEnd: number
): boolean {
  // Inside existing markdown link [text](url)
  // Check if this match is within [...] that is followed by (...)
  const before = text.slice(0, matchStart);
  const after = text.slice(matchEnd);

  // Inside link text: look for unmatched [ before us and ]( after us
  const lastOpenBracket = before.lastIndexOf("[");
  const lastCloseBracket = before.lastIndexOf("]");
  if (lastOpenBracket > lastCloseBracket) {
    // We're inside a [...] — check if it's a link
    const afterBracket = text.slice(lastOpenBracket);
    if (/^\[[^\]]*\]\(/.test(afterBracket)) return true;
  }

  // Inside link URL: look for ]( before us and ) after us
  const lastLinkOpen = before.lastIndexOf("](");
  if (lastLinkOpen !== -1) {
    const closeParen = text.indexOf(")", lastLinkOpen);
    if (closeParen >= matchEnd) return true;
  }

  // Inside inline code: count backticks before position
  const backticksBefore = (before.match(/`/g) || []).length;
  if (backticksBefore % 2 === 1) return true;

  // Inside heading line
  const lineStart = before.lastIndexOf("\n") + 1;
  const linePrefix = text.slice(lineStart, matchStart);
  if (/^#{1,6}\s/.test(linePrefix)) return true;

  // Inside code fence block
  const fencesBefore = (before.match(/^```/gm) || []).length;
  if (fencesBefore % 2 === 1) return true;

  // Inside JSX component tags
  if (/^<[A-Z]/.test(after) || /<\/[A-Z][^>]*>$/.test(before.slice(-50)))
    return false;
  // Inside frontmatter (between --- delimiters) — should not happen since we
  // operate on content only, but safety check
  const frontmatterEnd = text.indexOf("---", 3);
  if (frontmatterEnd !== -1 && matchStart < frontmatterEnd) return true;

  return false;
}

function interlinkPost(
  content: string,
  terms: TermEntry[]
): { content: string; linksAdded: string[] } {
  let result = content;
  const linksAdded: string[] = [];

  for (const term of terms) {
    for (const pattern of term.patterns) {
      // Word-boundary regex, case-insensitive
      const regex = new RegExp(`\\b(${escapeRegex(pattern)})\\b`, "i");
      const match = regex.exec(result);

      if (!match) continue;

      const matchStart = match.index;
      const matchEnd = matchStart + match[0].length;

      if (isProtectedPosition(result, matchStart, matchEnd)) continue;

      // Replace first occurrence with glossary link
      const link = `[${match[0]}](/glossary/${term.slug})`;
      result =
        result.slice(0, matchStart) + link + result.slice(matchEnd);
      linksAdded.push(term.slug);
      break; // Only link first matching pattern per term
    }
  }

  return { content: result, linksAdded };
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function main() {
  const terms = loadGlossaryTerms();
  if (terms.length === 0) {
    console.log("No glossary terms found.");
    return;
  }
  console.log(`Loaded ${terms.length} glossary terms`);

  if (!fs.existsSync(BLOG_DIR)) {
    console.log("Blog directory not found.");
    return;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  let totalLinks = 0;
  let filesModified = 0;

  // Sort terms by pattern length descending so longer terms match first
  // (e.g., "context engineering" before "context")
  const sortedTerms = [...terms].sort(
    (a, b) =>
      Math.max(...b.patterns.map((p) => p.length)) -
      Math.max(...a.patterns.map((p) => p.length))
  );

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const { content: newContent, linksAdded } = interlinkPost(
      content,
      sortedTerms
    );

    if (linksAdded.length > 0) {
      if (!DRY_RUN) {
        const updated = matter.stringify(newContent, data);
        fs.writeFileSync(filePath, updated);
      }
      console.log(
        `${DRY_RUN ? "[DRY RUN] " : ""}${file}: +${linksAdded.length} links (${linksAdded.join(", ")})`
      );
      totalLinks += linksAdded.length;
      filesModified++;
    }
  }

  console.log(
    `\n${DRY_RUN ? "[DRY RUN] " : ""}Done. ${totalLinks} links added across ${filesModified} files.`
  );
}

main();
