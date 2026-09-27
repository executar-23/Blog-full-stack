import 'server-only';
import { headers } from 'next/headers';
import { hasEditorialRole, type EditorialRole } from '@blog/auth';
import { getAuth } from './auth';

export type EditorialAccess =
  | { state: 'unconfigured' }
  | { state: 'anonymous' }
  | { state: 'forbidden' }
  | { state: 'granted'; role: EditorialRole; name: string };

/** Resolves the current request's editorial access (RBAC — ADR-002). */
export async function getEditorialAccess(
  minimum: EditorialRole = 'author',
): Promise<EditorialAccess> {
  const auth = getAuth();
  if (!auth) return { state: 'unconfigured' };
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { state: 'anonymous' };
  const role = (session.user as { role?: unknown }).role;
  if (!hasEditorialRole(role, minimum)) return { state: 'forbidden' };
  return { state: 'granted', role: role as EditorialRole, name: session.user.name };
}
