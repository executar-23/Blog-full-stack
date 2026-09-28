import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { routes } from '../src/site';

const pages = [{ path: '/', title: 'risco-cognitivo' }, ...routes];

/**
 * Known upstream finding (not ours to fix): Fluent's `TabList`/`Tab` use
 * Microsoft's Tabster for focus management, which inserts `aria-hidden`
 * dummy `<i>` sentinels with `tabindex="0"` to redirect focus at zone
 * boundaries. axe's `aria-hidden-focus` flags the pattern even though it's a
 * deliberate accessibility technique (docs/GAPS.md — same treatment as C13).
 * `/loja` is the first route using `SectionTabs`/Fluent `TabList` (ADR-007).
 */
const KNOWN_UPSTREAM_FINDINGS: Record<string, readonly string[]> = {
  '/loja': ['aria-hidden-focus'],
};

for (const { path, title } of pages) {
  test(`${path} renders its AIKB-0003 route accessibly`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      path === '/' ? /^https?:\/\/[^/]+\/?$/ : new RegExp(`${path}$`),
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /og-image-1200x630\.png$/,
    );
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const known = KNOWN_UPSTREAM_FINDINGS[path] ?? [];
    const violations = results.violations.filter((v) => !known.includes(v.id));
    expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('robots.txt blocks indexing while the site is a scaffold', async ({ request }) => {
  const body = await (await request.get('/robots.txt')).text();
  expect(body).toContain('Disallow: /');
  expect(body).toContain('Sitemap:');
});

test('rss.xml is a valid empty feed without a database', async ({ request }) => {
  const response = await request.get('/rss.xml');
  expect(response.headers()['content-type']).toContain('application/rss+xml');
  expect(await response.text()).toContain('<rss version="2.0"');
});

test('unknown routes return 404', async ({ page }) => {
  const response = await page.goto('/nao-existe');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página não encontrada');
});
