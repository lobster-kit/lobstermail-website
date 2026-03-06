import { readFileSync } from "fs";
import { join } from "path";

export interface KpiSnapshot {
  generated_at: string;
  kpis: {
    mrr_usd: number;
    paid_accounts: number;
    free_accounts: number;
    total_accounts: number;
    npm_installs_7d: number;
    seo_clicks_7d: number;
    seo_impressions_7d: number;
    seo_avg_position: number;
    total_emails_sent: number;
    total_emails_received: number;
    total_inboxes: number;
    daily_visitors: number;
    daily_visitors_human: number;
    daily_visitors_bot: number;
    github_stars: number;
    x_followers: number;
    clawhub_skill_installs: number;
  };
  market: {
    openclaw_github_stars: number;
    openclaw_npm_daily: number;
    openclaw_twitter_followers: number;
  };
  sparklines: Record<string, { date: string; value: number }[]>;
  pipeline: {
    drafts: number;
    approved: number;
    published: number;
  };
  content: {
    total_topics: number;
    roadmap_progress: {
      total: number;
      planned: number;
      targeted: number;
      drafted: number;
      approved: number;
      published: number;
      refreshing: number;
    } | null;
  };
  agents: {
    agent_2_last_run: string | null;
    agent_3_last_run: string | null;
    agent_6_last_run: string | null;
  };
  latest_date: string | null;
}

export function loadKpiSnapshot(): KpiSnapshot | null {
  try {
    const raw = readFileSync(
      join(process.cwd(), "data", "dashboard-kpis.json"),
      "utf-8",
    );
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
