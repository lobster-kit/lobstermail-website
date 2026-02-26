"use client";

import {
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from "react-aria-components";
import { Button, Text } from "react-aria-components";
import { X } from "@phosphor-icons/react";

interface ToastMessage {
  title: string;
  description?: string;
}

export const toastQueue = new ToastQueue<ToastMessage>({
  maxVisibleToasts: 1,
});

export function GlobalToastRegion() {
  return (
    <ToastRegion
      queue={toastQueue}
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2"
    >
      {({ toast }) => (
        <Toast
          toast={toast}
          className="animate-toast-in flex w-[360px] max-w-[calc(100vw-3rem)] items-start gap-3 rounded-xl border-2 border-accent/30 bg-glass-strong-bg px-4 py-3.5 shadow-lg backdrop-blur-sm"
          style={{
            boxShadow:
              "0 8px 24px -4px rgba(251,87,5,0.15), 0 4px 12px -2px rgba(0,0,0,0.2)",
          }}
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <ToastContent className="flex min-w-0 flex-1 flex-col gap-0.5">
            <Text slot="title" className="text-sm font-semibold text-foreground">
              {toast.content.title}
            </Text>
            {toast.content.description && (
              <Text slot="description" className="text-xs leading-relaxed text-secondary">
                {toast.content.description}
              </Text>
            )}
          </ToastContent>
          <Button
            slot="close"
            className="mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md text-secondary transition-colors hover:text-foreground"
          >
            <X size={12} weight="bold" />
          </Button>
        </Toast>
      )}
    </ToastRegion>
  );
}
