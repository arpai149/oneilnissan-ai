import { notFound } from 'next/navigation';
import Link from 'next/link';
import { modelSeo } from '@/content/inventory';
import { pageMetadata } from '@/lib/site';

export async function generateStaticParams() {
  return modelSeo.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = modelSeo.find((m) => m.slug === slug);
  if (!model) return {};
  return pageMetadata(`${model.name} for Sale`, `Shop ${model.name} inventory, lease and finance offers at O'Neil Nissan AI.`, `/models/${slug}`);
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = modelSeo.find((m) => m.slug === slug);
  if (!model) notFound();
  return (
    <section className="container">
      <h1>{model.name} at O'Neil Nissan AI</h1>
      <p>Explore {model.name} trims, payment options, and test-drive availability.</p>
      <div className="grid grid-3">
        <div className="card"><h3>Browse inventory</h3><p>Filtered results coming from inventory feed integration.</p><Link className="btn btn-primary" href="/new">See New Inventory</Link></div>
        <div className="card"><h3>Get payment options</h3><p>Pre-approval and lease structures for this model.</p><Link className="btn btn-primary" href="/finance">Start Finance</Link></div>
        <div className="card"><h3>Book a drive</h3><p>Reserve a focused appointment in under 2 minutes.</p><Link className="btn btn-primary" href="/schedule-test-drive">Schedule Drive</Link></div>
      </div>
    </section>
  );
}
