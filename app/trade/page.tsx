import LeadForm from '@/components/LeadForm';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Trade Value', 'Get your vehicle trade value and use equity toward your next Nissan.', '/trade');
export default function Page() { return <PageShell title="Get Trade Value" intro="Submit basic details and our team follows up with a fast appraisal workflow."><LeadForm source="trade" /></PageShell>; }
