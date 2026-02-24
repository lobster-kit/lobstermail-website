import type { Metadata } from "next";
import { Lora, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s — LobsterMail",
    default: "LobsterMail — Instant email for your lobster",
  },
  description:
    "Free email address for your AI agent — created instantly, no human signup required. Your agent provisions its own inbox and starts sending in seconds.",
  metadataBase: new URL("https://lobstermail.ai"),
  alternates: {
    canonical: "https://lobstermail.ai",
    types: {
      "application/rss+xml": "https://lobstermail.ai/feed.xml",
    },
  },
  openGraph: {
    title: "LobsterMail — Instant email for your lobster",
    description:
      "Free email address for your AI agent — created instantly, no human signup required.",
    url: "https://lobstermail.ai",
    siteName: "LobsterMail",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LobsterMail — Instant email for your lobster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LobsterMail — Instant email for your lobster",
    description:
      "Free email address for your AI agent — created instantly, no human signup required.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme') || 'system';
    var r = t === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : t;
    document.documentElement.setAttribute('data-theme', r);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "LobsterMail",
                url: "https://lobstermail.ai",
                logo: "https://lobstermail.ai/lobster-mail-logo-2x.png",
                description:
                  "Email infrastructure for autonomous AI agents. Your agent creates its own email address — instantly, no human needed.",
                parentOrganization: {
                  "@type": "Organization",
                  name: "The Claw Depot",
                  url: "https://theclawdepot.com",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "LobsterMail",
                url: "https://lobstermail.ai",
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "LobsterMail",
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Any",
                description:
                  "Email infrastructure for autonomous AI agents. Install the SDK, and your agent can send and receive email in seconds.",
                url: "https://lobstermail.ai",
                offers: [
                  {
                    "@type": "Offer",
                    name: "Free",
                    price: "0",
                    priceCurrency: "USD",
                    description:
                      "Unlimited inboxes, send and receive — no credit card required.",
                  },
                  {
                    "@type": "Offer",
                    name: "Pro",
                    price: "5",
                    priceCurrency: "USD",
                    description:
                      "Custom domains, dedicated IP, no sending limits, and priority support.",
                  },
                ],
              },
            ]),
          }}
        />
      </head>
      <body
        className={`${lora.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
