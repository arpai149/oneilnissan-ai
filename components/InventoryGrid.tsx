'use client';

import Link from 'next/link';
import { vehicles } from '@/content/inventory';
import { trackEvent } from '@/lib/tracking';

const fallbackItems = [
  { id: 'fallback-rogue', model: 'Rogue', trim: 'SV', price: 'Call for Pricing', ctaLabel: 'Check Availability' },
  { id: 'fallback-sentra', model: 'Sentra', trim: 'SV', price: 'Call for Pricing', ctaLabel: 'Check Availability' },
  { id: 'fallback-murano', model: 'Murano', trim: 'SL', price: 'Call for Pricing', ctaLabel: 'Check Availability' },
];

export default function InventoryGrid() {
  const safeVehicles = vehicles.filter((v) => v?.id && v?.model && v?.trim && v?.price && v?.ctaLabel);
  const list = (safeVehicles.length ? safeVehicles : fallbackItems).slice(0, 9);

  return (
    <div className="grid grid-3">
      {list.map((v) => {
        const vdpPath = `/vehicle/${v.id}`;
        return (
          <article className="card" key={v.id}>
            <p><strong>Nissan {v.model}</strong></p>
            <h3>{v.trim}</h3>
            <p><strong>{v.price}</strong></p>
            <Link
              href={vdpPath}
              onClick={() => trackEvent('vdp_click', { vehicle_id: v.id, model: v.model.toLowerCase() })}
              className="btn btn-primary"
            >
              {v.ctaLabel}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
