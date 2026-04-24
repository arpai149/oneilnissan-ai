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
          <h1>New Nissan Offers, Transparent Pricing, Faster Answers.</h1>
          <p>Shop {site.dealershipName} inventory with an AI-assisted process built to get you from browsing to appointment faster — with clear pricing and no hidden nonsense.</p>
          <CtaStrip />
        </div>
      </section>

      <section className="container">
        <p className="card">April Nissan offers available on select Rogue, Murano, Pathfinder, Frontier, and Sentra models for qualified buyers. Availability and eligibility vary. See dealer for details.</p>
      </section>

      <section className="container">
        <h2>Offer-ready Nissan models</h2>
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
        <h2>Get a Fast O&apos;Neil Nissan Response</h2>
        <LeadForm source="homepage" showAppointment />
        <p className="muted">Family-owned. Transparent pricing. No hidden nonsense. A real O&apos;Neil Nissan team member follows up.</p>
      </section>

      <SeoJsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'Can I get pre-approved online?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Start in our finance center and a team member follows up quickly.' } },
        { '@type': 'Question', name: 'Do you buy cars even if I do not buy from you?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use Sell Your Car to begin your appraisal flow.' } }
      ] }} />
    </>
  );
}
