'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/tracking';

type AssistantAnswers = {
  budget: string;
  interest: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
};

const initialAnswers: AssistantAnswers = {
  budget: '',
  interest: 'Rogue',
  timeline: 'This Week',
  name: '',
  phone: '',
  email: '',
};

function recommendVehicle(budget: string, interest: string) {
  const amount = Number(budget.replace(/[^0-9]/g, ''));
  if (!amount || amount < 28000) return `Nissan Sentra SV`;
  if (amount < 40000) return interest === 'Murano' ? 'Nissan Rogue SV AWD' : `Nissan ${interest} SV`;
  return interest === 'Sentra' ? 'Nissan Rogue Platinum AWD' : `Nissan ${interest} Platinum`;
}

export default function AiAssistantLauncher() {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<AssistantAnswers>(initialAnswers);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const recommendation = useMemo(() => recommendVehicle(answers.budget, answers.interest), [answers.budget, answers.interest]);

  function updateField<K extends keyof AssistantAnswers>(key: K, value: AssistantAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const [firstName, ...rest] = answers.name.trim().split(' ');
    const lastName = rest.join(' ') || 'Shopper';

    const payload = {
      firstName: firstName || 'Shopper',
      lastName,
      email: answers.email,
      phone: answers.phone,
      vehicle: recommendation,
      message: `AI Intake | Budget: ${answers.budget || 'N/A'} | Interest: ${answers.interest} | Timeline: ${answers.timeline}`,
      source: 'ai-assistant-modal',
      appointmentTime: answers.timeline,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Unable to submit right now. Please call us for immediate help.');
      trackEvent('form_submit', { source: 'ai-assistant-modal' });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  }

  function closeModal() {
    setOpen(false);
    setError(null);
    setSubmitted(false);
    setAnswers(initialAnswers);
  }

  return (
    <>
      <button className="ai-float-btn" onClick={() => { trackEvent('chat_open', { source: 'floating_ai' }); setOpen(true); }} aria-label="Find My Nissan">
        Find My Nissan
      </button>

      {open && (
        <div className="ai-modal-overlay" role="dialog" aria-modal="true" aria-label="AI Assistant Intake">
          <div className="ai-modal">
            <button className="ai-close" onClick={closeModal} aria-label="Close">×</button>
            <h2>Find My Nissan</h2>
            <p>Answer 3 quick questions and get a recommendation in seconds.</p>

            <form onSubmit={handleSubmit} className="form-grid">
              <div className="full">
                <label htmlFor="ai-budget">What monthly payment or budget range fits you?</label>
                <input id="ai-budget" value={answers.budget} onChange={(e) => updateField('budget', e.target.value)} placeholder="$450/mo or $35,000" required />
              </div>

              <div>
                <label htmlFor="ai-interest">Vehicle interest</label>
                <select id="ai-interest" value={answers.interest} onChange={(e) => updateField('interest', e.target.value)}>
                  <option>Rogue</option>
                  <option>Sentra</option>
                  <option>Murano</option>
                </select>
              </div>

              <div>
                <label htmlFor="ai-timeline">Purchase timeline</label>
                <select id="ai-timeline" value={answers.timeline} onChange={(e) => updateField('timeline', e.target.value)}>
                  <option>This Week</option>
                  <option>Within 30 Days</option>
                  <option>1-3 Months</option>
                </select>
              </div>

              <div className="full card" style={{ margin: 0 }}>
                <p className="muted" style={{ marginBottom: 6 }}>Recommended next step</p>
                <p><strong>{recommendation}</strong></p>
                <p>Want to lock this in? Share contact details and we’ll help schedule your appointment.</p>
              </div>

              <div>
                <label htmlFor="ai-name">Name</label>
                <input id="ai-name" value={answers.name} onChange={(e) => updateField('name', e.target.value)} required />
              </div>
              <div>
                <label htmlFor="ai-phone">Phone</label>
                <input id="ai-phone" value={answers.phone} onChange={(e) => updateField('phone', e.target.value)} required />
              </div>
              <div className="full">
                <label htmlFor="ai-email">Email</label>
                <input id="ai-email" type="email" value={answers.email} onChange={(e) => updateField('email', e.target.value)} required />
              </div>

              {error && <p className="full error">{error}</p>}

              {!submitted ? (
                <div className="full">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Submitting…' : 'Get My Recommendation + Appointment Help'}</button>
                </div>
              ) : (
                <div className="full success">
                  <p>Great — we’ve got your request. Next best step: reserve your test drive.</p>
                  <Link className="btn btn-primary" href="/schedule-test-drive" onClick={closeModal}>Schedule Appointment</Link>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
