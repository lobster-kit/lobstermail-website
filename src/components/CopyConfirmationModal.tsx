"use client";

import { Check, X } from "@phosphor-icons/react";
import {
  Modal,
  ModalOverlay,
  Dialog,
  Heading,
  Button,
} from "react-aria-components";

interface CopyConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function CopyConfirmationModal({
  isOpen,
  onOpenChange,
}: CopyConfirmationModalProps) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm data-[entering]:animate-modal-overlay-in data-[exiting]:animate-modal-overlay-out"
    >
      <Modal className="w-full max-w-md rounded-2xl border border-edge-strong bg-background p-0 shadow-2xl outline-none data-[entering]:animate-modal-in data-[exiting]:animate-modal-out">
        <Dialog className="overflow-hidden rounded-2xl">
          {({ close }) => (
            <>
              {/* Header */}
              <div className="relative border-b border-edge bg-accent/[0.06] px-6 py-5">
                <div className="flex items-center justify-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent"
                    aria-hidden
                  >
                    <Check size={20} weight="bold" />
                  </span>
                  <Heading
                    slot="title"
                    className="text-lg font-semibold text-foreground"
                  >
                    Instructions copied!
                  </Heading>
                </div>
                <Button
                  slot="close"
                  onPress={close}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-secondary transition-colors hover:bg-surface-3 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                  aria-label="Close"
                >
                  <X size={14} weight="bold" />
                </Button>
              </div>

              {/* Body */}
              <div className="flex flex-col items-center gap-5 px-8 py-6">
                <p className="text-center text-base leading-relaxed text-foreground">
                  Paste these instructions to your AI agent — it will visit{" "}
                  <span className="font-mono text-accent">
                    lobstermail.ai/skill
                  </span>{" "}
                  and set up an email inbox instantly.
                </p>
                <Button
                  onPress={close}
                  className="btn-primary w-full cursor-pointer px-6 py-3"
                >
                  I&apos;ve sent this to my agent
                </Button>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
