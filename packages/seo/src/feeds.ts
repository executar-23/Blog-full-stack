import { canonicalUrl } from './url';

export interface FeedItem {
  path: string;
  title: string;
  description?: string;
  publishedAt: string;
  author?: string;
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** RSS 2.0 document. */
export function buildRssFeed(input: {
  siteUrl: string;
  title: string;
  description: string;
  feedPath: string;
  language?: string;
  items: FeedItem[];
}): string {
  const items = input.items
    .map((item) => {
      const link = canonicalUrl(input.siteUrl, item.path);
      return [
        '<item>',
        `<title>${escapeXml(item.title)}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `<pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>`,
        item.description ? `<description>${escapeXml(item.description)}</description>` : '',
        item.author ? `<dc:creator>${escapeXml(item.author)}</dc:creator>` : '',
        '</item>',
      ].join('');
    })
    .join('');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '<channel>',
    `<title>${escapeXml(input.title)}</title>`,
    `<link>${escapeXml(canonicalUrl(input.siteUrl, '/'))}</link>`,
    `<description>${escapeXml(input.description)}</description>`,
    `<language>${escapeXml(input.language ?? 'pt-BR')}</language>`,
    `<atom:link href="${escapeXml(canonicalUrl(input.siteUrl, input.feedPath))}" rel="self" type="application/rss+xml"/>`,
    items,
    '</channel>',
    '</rss>',
  ].join('');
}

export interface SitemapEntry {
  path: string;
  lastModified?: string;
}

/** Sitemap entries with absolute URLs (Next.js `MetadataRoute.Sitemap` compatible). */
export function buildSitemap(siteUrl: string, entries: SitemapEntry[]) {
  return entries.map((e) => ({
    url: canonicalUrl(siteUrl, e.path),
    ...(e.lastModified ? { lastModified: e.lastModified } : {}),
  }));
}

/** robots rules (Next.js `MetadataRoute.Robots` compatible). */
export function buildRobots(input: {
  siteUrl: string;
  disallow?: string[];
  allowIndexing: boolean;
}) {
  return {
    rules: input.allowIndexing
      ? [
          {
            userAgent: '*',
            allow: '/',
            ...(input.disallow?.length ? { disallow: input.disallow } : {}),
          },
        ]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: canonicalUrl(input.siteUrl, '/sitemap.xml'),
  };
}
