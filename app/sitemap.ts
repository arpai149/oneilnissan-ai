import type { MetadataRoute } from 'next';
import { modelSeo, vehicles } from '@/content/inventory';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/new', '/used', '/specials', '/finance', '/lease', '/trade', '/sell-your-car', '/schedule-test-drive', '/ai-assistant', '/about', '/contact', '/thank-you'];
  return [
    ...routes.map((route) => ({ url: `${site.url}${route}`, lastModified: new Date() })),
    ...modelSeo.map((m) => ({ url: `${site.url}/models/${m.slug}`, lastModified: new Date() })),
    ...vehicles.map((v) => ({ url: `${site.url}/vehicle/${v.id}`, lastModified: new Date() })),
  ];
}
