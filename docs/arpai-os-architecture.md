# ARPAI OS Production Blueprint

## 1) Product vision

**ARPAI OS** is a multi-tenant, AI-native operating system for building and running vertical AI products. The first product, **Dealer AI**, is the revenue wedge and data flywheel.

### North-star outcomes
- **Speed to value:** dealership sees measurable lead-response and close-rate improvements in first 14 days.
- **Revenue-first automation:** prioritize leakage capture, appointment conversion, and reactivation of stale leads.
- **Manager accountability:** every recommendation and action is attributable, reviewable, and auditable.
- **Autonomous product creation:** reusable platform primitives let ARPAI launch additional vertical copilots with minimal net-new architecture.

### Product principles
- **AI as control plane, not UI gimmick:** recommendations map directly to executable workflows.
- **Operational trust:** every AI decision has evidence, confidence, and rollback path.
- **Tenant isolation by default:** strict RLS and scoped API keys.
- **Human-in-the-loop escalation:** managers approve high-risk actions until trust thresholds are met.

---

## 2) System architecture

### High-level stack
- **Frontend + BFF:** Next.js (App Router) on Vercel.
- **Core data + auth:** Supabase Postgres/Auth/RLS/Storage/Edge Functions/pgvector.
- **Async compute:** Inngest (or Trigger.dev) for durable jobs.
- **External automation:** n8n for third-party workflow orchestration.
- **Billing:** Stripe.
- **Observability:** PostHog + Sentry.
- **Email:** Resend.
- **Source/SDLC:** GitHub + Actions + Codex agent workflows.

### Runtime components
1. **Web app (Next.js):**
   - Tenant admin, manager cockpit, rep workspace, settings, billing, audit views.
2. **API layer (route handlers + server actions):**
   - Validates auth/session, enforces tenant context, writes commands/events to Postgres.
3. **Supabase Postgres:**
   - System of record for tenants, leads, interactions, recommendations, tasks, actions, and audit logs.
4. **AI services:**
   - Embeddings in pgvector for semantic retrieval over lead notes, call transcripts, and SOPs.
   - LLM calls for leakage classification, next-best-action planning, and message drafting.
5. **Job runner (Inngest/Trigger.dev):**
   - Retries, idempotency keys, dead-letter handling, and scheduled jobs.
6. **n8n integration mesh:**
   - CRM sync, DMS/import feeds, webhook normalization, and outbound side effects to external tools.
7. **Event bus pattern (within Postgres):**
   - Append-only `event_log` table + job fanout.
8. **Observability plane:**
   - PostHog product events + feature flags.
   - Sentry errors/perf with tenant/user tags.

### Data flow (Dealer AI wedge)
1. Lead created/updated in CRM -> webhook to n8n.
2. n8n normalizes and posts signed payload to Supabase Edge Function.
3. Edge Function upserts lead + interaction events.
4. Inngest job runs leakage detector + NBA recommender.
5. Recommendations persisted and surfaced in manager cockpit.
6. User accepts recommendation -> action task dispatched (email/SMS/call task).
7. Result captured and fed back into model quality metrics.

---

## 3) Suggested repo structure

```text
arpai-os/
  app/                         # Next.js routes/layouts
    (marketing)/
    (auth)/
    (app)/
  components/
  lib/
    auth/
    db/
    ai/
    billing/
    telemetry/
    permissions/
  modules/                     # domain modules
    tenants/
    leads/
    leakage/
    recommendations/
    tasks/
    workflows/
    billing/
    audit/
  supabase/
    migrations/
    seeds/
    functions/                 # edge functions
  inngest/                     # or trigger/
    functions/
    workflows/
  n8n/
    workflows/
    docs/
  scripts/
  tests/
    unit/
    integration/
    e2e/
  docs/
    architecture/
    runbooks/
    adr/
  .github/
    workflows/
    ISSUE_TEMPLATE/
    PULL_REQUEST_TEMPLATE.md
```

### Branching and SDLC
- `main` protected; PR required; required checks + code owners.
- Conventional commits + semantic release tags.
- GitHub Issues as source of truth for roadmap and incidents.
- Codex agents operate on scoped issues, auto-open PR drafts with test evidence.

---

## 4) Supabase schema (multi-tenant, auditable)

### Core tables
- `tenants` (id, name, slug, plan, stripe_customer_id, status, created_at)
- `tenant_users` (tenant_id, user_id, role, invited_by, joined_at)
- `dealerships` (tenant_id, name, crm_type, timezone, metadata)
- `crm_connections` (tenant_id, dealership_id, provider, encrypted_secrets_ref, status, last_sync_at)

- `leads` (tenant_id, dealership_id, external_id, name, phone, email, source, stage, assigned_rep_id, created_at, updated_at)
- `lead_events` (tenant_id, lead_id, event_type, payload_json, occurred_at, ingested_at)
- `interactions` (tenant_id, lead_id, channel, direction, content, sentiment, created_by, created_at)

- `leakage_signals` (tenant_id, lead_id, signal_type, score, evidence_json, model_version, created_at)
- `recommendations` (tenant_id, lead_id, type, priority, rationale, confidence, status, generated_at, expires_at)
- `tasks` (tenant_id, lead_id, recommendation_id, owner_user_id, task_type, due_at, completed_at, outcome)

- `message_templates` (tenant_id, channel, intent, template_body, active)
- `knowledge_docs` (tenant_id, title, source, content, embedding vector(1536), metadata_json)

- `billing_subscriptions` (tenant_id, stripe_subscription_id, status, seats, renewal_at)
- `usage_events` (tenant_id, metric, quantity, source, occurred_at)

- `audit_logs` (tenant_id, actor_user_id, actor_type, action, object_type, object_id, before_json, after_json, ip, user_agent, created_at)
- `event_log` (tenant_id, stream, event_name, idempotency_key, payload_json, created_at, processed_at)

### Postgres patterns
- UUIDv7 primary keys.
- `tenant_id` on every tenant-scoped table.
- Composite indexes: `(tenant_id, created_at desc)`, `(tenant_id, lead_id)`.
- Partial indexes for open tasks/recommendations.
- Soft delete with `deleted_at` where needed.
- `pgcrypto` for deterministic hashes on PII lookup helpers.

### RLS model
- `auth.uid()` joins to `tenant_users`.
- Policies per role: `owner`, `manager`, `rep`, `readonly`.
- Service role bypass only in trusted server contexts.

---

## 5) App routes (Next.js App Router)

### Marketing + entry
- `/` homepage
- `/pricing`
- `/demo`
- `/security`

### Auth + onboarding
- `/login`
- `/signup`
- `/invite/accept`
- `/onboarding/tenant`
- `/onboarding/crm-connect`

### Product (tenant scoped)
- `/app` executive overview (KPIs, leakage, pipeline health)
- `/app/leads` list + advanced filters
- `/app/leads/[leadId]` timeline, AI recommendations, task actions
- `/app/recommendations` queue + approve/auto-approve rules
- `/app/tasks` team execution board
- `/app/manager/accountability` rep scorecards, SLA misses
- `/app/workflows` automation rules + n8n connector status
- `/app/knowledge` SOPs, snippets, policy docs
- `/app/audit` immutable action and model decision audit
- `/app/billing` Stripe plan, usage, invoices
- `/app/settings` roles, integrations, feature flags

### Internal ops
- `/internal/tenants`
- `/internal/model-evals`
- `/internal/incidents`

---

## 6) Core workflows

1. **Lead ingestion + normalization**
   - Source: CRM webhook, CSV import, manual entry.
   - Steps: validate signature -> normalize schema -> dedupe -> upsert lead -> emit event.

2. **Leakage detection**
   - Trigger: lead stale threshold, missed SLA, negative sentiment, no follow-up.
   - Output: leakage signals with confidence + evidence.

3. **Next-best-action (NBA) generation**
   - Inputs: lead state, recent interactions, SOPs, historical performance.
   - Output: ranked recommendations with rationale and expected impact.

4. **Action execution**
   - Manual approve or policy auto-run.
   - Create tasks and optional outbound message drafts.

5. **Manager accountability loop**
   - SLA breaches -> escalation digest email (Resend) + in-app alerts.
   - Weekly scorecards per rep and store.

6. **Billing + entitlements**
   - Stripe checkout -> webhook -> subscription state sync.
   - Entitlement checks at middleware and API boundaries.

7. **Product analytics + experimentation**
   - PostHog event taxonomy and funnel dashboards.
   - Feature flags for model variants and rollout control.

---

## 7) Security model

### Identity & access
- Supabase Auth with email magic links and SSO-ready abstraction.
- RBAC + optional ABAC claims for store-level permissions.
- Short-lived JWTs; server-side session validation on sensitive routes.

### Data protection
- Encrypt secrets via Supabase vault/external KMS reference.
- PII minimization; redact before LLM calls where possible.
- Signed URLs for Storage access.
- Audit log append-only policy; no hard deletes for regulated records.

### Application security
- Strict input validation (Zod) on all API boundaries.
- Idempotency keys for all webhook and background mutations.
- Rate limits by tenant and IP for public endpoints.
- Sentry alerting wired to incident playbooks.

### Compliance readiness
- SOC 2-aligned controls from day one: access review, change management, backup drills.
- Per-tenant data export and deletion workflow.

---

## 8) Deployment model

### Environments
- `dev`, `staging`, `prod` projects in Vercel + Supabase.
- Preview deployments per PR.
- Separate Stripe test/live, PostHog projects, Sentry env tags.

### CI/CD (GitHub Actions)
- Pipeline stages:
  1. lint + typecheck + unit tests
  2. integration tests (Supabase test DB)
  3. migration drift check
  4. e2e smoke tests (Playwright)
  5. deploy preview / promote

### Data/migration strategy
- SQL-first migrations in `supabase/migrations`.
- Backward-compatible expand/contract deployment.
- Automated snapshot backup checks.

### Reliability goals
- SLO: 99.9% app availability.
- RTO < 2 hours, RPO < 15 minutes.
- Dead-letter queues and replay tooling for failed jobs.

---

## 9) First 30 GitHub issues

1. Monorepo baseline and folder scaffolding.
2. Auth bootstrap with Supabase session middleware.
3. Tenant + role schema migrations.
4. RLS policies for core tables.
5. CRM webhook Edge Function with signature validation.
6. n8n webhook normalization workflow v1.
7. Lead upsert + dedupe service.
8. Lead timeline UI.
9. Leakage signal rule engine v1.
10. LLM-based leakage classifier service.
11. Recommendation generation service + prompt versioning.
12. Recommendation queue UI with approve/reject.
13. Task board and task lifecycle API.
14. PostHog base event taxonomy implementation.
15. Sentry browser + server integration.
16. Resend transactional email service wrapper.
17. Manager digest email template + scheduler.
18. Stripe checkout + customer portal integration.
19. Stripe webhook -> subscription sync.
20. Entitlements middleware and feature gating.
21. Audit log writer middleware.
22. Audit viewer route and filters.
23. Knowledge docs ingestion + pgvector embeddings.
24. Semantic retrieval API for SOP grounding.
25. Inngest/Trigger durable job framework.
26. Retry/idempotency utility library.
27. Feature flag admin UI backed by PostHog.
28. Internal model eval dashboard.
29. Incident runbook docs + on-call workflow.
30. CI/CD workflow hardening with migration gates.

---

## 10) MVP build sequence (fastest path to revenue)

### Phase 0 (Week 1): foundation
- Project setup, auth, tenants, roles, RLS, telemetry baseline.
- Minimal `/app` shell + dealer onboarding flow.

### Phase 1 (Weeks 2-3): ingestion + visibility
- CRM ingest via n8n + Supabase Edge Function.
- Lead timeline and leakage dashboard.
- Start manual manager workflows.

### Phase 2 (Weeks 4-5): recommendations + execution
- NBA generation and recommendation queue.
- Task execution board + basic outbound templates.
- Weekly manager digest emails.

### Phase 3 (Weeks 6-7): monetization + controls
- Stripe billing and plan enforcement.
- Audit logs and accountability scorecards.
- Pilot-ready SLOs and incident runbooks.

### Phase 4 (Weeks 8+): scale + autonomy
- Prompt/version experimentation via PostHog flags.
- Better retrieval grounding via pgvector knowledge docs.
- Codex-driven issue factory for new vertical products.

## KPI targets for MVP
- < 24h time-to-first-insight after CRM connection.
- +20% improvement in under-15-minute first response SLA.
- +10% appointment set rate uplift in pilot stores.
- Gross revenue retention > 90% at 90 days for first cohort.
