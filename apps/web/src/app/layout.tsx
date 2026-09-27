import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { colors } from '@blog/tokens';
import { env } from '../env';
import { site } from '../site';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: site.name, template: `%s · ${site.name}` },
  applicationName: site.name,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
  alternates: { types: { 'application/rss+xml': '/rss.xml' } },
};

/** `theme-color` follows the decided primary (IC1b: brand kit declares #1F5ECC). */
export const viewport: Viewport = { themeColor: colors.primaryBlue.value };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
