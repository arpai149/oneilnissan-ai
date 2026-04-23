import LeadForm from '@/components/LeadForm';
import PageShell from '@/components/PageShell';
import { pageMetadata, site } from '@/lib/site';
export const metadata = pageMetadata('Contact & Directions', 'Get directions, call the dealership, or send a message to the O\'Neil Nissan AI team.', '/contact');
export default function Page() { return <PageShell title="Contact & Directions" intro={`${site.address} · ${site.phone}`}><p><a className="btn btn-secondary" href={`tel:${site.phone}`}>Call Now</a></p><LeadForm source="contact" showAppointment /></PageShell>; }
