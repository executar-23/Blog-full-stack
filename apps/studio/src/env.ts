import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/** Environment contract of apps/studio (ADR-002). */
export const env = createEnv({
  server: {
    DATABASE_URL: z.url().optional(),
    BETTER_AUTH_SECRET: z.string().min(32).optional(),
    BETTER_AUTH_URL: z.url().optional(),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env['DATABASE_URL'],
    BETTER_AUTH_SECRET: process.env['BETTER_AUTH_SECRET'],
    BETTER_AUTH_URL: process.env['BETTER_AUTH_URL'],
    LOG_LEVEL: process.env['LOG_LEVEL'],
  },
  emptyStringAsUndefined: true,
});
