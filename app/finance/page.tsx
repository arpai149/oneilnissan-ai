import LeadForm from '@/components/LeadForm';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Finance Center', 'Get pre-approved and compare financing pathways with dealership-backed support.', '/finance');
export default function Page() { return <PageShell title="Finance Center" intro="Get pre-approved in minutes. We help optimize rate, term, and payment targets."><LeadForm source="finance" /></PageShell>; }
