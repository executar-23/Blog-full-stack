import { z } from 'zod';

/**
 * Acquisition funnel stages, as stated by the product owner (2026-09-27):
 * Pesquisa → Artigo → CMS → Blog → SEO/Social → CTA → Lead → CRM/Newsletter → Produto → Analytics.
 */
export const funnelStageSchema = z.enum([
  'pesquisa',
  'artigo',
  'cms',
  'blog',
  'seo-social',
  'cta',
  'lead',
  'crm-newsletter',
  'produto',
  'analytics',
]);
export type FunnelStage = z.infer<typeof funnelStageSchema>;

/**
 * Event envelope accepted by apps/event-collector. Event names and properties
 * are defined by the tracking plan (G7) — only the envelope is fixed here.
 */
export const analyticsEventSchema = z
  .object({
    name: z.string().regex(/^[a-z][a-z0-9_]{1,63}$/, 'snake_case event name'),
    occurredAt: z.iso.datetime(),
    source: z.enum(['web', 'studio']),
    path: z.string().regex(/^\//, 'path must start with /').max(2048),
    anonymousId: z.string().min(8).max(128).optional(),
    funnelStage: funnelStageSchema.optional(),
    properties: z
      .record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))
      .optional(),
  })
  .strict();
export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

export const analyticsBatchSchema = z
  .object({ events: z.array(analyticsEventSchema).min(1).max(50) })
  .strict();
export type AnalyticsBatch = z.infer<typeof analyticsBatchSchema>;
