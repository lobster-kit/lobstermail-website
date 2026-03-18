"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  List,
  X,
  CaretDown,
  UserCirclePlus,
  Receipt,
  Database,
  ShieldCheck,
  Globe,
  MagnifyingGlass,
  ChatCircleText,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import {
  DialogTrigger,
  ModalOverlay,
  Modal,
  Dialog,
  Heading,
  Button,
} from "react-aria-components";

import { GetStartedPopup } from "./GetStartedPopup";
import { useCases } from "@/lib/use-cases";

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
];

const useCaseIcons: Record<string, Icon> = {
  "agent-onboarding": UserCirclePlus,
  "billing-resolution": Receipt,
  "data-extraction": Database,
  "injection-protection": ShieldCheck,
  "custom-domains": Globe,
  "multi-inbox-search": MagnifyingGlass,
  "thread-management": ChatCircleText,
};

function UseCasesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-secondary transition-colors hover:text-foreground cursor-pointer"
        aria-expanded={open}
      >
        Use Cases
        <CaretDown
          size={12}
          weight="bold"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-[calc(100%+12px)] z-[100] w-max -translate-x-1/2 rounded-2xl border-2 border-edge-strong bg-background p-4 shadow-[0_20px_40px_rgba(0,80,171,0.22),0_0_0_1px_rgba(0,0,0,0.4)]">
          {/* Arrow */}
          <div className="absolute -top-[7px] left-1/2 size-3 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-edge-strong bg-background" />

          <div className="flex flex-col gap-2">
            {useCases.map((uc) => {
              const IconComponent = useCaseIcons[uc.slug];
              return (
                <a
                  key={uc.slug}
                  href={`/use-cases/${uc.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-3"
                >
                  {IconComponent && <IconComponent size={18} weight="regular" className="shrink-0 text-secondary" />}
                  {uc.title}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <>
      <UseCasesDropdown />
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-sm text-secondary transition-colors hover:text-foreground"
          onClick={onLinkClick}
        >
          {link.label}
        </a>
      ))}
      <GetStartedPopup />
    </>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b-2 backdrop-blur-xl transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-edge-strong bg-background/95"
          : "border-edge bg-background/80"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-base font-extrabold text-foreground">
          <Image
            src="/lobster-mail-logo-2x.png"
            alt="LobsterMail logo"
            width={28}
            height={28}
            className="size-7 object-contain"
          />
          LobsterMail
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLinks />
        </div>

        {/* Mobile: burger + Get Started */}
        <div className="flex items-center gap-2 md:hidden">
          <DialogTrigger>
            <Button
              className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 cursor-pointer"
              aria-label="Open menu"
            >
              <List size={24} weight="regular" />
            </Button>
          <ModalOverlay
            isDismissable
            className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl data-[entering]:animate-modal-overlay-in data-[exiting]:animate-modal-overlay-out md:hidden"
          >
            <Modal className="flex h-full w-full flex-col outline-none data-[entering]:animate-modal-in data-[exiting]:animate-modal-out">
              <Dialog className="flex h-full flex-col">
                {({ close }) => (
                  <>
                    <div className="flex items-center justify-between border-b border-edge px-6 py-3.5">
                      <Heading slot="title" className="sr-only">
                        Navigation menu
                      </Heading>
                      <span className="text-base font-semibold text-foreground">
                        Menu
                      </span>
                      <Button
                        onPress={close}
                        className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 cursor-pointer"
                        aria-label="Close menu"
                      >
                        <X size={24} weight="regular" />
                      </Button>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 px-6 py-6">
                      {/* Use Cases section */}
                      <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                        Use Cases
                      </p>
                      {useCases.map((uc) => (
                        <a
                          key={uc.slug}
                          href={`/use-cases/${uc.slug}`}
                          onClick={() => close()}
                          className="rounded-lg px-4 py-2 text-sm text-secondary transition-colors hover:bg-surface-2 hover:text-foreground"
                        >
                          {uc.title}
                        </a>
                      ))}

                      <div className="my-2 border-t border-edge" />

                      {navLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => close()}
                          className="rounded-lg px-4 py-3 text-base text-secondary transition-colors hover:bg-surface-2 hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ))}
                      <div className="mt-4 flex items-center border-t border-edge pt-6">
                        <GetStartedPopup />
                      </div>
                    </div>
                  </>
                )}
              </Dialog>
            </Modal>
          </ModalOverlay>
          </DialogTrigger>
          <GetStartedPopup />
        </div>
      </div>
    </nav>
  );
}

