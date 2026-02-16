import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LobsterMail — Instant email for your lobster",
  description:
    "Your agent creates its own email. Instantly. No human needed to get started. Email infrastructure for autonomous AI agents.",
  metadataBase: new URL("https://getlobstermail.com"),
  openGraph: {
    title: "LobsterMail — Instant email for your lobster",
    description:
      "Your agent creates its own email. Instantly. No human needed to get started.",
    url: "https://getlobstermail.com",
    siteName: "LobsterMail",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LobsterMail — Instant email for your lobster",
    description:
      "Your agent creates its own email. Instantly. No human needed to get started.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦞</text></svg>",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
