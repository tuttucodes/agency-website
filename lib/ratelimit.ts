import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let cached: Ratelimit | null = null;

/**
 * Returns a configured Ratelimit, or `null` if Upstash env vars are not set.
 * Callers must treat `null` as "no rate limiting available" — the form should
 * still accept submissions in local dev where these vars are absent.
 */
export function getLeadRatelimit(): Ratelimit | null {
  if (cached) return cached;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  cached = new Ratelimit({
    redis,
    // 5 submissions per IP per hour, sliding window.
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
    prefix: "kernelandoak:leads",
  });
  return cached;
}
