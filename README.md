# O'Neil Nissan AI (Production Website v1)

Production Next.js App Router website for **oneilnissan.ai** with conversion-focused dealership journeys, SEO implementation, analytics hooks, AI intake entry points, and lead capture routing.

## Local development

```bash
npm install
npm run dev
```

## Build / run

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local`.

- `NEXT_PUBLIC_GA4_ID` – GA4 measurement ID
- `NEXT_PUBLIC_GTM_ID` – GTM container ID
- `N8N_WEBHOOK_URL` – n8n lead webhook endpoint (required for successful lead submission)
- `LEAD_API_KEY` – optional webhook auth header value
- `NEXT_PUBLIC_SITE_URL` – public site URL

## Deployment

### GitHub → Vercel

```bash
git add .
git commit -m "Production website build"
git push origin main
```

### Vercel CLI

```bash
npx vercel --prod
```

## Intentional stubs (integration-ready)

- Inventory uses structured local placeholder data in `content/inventory.ts` until live feed integration is connected.
- `/vehicle/[id]` VDP-style pages are live placeholders for future real feed-backed vehicle pages.
- AI assistant page is a production-ready **intake experience**; real-time conversational chat UI can be wired next.
