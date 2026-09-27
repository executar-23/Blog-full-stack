import 'server-only';
import { createDatabase, type Database } from '@blog/database';
import { env } from '../env';
import { logger } from './logger';

let cached: Database | null | undefined;

/**
 * Single access point to the database (ADR-004: platform bindings isolated).
 * On Cloudflare Workers, `DATABASE_URL` is the Hyperdrive connection string.
 * Returns `null` when no database is configured (scaffold state — G8).
 */
export function getDatabase(): Database | null {
  if (cached !== undefined) return cached;
  if (!env.DATABASE_URL) {
    logger.warn('DATABASE_URL not configured; content queries return no data');
    cached = null;
    return cached;
  }
  cached = createDatabase({ connectionString: env.DATABASE_URL }).db;
  return cached;
}
