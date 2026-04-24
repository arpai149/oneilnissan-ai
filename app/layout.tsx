import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';
import SeoJsonLd from '@/components/SeoJsonLd';
import Analytics from '@/components/Analytics';
import AiEntryCta from '@/components/AiEntryCta';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brandName} | Transparent Nissan Sales & Service`, template: `%s | ${site.brandName}` },
  description: 'Shop new and used Nissan inventory, value your trade, get financing, and schedule your test drive with transparent pricing and fast answers.',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SeoJsonLd data={{
          '@context': 'https://schema.org', '@type': 'AutoDealer',
          name: site.dealershipName, url: site.url, telephone: site.phone, email: site.email, address: site.address
        }} />
        <Analytics />
        <Header />
        <main>{children}</main>
        <AiEntryCta />
        <Footer />
      </body>
    </html>
  );
}
