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
  name: string;
  timestamp: string;
};

const memoryDb: StoredLead[] = [];

const DEFAULT_N8N_LEAD_WEBHOOK = 'https://arpai1.app.n8n.cloud/webhook/lead-in';

export function validateLead(payload: LeadPayload): string[] {
  const required: (keyof LeadPayload)[] = ['firstName', 'lastName', 'email', 'phone', 'vehicle'];
  return required.filter((field) => !payload[field] || !String(payload[field]).trim());
}

function normalizeLead(payload: LeadPayload): StoredLead {
  const firstName = payload.firstName!.trim();
  const lastName = payload.lastName!.trim();
  const vehicle = payload.vehicle?.trim() || '';
  const appointmentTime = payload.appointmentTime?.trim();
  const rawMessage = payload.message?.trim() || '';
  const message = appointmentTime
    ? `${rawMessage}${rawMessage ? '\n\n' : ''}Preferred appointment time: ${appointmentTime}`
    : rawMessage;

  return {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`.trim(),
    email: payload.email!.trim(),
    phone: payload.phone!.trim(),
    vehicle,
    message,
    appointmentTime,
    source: payload.source?.trim() || 'oneilnissan.ai',
    timestamp: new Date().toISOString(),
  };
}

async function triggerLeadWorkflow(lead: StoredLead) {
  const webhook = process.env.N8N_WEBHOOK_URL || DEFAULT_N8N_LEAD_WEBHOOK;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (process.env.LEAD_API_KEY) {
    headers['x-api-key'] = process.env.LEAD_API_KEY;
  }

  const response = await fetch(webhook, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      vehicle: lead.vehicle,
      message: lead.message,
      source: lead.source,
      appointmentTime: lead.appointmentTime,
      firstName: lead.firstName,
      lastName: lead.lastName,
    }),
  });

  const text = await response.text();
  let data: unknown = { raw: text };

  try {
    data = text ? JSON.parse(text) : { success: true };
  } catch {
    data = { raw: text, success: response.ok };
  }

  if (!response.ok) {
    throw new Error(`Lead workflow trigger failed (${response.status}). ${text || response.statusText}`);
  }

  return data;
}

export async function processLead(payload: LeadPayload) {
  const lead = normalizeLead(payload);

  // Keep a lightweight in-memory copy only for local/dev debugging.
  memoryDb.push(lead);

  const workflowResponse = await triggerLeadWorkflow(lead);
  const aiMessage = `Thanks ${lead.firstName}. We received your request for ${lead.vehicle}. A manager will review it quickly and follow up with the best next step.`;

  return { lead, aiMessage, workflowResponse };
}

export function getMemoryLeads() {
  return memoryDb;
}
