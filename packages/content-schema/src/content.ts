import { z } from 'zod';
import { awarenessSchema, pillarSchema } from './taxonomy';

export const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be lowercase kebab-case');

/** Publication lifecycle: drafts, scheduling and publication (original request). */
export const publicationStatusSchema = z.enum(['draft', 'scheduled', 'published', 'archived']);
export type PublicationStatus = z.infer<typeof publicationStatusSchema>;

export const seoFieldsSchema = z
  .object({
    title: z.string().min(1).max(70).optional(),
    description: z.string().min(1).max(200).optional(),
    canonical: z.url().optional(),
    ogImage: z.string().min(1).optional(),
    noindex: z.boolean().optional(),
  })
  .strict();
export type SeoFields = z.infer<typeof seoFieldsSchema>;

const timestamps = {
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};

const publication = z
  .object({
    status: publicationStatusSchema,
    publishedAt: z.iso.datetime().optional(),
    scheduledFor: z.iso.datetime().optional(),
  })
  .refine((v) => v.status !== 'scheduled' || v.scheduledFor !== undefined, {
    message: 'scheduled content requires scheduledFor',
    path: ['scheduledFor'],
  })
  .refine((v) => v.status !== 'published' || v.publishedAt !== undefined, {
    message: 'published content requires publishedAt',
    path: ['publishedAt'],
  });

export const authorSchema = z
  .object({
    slug: slugSchema,
    name: z.string().min(1),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    ...timestamps,
  })
  .strict();
export type Author = z.infer<typeof authorSchema>;

export const topicSchema = z
  .object({
    slug: slugSchema,
    name: z.string().min(1),
    description: z.string().optional(),
    pillar: pillarSchema.optional(),
    ...timestamps,
  })
  .strict();
export type Topic = z.infer<typeof topicSchema>;

export const tagSchema = z.object({ slug: slugSchema, name: z.string().min(1) }).strict();
export type Tag = z.infer<typeof tagSchema>;

export const seriesSchema = z
  .object({
    slug: slugSchema,
    title: z.string().min(1),
    description: z.string().optional(),
    articleSlugs: z.array(slugSchema),
    ...timestamps,
  })
  .strict();
export type Series = z.infer<typeof seriesSchema>;

export const articleSchema = z
  .object({
    slug: slugSchema,
    title: z.string().min(1),
    excerpt: z.string().min(1),
    body: z.string().describe('Markdown body'),
    authorSlugs: z.array(slugSchema).min(1),
    topicSlugs: z.array(slugSchema),
    tagSlugs: z.array(slugSchema),
    seriesSlug: slugSchema.optional(),
    pillar: pillarSchema,
    awareness: awarenessSchema,
    seo: seoFieldsSchema.optional(),
    version: z.int().positive(),
    ...timestamps,
  })
  .strict()
  .and(publication);
export type Article = z.infer<typeof articleSchema>;

/** Resource kinds — AIKB-0003 `apps/web/recursos/*`. */
export const resourceKindSchema = z.enum(['calculadora', 'template', 'benchmark']);

export const resourceSchema = z
  .object({
    slug: slugSchema,
    title: z.string().min(1),
    kind: resourceKindSchema,
    description: z.string().optional(),
    ...timestamps,
  })
  .strict()
  .and(publication);
export type Resource = z.infer<typeof resourceSchema>;

export const campaignSchema = z
  .object({
    slug: slugSchema,
    name: z.string().min(1),
    startsAt: z.iso.datetime().optional(),
    endsAt: z.iso.datetime().optional(),
    ...timestamps,
  })
  .strict();
export type Campaign = z.infer<typeof campaignSchema>;

export const landingPageSchema = z
  .object({
    slug: slugSchema,
    title: z.string().min(1),
    campaignSlug: slugSchema.optional(),
    seo: seoFieldsSchema.optional(),
    ...timestamps,
  })
  .strict()
  .and(publication);
export type LandingPage = z.infer<typeof landingPageSchema>;

/** Content types ↔ AIKB-0003 `content/*` directories. */
export const contentSchemas = {
  articles: articleSchema,
  authors: authorSchema,
  topics: topicSchema,
  series: seriesSchema,
  campaigns: campaignSchema,
  resources: resourceSchema,
  'landing-pages': landingPageSchema,
} as const;
