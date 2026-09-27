/** Absolute canonical URL for a path on the site (no query, no trailing slash except root). */
export function canonicalUrl(siteUrl: string, path: string): string {
  const url = new URL(path, siteUrl);
  url.search = '';
  url.hash = '';
  if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, '');
  return url.toString();
}
