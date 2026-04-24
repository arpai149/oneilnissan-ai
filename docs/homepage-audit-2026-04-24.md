# oneilnissan.ai Homepage Audit (2026-04-24)

## What is active in this repository

- Framework/runtime is **Next.js App Router** (`next` 15.3.1 + React 19) driven by `next dev/build/start` scripts in `package.json`.
- Vercel is expected as deployment target (`vercel.json` sets `framework: nextjs`; README deploy instructions target Vercel).
- Root route `/` is served by `app/page.tsx` and wrapped by `app/layout.tsx`.
- No `pages/` router, no custom rewrites/redirects in `next.config.ts`, and no route overrides in `vercel.json`.

## Why production can still show the old AI widget scaffold

- The original scaffold existed as a standalone root `index.html` in commit `dde20d7` (title "O'Neil Nissan AI Widget").
- That `index.html` was explicitly deleted in commit `257d6a8`, where the Next.js app structure (`app/`, `components/`, `package.json`, `vercel.json`) was added.
- Therefore, if `oneilnissan.ai` still renders the scaffold, the domain is very likely resolving to a **different Vercel project/deployment/branch** (or an older deployment), not the current branch contents.

## Homepage-controlling files

Primary:
- `app/page.tsx` (homepage content for `/`)
- `app/layout.tsx` (global shell around homepage)

Homepage-critical dependencies:
- `components/Header.tsx` (brand + nav at top)
- `components/Footer.tsx` (footer)
- `components/CtaStrip.tsx` (primary homepage CTA buttons)
- `components/InventoryGrid.tsx` (featured inventory section)
- `components/LeadForm.tsx` (homepage lead form)
- `components/AiEntryCta.tsx` (persistent AI CTA in layout)
- `components/SeoJsonLd.tsx` (structured data injected on homepage/layout)
- `lib/site.ts` (site URL/brand metadata used by layout + page metadata)

## Routing conflict assessment

In-repo conflicts: **none detected**.

- No catch-all route that can override `/`.
- Static and dynamic routes are separated (`/models/[slug]`, `/vehicle/[id]`) and do not shadow root.
- No rewrites/redirects in repository config files.

Operational conflict likely:
- Domain/project linkage mismatch in Vercel dashboard (domain attached to wrong project/team), or production alias pinned to stale deployment.

## Safest execution plan (no redesign)

1. **Identify the currently serving Vercel project** for `oneilnissan.ai`.
   - In Vercel dashboard: Domains → `oneilnissan.ai` → note owning Project + Team + target environment.
2. **Compare that project against this repo root**.
   - Ensure Framework Preset is Next.js.
   - Ensure Root Directory points to repository root (where `package.json`, `app/`, `vercel.json` live).
   - Ensure Production Branch matches the branch containing commit `a27bf3b` (or newer).
3. **Verify deployment artifact before flipping traffic**.
   - Trigger a fresh production deploy from the correct commit.
   - Open deployment preview URL and confirm `/` renders `app/page.tsx` content.
4. **Fix domain attachment only after validation**.
   - Reassign `oneilnissan.ai` to the validated project/deployment.
   - Remove domain from any legacy scaffold project to prevent fallback.
5. **Post-cutover safety checks**.
   - Validate `/`, `/new`, `/used`, `/ai-assistant`, `/api/leads`.
   - Confirm headers and structured data present.
6. **Rollback strategy**.
   - Keep prior deployment alias available until smoke checks pass.
   - If any regression occurs, re-point domain alias to previous stable deployment and investigate.
