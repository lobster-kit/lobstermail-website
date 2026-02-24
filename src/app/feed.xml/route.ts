import { getGuides } from "@/lib/docs";

export async function GET() {
  const guides = await getGuides();

  const items = guides
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

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LobsterMail Docs</title>
    <link>https://lobstermail.ai/docs</link>
    <description>Documentation for LobsterMail — email infrastructure for autonomous AI agents.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://lobstermail.ai/feed.xml" rel="self" type="application/rss+xml"/>
${items}
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
