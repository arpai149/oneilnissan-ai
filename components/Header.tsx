import Link from 'next/link';

const links = [
  ['New', '/new'],
  ['Used', '/used'],
  ['Specials', '/specials'],
  ['Finance', '/finance'],
  ['Trade', '/trade'],
  ['AI Intake', '/ai-assistant'],
  ['Contact', '/contact'],
] as const;

export default function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <Link className="logo" href="/">O'Neil Nissan AI</Link>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav className="navlinks" aria-label="Primary">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link className="btn btn-primary" href="/schedule-test-drive">Schedule Test Drive</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
