import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// ADR-004: OpenNext adapter for Cloudflare Workers (no incremental cache configured yet — G8).
export default defineCloudflareConfig({});
