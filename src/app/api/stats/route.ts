import { NextResponse } from "next/server";

export const revalidate = 60; // cache for 60 seconds

export async function GET() {
  const token = process.env.LOBSTERMAIL_API_KEY;
  if (!token) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.lobstermail.ai/v1/admin/kpis", {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
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
