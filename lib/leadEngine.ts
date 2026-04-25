export type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  vehicle?: string;
  message?: string;
  appointmentTime?: string;
  source?: string;
};

type StoredLead = Required<Pick<LeadPayload, 'firstName' | 'lastName' | 'email' | 'phone'>> & LeadPayload & {
  timestamp: string;
};

const memoryDb: StoredLead[] = [];

export function validateLead(payload: LeadPayload): string[] {
  const required: (keyof LeadPayload)[] = ['firstName', 'lastName', 'email', 'phone', 'vehicle'];
  return required.filter((field) => !payload[field] || !String(payload[field]).trim());
}

async function storeLead(lead: StoredLead) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error('Supabase insert failed.');
    return;
  }

  memoryDb.push(lead);
}

async function generateAiMessage(lead: StoredLead): Promise<string> {
  const fallback = `Thanks ${lead.firstName}. ${lead.vehicle} is available on select models for qualified buyers; see dealer for details. Do you want to stop in today or tomorrow? Book here: https://oneilnissan.ai/schedule-test-drive`;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return fallback;

  try {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: `Write a concise dealership lead response. Lead: ${JSON.stringify(lead)}. Must: confirm availability direction, ask appointment question exactly 'Do you want to stop in today or tomorrow?', include CTA link https://oneilnissan.ai/schedule-test-drive.`,
      }),
    });
    if (!res.ok) return fallback;
    const data = await res.json() as { output_text?: string };
    return data.output_text?.trim() || fallback;
  } catch {
    return fallback;
  }
}

async function triggerEmail(lead: StoredLead, aiMessage: string) {
  const emailWebhook = process.env.EMAIL_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;
  if (!emailWebhook) return;

  const res = await fetch(emailWebhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.LEAD_API_KEY ?? '',
    },
    body: JSON.stringify({
      type: 'lead_autoresponder',
      to: lead.email,
      subject: `Your O'Neil Nissan request: ${lead.vehicle}`,
      message: aiMessage,
      lead,
    }),
  });

  if (!res.ok) throw new Error('Email workflow trigger failed.');
}

export async function processLead(payload: LeadPayload) {
  const timestamp = new Date().toISOString();
  const lead: StoredLead = {
    firstName: payload.firstName!.trim(),
    lastName: payload.lastName!.trim(),
    email: payload.email!.trim(),
    phone: payload.phone!.trim(),
    vehicle: payload.vehicle?.trim(),
    message: payload.message?.trim(),
    appointmentTime: payload.appointmentTime?.trim(),
    source: payload.source?.trim() || 'web',
    timestamp,
  };

  await storeLead(lead);
  const aiMessage = await generateAiMessage(lead);
  await triggerEmail(lead, aiMessage);
  return { lead, aiMessage };
}

export function getMemoryLeads() {
  return memoryDb;
}
