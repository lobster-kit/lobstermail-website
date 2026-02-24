"use client";

import { useState } from "react";
import { Robot, User } from "@phosphor-icons/react";
import { CopySnippetBlock } from "./CopySnippetBlock";
import { CopyConfirmationModal } from "./CopyConfirmationModal";

function AgentAvatar() {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent">
        <Robot size={15} weight="fill" />
      </span>
      <span className="text-[9px] font-semibold uppercase tracking-wider text-accent/60">
        Agent
      </span>
    </div>
  );
}

function HumanAvatar() {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/20 text-secondary">
        <User size={15} weight="fill" />
      </span>
      <span className="text-[9px] font-semibold uppercase tracking-wider text-secondary/60">
        You
      </span>
    </div>
  );
}

export function CodeSnippet() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="glass-strong w-full p-6 sm:p-8">
        <div className="flex flex-col gap-[35px] rounded-xl bg-glass-strong-bg p-5 sm:p-6">
          {/* Message 1: Agent says it needs an email */}
          <div className="flex items-start gap-3">
            <AgentAvatar />
            <div className="rounded-2xl rounded-tl-md bg-accent/[0.08] px-4 py-2.5 font-mono text-sm text-foreground">
              I need an email address to continue, but I don&apos;t have one.
            </div>
          </div>

          {/* Message 2: Human gives the setup link */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start justify-end gap-3">
              <div className="rounded-2xl rounded-tr-md bg-surface-4 px-4 py-2.5 font-mono text-sm text-foreground">
                Here, use 🦞 LobsterMail:
              </div>
              <HumanAvatar />
            </div>
            <CopySnippetBlock onCopy={() => setShowModal(true)} />
          </div>

          {/* Message 3: Agent confirms */}
          <div className="flex items-start gap-3">
            <AgentAvatar />
            <div className="rounded-2xl rounded-tl-md bg-accent/[0.08] px-4 py-2.5 font-mono text-sm text-foreground">
              Done. I&apos;m now at{" "}
              <span className="text-accent">crustacean@lobstermail.ai</span>
            </div>
          </div>
        </div>
      </div>

      <CopyConfirmationModal
        isOpen={showModal}
        onOpenChange={setShowModal}
      />
    </>
  );
}
