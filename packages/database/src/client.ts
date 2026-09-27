import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

export type Database = NodePgDatabase<typeof schema>;

export interface DatabaseOptions {
  /** PostgreSQL URL. On Cloudflare Workers pass the Hyperdrive `connectionString` (ADR-004). */
  connectionString: string;
  /** Max pool size; keep small on Workers (Hyperdrive pools connections). */
  max?: number;
}

export function createDatabase({ connectionString, max = 5 }: DatabaseOptions): {
  db: Database;
  close: () => Promise<void>;
} {
  const pool = new pg.Pool({ connectionString, max });
  return { db: drizzle(pool, { schema }), close: () => pool.end() };
}
