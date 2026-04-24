import Link from 'next/link';
import { notFound } from 'next/navigation';
import { vehicles } from '@/content/inventory';
import { pageMetadata } from '@/lib/site';

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({ id: vehicle.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) return {};
  return pageMetadata(`${vehicle.model} ${vehicle.trim}`, `View pricing and next steps for Nissan ${vehicle.model} ${vehicle.trim}.`, `/vehicle/${id}`);
}

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) notFound();

  return (
    <section className="container">
      <h1>Nissan {vehicle.model} {vehicle.trim}</h1>
      <p>{vehicle.price}</p>
      <p>Inventory details are feed-ready placeholders and updated as inventory sync is connected.</p>
      <div className="grid grid-3">
        <div className="card"><h3>Request ePrice</h3><p>Get final numbers with incentives and trade scenarios.</p><Link className="btn btn-primary" href="/finance">Start Finance</Link></div>
        <div className="card"><h3>Value your trade</h3><p>Use your current vehicle equity against this unit.</p><Link className="btn btn-primary" href="/trade">Get Trade Value</Link></div>
        <div className="card"><h3>Reserve a drive</h3><p>Hold a timeslot and have the vehicle prepped.</p><Link className="btn btn-primary" href="/schedule-test-drive">Schedule Test Drive</Link></div>
      </div>
    </section>
  );
}
