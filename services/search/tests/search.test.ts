import { articles, articleVersions, type Database } from '@blog/database';
import { createTestDatabase, integrationDatabaseUrl } from '@blog/database/testing';
import { eq } from 'drizzle-orm';
import { searchPublishedArticles } from '../src';

const baseUrl = integrationDatabaseUrl();
const describeDb = baseUrl ? describe : describe.skip;

async function seed(db: Database, slug: string, title: string, status: 'draft' | 'published') {
  const [article] = await db
    .insert(articles)
    .values({
      slug,
      pillar: 'P1',
      awareness: 'C1',
      status,
      publishedAt: status === 'published' ? new Date() : null,
    })
    .returning();
  if (!article) throw new Error('insert failed');
  const [version] = await db
    .insert(articleVersions)
    .values({ articleId: article.id, version: 1, title, excerpt: title, body: title })
    .returning();
  if (status === 'published' && version) {
    await db
      .update(articles)
      .set({ publishedVersionId: version.id })
      .where(eq(articles.id, article.id));
  }
}

describeDb('searchPublishedArticles (PostgreSQL integration)', () => {
  let db: Database;
  let dispose: () => Promise<void>;

  beforeAll(async () => {
    ({ db, dispose } = await createTestDatabase(baseUrl as string));
    await seed(db, 'heuristicas-publicado', 'Heurísticas no trabalho', 'published');
    await seed(db, 'heuristicas-rascunho', 'Heurísticas em rascunho', 'draft');
  });

  afterAll(async () => dispose());

  it('returns only published articles matching the query', async () => {
    const results = await searchPublishedArticles(db, 'heurística');
    expect(results.map((r) => r.slug)).toEqual(['heuristicas-publicado']);
  });

  it('returns nothing for blank queries', async () => {
    expect(await searchPublishedArticles(db, '   ')).toEqual([]);
  });
});
