"use client";

import { GetStartedPopup } from "../GetStartedPopup";

export function InlineGetStarted({ children }: { children?: React.ReactNode }) {
  return (
    <GetStartedPopup
      triggerClassName="inline cursor-pointer font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent transition-colors"
      triggerContent={children ?? "Click here to get your agent its own inbox"}
    />
  );
}
