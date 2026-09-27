import type { Metadata } from 'next';
import { buildPageMetadata } from '@blog/seo';
import { env } from './env';
import { site } from './site';

/**
 * Page metadata (canonical, Open Graph, Twitter). Scaffold pages are noindex
 * until they have content (G5/G10) or while indexing is disabled.
 */
export function pageMetadata(
  path: string,
  title: string,
  options: { hasContent?: boolean } = {},
): Metadata {
  return buildPageMetadata({
    siteUrl: env.NEXT_PUBLIC_SITE_URL,
    siteName: site.name,
    path,
    title,
    image: site.ogImage,
    locale: 'pt_BR',
    noindex: !env.ALLOW_INDEXING || !options.hasContent,
  });
}
