import Image from "next/image";
import type { ReactNode } from "react";
import { docsComponents } from "@/components/docs/mdx-components";
import { Callout } from "@/components/docs/Callout";
import { BlogCTA } from "./BlogCTA";

/* ─── Blog-specific Components ─── */

export function BlogImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 630,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-2xl border-2 border-edge">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Video({ src, title }: { src: string; title?: string }) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border-2 border-edge">
      <div className="relative aspect-video">
        <iframe
          src={src}
          title={title ?? "Embedded video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}

export function FAQ({ children }: { children: ReactNode }) {
  return (
    <div className="my-10">
      <h2 className="h3 mb-6">Frequently asked questions</h2>
      <div className="divide-y-2 divide-edge overflow-hidden rounded-2xl border-2 border-edge">
        {children}
      </div>
    </div>
  );
}

export function FAQItem({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <details className="group bg-background">
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-foreground transition-colors hover:bg-surface-3 [&::-webkit-details-marker]:hidden">
        <span className="text-[15px] sm:text-[17px]">{question}</span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-edge transition-colors group-open:border-accent/40 group-open:bg-accent/[0.08]">
          <svg
            className="h-3.5 w-3.5 text-secondary transition-transform duration-200 group-open:rotate-45 group-open:text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-5 pt-0">
        <div className="p-text text-[15px] text-secondary">{children}</div>
      </div>
    </details>
  );
}

/* ─── Merged Components Map ─── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const blogComponents: Record<string, React.ComponentType<any>> = {
  ...docsComponents,
  BlogImage,
  Video,
  Callout,
  FAQ,
  FAQItem,
  BlogCTA,
};
