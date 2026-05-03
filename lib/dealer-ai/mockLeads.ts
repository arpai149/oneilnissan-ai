import { type DealerLead } from '@/lib/dealer-ai/types';

export const mockLeads: DealerLead[] = [
  { id: 'L-1001', name: 'Ava Martinez', email: 'ava@example.com', phone: '555-0101', vehicle: 'Nissan Rogue', message: 'Interested in financing options.', source: 'website', status: 'new', created_at: new Date().toISOString(), last_contact_at: null },
  { id: 'L-1002', name: 'Noah Wilson', email: 'noah@example.com', phone: '555-0102', vehicle: 'Nissan Altima', message: 'Wants trade-in estimate.', source: 'trade', status: 'contacted', created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), last_contact_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'L-1003', name: 'Mia Jackson', email: 'mia@example.com', phone: '555-0103', vehicle: 'Nissan Sentra', message: 'Looking for monthly payment details.', source: 'finance', status: 'new', created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), last_contact_at: null },
  { id: 'L-1004', name: 'Liam Davis', email: 'liam@example.com', phone: '555-0104', vehicle: 'Nissan Pathfinder', message: 'Requested callback this afternoon.', source: 'walk-in', status: 'qualified', created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), last_contact_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() }
];
