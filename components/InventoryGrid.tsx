'use client';

import Link from 'next/link';
import { vehicles } from '@/content/inventory';
import { trackEvent } from '@/lib/tracking';

export default function InventoryGrid({ type }: { type?: 'new' | 'used' }) {
  const list = type ? vehicles.filter((v) => v.type === type) : vehicles;
  return (
    <div className="grid grid-3">
      {list.map((v) => {
        const modelPath = `/models/${v.model.toLowerCase()}`;
        const vdpPath = `/vehicle/${v.id}`;
        return (
          <article className="card" key={v.id}>
            <p><strong>{v.year} {v.make} {v.model}{v.trim ? ` ${v.trim}` : ''}</strong></p>
            <p>{v.price}</p>
            {v.payment ? <p>{v.payment}</p> : null}
            <p>{v.type === 'new' ? 'New offer opportunity' : `Used · ${v.mileage ?? 'Mileage pending'}`}</p>
            <div className="grid" style={{ gap: 8 }}>
              <Link href={vdpPath} onClick={() => trackEvent('vdp_click', { vehicle_id: v.id })} className="btn btn-primary">Check Availability</Link>
              <Link href={modelPath} onClick={() => trackEvent('inventory_click', { model: v.model.toLowerCase() })} className="btn btn-secondary">Check Availability</Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
