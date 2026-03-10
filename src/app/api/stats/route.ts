import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour — KPIs only change once per day

export async function GET() {
  const token = process.env.LOBSTERMAIL_API_KEY;
  if (!token) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.lobstermail.ai/v1/admin/kpis", {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "upstream error" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 502 });
  }
}
