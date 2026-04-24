import Link from 'next/link';

const ctas = [
  ['Shop New Nissan Offers', '/new', 'btn btn-primary'],
  ['Get My Payment Options', '/finance', 'btn btn-secondary'],
  ['Value My Trade', '/trade', 'btn btn-secondary'],
  ['Schedule Test Drive', '/schedule-test-drive', 'btn btn-secondary']
] as const;

export default function CtaStrip() {
  return <div className="grid grid-3">{ctas.map(([label, href, cls]) => <Link className={cls} key={href} href={href}>{label}</Link>)}</div>;
}
