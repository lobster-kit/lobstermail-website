import { Lightbulb, Warning, Info, Note } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

const calloutStyles = {
  tip: {
    bg: "bg-accent/[0.08]",
    border: "border-accent/20",
    bar: "bg-accent",
    iconBg: "bg-accent/15",
    label: "Tip",
    labelColor: "text-accent",
    icon: Lightbulb,
  },
  warning: {
    bg: "bg-amber-500/[0.08]",
    border: "border-amber-500/20",
    bar: "bg-amber-500",
    iconBg: "bg-amber-500/15",
    label: "Warning",
    labelColor: "text-amber-600 dark:text-amber-400",
    icon: Warning,
  },
  info: {
    bg: "bg-blue-500/[0.08]",
    border: "border-blue-500/20",
    bar: "bg-blue-500",
    iconBg: "bg-blue-500/15",
    label: "Info",
    labelColor: "text-blue-600 dark:text-blue-400",
    icon: Info,
  },
  note: {
    bg: "bg-surface-3",
    border: "border-edge",
    bar: "bg-secondary",
    iconBg: "bg-secondary/15",
    label: "Note",
    labelColor: "text-secondary",
    icon: Note,
  },
} as const;

export function Callout({
  type = "info",
  children,
}: {
  type?: keyof typeof calloutStyles;
  children: ReactNode;
}) {
  const style = calloutStyles[type];
  const Icon = style.icon;

  return (
    <div
      className={`my-6 flex overflow-hidden rounded-2xl border ${style.border} ${style.bg}`}
    >
      <div className={`w-1 shrink-0 ${style.bar}`} />
      <div className="px-5 py-5">
        <div className={`mb-2 flex items-center gap-2.5 ${style.labelColor}`}>
          <span className={`flex size-7 items-center justify-center rounded-lg ${style.iconBg}`}>
            <Icon size={16} weight="fill" />
          </span>
          <p className="text-sm font-bold uppercase tracking-wide">{style.label}</p>
        </div>
        <div className="text-[15px] leading-relaxed text-secondary">{children}</div>
      </div>
    </div>
  );
}
