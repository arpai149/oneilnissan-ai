import LeadForm from '@/components/LeadForm';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Sell Your Car', 'Sell your vehicle to O\'Neil Nissan AI even if you are not buying today.', '/sell-your-car');
export default function Page() { return <PageShell title="Sell Your Car" intro="We buy vehicles directly. Start with your VIN or basic vehicle details."><LeadForm source="sell-your-car" /></PageShell>; }
