import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { FadeIn } from "@/components/FadeIn";
import {
  RocketLaunch,
  BookOpen,
  Lightbulb,
  Lightning,
  Envelope,
  ShieldCheck,
  Desktop,
  CurrencyDollar,
} from "@phosphor-icons/react/dist/ssr";

const TOPICS = [
  { tag: "getting-started", label: "Getting Started", icon: RocketLaunch },
  { tag: "guides", label: "Guides", icon: BookOpen },
  { tag: "use-cases", label: "Use Cases", icon: Lightbulb },
  { tag: "email", label: "Email", icon: Envelope },
  { tag: "automation", label: "Automation", icon: Lightning },
  { tag: "security", label: "Security", icon: ShieldCheck },
  { tag: "infrastructure", label: "Infrastructure", icon: Desktop },
  { tag: "cost", label: "Cost", icon: CurrencyDollar },
];

export function TopicNav() {
  const allPosts = getAllPosts();
  const tagCounts = new Map<string, number>();
  for (const post of allPosts) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const visibleTopics = TOPICS.filter((t) => (tagCounts.get(t.tag) ?? 0) > 0);
  if (visibleTopics.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-10">
      <FadeIn>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">
          Browse by topic
        </p>
      </FadeIn>
      <div className="flex flex-wrap gap-2.5">
        {visibleTopics.map((topic, i) => {
          const count = tagCounts.get(topic.tag) ?? 0;
          const Icon = topic.icon;
          return (
            <FadeIn key={topic.tag} delay={i * 0.04}>
              <Link
                href={`/blog/tag/${topic.tag}`}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-edge bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_4px_12px_-4px_rgba(251,87,5,0.08)]"
              >
                <Icon
                  size={16}
                  weight="duotone"
                  className="shrink-0 text-accent"
                />
                <span className="transition-colors group-hover:text-accent">
                  {topic.label}
                </span>
                <span className="rounded-full bg-accent/[0.06] px-1.5 py-0.5 text-[11px] tabular-nums text-accent/70">
                  {count}
                </span>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
