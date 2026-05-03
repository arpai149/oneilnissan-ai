import { NextResponse } from 'next/server';
import { mockLeads } from '@/lib/dealer-ai/mockLeads';
import { getDealerAiDashboard } from '@/lib/dealer-ai/dashboard';

export async function GET() {
  const data = await getDealerAiDashboard();
  return NextResponse.json(data);
}

export async function POST() {
  return NextResponse.json({
    seeded: true,
    inserted: mockLeads.length,
    message: 'Mock seed is active for MVP visibility.'
  });
}
