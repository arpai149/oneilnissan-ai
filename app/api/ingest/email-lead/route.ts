import { NextResponse } from 'next/server';
import { parseEmailLead } from '@/lib/dealer-ai/emailParser';

export async function POST(req: Request) {
  let body: { rawEmail?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const rawEmail = String(body.rawEmail ?? '').trim();
  if (!rawEmail) {
    return NextResponse.json({ error: 'rawEmail is required.' }, { status: 400 });
  }

  try {
    const parsed = await parseEmailLead(rawEmail);
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to parse email lead.' }, { status: 502 });
  }
}
