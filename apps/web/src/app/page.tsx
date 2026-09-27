import { websiteJsonLd, serializeJsonLd } from '@blog/seo';
import { ScaffoldPage } from '../components/ScaffoldPage';
import { env } from '../env';
import { pageMetadata } from '../seo';
import { site } from '../site';

export const metadata = pageMetadata('/', site.name);

export default function HomePage() {
  const jsonLd = websiteJsonLd({ siteUrl: env.NEXT_PUBLIC_SITE_URL, name: site.name });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ScaffoldPage title={site.name} />
    </>
  );
}
