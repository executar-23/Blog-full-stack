import type { AnalyticsEvent } from '@blog/analytics-schema';

export interface AnalyticsClient {
  track(event: Omit<AnalyticsEvent, 'occurredAt'> & { occurredAt?: string }): Promise<void>;
}

export interface CollectorClientOptions {
  /** URL of apps/event-collector (e.g. https://collector.example/v1/events). */
  endpoint: string;
  fetch?: typeof fetch;
  now?: () => Date;
}

/**
 * Sends events to the platform's own collector (apps/event-collector).
 * No third-party analytics provider is integrated (G7).
 */
export function createCollectorClient({
  endpoint,
  fetch: doFetch = fetch,
  now = () => new Date(),
}: CollectorClientOptions): AnalyticsClient {
  return {
    async track(event) {
      const body = JSON.stringify({
        events: [{ ...event, occurredAt: event.occurredAt ?? now().toISOString() }],
      });
      const response = await doFetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        keepalive: true,
      });
      if (!response.ok) throw new Error(`event collector responded ${response.status}`);
    },
  };
}
