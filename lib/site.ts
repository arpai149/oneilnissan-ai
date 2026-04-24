import { Metadata } from 'next';

export const site = {
  dealershipName: "O'Neil Nissan",
  brandName: "O'Neil Nissan AI",
  url: 'https://oneilnissan.ai',
  phone: '215-674-9300',
  email: 'sales@oneilnissan.ai',
  address: '849 Street Rd, Warminster, PA 18974',
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.brandName, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}
