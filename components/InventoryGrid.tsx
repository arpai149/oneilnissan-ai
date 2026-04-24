'use client';

import Link from 'next/link';
import { vehicles } from '@/content/inventory';
import { trackEvent } from '@/lib/tracking';

const fallbackItems = [
  {
    id: 'fallback-rogue-sv-awd', year: 2026, make: 'Nissan', model: 'Rogue', trim: 'SV AWD', type: 'new',
    priceLabel: 'Call for current pricing', offerLabel: 'Available on select models for qualified buyers; see dealer for details.',
    priorityReason: 'High-interest inventory updates daily.', ctaLabel: 'Check Availability', modelSlug: 'rogue', imageAlt: 'Nissan Rogue inventory fallback'
  },
];

export default function InventoryGrid() {
  const safeVehicles = vehicles.filter((v) => v?.id && v?.model && v?.trim && v?.priceLabel && v?.offerLabel && v?.priorityReason && v?.ctaLabel);
  const list = (safeVehicles.length ? safeVehicles : fallbackItems).slice(0, 9);

  return (
    <div className="grid grid-3">
      {list.map((v) => {
        const vdpPath = `/vehicle/${v.id}`;
        return (
          <article className="card" key={v.id}>
            <h3>{v.year} {v.model} {v.trim}</h3>
            <p><strong>{v.priceLabel}</strong></p>
            <p>{v.offerLabel}</p>
            <p><small className="muted">{v.priorityReason}</small></p>
            <Link
              href={vdpPath}
              onClick={() => trackEvent('vdp_click', { vehicle_id: v.id, model: v.model.toLowerCase() })}
              className="btn btn-primary"
            >
              Check Availability
            </Link>
          </article>
        );
      })}
    </div>
  );
}
