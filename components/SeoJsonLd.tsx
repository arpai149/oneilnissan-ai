import { jsonLd } from '@/lib/site';

export default function SeoJsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}
