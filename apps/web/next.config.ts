import { join } from 'node:path';
import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: [
    '@blog/config',
    '@blog/database',
    '@blog/design-system',
    '@blog/seo',
    '@blog/tokens',
  ],
  // Image optimisation is platform-specific; keep the app portable (ADR-004).
  images: { unoptimized: true },
  // Monorepo: trace dependencies from the workspace root.
  outputFileTracingRoot: join(import.meta.dirname, '..', '..'),
  // `pg` resolves `pg-cloudflare` through the `workerd` export condition, which
  // Next's tracer does not follow; ship the whole package to the Worker bundle.
  outputFileTracingIncludes: { '/**': ['../../node_modules/pg-cloudflare/**/*'] },
};

export default nextConfig;

// Exposes Cloudflare bindings to `next dev` (ADR-004).
void initOpenNextCloudflareForDev();
