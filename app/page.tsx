import Link from 'next/link';
import CtaStrip from '@/components/CtaStrip';
import InventoryGrid from '@/components/InventoryGrid';
import LeadForm from '@/components/LeadForm';
import { pageMetadata, site } from '@/lib/site';
import SeoJsonLd from '@/components/SeoJsonLd';

export const metadata = pageMetadata('Home', 'O\'Neil Nissan AI helps shoppers buy smarter with transparent pricing, AI intake, and fast appointment scheduling.', '/');

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Buy your next Nissan with clarity, speed, and zero hidden nonsense.</h1>
          <p>At {site.dealershipName}, our AI-enhanced process gets you from browsing to appointment with less back-and-forth and faster answers.</p>
          <CtaStrip />
        </div>
      </section>

      <section className="container">
        <h2>Built for how people actually shop</h2>
        <div className="grid grid-3">
          <article className="card"><h3>Payment-first</h3><p>Get finance paths and realistic monthly payment options early.</p><Link className="btn btn-primary" href="/finance">Get Pre-Approved</Link></article>
          <article className="card"><h3>Trade-first</h3><p>See how your current vehicle impacts your next deal.</p><Link className="btn btn-primary" href="/trade">Get Trade Value</Link></article>
          <article className="card"><h3>Appointment-ready</h3><p>Reserve a test drive and show up with a focused plan.</p><Link className="btn btn-primary" href="/schedule-test-drive">Schedule Test Drive</Link></article>
        </div>
      </section>

      <section className="container">
        <h2>Featured inventory</h2>
        <p>Inventory cards are structured for live feed replacement and VDP expansion while remaining conversion-ready today.</p>
        <InventoryGrid />
      </section>

      <section className="container">
        <h2>Trust and transparency</h2>
        <div className="grid grid-3">
          <div className="card"><h3>Family-owned accountability</h3><p>We optimize for long-term customer relationships, not one-time pressure tactics.</p></div>
          <div className="card"><h3>Fast response standard</h3><p>Intent routing and lead workflows prioritize speed-to-answer.</p></div>
          <div className="card"><h3>Straightforward communication</h3><p>No hidden nonsense. Clear next steps on inventory, trade, and finance.</p></div>
        </div>
      </section>

      <section className="container">
        <h2>Start your request now</h2>
        <LeadForm source="homepage" showAppointment />
      </section>

      <SeoJsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'Can I get pre-approved online?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Start in our finance center and a team member follows up quickly.' } },
        { '@type': 'Question', name: 'Do you buy cars even if I do not buy from you?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use Sell Your Car to begin your appraisal flow.' } }
      ] }} />
    </>
  );
}
