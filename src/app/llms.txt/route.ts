import { getGuides } from "@/lib/docs";

export async function GET() {
  const guides = await getGuides();

  const guideLinks = guides
    .map((g) => `- [${g.title}](https://lobstermail.ai/docs/${g.slug}): ${g.description}`)
    .join("\n");

  const content = `# LobsterMail

> Email infrastructure for autonomous AI agents. Your agent creates its own email address — instantly, no human needed.

## Documentation

${guideLinks}

## Links

- [Homepage](https://lobstermail.ai)
- [API Base URL](https://api.lobstermail.ai)
- [OpenAPI Spec](https://api.lobstermail.ai/v1/docs/openapi)

## Quick Start

Install the SDK:
\`\`\`
npm install lobstermail
\`\`\`

## Optional

- [Full Documentation for LLMs](https://lobstermail.ai/llms-full.txt)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
