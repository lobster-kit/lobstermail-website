import { Redis } from "@upstash/redis";
import { NextResponse, type NextRequest } from "next/server";

// ── LLM bot signatures → canonical key name ─────────────────────────────────
const LLM_BOTS: Record<string, string> = {
  GPTBot: "gptbot",
  "ChatGPT-User": "chatgpt",
  "OAI-SearchBot": "oai_search",
  ClaudeBot: "claudebot",
  "anthropic-ai": "anthropic",
  PerplexityBot: "perplexity",
  Bytespider: "bytespider",
  "meta-externalagent": "meta",
  "cohere-ai": "cohere",
  "Applebot-Extended": "applebot",
  "Google-Extended": "google_ai",
  YouBot: "youbot",
};

// Standard crawlers — count separately from LLM bots
const STANDARD_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "baiduspider",
  "yandex",
  "DuckDuckBot",
  "Slurp",
  "facebookexternalhit",
];

type VisitorClass =
  | { type: "human" }
  | { type: "llm_bot"; bot: string }
  | { type: "crawler" };

function classifyVisitor(ua: string): VisitorClass {
  if (!ua) return { type: "human" };

  for (const [sig, name] of Object.entries(LLM_BOTS)) {
    if (ua.includes(sig)) return { type: "llm_bot", bot: name };
  }

  const lower = ua.toLowerCase();
  for (const sig of STANDARD_CRAWLERS) {
    if (lower.includes(sig.toLowerCase())) return { type: "crawler" };
  }

  return { type: "human" };
}

function dateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (redis) return redis;
  // Vercel injects these from the Upstash integration (prefix: UPSTASH_REDIS_REST)
  const url = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
}

const TTL = 90 * 86400; // 90 days

export function middleware(request: NextRequest) {
  // ── Dashboard auth gate (password cookie) ───────────────────────────────
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/dashboard") && !pathname.startsWith("/dashboard/login")) {
    const expected = process.env.DASHBOARD_PASSWORD;
    if (expected) {
      const token = request.cookies.get("dashboard_auth")?.value;
      if (token !== expected) {
        return NextResponse.redirect(new URL("/dashboard/login", request.url));
      }
    }
  }

  const response = NextResponse.next();
  const r = getRedis();
  if (!r) return response;

  const ua = request.headers.get("user-agent") ?? "";
  const day = dateKey();
  const visitor = classifyVisitor(ua);

  // Pipeline all increments into a single HTTP round-trip
  const pipe = r.pipeline();

  pipe.incr(`v:${day}:total`);
  pipe.expire(`v:${day}:total`, TTL);

  if (visitor.type === "human") {
    pipe.incr(`v:${day}:human`);
    pipe.expire(`v:${day}:human`, TTL);
  } else if (visitor.type === "llm_bot") {
    pipe.incr(`v:${day}:bot_total`);
    pipe.expire(`v:${day}:bot_total`, TTL);
    pipe.incr(`v:${day}:bot:${visitor.bot}`);
    pipe.expire(`v:${day}:bot:${visitor.bot}`, TTL);
    // Track which pages this bot crawled
    const path = request.nextUrl.pathname;
    pipe.hincrby(`v:${day}:pages:${visitor.bot}`, path, 1);
    pipe.expire(`v:${day}:pages:${visitor.bot}`, TTL);
  } else {
    pipe.incr(`v:${day}:crawler`);
    pipe.expire(`v:${day}:crawler`, TTL);
  }

  // Fire and forget — never block the response
  pipe.exec().catch(() => {});

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|css|js|map)).*)",
  ],
};
