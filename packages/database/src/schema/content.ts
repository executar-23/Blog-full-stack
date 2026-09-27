import { sql, type SQL } from 'drizzle-orm';
import {
  type AnyPgColumn,
  boolean,
  customType,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { user } from './auth';

export const publicationStatus = pgEnum('publication_status', [
  'draft',
  'scheduled',
  'published',
  'archived',
]);
export const pillar = pgEnum('pillar', ['P1', 'P2', 'P3']);
export const awareness = pgEnum('awareness', ['C1', 'C2', 'C3']);

const tsvector = customType<{ data: string }>({ dataType: () => 'tsvector' });

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
};

export const authors = pgTable('authors', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  bio: text('bio'),
  avatar: text('avatar'),
  userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  ...timestamps,
});

export const topics = pgTable('topics', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  pillar: pillar('pillar'),
  ...timestamps,
});

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
});

export const series = pgTable('series', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  ...timestamps,
});

/**
 * Article identity + publication state. Content lives in `article_versions`
 * (versioning); `publishedVersionId` points to the live version.
 */
export const articles = pgTable(
  'articles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    status: publicationStatus('status').notNull().default('draft'),
    pillar: pillar('pillar').notNull(),
    awareness: awareness('awareness').notNull(),
    seriesId: uuid('series_id').references(() => series.id, { onDelete: 'set null' }),
    seriesPosition: integer('series_position'),
    publishedVersionId: uuid('published_version_id').references(
      (): AnyPgColumn => articleVersions.id,
      {
        onDelete: 'set null',
      },
    ),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    scheduledFor: timestamp('scheduled_for', { withTimezone: true }),
    ...timestamps,
  },
  (t) => [
    index('articles_status_published_at_idx').on(t.status, t.publishedAt),
    index('articles_scheduled_for_idx').on(t.scheduledFor),
  ],
);

export const articleVersions = pgTable(
  'article_versions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    articleId: uuid('article_id')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    version: integer('version').notNull(),
    title: text('title').notNull(),
    excerpt: text('excerpt').notNull(),
    body: text('body').notNull(),
    seo: jsonb('seo').$type<Record<string, unknown>>(),
    createdBy: text('created_by').references(() => user.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    /** PostgreSQL full-text search (ADR-002), Portuguese configuration (G3: pt-BR). */
    searchVector: tsvector('search_vector').generatedAlwaysAs(
      (): SQL =>
        sql`setweight(to_tsvector('portuguese', coalesce("title", '')), 'A') || setweight(to_tsvector('portuguese', coalesce("excerpt", '')), 'B') || setweight(to_tsvector('portuguese', coalesce("body", '')), 'C')`,
    ),
  },
  (t) => [
    uniqueIndex('article_versions_article_version_uq').on(t.articleId, t.version),
    index('article_versions_search_idx').using('gin', t.searchVector),
  ],
);

export const articleAuthors = pgTable(
  'article_authors',
  {
    articleId: uuid('article_id')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    authorId: uuid('author_id')
      .notNull()
      .references(() => authors.id, { onDelete: 'restrict' }),
    position: integer('position').notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.articleId, t.authorId] })],
);

export const articleTopics = pgTable(
  'article_topics',
  {
    articleId: uuid('article_id')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    topicId: uuid('topic_id')
      .notNull()
      .references(() => topics.id, { onDelete: 'restrict' }),
  },
  (t) => [primaryKey({ columns: [t.articleId, t.topicId] })],
);

export const articleTags = pgTable(
  'article_tags',
  {
    articleId: uuid('article_id')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'restrict' }),
  },
  (t) => [primaryKey({ columns: [t.articleId, t.tagId] })],
);

export const redirects = pgTable('redirects', {
  id: uuid('id').primaryKey().defaultRandom(),
  source: text('source').notNull().unique(),
  destination: text('destination').notNull(),
  permanent: boolean('permanent').notNull().default(true),
  reason: text('reason'),
  ...timestamps,
});

/** Leads captured by CTAs/newsletter forms. Provider sync is BLOCKED (G6). */
export const leads = pgTable(
  'leads',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    source: text('source').notNull(),
    consentAt: timestamp('consent_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('leads_email_source_uq').on(t.email, t.source)],
);
