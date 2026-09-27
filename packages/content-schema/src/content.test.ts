import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { articleSchema, contentSchemas, slugSchema } from './index';
import { contentJsonSchemas } from '../scripts/json-schemas';

const now = '2026-09-27T12:00:00.000Z';
const baseArticle = {
  slug: 'exemplo-de-slug',
  title: 'Título',
  excerpt: 'Resumo',
  body: '# Corpo',
  authorSlugs: ['autor'],
  topicSlugs: [],
  tagSlugs: [],
  pillar: 'P1',
  awareness: 'C1',
  version: 1,
  createdAt: now,
  updatedAt: now,
};

describe('content schemas', () => {
  it('accepts a draft article', () => {
    expect(articleSchema.safeParse({ ...baseArticle, status: 'draft' }).success).toBe(true);
  });

  it('requires scheduledFor for scheduled and publishedAt for published articles', () => {
    expect(articleSchema.safeParse({ ...baseArticle, status: 'scheduled' }).success).toBe(false);
    expect(articleSchema.safeParse({ ...baseArticle, status: 'published' }).success).toBe(false);
    expect(
      articleSchema.safeParse({ ...baseArticle, status: 'published', publishedAt: now }).success,
    ).toBe(true);
  });

  it('rejects unknown pillars and invalid slugs', () => {
    expect(articleSchema.safeParse({ ...baseArticle, status: 'draft', pillar: 'P4' }).success).toBe(
      false,
    );
    expect(slugSchema.safeParse('Não Slug').success).toBe(false);
  });

  it('covers every AIKB-0003 content directory', () => {
    expect(Object.keys(contentSchemas).sort()).toEqual([
      'articles',
      'authors',
      'campaigns',
      'landing-pages',
      'resources',
      'series',
      'topics',
    ]);
  });

  it('keeps schemas/content JSON Schemas in sync with Zod', () => {
    for (const [name, schema] of Object.entries(contentJsonSchemas())) {
      const file = join(__dirname, '..', '..', '..', 'schemas', 'content', `${name}.schema.json`);
      expect(JSON.parse(readFileSync(file, 'utf8'))).toEqual(schema);
    }
  });
});
