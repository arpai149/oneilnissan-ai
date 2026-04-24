'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/tracking';

export default function LeadForm({ source, showAppointment }: { source: string; showAppointment?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    trackEvent('form_submit', { source });

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source })
      });
      if (!res.ok) {
        const response = await res.json().catch(() => ({ error: 'Unable to submit right now.' }));
        throw new Error(response.error ?? 'Unable to submit right now.');
      }
      trackEvent('lead_confirmation', { source });
      router.push('/thank-you');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Submission failed. Please try again or call us.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card form-grid" aria-label={`${source} lead form`}>
      <div><label htmlFor="firstName">First Name</label><input id="firstName" name="firstName" required /></div>
      <div><label htmlFor="lastName">Last Name</label><input id="lastName" name="lastName" required /></div>
      <div><label htmlFor="email">Email</label><input id="email" type="email" name="email" required /></div>
      <div><label htmlFor="phone">Phone</label><input id="phone" name="phone" required /></div>
      <div className="full"><label htmlFor="vehicle">Vehicle of Interest</label><input id="vehicle" name="vehicle" placeholder="Rogue, Sentra, VIN, or stock #" /></div>
      {showAppointment && <div className="full"><label htmlFor="appointmentTime">Preferred Appointment Time</label><input id="appointmentTime" name="appointmentTime" placeholder="Saturday at 11 AM" /></div>}
      <div className="full"><label htmlFor="message">Message</label><textarea id="message" rows={4} name="message" /></div>
      {error && <p className="full error" role="alert">{error}</p>}
      <div className="full"><button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Check Availability & Get My Best Next Step'}</button></div>
      <small className="full muted">By submitting, you agree to receive communications from O'Neil Nissan. Routing supports Supabase, n8n, and CRM integrations.</small>
    </form>
  );
}
