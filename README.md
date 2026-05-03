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

## Dealer AI Email Ingestion Test Mode

### 1) Send a test email payload
Use raw email text in your request body:

```json
{
  "rawEmail": "From: john@example.com\nSubject: Interested in a Rogue\n\nHi team, my name is John Carter. Please call me at 555-343-1212. I want a 2024 Nissan Rogue SV."
}
```

### 2) Hit the test endpoint

```bash
curl -X POST http://localhost:3000/api/ingest/test \
  -H 'Content-Type: application/json' \
  -d '{"rawEmail":"From: john@example.com\nSubject: Interested in a Rogue\n\nHi team, my name is John Carter. Please call me at 555-343-1212. I want a 2024 Nissan Rogue SV."}'
```

You can also parse-only without insert:

```bash
curl -X POST http://localhost:3000/api/ingest/email-lead \
  -H 'Content-Type: application/json' \
  -d '{"rawEmail":"...raw email text..."}'
```

### 3) Confirm lead appears in dashboard
Open:

`/dealer-ai`

The inserted lead will appear in the Lead Queue with `status = new`, and `needsAttention = true` when `last_contact_at` is null.

### 4) Required environment variables

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`

Supabase must include a `leads` table with columns:
- `id` uuid
- `name` text
- `email` text
- `phone` text
- `vehicle` text
- `message` text
- `source` text
- `status` text default `new`
- `created_at` timestamp
- `last_contact_at` timestamp nullable
