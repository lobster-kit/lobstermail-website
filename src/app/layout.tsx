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
      "Your agent creates its own email. Instantly. No human needed to get started.",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
