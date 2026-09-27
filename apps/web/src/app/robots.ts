import type { MetadataRoute } from 'next';
import { buildRobots } from '@blog/seo';
import { env } from '../env';

export default function robots(): MetadataRoute.Robots {
  return buildRobots({ siteUrl: env.NEXT_PUBLIC_SITE_URL, allowIndexing: env.ALLOW_INDEXING });
}
