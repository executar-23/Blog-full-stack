import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/** Environment contract of apps/web (ADR-002). Validated at build and boot. */
export const env = createEnv({
  server: {
    DATABASE_URL: z.url().optional(),
    ALLOW_INDEXING: z
      .enum(['true', 'false'])
      .default('false')
      .transform((v) => v === 'true'),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env['DATABASE_URL'],
    ALLOW_INDEXING: process.env['ALLOW_INDEXING'],
    LOG_LEVEL: process.env['LOG_LEVEL'],
    NEXT_PUBLIC_SITE_URL: process.env['NEXT_PUBLIC_SITE_URL'],
  },
  emptyStringAsUndefined: true,
});
