import LeadForm from '@/components/LeadForm';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Schedule Test Drive', 'Reserve a Nissan test drive and choose your ideal appointment window.', '/schedule-test-drive');
export default function Page() { return <PageShell title="Schedule Test Drive" intro="Choose your model and preferred time. We prepare the vehicle before arrival."><LeadForm source="schedule-test-drive" showAppointment /></PageShell>; }
