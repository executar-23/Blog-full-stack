import { canonicalUrl } from './url';

export interface ArticleJsonLdInput {
  siteUrl: string;
  path: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authors: { name: string; path?: string }[];
  publisher: { name: string; logo?: string };
}

/** schema.org `BlogPosting` JSON-LD. */
export function articleJsonLd(input: ArticleJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl(input.siteUrl, input.path) },
    headline: input.headline,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: [new URL(input.image, input.siteUrl).toString()] } : {}),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: input.authors.map((a) => ({
      '@type': 'Person',
      name: a.name,
      ...(a.path ? { url: canonicalUrl(input.siteUrl, a.path) } : {}),
    })),
    publisher: {
      '@type': 'Organization',
      name: input.publisher.name,
      ...(input.publisher.logo
        ? {
            logo: {
              '@type': 'ImageObject',
              url: new URL(input.publisher.logo, input.siteUrl).toString(),
            },
          }
        : {}),
    },
  };
}

/** schema.org `WebSite` JSON-LD. */
export function websiteJsonLd(input: { siteUrl: string; name: string; searchPath?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: canonicalUrl(input.siteUrl, '/'),
    name: input.name,
    ...(input.searchPath
      ? {
          potentialAction: {
            '@type': 'SearchAction',
            target: `${canonicalUrl(input.siteUrl, input.searchPath)}?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }
      : {}),
  };
}

/** Serialises JSON-LD for a `<script type="application/ld+json">`, escaping `<`. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
