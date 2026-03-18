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
    next: { revalidate: 3600, tags: ["guides"] },
  });
  const { guides } = await res.json();
  return guides; // already sorted by `order`
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const res = await fetch(`${API}/v1/docs/guides/${slug}`, {
    next: { revalidate: 3600, tags: ["guides", `guide-${slug}`] },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getSkillContent(): Promise<string> {
  const res = await fetch(`${API}/skill`, {
    next: { revalidate: 3600, tags: ["skill"] },
  });
  return res.text();
}

export async function getOpenApiSpec(): Promise<string> {
  const res = await fetch(`${API}/v1/docs/openapi`, {
    next: { revalidate: 3600, tags: ["openapi"] },
  });
  return res.text();
}
