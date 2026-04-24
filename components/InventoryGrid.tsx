'use client';

import Link from 'next/link';
import { vehicles } from '@/content/inventory';
import { trackEvent } from '@/lib/tracking';

const fallbackItems = [
  {
    id: 'fallback-rogue-sv-awd', year: 2026, make: 'Nissan', model: 'Rogue', trim: 'SV AWD', type: 'new',
    priceLabel: 'Call for current pricing', offerLabel: 'Available on select models for qualified buyers; see dealer for details.',
    priorityReason: 'High-interest inventory updates daily.', ctaLabel: 'Check Availability', modelSlug: 'rogue', imageAlt: 'Nissan Rogue inventory fallback',
    stockNumber: '#26G1000', availabilityLabel: 'In stock'
  },
];

export default function InventoryGrid() {
  const safeVehicles = vehicles.filter((v) => v?.id && v?.model && v?.trim && v?.priceLabel && v?.offerLabel && v?.priorityReason && v?.ctaLabel && v?.stockNumber && v?.availabilityLabel);
  const list = (safeVehicles.length ? safeVehicles : fallbackItems).slice(0, 9);

  return (
    <div className="grid grid-3">
      {list.map((v) => {
        const vdpPath = `/vehicle/${v.id}`;
        return (
          <article className="card" key={v.id}>
            <h3>{v.year} {v.model} {v.trim}</h3>
            <p><small className="muted">Stock {v.stockNumber} · {v.availabilityLabel}</small></p>
            <p><strong>{v.priceLabel}</strong></p>
            <p>{v.offerLabel}</p>
            <p><small className="muted">{v.priorityReason}</small></p>
            <p><small className="muted">Limited availability on this trim.</small></p>
            <div className="grid" style={{ gap: 8 }}>
              <Link
                href={vdpPath}
                onClick={() => trackEvent('vdp_click', { vehicle_id: v.id, model: v.model.toLowerCase() })}
                className="btn btn-primary"
              >
                Check Availability
              </Link>
              <Link
                href="/finance"
                onClick={() => trackEvent('finance_cta', { source: 'inventory-card', vehicle_id: v.id })}
                className="btn btn-secondary"
              >
                Get My Payment Options
              </Link>
            </div>
            <p><small className="muted">See exact pricing, incentives, and next steps instantly.</small></p>
          </article>
        );
      })}
    </div>
  );
}
