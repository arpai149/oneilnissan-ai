import Link from 'next/link';

const ctas = [
  ['Shop New', '/new', 'btn btn-primary'],
  ['Shop Used', '/used', 'btn btn-secondary'],
  ['Get Trade Value', '/trade', 'btn btn-secondary'],
  ['Get Pre-Approved', '/finance', 'btn btn-secondary'],
  ['View Specials', '/specials', 'btn btn-secondary'],
  ['Schedule Test Drive', '/schedule-test-drive', 'btn btn-secondary'],
  ['Chat / AI Intake', '/ai-assistant', 'btn btn-secondary']
] as const;

export default function CtaStrip() {
  return <div className="grid grid-3">{ctas.map(([label, href, cls]) => <Link className={cls} key={href} href={href}>{label}</Link>)}</div>;
}
