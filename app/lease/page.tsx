import LeadForm from '@/components/LeadForm';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Lease Center', 'Discover current Nissan lease offers and mileage plans that fit your lifestyle.', '/lease');
export default function Page() { return <PageShell title="Lease Center" intro="Compare mileage tiers, term lengths, and payment strategies before you visit."><LeadForm source="lease" /></PageShell>; }
