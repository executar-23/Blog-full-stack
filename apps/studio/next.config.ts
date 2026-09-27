import { join } from 'node:path';
import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: [
    '@blog/auth',
    '@blog/config',
    '@blog/database',
    '@blog/design-system',
    '@blog/tokens',
  ],
  images: { unoptimized: true },
  outputFileTracingRoot: join(import.meta.dirname, '..', '..'),
  // `pg` resolves `pg-cloudflare` through the `workerd` export condition (see apps/web).
  outputFileTracingIncludes: { '/**': ['../../node_modules/pg-cloudflare/**/*'] },
};

export default nextConfig;

void initOpenNextCloudflareForDev();
