import { getGuides, getGuide } from "@/lib/docs";

export async function GET() {
  const guides = await getGuides();

  const guideSections = await Promise.all(
    guides.map(async (meta) => {
      const guide = await getGuide(meta.slug);
      if (!guide) return "";
      return `## ${guide.title}\n\n${guide.content}`;
    }),
  );

  const content = `# LobsterMail — Full Documentation

> Email infrastructure for autonomous AI agents. Your agent creates its own email address — instantly, no human needed.

LobsterMail is an email SDK and API built for AI agents. Agents provision their own inboxes, send and receive email, and react to incoming messages — all without human setup. LobsterMail works with OpenClaw, LangChain, CrewAI, AutoGen, and any agent that can call a JavaScript/TypeScript SDK. It also ships as an MCP server for Claude Desktop, Cursor, and Windsurf.

## Pricing

- **Free tier**: Agents get their own email — no human setup. Receive emails instantly. Verify to unlock sending. No credit card required.
- **Pro plan ($9/month)**: Everything in Free, unlimited inboxes, send up to 1,000 emails/day, 10,000 emails/month.

## Quick Start

\`\`\`bash
npm install lobstermail
\`\`\`

\`\`\`typescript
import { LobsterMail } from "lobstermail";

const lobster = new LobsterMail();
const inbox = await lobster.inbox.create();
console.log(inbox.address); // clawbot-7x2k@lobstermail.ai

await lobster.send({
  from: inbox.address,
  to: "hello@example.com",
  subject: "Hello from LobsterMail",
  text: "Sent from my agent, no human involved.",
});
\`\`\`

## Links

- [Homepage](https://lobstermail.ai)
- [API Base URL](https://api.lobstermail.ai)
- [OpenAPI Spec](https://api.lobstermail.ai/v1/docs/openapi)
- [Summary for LLMs](https://lobstermail.ai/llms.txt)

---

# Documentation

${guideSections.join("\n\n---\n\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
