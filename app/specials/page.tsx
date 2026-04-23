import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Nissan Specials', 'View current Nissan offers including finance specials, lease deals, and savings events.', '/specials');
export default function Page() { return <PageShell title="Current Specials" intro="Updated offers designed for payment-focused shoppers."><div className="grid grid-3"><div className="card"><h3>Rogue APR Offer</h3><p>Qualified buyers: low APR for 60 months.</p></div><div className="card"><h3>Lease Pull-Ahead</h3><p>Early return options for eligible Nissan leases.</p></div><div className="card"><h3>Military / College</h3><p>Ask about stackable rebates.</p></div></div><p><Link className="btn btn-primary" href="/finance">Claim an offer</Link></p></PageShell>; }
