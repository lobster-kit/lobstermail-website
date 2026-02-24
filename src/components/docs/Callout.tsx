import { Lightbulb, Warning, Info, Note } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

const calloutStyles = {
  tip: {
    bg: "bg-accent/[0.06]",
    border: "border-accent/30",
    label: "Tip",
    labelColor: "text-accent",
    icon: Lightbulb,
  },
  warning: {
    bg: "bg-amber-500/[0.06]",
    border: "border-amber-500/30",
    label: "Warning",
    labelColor: "text-amber-600 dark:text-amber-400",
    icon: Warning,
  },
  info: {
    bg: "bg-blue-500/[0.06]",
    border: "border-blue-500/30",
    label: "Info",
    labelColor: "text-blue-600 dark:text-blue-400",
    icon: Info,
  },
  note: {
    bg: "bg-surface-3",
    border: "border-edge",
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
      className={`my-6 rounded-2xl border-2 ${style.border} ${style.bg} px-6 py-5`}
    >
      <div className={`flex items-center gap-2 mb-1.5 ${style.labelColor}`}>
        <Icon size={16} weight="bold" />
        <p className="text-sm font-bold">{style.label}</p>
      </div>
      <div className="text-[15px] leading-relaxed text-secondary">{children}</div>
    </div>
  );
}
