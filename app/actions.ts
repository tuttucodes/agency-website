"use server";

import { getServiceRoleClient } from "@/lib/supabase-server";
import { getLeadRatelimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { headers } from "next/headers";

export type LeadState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "company" | "brief" | "scope", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(v: FormDataEntryValue | null, max = 2000): string {
  if (typeof v !== "string") return "";
  return v.replace(/\u0000/g, "").trim().slice(0, max);
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const honey = sanitize(formData.get("website"), 200);
  if (honey) return { ok: true, message: "Thanks — we'll be in touch." };

  const name = sanitize(formData.get("name"), 120);
  const email = sanitize(formData.get("email"), 200).toLowerCase();
  const company = sanitize(formData.get("company"), 160);
  const brief = sanitize(formData.get("brief"), 4000);
  const scope = formData.getAll("scope").map((v) => sanitize(v, 40)).filter(Boolean);
  const turnstileToken = sanitize(formData.get("cf-turnstile-response"), 4096) || null;

  const fieldErrors: NonNullable<LeadState["fieldErrors"]> = {};
  if (!name || name.length < 2) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "A valid email address is required.";
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, message: "Check the highlighted fields.", fieldErrors };
  }

  const hdrs = await headers();
  const ua = hdrs.get("user-agent") ?? null;
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    hdrs.get("x-real-ip") ??
    null;

  // 1. Rate limit by IP — fail closed only when Upstash is configured.
  const limiter = getLeadRatelimit();
  if (limiter && ip) {
    const { success, reset } = await limiter.limit(ip);
    if (!success) {
      const waitMins = Math.max(1, Math.ceil((reset - Date.now()) / 60_000));
      return {
        ok: false,
        message: `Too many submissions from this network. Try again in ~${waitMins} min, or email hello@kernelandoak.com directly.`,
      };
    }
  }

  // 2. Turnstile verification — only enforced when Cloudflare keys are set.
  const tsResult = await verifyTurnstile(turnstileToken, ip);
  if (!tsResult.ok) {
    console.warn("[lead.turnstile.failed]", tsResult.reason);
    return {
      ok: false,
      message: "We couldn't verify that you're human. Please refresh and try again.",
    };
  }

  // 3. Persist.
  try {
    const supabase = getServiceRoleClient();
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      company: company || null,
      scope,
      brief: brief || null,
      ip,
      user_agent: ua,
      source: "kernel-and-oak",
    });
    if (error) {
      console.error("[leads.insert]", error);
      return {
        ok: false,
        message: "Something went wrong saving your note. Please email hello@kernelandoak.com directly.",
      };
    }
  } catch (err) {
    console.error("[leads.insert.exception]", err);
    return {
      ok: false,
      message: "Server misconfigured. Please email hello@kernelandoak.com directly.",
    };
  }

  // 4. Optional: notify Slack/webhook.
  const webhook = process.env.LEAD_NOTIFY_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          text: `New Kernel & Oak lead · ${name} (${email}) @ ${company || "—"} · scope: ${scope.join(", ") || "—"}`,
        }),
      });
    } catch {
      // non-blocking
    }
  }

  return { ok: true, message: "Thanks — we reply within 8 business hours." };
}
