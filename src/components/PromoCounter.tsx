"use client";
import { useEffect, useState } from "react";

export function PromoCounter() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const load = () =>
      fetch("https://api.lobstermail.ai/v1/billing/promo/remaining")
        .then((r) => r.json())
        .then((d) => setRemaining(d.remaining))
        .catch(() => {});

    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null || remaining <= 0) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
      <span className="size-1.5 animate-pulse rounded-full bg-accent" />
      {remaining} early-bird spots remaining
    </span>
  );
}
