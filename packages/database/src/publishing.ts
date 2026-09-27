import { and, eq, lte, sql } from 'drizzle-orm';
import type { Database } from './client';
import { articles } from './schema';

/**
 * Publishes every article whose schedule is due. Returns the published slugs.
 * Intended to run from a scheduled job (Cloudflare Cron Trigger — G8).
 */
export async function publishDueArticles(db: Database, now: Date = new Date()): Promise<string[]> {
  const rows = await db
    .update(articles)
    .set({
      status: 'published',
      publishedAt: sql`coalesce(${articles.publishedAt}, ${articles.scheduledFor})`,
      updatedAt: now,
    })
    .where(and(eq(articles.status, 'scheduled'), lte(articles.scheduledFor, now)))
    .returning({ slug: articles.slug });
  return rows.map((r) => r.slug);
}
