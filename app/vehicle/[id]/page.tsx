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
  return pageMetadata(`${vehicle.year} ${vehicle.model} ${vehicle.trim}`, `View pricing and next steps for ${vehicle.year} Nissan ${vehicle.model} ${vehicle.trim}.`, `/vehicle/${id}`);
}

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) notFound();

  return (
    <section className="container">
      <h1>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</h1>
      <p><strong>{vehicle.priceLabel}</strong></p>
      <p>{vehicle.offerLabel}</p>
      <p>{vehicle.priorityReason}</p>
      <div className="grid grid-3">
        <div className="card"><h3>Request ePrice</h3><p>Get final numbers and qualification steps quickly.</p><Link className="btn btn-primary" href="/finance">Start Finance</Link></div>
        <div className="card"><h3>Value your trade</h3><p>Apply your current vehicle value toward this unit.</p><Link className="btn btn-primary" href="/trade">Get Trade Value</Link></div>
        <div className="card"><h3>Reserve a drive</h3><p>Set an appointment and confirm availability before arriving.</p><Link className="btn btn-primary" href="/schedule-test-drive">Schedule Test Drive</Link></div>
      </div>
    </section>
  );
}
