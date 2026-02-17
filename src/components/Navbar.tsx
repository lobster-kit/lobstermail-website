"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { GetStartedPopup } from "./GetStartedPopup";

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
      className={`fixed top-0 z-50 w-full border-b backdrop-blur-xl transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-edge-strong bg-background/95"
          : "border-edge bg-background/80"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Image
            src="/lobster-mail-logo-2x.png"
            alt=""
            width={28}
            height={28}
            className="size-7 object-contain"
            aria-hidden
          />
          LobsterMail
        </a>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="#top"
            className="text-sm text-secondary transition-colors hover:text-foreground"
          >
            Top
          </a>
          <a
            href="#"
            className="text-sm text-secondary transition-colors hover:text-foreground"
          >
            Docs
          </a>
          <a
            href="#"
            className="text-sm text-secondary transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <ThemeToggle />
          <GetStartedPopup />
        </div>
      </div>
    </nav>
  );
}
