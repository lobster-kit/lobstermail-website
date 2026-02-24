import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-32 pb-28 text-center">
        <p className="font-mono text-sm text-secondary">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            Home
          </Link>
          <Link
            href="/docs"
            className="rounded-full border-2 border-edge px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-edge-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            Docs
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
