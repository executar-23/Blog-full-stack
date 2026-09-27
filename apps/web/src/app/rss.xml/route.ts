import { buildRssFeed } from '@blog/seo';
import { env } from '../../env';
import { listPublishedArticles } from '../../server/content';
import { logger } from '../../server/logger';
import { site } from '../../site';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  try {
    const articles = await listPublishedArticles(50);
    const xml = buildRssFeed({
      siteUrl: env.NEXT_PUBLIC_SITE_URL,
      title: site.name,
      description: site.name,
      feedPath: '/rss.xml',
      items: articles.map((a) => ({
        path: `/blog/artigos/${a.slug}`,
        title: a.title,
        description: a.excerpt,
        publishedAt: (a.publishedAt ?? new Date(0)).toISOString(),
      })),
    });
    return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
  } catch (error) {
    logger.error('rss generation failed', { error });
    return new Response('Service unavailable', { status: 503 });
  }
}
