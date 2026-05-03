export type DealerLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle?: string;
  message?: string;
  source: string;
  status: string;
  created_at: string;
  last_contact_at: string | null;
};

export type ParsedEmailLead = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  source: string;
  message: string;
};
