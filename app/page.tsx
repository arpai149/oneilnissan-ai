import InventoryGrid from '@/components/InventoryGrid';
import HeroConversionCtas from '@/components/HeroConversionCtas';
import LeadForm from '@/components/LeadForm';
import { pageMetadata } from '@/lib/site';
import SeoJsonLd from '@/components/SeoJsonLd';

export const metadata = pageMetadata('Home', '0% APR and up to $3,500 savings on new Nissan Rogue models. Shop inventory and lock your vehicle today.', '/');

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>0% APR + Up to $3,500 Savings on New Nissan Rogue</h1>
          <p>Shop real inventory and lock your vehicle today.</p>
          <HeroConversionCtas />
        </div>
      </section>

      <section className="container">
        <div className="urgency-strip">High-demand models arriving daily. Availability changes fast.</div>
      </section>

      <section className="container">
        <h2>Nissan Inventory Available Now</h2>
        <p>Browse Rogue, Sentra, and Murano units. Confirm availability and reserve your next step.</p>
        <InventoryGrid />
      </section>

      <section className="container">
        <h2>Trust and transparency</h2>
        <div className="grid grid-3">
          <div className="card"><h3>Family Owned</h3><p>Local ownership and long-term accountability.</p></div>
          <div className="card"><h3>Transparent Pricing</h3><p>Clear numbers and straightforward options.</p></div>
          <div className="card"><h3>No Hidden Fees</h3><p>No surprise add-ons at signing.</p></div>
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
