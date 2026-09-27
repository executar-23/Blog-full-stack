import { canonicalUrl } from './url';

export interface PageSeoInput {
  siteUrl: string;
  siteName: string;
  path: string;
  title: string;
  description?: string;
  /** Absolute or site-relative image path for Open Graph/Twitter. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
  locale?: string;
}

/**
 * Framework-agnostic page metadata (canonical, Open Graph, Twitter, robots).
 * Shape is compatible with Next.js `Metadata` (apps map it 1:1).
 */
export function buildPageMetadata(input: PageSeoInput) {
  const canonical = canonicalUrl(input.siteUrl, input.path);
  const images = input.image
    ? [{ url: new URL(input.image, input.siteUrl).toString() }]
    : undefined;
  return {
    title: input.title,
    ...(input.description ? { description: input.description } : {}),
    alternates: { canonical },
    robots: input.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: input.type ?? 'website',
      url: canonical,
      siteName: input.siteName,
      title: input.title,
      locale: input.locale ?? 'pt_BR',
      ...(input.description ? { description: input.description } : {}),
      ...(images ? { images } : {}),
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
      ...(input.authors ? { authors: input.authors } : {}),
    },
    twitter: {
      card: images ? ('summary_large_image' as const) : ('summary' as const),
      title: input.title,
      ...(input.description ? { description: input.description } : {}),
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}

export type PageMetadata = ReturnType<typeof buildPageMetadata>;
