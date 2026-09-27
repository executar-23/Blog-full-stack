import { and, desc, eq, sql } from 'drizzle-orm';
import { articles, articleVersions, type Database } from '@blog/database';

export interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: Date | null;
  rank: number;
}

export interface SearchOptions {
  limit?: number;
}

/**
 * Full-text search over published articles (PostgreSQL `tsvector`, Portuguese
 * configuration — ADR-002). Only the live version of each article is searched.
 */
export async function searchPublishedArticles(
  db: Database,
  query: string,
  { limit = 20 }: SearchOptions = {},
): Promise<SearchResult[]> {
  const terms = query.trim();
  if (!terms) return [];
  const tsQuery = sql`websearch_to_tsquery('portuguese', ${terms})`;
  const rank = sql<number>`ts_rank(${articleVersions.searchVector}, ${tsQuery})`;
  return db
    .select({
      slug: articles.slug,
      title: articleVersions.title,
      excerpt: articleVersions.excerpt,
      publishedAt: articles.publishedAt,
      rank,
    })
    .from(articles)
    .innerJoin(articleVersions, eq(articles.publishedVersionId, articleVersions.id))
    .where(
      and(eq(articles.status, 'published'), sql`${articleVersions.searchVector} @@ ${tsQuery}`),
    )
    .orderBy(desc(rank), desc(articles.publishedAt))
    .limit(Math.min(Math.max(limit, 1), 50));
}
