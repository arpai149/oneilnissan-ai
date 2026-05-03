import { mockLeads, type DealerLead } from '@/lib/dealer-ai/mockLeads';

const riskOldHours = 72;

function computeRisk(lead: DealerLead) {
  const now = Date.now();
  const createdMs = new Date(lead.created_at).getTime();
  const noContact = !lead.last_contact_at;
  const old = now - createdMs > riskOldHours * 60 * 60 * 1000;
  return { noContact, old, needsAttention: noContact || old };
}

export async function getDealerAiDashboard() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let connection = 'not_configured';
  let leads: DealerLead[] = mockLeads;
  let error: string | null = null;

  if (url && key) {
    const res = await fetch(`${url}/rest/v1/leads?select=id,name,email,phone,source,stage,created_at,last_contact_at&limit=100&order=created_at.desc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store'
    });

    if (res.ok) {
      connection = 'connected';
      const rows = (await res.json()) as DealerLead[];
      leads = rows.length ? rows : mockLeads;
    } else {
      connection = 'error';
      error = await res.text();
    }
  }

  const scored = leads.map((lead) => ({ ...lead, risk: computeRisk(lead) }));
  const totals = {
    totalLeads: scored.length,
    highRiskLeads: scored.filter((lead) => lead.risk.needsAttention).length,
    newLeads: scored.filter((lead) => lead.stage === 'new').length
  };

  return {
    connection,
    note: connection === 'connected' ? 'Supabase connected and leads table readable.' : 'Using mock seed leads. Configure Supabase env vars and ensure leads table exists.',
    leads: scored,
    totals,
    error
  };
}
