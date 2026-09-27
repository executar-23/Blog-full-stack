import { randomBytes } from 'node:crypto';
import { join } from 'node:path';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import { createDatabase, type Database } from './client';

export const MIGRATIONS_FOLDER = join(__dirname, '..', 'migrations');

/**
 * Integration-test helper: creates an isolated database from `DATABASE_URL`,
 * applies every migration and returns a client plus a disposer.
 * In CI a missing `DATABASE_URL` is an error, never a silent skip.
 */
export function integrationDatabaseUrl(): string | undefined {
  const url = process.env['DATABASE_URL'];
  if (!url && process.env['CI'])
    throw new Error('DATABASE_URL is required for integration tests in CI');
  return url;
}

export async function createTestDatabase(baseUrl: string): Promise<{
  db: Database;
  url: string;
  dispose: () => Promise<void>;
}> {
  const name = `blog_test_${randomBytes(6).toString('hex')}`;
  const admin = new pg.Client({ connectionString: baseUrl });
  await admin.connect();
  await admin.query(`CREATE DATABASE "${name}"`);
  await admin.end();

  const url = new URL(baseUrl);
  url.pathname = `/${name}`;
  const { db, close } = createDatabase({ connectionString: url.toString(), max: 2 });
  await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });

  return {
    db,
    url: url.toString(),
    dispose: async () => {
      await close();
      const cleanup = new pg.Client({ connectionString: baseUrl });
      await cleanup.connect();
      await cleanup.query(`DROP DATABASE IF EXISTS "${name}" WITH (FORCE)`);
      await cleanup.end();
    },
  };
}
