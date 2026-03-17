import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { GithubLogo, DiscordLogo, XLogo } from "@phosphor-icons/react/dist/ssr";

const NAV_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Pricing", href: "/pricing" },
      { label: "Getting Started", href: "/getting-started" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Glossary", href: "/glossary" },
      { label: "Compare", href: "/compare" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Terms", href: "/terms" },
      {
        label: "Palisade",
        href: "https://palisade.email",
        external: true,
      },
    ],
  },
] as const;

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/openclaw/openclaw",
    icon: GithubLogo,
  },
  {
    label: "Discord",
    href: "https://discord.gg/clawd",
    icon: DiscordLogo,
  },
  {
    label: "X",
    href: "https://x.com/lobabormail",
    icon: XLogo,
  },
] as const;

const DIRECTORIES = [
  { label: "AI Toolz Dir", href: "https://www.aitoolzdir.com" },
  {
    label: "Dang.ai",
    href: "https://dang.ai/",
    badge:
      "https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png",
  },
  {
    label: "Postmake",
    href: "https://postmake.io",
    badge: "https://www.postmake.io/postmake_badge_light.png",
  },
  { label: "Twelve Tools", href: "https://twelve.tools" },
  { label: "Most Popular AI Tools", href: "https://mostpopularaitools.com" },
  { label: "SaaSBison", href: "https://saasbison.com" },
  {
    label: "Startup Fame",
    href: "https://startupfa.me/s/lobstermail-1?utm_source=lobstermail.ai",
    badge: "/badges/startupfame-badge.webp",
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 px-6 pt-16 pb-8">
      <FadeIn distance={8}>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* ── Brand column ──────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/lobster-mail-logo-2x.png"
                alt="LobsterMail"
                width={28}
                height={28}
                className="rounded"
              />
              <span className="text-base font-semibold tracking-tight text-foreground">
                LobsterMail
              </span>
            </Link>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-md p-1.5 text-secondary transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  <s.icon size={20} weight="regular" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav columns ───────────────────────────────────── */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <h3 className="text-xs font-medium uppercase tracking-widest text-secondary">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-secondary transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-secondary transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div className="mx-auto mt-12 max-w-6xl border-t border-white/5 pt-6 text-center">
          {/* Directory / backlinks row */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
            <span className="mr-1">As seen on</span>
            {DIRECTORIES.map((d) => (
              <a
                key={d.label}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-secondary"
              >
                {"badge" in d ? (
                  <img
                    src={d.badge}
                    alt={`Featured on ${d.label}`}
                    width={80}
                    height={22}
                    className="inline-block opacity-60 transition-opacity hover:opacity-100"
                  />
                ) : (
                  d.label
                )}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="mt-4 text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} LobsterMail. Built by the team
            behind{" "}
            <a
              href="https://palisade.email"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-secondary"
            >
              Palisade
            </a>
            .
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
