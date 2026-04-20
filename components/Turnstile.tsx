"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        opts: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          appearance?: "always" | "execute" | "interaction-only";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile widget.
 *
 * Renders a hidden token input that the parent <form> picks up on submit.
 * If `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is missing, the component renders
 * nothing — the server action will skip verification too.
 */
export function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey) return;
    const init = () => {
      if (!window.turnstile || !containerRef.current) return;
      // Avoid double-render on Strict Mode dev re-mount.
      if (widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        appearance: "interaction-only",
      });
    };

    if (window.turnstile) {
      init();
    } else {
      const onReady = () => init();
      window.addEventListener("turnstile:ready", onReady, { once: true });
      return () => window.removeEventListener("turnstile:ready", onReady);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => {
          window.dispatchEvent(new Event("turnstile:ready"));
        }}
      />
      <div ref={containerRef} className="mt-4" data-turnstile-container="" />
    </>
  );
}
