import type { ReactNode } from "react";

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 relative">
      {children}
    </div>
  );
}

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative pl-10 pb-8 last:pb-0">
      {/* Vertical line */}
      <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-edge-subtle last:hidden" />

      {/* Step number circle */}
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/10 text-accent text-sm font-bold font-mono">
        {number}
      </div>

      {/* Content */}
      <h3 className="h4 mb-3 pt-0.5">{title}</h3>
      <div className="text-secondary leading-relaxed">{children}</div>
    </div>
  );
}
