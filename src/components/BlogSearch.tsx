"use client";

import {
  createContext,
  useContext,
  useState,
  useDeferredValue,
  useMemo,
  type ReactNode,
} from "react";
import { SearchField, Input, Button } from "react-aria-components";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";

interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  readingTime: number;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Context ── */

interface BlogSearchContextValue {
  query: string;
  setQuery: (q: string) => void;
  isSearching: boolean;
  filtered: PostMeta[] | null;
}

const BlogSearchContext = createContext<BlogSearchContextValue | null>(null);

function useBlogSearch() {
  const ctx = useContext(BlogSearchContext);
  if (!ctx) throw new Error("BlogSearch components must be inside BlogSearch.Provider");
  return ctx;
}

/* ── Provider ── */

function Provider({
  allPosts,
  children,
}: {
  allPosts: PostMeta[];
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isSearching = deferredQuery.trim().length > 0;

  const filtered = useMemo(() => {
    if (!isSearching) return null;
    const q = deferredQuery.toLowerCase();
    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [deferredQuery, isSearching, allPosts]);

  return (
    <BlogSearchContext.Provider value={{ query, setQuery, isSearching, filtered }}>
      {children}
    </BlogSearchContext.Provider>
  );
}

/* ── Search Input ── */

function SearchInput() {
  const { query, setQuery, isSearching } = useBlogSearch();

  return (
    <SearchField
      aria-label="Search blog posts"
      value={query}
      onChange={setQuery}
      className="w-full max-w-xs"
    >
      <div className="relative">
        <MagnifyingGlass
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
        <Input
          placeholder="Find a post"
          className="w-full rounded-xl border-2 border-edge bg-background py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-secondary outline-none transition-colors focus:border-accent/40 [&::-webkit-search-cancel-button]:hidden"
        />
        {isSearching && (
          <Button onPress={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted transition-colors hover:text-foreground outline-none">
            <X size={16} />
          </Button>
        )}
      </div>
    </SearchField>
  );
}

/* ── Post Card ── */

function PostCard({ post }: { post: PostMeta }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-edge bg-background transition-transform duration-300 hover:-translate-y-1 shadow-[0_4px_20px_-4px_rgba(0,80,171,0.08)]">
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden border-b-2 border-edge">
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={338}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {post.tags.length > 0 && (
          <div className="relative z-10 mb-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-flex whitespace-nowrap rounded-full border-2 border-edge bg-accent/[0.08] px-3 py-0.5 text-xs lg:text-[10px] font-medium text-accent transition-colors hover:bg-accent/[0.15] hover:border-accent/30"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        <h2 className="h4 mb-2 line-clamp-2 transition-colors group-hover:text-accent lg:text-[18px]!">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mb-3 line-clamp-2 text-sm text-secondary">
          {post.description}
        </p>
        <div className="mt-auto flex items-center gap-2 text-xs text-secondary">
          <time>{formatDate(post.date)}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </div>
  );
}

/* ── Results Grid ── */

function Results({
  paginatedPosts,
  currentPage,
  totalPages,
}: {
  paginatedPosts: PostMeta[];
  currentPage: number;
  totalPages: number;
}) {
  const { query, isSearching, filtered } = useBlogSearch();
  const displayPosts = isSearching ? filtered! : paginatedPosts;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      {isSearching && (
        <p className="mb-6 text-sm text-secondary">
          {filtered!.length} {filtered!.length === 1 ? "result" : "results"}
        </p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((post, i) => (
          <FadeIn key={post.slug} delay={i * 0.06} className="h-full">
            <PostCard post={post} />
          </FadeIn>
        ))}
      </div>

      {isSearching && filtered!.length === 0 && (
        <p className="mt-12 text-center text-secondary">
          No posts found for &ldquo;{query}&rdquo;
        </p>
      )}

      {/* Pagination — only show when not searching */}
      {!isSearching && totalPages > 1 && (
        <FadeIn>
          <nav
            className="mt-16 flex items-center justify-center gap-2"
            aria-label="Blog pagination"
          >
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="rounded-lg border-2 border-edge bg-background px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-edge-hover hover:text-foreground"
              >
                Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === totalPages ||
                  Math.abs(p - currentPage) <= 2
              )
              .map((p, i, arr) => {
                const showEllipsis = i > 0 && p - arr[i - 1] > 1;
                return (
                  <span key={p} className="flex items-center gap-2">
                    {showEllipsis && (
                      <span className="px-1 text-secondary">...</span>
                    )}
                    <Link
                      href={`/blog?page=${p}`}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-medium transition-colors ${
                        p === currentPage
                          ? "border-accent bg-background text-accent ring-1 ring-inset ring-accent/[0.15]"
                          : "border-edge bg-background text-secondary hover:border-edge-hover hover:text-foreground"
                      }`}
                    >
                      {p}
                    </Link>
                  </span>
                );
              })}
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="rounded-lg border-2 border-edge bg-background px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-edge-hover hover:text-foreground"
              >
                Next
              </Link>
            )}
          </nav>
        </FadeIn>
      )}
    </section>
  );
}

export { Provider as BlogSearchProvider, SearchInput as BlogSearchInput, Results as BlogSearchResults };
