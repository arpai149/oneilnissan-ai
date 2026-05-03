import { type DealerLead, type ParsedEmailLead } from '@/lib/dealer-ai/types';

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { url, key };
}

export async function ensureLeadsTable() {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) {
    return { ok: false, error: 'Supabase is not configured.' };
  }

  const res = await fetch(`${url}/rest/v1/leads?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: 'no-store'
  });

  if (!res.ok) {
    return { ok: false, error: `Unable to access leads table (${res.status}). Create table leads in Supabase.` };
  }

  return { ok: true as const };
}

export async function insertLead(lead: ParsedEmailLead) {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) {
    throw new Error('Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY.');
  }

  const payload = { ...lead, status: 'new' };

  const res = await fetch(`${url}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`Failed to insert lead (${res.status}): ${await res.text()}`);
  }

  const rows = (await res.json()) as DealerLead[];
  return rows[0];
}
