import { ReactNode } from 'react';

export default function PageShell({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <section className="container">
      <h1>{title}</h1>
      <p>{intro}</p>
      {children}
    </section>
  );
}
