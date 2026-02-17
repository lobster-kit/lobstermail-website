"use client";

import { useState, useCallback } from "react";
import {
  DialogTrigger,
  Modal,
  ModalOverlay,
  Dialog,
  Heading,
  Button,
} from "react-aria-components";

const COMMAND = "npm install lobstermail";

export function GetStartedPopup() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }, []);

  return (
    <DialogTrigger>
      <Button
        className="rounded-lg border-2 border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20 cursor-pointer"
        aria-label="Get started with LobsterMail"
      >
        Get started
      </Button>
      <ModalOverlay
        isDismissable
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm data-[entering]:animate-modal-overlay-in data-[exiting]:animate-modal-overlay-out"
      >
        <Modal className="w-full max-w-md rounded-2xl border border-edge-strong bg-background p-0 shadow-2xl outline-none data-[entering]:animate-modal-in data-[exiting]:animate-modal-out">
          <Dialog className="overflow-hidden rounded-2xl">
            {({ close }) => (
              <>
                {/* Header with lobster branding */}
                <div className="border-b border-edge bg-accent/[0.06] px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-xl"
                      aria-hidden
                    >
                      🦞
                    </span>
                    <div>
                      <Heading
                        slot="title"
                        className="text-lg font-semibold text-foreground"
                      >
                        One command. Done.
                      </Heading>
                      <p className="mt-0.5 text-sm text-secondary">
                        Give this to your Lobster — it installs LobsterMail and
                        creates the email for you.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Command block */}
                <div className="p-6">
                  <div
                    data-theme="dark"
                    className="overflow-hidden rounded-xl border border-accent/20 bg-terminal shadow-[0_0_24px_-4px_rgba(234,67,53,0.15)]"
                  >
                    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                      <div className="flex items-center gap-2.5 font-mono text-[14px]">
                        <span className="text-accent">$</span>
                        <span className="text-foreground">{COMMAND}</span>
                      </div>
                      <Button
                        onPress={handleCopy}
                        className="flex shrink-0 items-center gap-1.5 rounded-md border border-edge-input bg-surface-3 px-2.5 py-1 text-xs text-secondary transition-colors hover:border-accent/30 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 cursor-pointer"
                        aria-label={`Copy "${COMMAND}" to clipboard`}
                      >
                        {copied ? (
                          <>
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="9"
                                y="9"
                                width="13"
                                height="13"
                                rx="2"
                                ry="2"
                              />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <p className="mt-4 text-center text-xs text-secondary">
                    No API keys. No signup. Your agent pinches its own inbox.
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 border-t border-edge px-6 py-4">
                  <Button
                    slot="close"
                    onPress={close}
                    className="rounded-lg border border-edge-strong bg-surface-3 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 cursor-pointer"
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
