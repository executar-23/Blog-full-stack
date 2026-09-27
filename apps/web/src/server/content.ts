import 'server-only';
import { and, desc, eq } from 'drizzle-orm';
import { articles, articleVersions } from '@blog/database';
import { getDatabase } from './database';

export interface PublishedArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: Date | null;
}

/** Latest published articles (live version only). Empty when no database is configured. */
export async function listPublishedArticles(limit = 50): Promise<PublishedArticleSummary[]> {
  const db = getDatabase();
  if (!db) return [];
  return db
    .select({
      slug: articles.slug,
      title: articleVersions.title,
      excerpt: articleVersions.excerpt,
      publishedAt: articles.publishedAt,
    })
    .from(articles)
    .innerJoin(articleVersions, eq(articles.publishedVersionId, articleVersions.id))
    .where(and(eq(articles.status, 'published')))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}
