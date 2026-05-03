export type DealerLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  stage: string;
  created_at: string;
  last_contact_at: string | null;
};

export const mockLeads: DealerLead[] = [
  { id: 'L-1001', name: 'Ava Martinez', email: 'ava@example.com', phone: '555-0101', source: 'website', stage: 'new', created_at: new Date().toISOString(), last_contact_at: null },
  { id: 'L-1002', name: 'Noah Wilson', email: 'noah@example.com', phone: '555-0102', source: 'trade', stage: 'contacted', created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), last_contact_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'L-1003', name: 'Mia Jackson', email: 'mia@example.com', phone: '555-0103', source: 'finance', stage: 'new', created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), last_contact_at: null },
  { id: 'L-1004', name: 'Liam Davis', email: 'liam@example.com', phone: '555-0104', source: 'walk-in', stage: 'qualified', created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), last_contact_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() }
];
