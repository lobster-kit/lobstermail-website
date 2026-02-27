import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const OUT_DIR = path.join(process.cwd(), "public/video");
fs.mkdirSync(OUT_DIR, { recursive: true });

const STYLE =
  "Low-resolution pixel art drawn on a 256x256 pixel grid then scaled up, so each pixel block is large and clearly visible. Dark reddish-brown outlines, bright saturated orange body with darker orange and red-brown shading. Black dot eyes. No anti-aliasing, no smooth gradients, no sub-pixel detail. Props and accessories use muted, grounded colors — no neon, no rainbow, no candy colors. Calm neutral expression on the lobster. Square 1:1 composition. White background. No text.";

const images = [
  {
    slug: "lobster-security-shield",
    prompt: `A round-bodied orange lobster with two antennae and large claws, standing heroically behind a large metallic shield. The shield has a padlock icon on it. The lobster looks protective and confident, like a bodyguard. One claw rests on top of the shield. ${STYLE}`,
  },
  {
    slug: "lobster-self-signup",
    prompt: `A round-bodied orange lobster with two antennae and large claws, sitting at a tiny desk typing on a laptop computer by itself. No humans around. The lobster looks focused and independent. A small envelope icon floats above the laptop screen. The scene conveys autonomy and self-sufficiency. ${STYLE}`,
  },
  {
    slug: "lobster-celebrating",
    prompt: `A round-bodied orange lobster with two antennae and large claws, jumping in the air with both claws raised in celebration. Small confetti particles around it. The lobster looks excited and triumphant. Dynamic upward pose conveying energy and success. ${STYLE}`,
  },
];

async function generateImage({ slug, prompt }) {
  const outPath = path.join(OUT_DIR, `${slug}.png`);

  if (fs.existsSync(outPath)) {
    console.log(`⏭️  Skipping ${slug} (already exists)`);
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
          aspectRatio: "1:1",
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

    console.error(`❌ ${slug} — No image data in response`);
  } catch (err) {
    console.error(`❌ ${slug} — ${err.message}`);
  }
}

for (const img of images) {
  await generateImage(img);
}

console.log("\n🦞 Done generating video assets!");
