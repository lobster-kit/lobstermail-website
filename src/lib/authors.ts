export interface Author {
  name: string;
  title: string;
  avatar: string;
  socials: {
    platform: "x" | "linkedin" | "github";
    url: string;
  }[];
}

export const authors: Record<string, Author> = {
  "Samuel Chenard": {
    name: "Samuel Chenard",
    title: "Co-founder",
    avatar: "/authors/samuel-chenard.png",
    socials: [
      { platform: "x", url: "https://x.com/samuelchenard" },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/samuelchenard/",
      },
    ],
  },
  "Ian Bussières": {
    name: "Ian Bussières",
    title: "CTO & Co-founder",
    avatar: "/authors/ian-bussieres.png",
    socials: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/ianbussieres/",
      },
    ],
  },
};

export function getAuthor(name: string): Author | null {
  return authors[name] ?? null;
}

export function getAuthorSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function getAllAuthorSlugs(): string[] {
  return Object.values(authors).map((a) =>
    a.name.toLowerCase().replace(/\s+/g, "-")
  );
}

export function getAuthorBySlug(slug: string): Author | null {
  return (
    Object.values(authors).find(
      (a) => a.name.toLowerCase().replace(/\s+/g, "-") === slug
    ) ?? null
  );
}
