"use client";

import { Check, Copy, X } from "@phosphor-icons/react";
import {
  DialogTrigger,
  Modal,
  ModalOverlay,
  Dialog,
  Heading,
  Button,
} from "react-aria-components";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { LOBSTERMAIL_INSTRUCTIONS } from "@/lib/constants";

const DEFAULT_TRIGGER_CLASS =
  "rounded-lg border-2 border-accent bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent shadow-[0_4px_8px_3px_rgba(251,87,5,0.15),0_1px_3px_0_rgba(0,0,0,0.30)] transition-all hover:bg-accent/20 hover:shadow-[0_6px_12px_3px_rgba(251,87,5,0.20),0_2px_4px_0_rgba(0,0,0,0.30)] cursor-pointer";

interface GetStartedPopupProps {
  triggerClassName?: string;
  triggerContent?: React.ReactNode;
  triggerAriaLabel?: string;
}

export function GetStartedPopup({
  triggerClassName,
  triggerContent,
  triggerAriaLabel = "Get started with LobsterMail",
}: GetStartedPopupProps) {
  const { copied, handleCopy } = useCopyToClipboard({
    text: LOBSTERMAIL_INSTRUCTIONS,
  });

  return (
    <DialogTrigger>
      <Button
        className={triggerClassName ?? DEFAULT_TRIGGER_CLASS}
        aria-label={triggerAriaLabel}
      >
        {triggerContent ?? "Get started"}
      </Button>
      <ModalOverlay
        isDismissable
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm data-[entering]:animate-modal-overlay-in data-[exiting]:animate-modal-overlay-out"
      >
        <Modal className="w-full max-w-lg rounded-2xl border border-edge-strong bg-background p-0 shadow-2xl outline-none data-[entering]:animate-modal-in data-[exiting]:animate-modal-out">
          <Dialog className="overflow-hidden rounded-2xl">
            {({ close }) => (
              <>
                {/* Header */}
                <div className="relative border-b border-edge bg-accent/[0.06] px-6 py-5">
                  <div className="flex items-center justify-center">
                    <Heading
                      slot="title"
                      className="text-lg font-semibold text-foreground text-center"
                    >
                      Send to your agent to create a mailbox instantly
                    </Heading>
                  </div>
                  <Button
                    slot="close"
                    onPress={close}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-md text-secondary transition-colors hover:bg-surface-3 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 cursor-pointer"
                    aria-label="Close dialog"
                  >
                    <X size={14} weight="bold" />
                  </Button>
                </div>

                {/* Body */}
                <div className="px-8 py-6">
                  <div
                    data-theme="dark"
                    className="overflow-hidden rounded-xl border-2 border-edge bg-terminal shadow-[0_0_24px_-4px_rgba(187,221,247,0.15)]"
                  >
                    <div className="flex flex-col items-center gap-3 px-5 py-3.5 text-center">
                      <span className="font-mono text-[13px] leading-relaxed text-foreground">
                        Go to <span className="text-accent">lobstermail.ai/skill</span> and follow the instructions to set up an email inbox
                      </span>
                      <Button
                        onPress={handleCopy}
                        className="flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-accent bg-accent/10 px-2.5 py-1.5 text-xs text-accent transition-colors hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 cursor-pointer"
                        aria-label="Copy instructions to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check size={13} weight="bold" className="animate-icon-pop" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
