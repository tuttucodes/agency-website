/**
 * Cloudflare Turnstile server-side token verification.
 *
 * Returns `{ ok: true }` if the token is valid OR if Turnstile is not
 * configured (no secret key in env) — letting the form work in local dev.
 * Returns `{ ok: false, reason }` only on an explicit verification failure.
 */
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult = { ok: true } | { ok: false; reason: string };

type CloudflareResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
};

export async function verifyTurnstile(
  token: string | null,
  remoteIp: string | null,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Not configured — skip silently. Operator decides when to enable.
    return { ok: true };
  }
  if (!token) {
    return { ok: false, reason: "missing-token" };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      // Short timeout — never block a form submit on a long Cloudflare wait.
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      return { ok: false, reason: `verify-http-${res.status}` };
    }
    const data = (await res.json()) as CloudflareResponse;
    if (data.success) return { ok: true };
    return { ok: false, reason: (data["error-codes"]?.[0] ?? "verify-failed") };
  } catch (err) {
    console.error("[turnstile.verify]", err);
    return { ok: false, reason: "verify-exception" };
  }
}
