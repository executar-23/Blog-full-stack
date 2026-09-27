/**
 * Editorial roles (ADR-002). Users without a role have no editorial access.
 * ASSUMPTION (documented in STATUS.md): roles are hierarchical
 * admin > editor > author. Fine-grained permissions are a GAP (G14).
 */
export const EDITORIAL_ROLES = ['author', 'editor', 'admin'] as const;
export type EditorialRole = (typeof EDITORIAL_ROLES)[number];

export function isEditorialRole(value: unknown): value is EditorialRole {
  return typeof value === 'string' && (EDITORIAL_ROLES as readonly string[]).includes(value);
}

/** True when `role` is at least `minimum` in the hierarchy. */
export function hasEditorialRole(role: unknown, minimum: EditorialRole): boolean {
  if (!isEditorialRole(role)) return false;
  return EDITORIAL_ROLES.indexOf(role) >= EDITORIAL_ROLES.indexOf(minimum);
}
