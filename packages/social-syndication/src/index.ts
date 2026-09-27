/**
 * Social syndication contract. No channel is integrated: channels and
 * providers are not specified (G11) — status BLOCKED.
 */
export interface SyndicationItem {
  canonicalUrl: string;
  title: string;
  summary?: string;
  image?: string;
}

export interface SyndicationResult {
  channel: string;
  externalId?: string;
  status: 'published' | 'failed';
  error?: string;
}

export interface SyndicationChannel {
  readonly id: string;
  publish(item: SyndicationItem): Promise<SyndicationResult>;
}
