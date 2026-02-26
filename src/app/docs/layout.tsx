import { getGuides } from "@/lib/docs";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { TableOfContents } from "@/components/docs/TableOfContents";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const guides = await getGuides();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16">
        {/* Mobile sidebar: sub-nav bar + drawer */}
        <div className="lg:hidden">
          <DocsSidebar guides={guides} />
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr_200px] lg:gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <DocsSearch guides={guides} />
              <DocsSidebar guides={guides} />
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0">{children}</main>

          {/* Right TOC */}
          <aside className="hidden xl:block">
            <TableOfContents />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
