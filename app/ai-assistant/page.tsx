import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('AI Shopping Assistant Intake', 'Start the O\'Neil Nissan AI intake flow to route inventory, trade, finance, and appointment needs.', '/ai-assistant');

export default function Page() {
  return (
    <PageShell title="AI Shopping Intake" intro="This is an intake experience that captures intent and routes you to the right dealership path quickly.">
      <div className="card">
        <h2>How intake works</h2>
        <ul>
          <li>Identify your priority: inventory, payment, trade, or appointment.</li>
          <li>Collect only essential details for a fast response.</li>
          <li>Escalate high-intent shoppers to showroom scheduling.</li>
        </ul>
        <p>This AI intake flow is live for routing logic and lead capture. Real-time conversational chat UI can be connected in the next integration phase.</p>
        <p>
          <Link className="btn btn-primary" href="/schedule-test-drive">Skip to appointment scheduling</Link>
        </p>
      </div>
    </PageShell>
  );
}
