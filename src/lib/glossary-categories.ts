export const GLOSSARY_CATEGORIES = [
  { id: "trending-ai", label: "Trending AI" },
  { id: "agent-developer", label: "Agent & Developer" },
  { id: "email-infrastructure", label: "Email Infrastructure" },
  { id: "protocols-ecosystem", label: "Protocols & Ecosystem" },
] as const;

export type GlossaryCategory = (typeof GLOSSARY_CATEGORIES)[number]["id"];
