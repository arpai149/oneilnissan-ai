import { NextResponse } from 'next/server';
import { LeadPayload, processLead, validateLead } from '@/lib/leadEngine';

export async function POST(req: Request) {
  let payload: LeadPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const missing = validateLead(payload);
  if (missing.length) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 });
  }

  try {
    const result = await processLead(payload);
    return NextResponse.json({ success: true, aiResponse: result.aiMessage });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Lead processing failed.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
