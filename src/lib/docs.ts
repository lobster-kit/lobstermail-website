const API = "https://api.lobstermail.ai";

export interface GuideMeta {
  title: string;
  slug: string;
  order: number;
  description: string;
  lastUpdated: string;
}

export interface Guide extends GuideMeta {
  content: string; // raw MDX
}

export async function getGuides(): Promise<GuideMeta[]> {
  const res = await fetch(`${API}/v1/docs/guides`, {
    next: { revalidate: 120 },
  });
  const { guides } = await res.json();
  return guides; // already sorted by `order`
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const res = await fetch(`${API}/v1/docs/guides/${slug}`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getSkillContent(): Promise<string> {
  const res = await fetch(`${API}/skill`, {
    next: { revalidate: 600 },
  });
  return res.text();
}

export async function getOpenApiSpec(): Promise<string> {
  const res = await fetch(`${API}/v1/docs/openapi`, {
    next: { revalidate: 120 },
  });
  return res.text();
}
