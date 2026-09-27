import type { MetadataRoute } from 'next';
import { colors } from '@blog/tokens';
import { site } from '../site';

/** Web app manifest from the brand kit (theme colour per IC1b). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    lang: site.locale,
    display: 'standalone',
    theme_color: colors.primaryBlue.value,
    background_color: colors.surface.value,
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
