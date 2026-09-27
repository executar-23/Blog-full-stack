import 'server-only';
import { createAuth, type Auth } from '@blog/auth/server';
import { createLogger } from '@blog/config';
import { createDatabase } from '@blog/database';
import { env } from '../env';

export const logger = createLogger({ level: env.LOG_LEVEL, base: { app: 'studio' } });

let cached: Auth | null | undefined;

/**
 * Better Auth instance (D3). Returns `null` when the database or secret is
 * not configured, so the studio fails closed instead of running without auth.
 */
export function getAuth(): Auth | null {
  if (cached !== undefined) return cached;
  if (!env.DATABASE_URL || !env.BETTER_AUTH_SECRET || !env.BETTER_AUTH_URL) {
    logger.warn('studio auth not configured (DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL)');
    cached = null;
    return cached;
  }
  const { db } = createDatabase({ connectionString: env.DATABASE_URL });
  cached = createAuth({ db, secret: env.BETTER_AUTH_SECRET, baseURL: env.BETTER_AUTH_URL });
  return cached;
}
