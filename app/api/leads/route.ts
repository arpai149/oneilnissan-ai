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
    return NextResponse.json({ error: 'Lead webhook is not configured.' }, { status: 503 });
  }

  try {
    const upstream = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.LEAD_API_KEY ?? ''
      },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Lead service is temporarily unavailable.' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: 'Failed to forward lead to workflow service.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
