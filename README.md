# HELIX — agency site

Next.js 16 · React 19 · Tailwind 4 · Supabase · Vercel · Cloudflare DNS.

## Local dev

```bash
cd agency-site
cp .env.local.example .env.local   # fill Supabase keys
npm install
npm run dev                        # http://localhost:3333
```

## Supabase setup (3 steps)

1. Create a project at https://supabase.com/dashboard → copy the project URL + anon key + service_role key into `.env.local`.
2. Open the SQL editor, paste `supabase/schema.sql`, run.
3. View submissions under **Table editor → leads**.

Schema locks the table to service_role writes only; RLS is on and no anon/authenticated policies exist — lead writes go through the Server Action which uses the service role on the server.

## Deploy to Vercel

```bash
npm i -g vercel
vercel link                   # link / create project
vercel env add NEXT_PUBLIC_SUPABASE_URL       production preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY  production preview
vercel env add SUPABASE_SERVICE_ROLE_KEY      production preview
vercel env add LEAD_NOTIFY_WEBHOOK            production      # optional
vercel --prod
```

Region `bom1` (Mumbai) is set in `vercel.json`. Change to your closest edge if needed.

## Cloudflare DNS → Vercel

Vercel issues apex + www. In Cloudflare DNS:

| Type  | Name | Target                    | Proxy |
|-------|------|---------------------------|-------|
| A     | @    | 76.76.21.21               | DNS only (grey cloud) |
| CNAME | www  | cname.vercel-dns.com      | DNS only (grey cloud) |

**Why grey cloud?** Vercel already terminates TLS and serves the edge. Putting Cloudflare proxy (orange cloud) in front double-proxies — adds latency, breaks preview URLs, and can conflict with Vercel's cache headers. Use Cloudflare purely as the authoritative DNS + registrar. Keep the orange cloud off.

If you do want the Cloudflare proxy (WAF, bot management, Workers), read https://vercel.com/docs/integrations/external-platforms/cloudflare first — you must set SSL mode to "Full (strict)" and disable Rocket Loader / Auto Minify for the zone.

### Domain addition on Vercel

In the Vercel dashboard → Project → Settings → Domains → add `helix.studio` and `www.helix.studio`. Vercel will show the exact DNS records to paste back into Cloudflare — always trust the dashboard over this README.

## Project layout

```
agency-site/
  app/
    actions.ts          # server action: submitLead → supabase
    layout.tsx          # root layout, metadata, fonts
    page.tsx            # composes sections
    globals.css         # tokens, grain, aurora, kinetic type
  components/           # Nav, Hero, Services, Work, Metrics, ...
  lib/supabase-server.ts
  supabase/schema.sql
  vercel.json
  next.config.ts
```

## Accessibility

- Respects `prefers-reduced-motion` — aurora/marquee/GSAP reveals all short-circuit.
- Focus rings honored with `:focus-visible`.
- All decorative SVG marked `aria-hidden`.

## Lighthouse budget

Aim: performance 95+, a11y 100, SEO 100. Remote Unsplash images are served via `next/image`; replace with self-hosted + `priority` on the hero thumb when shipping for real.
