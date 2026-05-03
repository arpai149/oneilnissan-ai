import { NextResponse } from 'next/server';

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  vehicle?: string;
  message?: string;
  appointmentTime?: string;
  source?: string;
};

function buildLead(payload: LeadPayload) {
  const firstName = String(payload.firstName ?? '').trim();
  const lastName = String(payload.lastName ?? '').trim();
  const appointmentTime = String(payload.appointmentTime ?? '').trim();
  const rawMessage = String(payload.message ?? '').trim();
  const message = appointmentTime
    ? `${rawMessage}${rawMessage ? '\n\n' : ''}Preferred appointment time: ${appointmentTime}`
    : rawMessage;

  return {
    name: `${firstName} ${lastName}`.trim() || 'Unknown',
    firstName,
    lastName,
    email: String(payload.email ?? '').trim(),
    phone: String(payload.phone ?? '').trim(),
    vehicle: String(payload.vehicle ?? '').trim(),
    message,
    appointmentTime,
    source: String(payload.source ?? 'oneilnissan.ai').trim() || 'oneilnissan.ai',
  };
}

export async function POST(req: Request) {
  let payload: LeadPayload;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const required: (keyof LeadPayload)[] = ['firstName', 'lastName', 'email', 'phone'];
  const missing = required.filter((field) => !payload[field] || !String(payload[field]).trim());

  if (missing.length) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 });
  }

  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: 'Lead workflow is not configured.' }, { status: 503 });
  }

  try {
    const upstream = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildLead(payload)),
    });

    const text = await upstream.text();
    let workflowResponse: unknown = { ok: upstream.ok };

    try {
      workflowResponse = text ? JSON.parse(text) : { ok: upstream.ok };
    } catch {
      workflowResponse = { ok: upstream.ok, raw: text };
    }

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Lead workflow trigger failed.', workflowResponse }, { status: 502 });
    }

    return NextResponse.json({ success: true, workflowResponse });
  } catch {
    return NextResponse.json({ error: 'Failed to forward lead to workflow service.' }, { status: 502 });
  }
}
