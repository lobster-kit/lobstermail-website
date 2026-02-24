"use client";

import { useState, useCallback } from "react";

interface UseCopyToClipboardOptions {
  text: string;
  resetDelay?: number;
  onCopy?: () => void;
}

export function useCopyToClipboard({
  text,
  resetDelay = 2000,
  onCopy,
}: UseCopyToClipboardOptions) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
      onCopy?.();
    } catch {
      /* clipboard API not available */
    }
  }, [text, resetDelay, onCopy]);

  return { copied, handleCopy };
}
