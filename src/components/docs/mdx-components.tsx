import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { Steps, Step } from "./Steps";
import { ParamTable } from "./ParamTable";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function HeadingAnchor({
  as: Tag,
  className,
  children,
  ...props
}: {
  as: "h1" | "h2" | "h3" | "h4";
  className: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}) {
  const text = typeof children === "string" ? children : "";
  const id = slugify(text);

  return (
    <Tag id={id} className={`group scroll-mt-24 ${className}`} {...props}>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 text-secondary/0 group-hover:text-secondary/50 hover:!text-accent transition-colors"
        aria-label={`Link to ${text}`}
      >
        #
      </a>
    </Tag>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const docsComponents: Record<string, React.ComponentType<any>> = {
  // Headings with anchor links
  h1: (props) => <HeadingAnchor as="h1" className="h2 mb-6 mt-10" {...props} />,
  h2: (props) => <HeadingAnchor as="h2" className="h3 mb-4 mt-12" {...props} />,
  h3: (props) => <HeadingAnchor as="h3" className="h4 mb-3 mt-10" {...props} />,
  h4: (props) => (
    <h4 className="text-lg font-bold text-foreground mb-2 mt-8" {...props} />
  ),

  // Text
  p: (props) => <p className="p-text mb-6" {...props} />,
  strong: (props) => <strong className="font-bold text-foreground" {...props} />,
  em: (props) => <em {...props} />,

  // Links
  a: (props) => (
    <a
      className="link-underline font-medium text-accent transition-colors hover:text-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded"
      target={
        typeof props.href === "string" && props.href.startsWith("http")
          ? "_blank"
          : undefined
      }
      rel={
        typeof props.href === "string" && props.href.startsWith("http")
          ? "noopener noreferrer"
          : undefined
      }
      {...props}
    />
  ),

  // Lists
  ul: (props) => (
    <ul className="p-text mb-6 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props) => (
    <ol className="p-text mb-6 list-decimal space-y-2 pl-6" {...props} />
  ),
  li: (props) => <li className="pl-1" {...props} />,

  // Code
  pre: ({ children, ...props }) => (
    <CodeBlock {...props}>{children}</CodeBlock>
  ),
  code: ({ children, className, ...props }) => {
    // Block code (inside <pre>) vs inline code
    const isInline =
      typeof children === "string" && !className?.startsWith("language-");
    if (isInline) {
      return (
        <code
          className="rounded-md border border-edge-subtle bg-surface-4 px-1.5 py-0.5 font-mono text-[0.875em] text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={`font-mono ${className ?? ""}`} data-language={className?.replace("language-", "")} {...props}>
        {children}
      </code>
    );
  },

  // Blockquote
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-accent/40 pl-5 italic text-secondary"
      {...props}
    />
  ),

  // Divider
  hr: () => <hr className="my-12 border-t-2 border-edge" />,

  // Table
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-xl border-2 border-edge">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead className="border-b-2 border-edge bg-surface-3" {...props} />
  ),
  th: (props) => (
    <th className="px-4 py-3 font-bold text-foreground" {...props} />
  ),
  td: (props) => (
    <td className="border-t border-edge-subtle px-4 py-3 text-secondary" {...props} />
  ),

  // Images
  img: (props) => (
    <span className="my-8 block overflow-hidden rounded-2xl border-2 border-edge">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="h-auto w-full" alt={props.alt ?? ""} {...props} />
    </span>
  ),

  // Custom components available in MDX
  Callout,
  Steps,
  Step,
  ParamTable,
};
