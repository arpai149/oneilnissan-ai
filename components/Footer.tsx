import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ padding: '24px 0' }}>
        <p><strong>{site.dealershipName}</strong> · {site.address} · <a href={`tel:${site.phone}`}>{site.phone}</a> · <a href={`mailto:${site.email}`}>{site.email}</a></p>
        <p><Link href="/privacy">Privacy</Link> · <Link href="/contact">Directions</Link> · <Link href="/ai-assistant">AI Shopping Intake</Link></p>
        <small className="muted">© {new Date().getFullYear()} {site.dealershipName}. Transparent pricing, efficient process, no hidden nonsense.</small>
      </div>
    </footer>
  );
}
