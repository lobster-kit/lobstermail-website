"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { CopySnippetBlock } from "./CopySnippetBlock";
import { CopyConfirmationModal } from "./CopyConfirmationModal";

export function FinalCTA() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(251,87,5,0.04), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <FadeIn>
          <h2 className="text-xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Tell your lobster to pinch its own email.{" "}<br className="sm:hidden" />It will.
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex flex-col items-center">
              <div
                className="pointer-events-none absolute -inset-6 -z-10 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(251,87,5,0.15), transparent 70%)",
                }}
              />
              <p className="mb-3 text-sm font-medium text-accent">
                Setup instructions for your agent
              </p>
              <CopySnippetBlock onCopy={() => setShowModal(true)} />
            </div>
            <Link
              href="/docs"
              className="link-underline text-sm text-secondary transition-colors hover:text-foreground"
            >
              View docs <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </FadeIn>
      </div>

      <CopyConfirmationModal
        isOpen={showModal}
        onOpenChange={setShowModal}
      />
    </section>
  );
}
