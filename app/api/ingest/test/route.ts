import { NextResponse } from 'next/server';
import { parseEmailLead } from '@/lib/dealer-ai/emailParser';
import { ensureLeadsTable, insertLead } from '@/lib/dealer-ai/supabase';

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
    const table = await ensureLeadsTable();
    if (!table.ok) {
      return NextResponse.json({ error: table.error }, { status: 500 });
    }

    const parsed = await parseEmailLead(rawEmail);
    const inserted = await insertLead(parsed);

    return NextResponse.json({ inserted });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed test ingestion.' }, { status: 502 });
  }
}
