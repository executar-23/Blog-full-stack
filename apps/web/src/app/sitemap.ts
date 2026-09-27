import type { MetadataRoute } from 'next';
import { buildSitemap } from '@blog/seo';
import { env } from '../env';
import { routes } from '../site';

/** Only indexable pages are listed; scaffold pages are noindex until content exists. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!env.ALLOW_INDEXING) return [];
  return buildSitemap(env.NEXT_PUBLIC_SITE_URL, [
    { path: '/' },
    ...routes.map((r) => ({ path: r.path })),
  ]);
}
