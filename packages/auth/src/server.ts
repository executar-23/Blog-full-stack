import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { account, session, user, verification, type Database } from '@blog/database';

export interface AuthOptions {
  db: Database;
  /** `BETTER_AUTH_SECRET` — validated by the app env schema. */
  secret: string;
  /** Public base URL of the app hosting the auth routes. */
  baseURL: string;
  trustedOrigins?: string[];
}

/**
 * Better Auth 1.7.6 (decision D3) with the Drizzle adapter over @blog/database.
 * Email + password only: no external identity provider is configured (G6/G8).
 */
export function createAuth({ db, secret, baseURL, trustedOrigins = [] }: AuthOptions) {
  return betterAuth({
    secret,
    baseURL,
    trustedOrigins,
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: { user, session, account, verification },
    }),
    emailAndPassword: { enabled: true },
    user: {
      additionalFields: {
        role: { type: 'string', required: false, input: false },
      },
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
