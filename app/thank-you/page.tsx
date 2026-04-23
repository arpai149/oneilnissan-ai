import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Thank You', 'Thanks for your request. An O\'Neil Nissan specialist will follow up soon.', '/thank-you');
export default function Page() { return <PageShell title="Thanks, your request is in." intro="A specialist will contact you shortly with next steps."><p><Link className="btn btn-primary" href="/new">Continue Shopping</Link></p></PageShell>; }
