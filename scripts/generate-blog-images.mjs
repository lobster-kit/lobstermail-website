import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const OUT_DIR = path.join(process.cwd(), "public/blog");
const FORCE = process.argv.includes("--force");

const STYLE =
  "Low-resolution pixel art drawn on a 256x144 pixel grid then scaled up, so each pixel block is large and clearly visible. Dark reddish-brown outlines, bright saturated orange body with darker orange and red-brown shading. Black dot eyes. No anti-aliasing, no smooth gradients, no sub-pixel detail. Props and accessories use muted, grounded colors — no neon, no rainbow, no candy colors. Calm neutral expression on the lobster. Wide landscape composition in 16:9 aspect ratio. White background. No text.";

const images = [
  {
    slug: "welcome-to-lobstermail",
    prompt: `A round-bodied orange lobster with two antennae and large claws, standing proudly at a workbench building a small mailbox from scratch with tools. A wrench in one claw and a freshly assembled mailbox in the other. Wood shavings on the bench. ${STYLE}`,
  },
  {
    slug: "what-is-agent-email",
    prompt: `A round-bodied orange lobster with two antennae and large claws, sitting at a small desk with a computer screen showing an inbox. A few white envelopes stacked on the desk. ${STYLE}`,
  },
  {
    slug: "why-agent-shouldnt-use-gmail",
    prompt: `A round-bodied orange lobster with two antennae and large claws, looking alarmed. One claw holds a red envelope marked with an X, the other claw holds a glowing green shield with a checkmark. ${STYLE}`,
  },
  {
    slug: "openclaw-agent-email-60-seconds",
    prompt: `A round-bodied orange lobster with two antennae, holding a stopwatch in one claw and a freshly opened envelope in the other. A large 60 in the background. ${STYLE}`,
  },
  {
    slug: "what-agents-do-with-email",
    prompt: `A round-bodied orange lobster with two antennae and large claws, sorting a stack of white envelopes on a desk into separate piles. ${STYLE}`,
  },
  {
    slug: "security-risks-sharing-inbox",
    prompt: `A round-bodied orange lobster with two antennae wearing a detective hat, holding a magnifying glass in one claw and examining an envelope. Suspicious envelopes with tiny skull icons scattered in the background. ${STYLE}`,
  },
  {
    slug: "prompt-injection-email-agents",
    prompt: `A round-bodied orange lobster with two antennae wearing a security guard cap, holding up one large claw in a stop gesture toward a glowing red suspicious email envelope. A shield icon next to the lobster. ${STYLE}`,
  },
  {
    slug: "lobstermail-vs-agentmail",
    prompt: `A round-bodied orange lobster with two antennae on the left side looking confident with claws crossed, and a generic boxy gray robot on the right side looking confused at a signup form. A VS symbol between them. ${STYLE}`,
  },
  {
    slug: "agent-self-signup-explained",
    prompt: `A round-bodied orange lobster with two antennae, emerging from a cracking egg that has an @ symbol on the shell. The lobster is climbing out on its own, no human hands visible. ${STYLE}`,
  },
  {
    slug: "build-support-agent-email",
    prompt: `A round-bodied orange lobster with two antennae, sitting behind a desk with a tiny headset resting on its head. A monitor shows incoming email tickets. A green checkmark stamp on one ticket. ${STYLE}`,
  },
  {
    slug: "automate-newsletter-inbox",
    prompt: `A round-bodied orange lobster with two antennae, sitting at a small table holding a newspaper-like digest in its claws. Stacks of tiny newsletters piled up behind it. A coffee mug nearby. ${STYLE}`,
  },
  {
    slug: "ai-agent-freelance-inbox",
    prompt: `A round-bodied orange lobster with two antennae wearing a cozy green vest, sitting at a desk with a laptop. Using its claws to sort invoices and client emails into neat organized piles. ${STYLE}`,
  },
  {
    slug: "multi-agent-email-coordination",
    prompt: `Three round-bodied orange lobsters with antennae arranged in a triangle, passing white envelopes between each other. Arrows showing the flow of mail between them. ${STYLE}`,
  },
  {
    slug: "email-deliverability-ai-agents",
    prompt: `A round-bodied orange lobster with two antennae, carefully placing an envelope into a green inbox tray with one claw. A red spam folder with an X on it sits off to the side. The lobster looks focused. ${STYLE}`,
  },
  {
    slug: "oauth-gmail-agents-painful",
    prompt: `A round-bodied orange lobster with two antennae, tangled up in a mess of cables and wires. The lobster looks frustrated and is holding scissors in one claw, ready to cut free. ${STYLE}`,
  },
  {
    slug: "lobstermail-pricing-explained",
    prompt: `A round-bodied orange lobster with two antennae, sitting next to a small pile of shells. A sign reading FREE next to the shells. The lobster holds a small price tag in one claw. ${STYLE}`,
  },
  {
    slug: "custom-domains-agent-email",
    prompt: `A round-bodied orange lobster with two antennae wearing a tiny business suit and tie, proudly holding up a name tag in one claw. A professional email letterhead floats in the background. ${STYLE}`,
  },
  {
    slug: "webhooks-vs-polling-email",
    prompt: `Two round-bodied orange lobsters side by side. One lobster holds a fishing rod (polling), the other has its claws open catching a ball flying toward it (webhooks). A fork in the road between them. ${STYLE}`,
  },
  {
    slug: "x-verification-gate-explained",
    prompt: `A round-bodied orange lobster with two antennae, holding up a phone in one claw. A golden verification checkmark floating above the lobster's head. A golden key nearby. ${STYLE}`,
  },
  {
    slug: "ai-agents-changing-email",
    prompt: `A round-bodied orange lobster with two antennae wearing a postal worker cap, standing at the edge of an old-fashioned postal office on the left that transforms into a futuristic digital hub on the right. Envelopes morphing into data streams. ${STYLE}`,
  },
  {
    slug: "future-of-agent-email",
    prompt: `A round-bodied orange lobster with two antennae wearing a tiny astronaut helmet, sitting on a cloud looking out at a futuristic cityscape. Data streams connecting buildings in the distance. A sunrise behind the city. ${STYLE}`,
  },
  {
    slug: "openclaw-email-options-compared",
    prompt: `A round-bodied orange lobster with two antennae wearing reading glasses, sitting at a desk with four colorful doors in front of it, each a different color. The lobster has one claw on its chin in a thinking pose, evaluating which door to open. ${STYLE}`,
  },
  {
    slug: "openclaw-use-cases-email",
    prompt: `A round-bodied orange lobster with two antennae and large claws, standing behind a long desk with five labeled trays. Each tray has a different icon above it: a headset, a megaphone, a calendar, a newspaper, and a chain link. ${STYLE}`,
  },
  {
    slug: "openclaw-email-without-pubsub",
    prompt: `A round-bodied orange lobster with two antennae, snipping through a tangled web of wires and tubes with one claw. A simple glowing envelope floats freely on the other side. ${STYLE}`,
  },
  {
    slug: "openclaw-email-skills-compared",
    prompt: `A round-bodied orange lobster with two antennae wearing a lab coat, standing in front of a whiteboard with a comparison chart drawn on it. Four test tubes in a rack nearby, each a different color. ${STYLE}`,
  },
  {
    slug: "openclaw-business-email",
    prompt: `A round-bodied orange lobster with two antennae wearing a tiny hard hat, carrying a briefcase in one claw and a blueprint rolled up in the other. A small storefront in the background. ${STYLE}`,
  },
  {
    slug: "openclaw-email-setup-60-seconds",
    prompt: `A round-bodied orange lobster with two antennae, racing across the screen with a trail of envelopes behind it. A large stopwatch in the background showing 60 seconds. Speed lines around the lobster. ${STYLE}`,
  },
  {
    slug: "openclaw-email-alternatives",
    prompt: `A round-bodied orange lobster with two antennae standing at a crossroads with multiple signposts pointing in different directions. Each sign has a different envelope icon style. ${STYLE}`,
  },
  {
    slug: "openclaw-agent-email-security",
    prompt: `A round-bodied orange lobster with two antennae wearing a knight's helmet, holding a shield in one claw and standing guard in front of a castle made of envelopes. ${STYLE}`,
  },
  {
    slug: "crewai-agent-email",
    prompt: `A round-bodied orange lobster with two antennae wearing a captain's hat, standing on the deck of a small ship. Three smaller lobsters in a crew line behind it, each holding an envelope. ${STYLE}`,
  },
  {
    slug: "langchain-email-integration",
    prompt: `A round-bodied orange lobster with two antennae, connecting chain links together with its claws. An envelope dangling from the end of the chain. A toolbox open nearby. ${STYLE}`,
  },
  {
    slug: "autogen-agent-email",
    prompt: `A round-bodied orange lobster with two antennae standing next to a small conveyor belt. Envelopes moving along the belt automatically. A gear icon floating above. ${STYLE}`,
  },
  {
    slug: "llamaindex-agent-email",
    prompt: `A round-bodied orange lobster with two antennae wearing librarian glasses, standing next to a tall filing cabinet. One drawer is open with envelopes organized inside. An index card in one claw. ${STYLE}`,
  },
  {
    slug: "agent-gmail-token-breaking",
    prompt: `A round-bodied orange lobster with two antennae looking frustrated, holding a broken key in one claw. A padlock with a crack in it sits on the desk. Error symbols floating above. ${STYLE}`,
  },
  {
    slug: "agent-email-google-workspace-cost",
    prompt: `A round-bodied orange lobster with two antennae sitting at a desk with a calculator, staring at a very long receipt unfurling from it. Dollar signs floating in the background. ${STYLE}`,
  },
  {
    slug: "testing-agent-email-sandbox",
    prompt: `A round-bodied orange lobster with two antennae sitting in a sandbox (literal sandbox with sand), building a sandcastle shaped like an envelope. A bucket and shovel nearby. ${STYLE}`,
  },
  {
    slug: "agent-sends-from-personal-inbox",
    prompt: `A round-bodied orange lobster with two antennae looking shocked, watching a smaller robotic arm reaching into a mailbox labeled "PERSONAL" and pulling out letters. ${STYLE}`,
  },
  {
    slug: "ai-sales-outreach-agent-email",
    prompt: `A round-bodied orange lobster with two antennae wearing a salesperson's tie, shaking claws with a small figure across a desk. A stack of personalized letters on the desk. ${STYLE}`,
  },
  {
    slug: "agent-triage-support-inbox",
    prompt: `A round-bodied orange lobster with two antennae wearing a nurse's cap, sorting envelopes into three bins labeled with colored tags. A stethoscope around its neck. ${STYLE}`,
  },
  {
    slug: "running-50-agent-inboxes",
    prompt: `A round-bodied orange lobster with two antennae standing on top of a tall stack of mailboxes, each mailbox a slightly different shade. The stack stretches high. ${STYLE}`,
  },
  {
    slug: "agent-schedule-meetings-email",
    prompt: `A round-bodied orange lobster with two antennae holding a calendar in one claw and a pen in the other, drawing lines between time slots. A clock on the wall behind it. ${STYLE}`,
  },
  {
    slug: "lobstermail-vs-clawemail",
    prompt: `Two round-bodied orange lobsters facing each other across a table. One lobster wears a crown (LobsterMail), the other wears a monocle (ClawEmail). A VS symbol between them on the table. ${STYLE}`,
  },
  {
    slug: "agent-email-api-comparison",
    prompt: `A round-bodied orange lobster with two antennae sitting at a judge's bench with a gavel, looking down at four small boxes lined up in a row, each box a different color. ${STYLE}`,
  },
  {
    slug: "self-hosted-vs-managed-agent-email",
    prompt: `Two scenes side by side. Left: a round-bodied orange lobster with two antennae sweating while juggling server racks. Right: the same lobster relaxing in a hammock while a cloud handles the work. ${STYLE}`,
  },
  {
    slug: "openclaw-mainstream-email-not-ready",
    prompt: `A round-bodied orange lobster with two antennae standing at a doorway, peeking through a door that's slightly ajar. Beyond the door is a bright office. The lobster looks hesitant. ${STYLE}`,
  },
  {
    slug: "why-agents-need-email-2026",
    prompt: `A round-bodied orange lobster with two antennae wearing a futuristic visor, standing on a podium giving a speech. A holographic envelope projection behind it. An audience of small figures. ${STYLE}`,
  },
  {
    slug: "agent-communication-stack",
    prompt: `A round-bodied orange lobster with two antennae stacking blocks on top of each other, each block labeled with a tiny icon: envelope, phone, chat bubble, webhook arrow. A tall tower being built. ${STYLE}`,
  },
  {
    slug: "lobstermail-vs-popular-alternatives",
    prompt: `A round-bodied orange lobster with two antennae and large claws standing confidently in the center. To its left and right, four recognizable logos arranged in a row: the Gmail red-and-white envelope, the SendGrid blue hexagon, the Resend black square with white R, and the AgentMail purple envelope icon. The lobster is slightly larger than the logos. ${STYLE}`,
  },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

async function generateImage({ slug, prompt }) {
  const outPath = path.join(OUT_DIR, `${slug}.png`);
  if (!FORCE && fs.existsSync(outPath)) {
    console.log(`⏭  ${slug} — already exists, skipping (use --force to regenerate)`);
    return;
  }

  console.log(`🎨 Generating: ${slug}...`);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
      config: {
        responseModalities: ["Image", "Text"],
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        fs.writeFileSync(outPath, buffer);
        console.log(`✅ Saved: ${outPath} (${buffer.length} bytes)`);
        return;
      }
    }
    console.log(`⚠️  ${slug} — no image in response`);
  } catch (err) {
    console.error(`❌ ${slug} — ${err.message}`);
  }
}

// Generate sequentially to avoid rate limits
for (const img of images) {
  await generateImage(img);
}

console.log("\nDone!");
