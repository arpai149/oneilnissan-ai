'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/tracking';

type Intent = 'inventory' | 'price' | 'availability';

const intentConfig: Record<Intent, { label: string; vehicleHint: string }> = {
  inventory: { label: 'View Inventory', vehicleHint: 'Rogue SV AWD' },
  price: { label: 'Get My Price', vehicleHint: 'Rogue Dark Armor' },
  availability: { label: 'Check Availability', vehicleHint: 'Rogue Platinum' },
};

export default function HeroConversionCtas() {
  const [openIntent, setOpenIntent] = useState<Intent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  async function submitLead(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!openIntent || loading) return;
    setLoading(true);
    setError(null);
    setAiResponse(null);

    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || '').trim();
    const [firstName, ...rest] = name.split(' ');
    const lastName = rest.join(' ') || 'Shopper';
    const payload = {
      firstName: firstName || 'Shopper',
      lastName,
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      vehicle: String(form.get('vehicle') || ''),
      source: `hero-${openIntent}`,
      message: `Hero conversion action: ${openIntent}`,
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unable to submit lead right now.');
      trackEvent('lead_submit', { source: `hero-${openIntent}` });
      setAiResponse(data.aiResponse || 'Do you want to stop in today or tomorrow?');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="hero-cta-row">
        {(Object.keys(intentConfig) as Intent[]).map((intent) => (
          <button key={intent} className={intent === 'inventory' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => { trackEvent('button_click', { action: intent }); setOpenIntent(intent); }}>
            {intentConfig[intent].label}
          </button>
        ))}
      </div>

      {openIntent && (
        <div className="ai-modal-overlay" role="dialog" aria-modal="true" aria-label="Hero Lead Capture">
          <div className="ai-modal">
            <button className="ai-close" onClick={() => { setOpenIntent(null); setAiResponse(null); }} aria-label="Close">×</button>
            <h2>{intentConfig[openIntent].label}</h2>
            <p>Tell us where to send your details and we’ll respond right away.</p>
            <form className="form-grid" onSubmit={submitLead}>
              <div><label htmlFor="hero-name">Name</label><input id="hero-name" name="name" required /></div>
              <div><label htmlFor="hero-phone">Phone</label><input id="hero-phone" name="phone" required /></div>
              <div className="full"><label htmlFor="hero-email">Email</label><input id="hero-email" type="email" name="email" required /></div>
              <div className="full"><label htmlFor="hero-vehicle">Vehicle Interest</label><input id="hero-vehicle" name="vehicle" defaultValue={intentConfig[openIntent].vehicleHint} required /></div>
              {error && <p className="full error">{error}</p>}
              {aiResponse && (
                <div className="full success">
                  <p>{aiResponse}</p>
                  <p><strong>Do you want to stop in today or tomorrow?</strong></p>
                  <Link href="/schedule-test-drive" className="btn btn-primary" onClick={() => trackEvent('appointment_click', { source: `hero-${openIntent}` })}>Schedule Test Drive</Link>
                </div>
              )}
              {!aiResponse && <div className="full"><button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit & Get My Response'}</button></div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
