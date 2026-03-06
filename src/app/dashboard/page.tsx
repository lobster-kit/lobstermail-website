import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { loadKpiSnapshot } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mission Control",
  robots: { index: false, follow: false },
};

// ── Auth gate ───────────────────────────────────────────────────────────────

async function checkAuth() {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) return;
  const token = (await cookies()).get("dashboard_auth")?.value;
  if (token !== expected) redirect("/dashboard/login");
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number | undefined | null, prefix = ""): string {
  if (n == null) return "—";
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${prefix}${(n / 1_000).toFixed(1)}K`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(1)}K`;
  return `${prefix}${n}`;
}

function fmtDelta(n: number | null | undefined): string {
  if (n == null || n === 0) return "—";
  const sign = n > 0 ? "+" : "";
  if (Math.abs(n) >= 1_000_000) return `${sign}${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 10_000) return `${sign}${(n / 1_000).toFixed(1)}K`;
  if (Math.abs(n) >= 1_000) return `${sign}${(n / 1_000).toFixed(1)}K`;
  return `${sign}${n}`;
}

function deltaColor(n: number | null | undefined): string {
  if (n == null || n === 0) return "var(--text-secondary)";
  return n > 0 ? "#10B981" : "#EF4444";
}

function timeAgo(iso: string | null): string {
  if (!iso) return "never";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function shortDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ── Sparkline SVG ───────────────────────────────────────────────────────────

function Sparkline({
  data,
  color = "#10B981",
  trimLag = false,
}: {
  data: { date: string; value: number }[];
  color?: string;
  trimLag?: boolean;
}) {
  const series = trimLag ? data.slice(0, -2) : data;
  if (series.length < 2) return null;
  const values = series.map((d) => d.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  const points = values.map(
    (v, i) =>
      `${(i / (values.length - 1)) * w},${h - ((v - min) / range) * h}`,
  );
  const id = `sp-${color.replace("#", "")}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${points.join(" ")} ${w},${h}`}
        fill={`url(#${id})`}
      />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// ── KPI Card ────────────────────────────────────────────────────────────────

function KpiCard({
  title,
  value,
  subtitle,
  sparkline,
  color,
  trimLag,
}: {
  title: string;
  value: string;
  subtitle?: string;
  sparkline?: { date: string; value: number }[];
  color?: string;
  trimLag?: boolean;
}) {
  return (
    <div
      className="rounded-xl border-2 p-4"
      style={{
        borderColor: "var(--edge)",
        background: "var(--background)",
      }}
    >
      <p className="mb-1 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
        {title}
      </p>
      <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        {value}
      </p>
      {subtitle && (
        <p className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
          {subtitle}
        </p>
      )}
      {sparkline && sparkline.length > 1 && (
        <div className="mt-2">
          <Sparkline data={sparkline} color={color} trimLag={trimLag} />
        </div>
      )}
    </div>
  );
}

// ── Agent status pill ───────────────────────────────────────────────────────

function AgentPill({
  name,
  lastRun,
}: {
  name: string;
  lastRun: string | null;
}) {
  const ago = timeAgo(lastRun);
  const mins = lastRun
    ? Math.floor((Date.now() - new Date(lastRun).getTime()) / 60_000)
    : Infinity;
  const status = mins < 60 ? "active" : mins < 360 ? "ok" : "stale";
  const colors = {
    active: "#10B981",
    ok: "#F59E0B",
    stale: "#EF4444",
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: colors[status] }}
      />
      <span style={{ color: "var(--foreground)" }}>{name}</span>
      <span style={{ color: "var(--text-secondary)" }}>{ago}</span>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  await checkAuth();

  const data = loadKpiSnapshot();

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="p-text">No dashboard data yet. Snapshot has not been pushed.</p>
      </main>
    );
  }

  const { kpis, market, sparklines, pipeline, content, agents, generated_at, latest_date, deltas } = data;
  const d = deltas ?? {} as Record<string, number | null>;

  return (
    <main className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="h2">Mission Control</h1>
          <p className="p-text text-sm">LobsterMail marketing dashboard</p>
        </div>
        <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {latest_date && <>Data: {shortDate(latest_date)}</>}
          {" / "}
          Updated {timeAgo(generated_at)}
        </div>
      </div>

      {/* Hero KPIs */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          title="MRR"
          value={`$${kpis.mrr_usd}`}
          sparkline={sparklines.mrr_usd}
          color="#10B981"
        />
        <KpiCard
          title="Paid Accounts"
          value={fmt(kpis.paid_accounts)}
          sparkline={sparklines.paid_accounts}
          color="#8B5CF6"
        />
        <KpiCard
          title="Total Users"
          value={fmt(kpis.total_accounts)}
          sparkline={sparklines.total_accounts}
          color="#3B82F6"
        />
        <KpiCard
          title="Organic Clicks (7d)"
          value={fmt(kpis.seo_clicks_7d)}
          sparkline={sparklines.seo_clicks}
          color="#F59E0B"
          trimLag
        />
      </div>

      {/* Secondary KPIs */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          title="SEO Impressions (7d)"
          value={fmt(kpis.seo_impressions_7d)}
          sparkline={sparklines.seo_impressions}
          color="#06B6D4"
          trimLag
        />
        <KpiCard
          title="Avg Position"
          value={kpis.seo_avg_position > 0 ? kpis.seo_avg_position.toFixed(1) : "—"}
          color="#EC4899"
        />
        <KpiCard
          title="Daily Visitors"
          value={fmt(kpis.daily_visitors)}
          subtitle={`${fmt(kpis.daily_visitors_human)} human / ${fmt(kpis.daily_visitors_bot)} bot`}
          sparkline={sparklines.daily_visitors}
          color="#8B5CF6"
        />
        <KpiCard
          title="npm Installs (7d)"
          value={fmt(kpis.npm_installs_7d)}
          color="#10B981"
        />
      </div>

      {/* Product + Pipeline row */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Product health */}
        <div
          className="rounded-xl border-2 p-5"
          style={{ borderColor: "var(--edge)", background: "var(--surface-1)" }}
        >
          <h2 className="h4 mb-3">Product</h2>
          <div className="mb-2 flex justify-between text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
            <span>Metric</span>
            <div className="flex gap-6">
              <span className="w-16 text-right">Total</span>
              <span className="w-14 text-right">7d</span>
            </div>
          </div>
          <div className="space-y-2.5">
            {([
              ["Total Inboxes", kpis.total_inboxes, d.total_inboxes],
              ["Emails Sent", kpis.total_emails_sent, d.total_emails_sent],
              ["Emails Received", kpis.total_emails_received, d.total_emails_received],
              ["Free Accounts", kpis.free_accounts, d.free_accounts],
              ["GitHub Stars", kpis.github_stars, d.github_stars],
              ["X Followers", kpis.x_followers, d.x_followers],
              ["ClawHub Installs", kpis.clawhub_skill_installs, d.clawhub_skill_installs],
            ] as [string, number, number | null][]).map(([label, val, delta]) => (
              <div key={label} className="flex justify-between text-sm">
                <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                <div className="flex gap-6">
                  <span className="w-16 text-right font-mono font-semibold" style={{ color: "var(--foreground)" }}>
                    {fmt(val)}
                  </span>
                  <span className="w-14 text-right font-mono text-xs" style={{ color: deltaColor(delta) }}>
                    {fmtDelta(delta)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content pipeline */}
        <div
          className="rounded-xl border-2 p-5"
          style={{ borderColor: "var(--edge)", background: "var(--surface-1)" }}
        >
          <h2 className="h4 mb-4">Content Pipeline</h2>
          <div className="mb-4 space-y-3">
            {[
              ["Drafts", pipeline.drafts, "#F59E0B"],
              ["Approved", pipeline.approved, "#3B82F6"],
              ["Published", pipeline.published, "#10B981"],
            ].map(([label, val, color]) => (
              <div key={label as string} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: color as string }}
                  />
                  <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                </div>
                <span className="font-mono font-semibold" style={{ color: "var(--foreground)" }}>
                  {val}
                </span>
              </div>
            ))}
          </div>

          {content.roadmap_progress && (
            <>
              <hr className="my-3" style={{ borderColor: "var(--edge-subtle)" }} />
              <p className="mb-2 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                Roadmap ({content.total_topics} topics)
              </p>
              <div className="space-y-2">
                {[
                  ["Planned", content.roadmap_progress.planned],
                  ["Targeted", content.roadmap_progress.targeted],
                  ["Drafted", content.roadmap_progress.drafted],
                  ["Published", content.roadmap_progress.published],
                ].map(([label, val]) => (
                  <div key={label as string} className="flex justify-between text-xs">
                    <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                    <span className="font-mono" style={{ color: "var(--foreground)" }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Agents + Market */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Agent fleet */}
        <div
          className="rounded-xl border-2 p-5"
          style={{ borderColor: "var(--edge)", background: "var(--surface-1)" }}
        >
          <h2 className="h4 mb-4">Agent Fleet</h2>
          <div className="space-y-3">
            <AgentPill name="Agent 2 — Listener" lastRun={agents.agent_2_last_run} />
            <AgentPill name="Agent 3 — Content & SEO" lastRun={agents.agent_3_last_run} />
            <AgentPill name="Agent 6 — Intelligence" lastRun={agents.agent_6_last_run} />
          </div>
        </div>

        {/* Market landscape */}
        <div
          className="rounded-xl border-2 p-5"
          style={{ borderColor: "var(--edge)", background: "var(--surface-1)" }}
        >
          <h2 className="h4 mb-3">Market (OpenClaw)</h2>
          <div className="mb-2 flex justify-between text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
            <span>Metric</span>
            <div className="flex gap-6">
              <span className="w-16 text-right">Total</span>
              <span className="w-14 text-right">7d</span>
            </div>
          </div>
          <div className="space-y-2.5">
            {([
              ["GitHub Stars", market.openclaw_github_stars, d.openclaw_github_stars],
              ["npm Daily", market.openclaw_npm_daily, d.openclaw_npm_daily],
              ["X Followers", market.openclaw_twitter_followers, d.openclaw_twitter_followers],
            ] as [string, number, number | null][]).map(([label, val, delta]) => (
              <div key={label} className="flex justify-between text-sm">
                <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                <div className="flex gap-6">
                  <span className="w-16 text-right font-mono font-semibold" style={{ color: "var(--foreground)" }}>
                    {fmt(val)}
                  </span>
                  <span className="w-14 text-right font-mono text-xs" style={{ color: deltaColor(delta) }}>
                    {fmtDelta(delta)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-xs" style={{ color: "var(--text-secondary)" }}>
        Snapshot generated {new Date(generated_at).toLocaleString()}
      </p>
    </main>
  );
}
