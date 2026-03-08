"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";
import {
  DialogTrigger,
  ModalOverlay,
  Modal,
  Dialog,
  Heading,
  Button,
} from "react-aria-components";
import { ThemeToggle } from "./ThemeToggle";
import { GetStartedPopup } from "./GetStartedPopup";

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/compare", label: "Compare" },
];

function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <>
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
      <ThemeToggle />
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
                      <div className="mt-4 flex items-center gap-4 border-t border-edge pt-6">
                        <ThemeToggle />
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

