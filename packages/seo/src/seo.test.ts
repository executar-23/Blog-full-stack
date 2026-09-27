import {
  articleJsonLd,
  buildPageMetadata,
  buildRobots,
  buildRssFeed,
  buildSitemap,
  canonicalUrl,
  serializeJsonLd,
} from './index';

const siteUrl = 'https://example.org';

describe('canonicalUrl', () => {
  it('drops query, hash and trailing slash', () => {
    expect(canonicalUrl(siteUrl, '/blog/artigos/?utm=x#top')).toBe(
      'https://example.org/blog/artigos',
    );
    expect(canonicalUrl(siteUrl, '/')).toBe('https://example.org/');
  });
});

describe('buildPageMetadata', () => {
  it('produces canonical, Open Graph and Twitter data', () => {
    const meta = buildPageMetadata({
      siteUrl,
      siteName: 'Site',
      path: '/blog',
      title: 'Blog',
      description: 'Descrição',
      image: '/social/og-image-1200x630.png',
    });
    expect(meta.alternates.canonical).toBe('https://example.org/blog');
    expect(meta.openGraph.images?.[0]?.url).toBe(
      'https://example.org/social/og-image-1200x630.png',
    );
    expect(meta.twitter.card).toBe('summary_large_image');
    expect(meta.robots).toEqual({ index: true, follow: true });
  });

  it('supports noindex pages', () => {
    expect(
      buildPageMetadata({ siteUrl, siteName: 'S', path: '/x', title: 'X', noindex: true }).robots,
    ).toEqual({
      index: false,
      follow: false,
    });
  });
});

describe('JSON-LD', () => {
  it('builds a BlogPosting and escapes script-breaking characters', () => {
    const data = articleJsonLd({
      siteUrl,
      path: '/blog/artigos/a',
      headline: '</script>',
      datePublished: '2026-09-27T00:00:00.000Z',
      authors: [{ name: 'Autor', path: '/blog/autores/autor' }],
      publisher: { name: 'Site' },
    });
    expect(data['@type']).toBe('BlogPosting');
    expect(serializeJsonLd(data)).not.toContain('</script>');
  });
});

describe('feeds', () => {
  it('builds valid RSS with escaped content', () => {
    const xml = buildRssFeed({
      siteUrl,
      title: 'A & B',
      description: 'd',
      feedPath: '/rss.xml',
      items: [{ path: '/blog/artigos/a', title: '<T>', publishedAt: '2026-09-27T00:00:00.000Z' }],
    });
    expect(xml).toContain('<title>A &amp; B</title>');
    expect(xml).toContain('<title>&lt;T&gt;</title>');
    expect(xml).toContain('https://example.org/blog/artigos/a');
  });

  it('builds sitemap entries and robots rules', () => {
    expect(buildSitemap(siteUrl, [{ path: '/blog' }])).toEqual([
      { url: 'https://example.org/blog' },
    ]);
    expect(buildRobots({ siteUrl, allowIndexing: false }).rules).toEqual([
      { userAgent: '*', disallow: '/' },
    ]);
  });
});
