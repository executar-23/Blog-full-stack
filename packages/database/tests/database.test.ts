import { eq, sql } from 'drizzle-orm';
import { articles, articleVersions, leads, publishDueArticles, type Database } from '../src';
import { createTestDatabase, integrationDatabaseUrl } from '../src/testing';

const baseUrl = integrationDatabaseUrl();
const describeDb = baseUrl ? describe : describe.skip;

describeDb('database (PostgreSQL integration)', () => {
  let db: Database;
  let dispose: () => Promise<void>;

  beforeAll(async () => {
    ({ db, dispose } = await createTestDatabase(baseUrl as string));
  });

  afterAll(async () => {
    await dispose();
  });

  it('applies the initial migration', async () => {
    const result = await db.execute(
      sql`select table_name from information_schema.tables where table_schema = 'public' order by table_name`,
    );
    const tables = result.rows.map((r) => r['table_name']);
    expect(tables).toEqual(
      expect.arrayContaining([
        'user',
        'session',
        'account',
        'verification',
        'articles',
        'article_versions',
        'leads',
        'redirects',
      ]),
    );
  });

  it('versions articles and indexes them for full-text search', async () => {
    const [article] = await db
      .insert(articles)
      .values({ slug: 'vieses-cognitivos', pillar: 'P1', awareness: 'C1' })
      .returning();
    if (!article) throw new Error('insert failed');
    await db.insert(articleVersions).values([
      { articleId: article.id, version: 1, title: 'Rascunho', excerpt: 'x', body: 'y' },
      {
        articleId: article.id,
        version: 2,
        title: 'Vieses cognitivos',
        excerpt: 'Decisões',
        body: 'Heurísticas e decisões',
      },
    ]);
    const hits = await db
      .select({ version: articleVersions.version })
      .from(articleVersions)
      .where(
        sql`${articleVersions.searchVector} @@ websearch_to_tsquery('portuguese', 'heurística')`,
      );
    expect(hits.map((h) => h.version)).toEqual([2]);
  });

  it('publishes scheduled articles when due', async () => {
    const now = new Date('2026-09-27T12:00:00.000Z');
    await db.insert(articles).values([
      {
        slug: 'agendado-vencido',
        pillar: 'P2',
        awareness: 'C2',
        status: 'scheduled',
        scheduledFor: new Date('2026-09-27T11:00:00.000Z'),
      },
      {
        slug: 'agendado-futuro',
        pillar: 'P3',
        awareness: 'C3',
        status: 'scheduled',
        scheduledFor: new Date('2026-09-28T11:00:00.000Z'),
      },
    ]);
    expect(await publishDueArticles(db, now)).toEqual(['agendado-vencido']);
    const [published] = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, 'agendado-vencido'));
    expect(published?.status).toBe('published');
    expect(published?.publishedAt?.toISOString()).toBe('2026-09-27T11:00:00.000Z');
  });

  it('stores one lead per email and source', async () => {
    const lead = { email: 'a@example.com', source: 'newsletter', consentAt: new Date() };
    await db.insert(leads).values(lead);
    await expect(db.insert(leads).values(lead)).rejects.toThrow();
  });
});
