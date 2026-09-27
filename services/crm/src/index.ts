/**
 * CRM integration contract — BLOCKED: no CRM provider defined (G6).
 * Leads are persisted in @blog/database (`leads`) until a provider is chosen.
 */
export interface CrmContact {
  email: string;
  source: string;
  consentAt: Date;
}

export interface CrmService {
  upsertContact(contact: CrmContact): Promise<{ externalId: string }>;
}
