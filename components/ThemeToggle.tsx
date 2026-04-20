"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "kao-theme";

function readPersisted(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

/**
 * Theme toggle pill — light / dark swap, persisted to localStorage.
 *
 * A FOUC guard inlined in <head> (see layout.tsx) reads the same key on first
 * paint so the initial render matches the user's saved preference. Without
 * that guard the page would briefly flash whichever theme the server assumed.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current =
      (document.documentElement.classList.contains("light") ? "light" : "dark") as Theme;
    setTheme(current);
  }, []);

  if (!theme) {
    // Reserve space; avoid layout shift while hydrating.
    return <span aria-hidden="true" className={`inline-block h-6 w-11 ${className}`} />;
  }

  const next: Theme = theme === "dark" ? "light" : "dark";
  const onClick = () => {
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — no-op */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      role="switch"
      aria-checked={theme === "light"}
      aria-label={`Switch to ${next} mode`}
      className={`theme-toggle shrink-0 ${className}`}
      title={`${theme[0].toUpperCase()}${theme.slice(1)} mode · click to switch`}
    />
  );
}
