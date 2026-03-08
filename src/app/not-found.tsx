import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-28 text-center">
        <div className="glass rounded-2xl mx-auto max-w-md px-10 py-12">
          <Image
            src="/404-lobstermail.png"
            alt="Sad pixel-art lobster sitting on a cloud with 404 text"
            width={400}
            height={370}
            className="mx-auto mb-6"
            priority
          />
          <p className="p-text mt-4">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/" className="btn-primary px-6 py-2.5 text-sm">
              Home
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border-2 border-edge-strong px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-edge-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              Docs
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
