import { getGuides } from "@/lib/docs";
import { getAllPosts } from "@/lib/blog";
import { getAllTerms } from "@/lib/glossary";

export async function GET() {
  const guides = await getGuides();
  const posts = getAllPosts();
  const terms = getAllTerms();

  const guideItems = guides
    .map(
      (guide) => `    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>https://lobstermail.ai/docs/${guide.slug}</link>
      <guid isPermaLink="true">https://lobstermail.ai/docs/${guide.slug}</guid>
      <description>${escapeXml(guide.description)}</description>
      <pubDate>${guide.lastUpdated ? new Date(guide.lastUpdated).toUTCString() : new Date().toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const blogItems = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://lobstermail.ai/blog/${post.slug}</link>
      <guid isPermaLink="true">https://lobstermail.ai/blog/${post.slug}</guid>
      <description>${escapeXml(post.description ?? "")}</description>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const glossaryItems = terms
    .map(
      (term) => `    <item>
      <title>${escapeXml(term.title)}</title>
      <link>https://lobstermail.ai/glossary/${term.slug}</link>
      <guid isPermaLink="true">https://lobstermail.ai/glossary/${term.slug}</guid>
      <description>${escapeXml(term.shortDefinition)}</description>
      <pubDate>${term.date ? new Date(term.date).toUTCString() : new Date().toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LobsterMail</title>
    <link>https://lobstermail.ai</link>
    <description>Email infrastructure for autonomous AI agents — docs, guides, and blog posts.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://lobstermail.ai/feed.xml" rel="self" type="application/rss+xml"/>
${blogItems}
${guideItems}
${glossaryItems}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
