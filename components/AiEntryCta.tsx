import Link from 'next/link';

export default function AiEntryCta() {
  return (
    <section className="container">
      <div className="card" style={{ borderLeft: '4px solid var(--brand)' }}>
        <h2>Need faster guidance? Start AI shopping intake.</h2>
        <p>Answer a few concise questions and we route you to inventory, trade value, finance path, or a showroom appointment.</p>
        <Link className="btn btn-primary" href="/ai-assistant">Start AI Intake</Link>
      </div>
    </section>
  );
}
