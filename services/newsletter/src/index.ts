/**
 * Newsletter contract — BLOCKED: no e-mail/newsletter provider defined (G6).
 */
export interface NewsletterSubscription {
  email: string;
  consentAt: Date;
  source: string;
}

export interface NewsletterService {
  subscribe(
    subscription: NewsletterSubscription,
  ): Promise<{ status: 'pending_confirmation' | 'subscribed' }>;
  unsubscribe(email: string): Promise<void>;
}
