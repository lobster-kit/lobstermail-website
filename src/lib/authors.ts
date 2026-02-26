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
};

export function getAuthor(name: string): Author | null {
  return authors[name] ?? null;
}
