"use client";

import {
  ToggleButtonGroup,
  ToggleButton,
} from "react-aria-components";
import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme, type Theme } from "./ThemeProvider";
import type { Key } from "react-aria-components";

const modes: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: "light", label: "Light", icon: <Sun size={16} weight="bold" /> },
  { id: "dark", label: "Dark", icon: <Moon size={16} weight="bold" /> },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleButtonGroup
      aria-label="Color theme"
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={new Set([theme])}
      onSelectionChange={(keys: Set<Key>) => {
        const next = [...keys][0] as Theme;
        if (next) setTheme(next);
      }}
      className="flex items-center gap-0.5 rounded-full border-2 border-edge-strong bg-surface-3 p-1"
    >
      {modes.map(({ id, label, icon }) => (
        <ToggleButton
          key={id}
          id={id}
          aria-label={label}
          className="flex h-7 cursor-pointer items-center gap-1.5 rounded-full px-2 text-xs text-secondary outline-none transition-all duration-150 hover:text-foreground data-[selected]:bg-foreground/[0.12] data-[selected]:text-foreground data-[selected]:shadow-sm"
        >
          <span className="theme-toggle-icon">{icon}</span>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

