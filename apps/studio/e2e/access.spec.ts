import { randomUUID } from 'node:crypto';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import pg from 'pg';

const databaseUrl = process.env['DATABASE_URL'];
const configured = Boolean(databaseUrl && process.env['BETTER_AUTH_SECRET']);

test('studio is never indexable', async ({ request }) => {
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
});

test.describe('without database/auth configuration', () => {
  test.skip(configured, 'auth is configured in this environment');

  test('fails closed', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Studio indisponível');
    expect((await page.request.post('/api/auth/sign-in/email', { data: {} })).status()).toBe(503);
  });
});

test.describe('RBAC with Better Auth', () => {
  test.skip(!configured, 'requires DATABASE_URL and BETTER_AUTH_SECRET');

  test('only users with an editorial role reach the studio', async ({ page, baseURL }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Acesso restrito');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );

    const email = `e2e-${randomUUID()}@example.test`;
    const signUp = await page.request.post('/api/auth/sign-up/email', {
      data: { email, password: `pw-${randomUUID()}`, name: 'E2E' },
      headers: { origin: baseURL ?? '' },
    });
    expect(signUp.ok()).toBe(true);

    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Acesso restrito');

    const client = new pg.Client({ connectionString: databaseUrl });
    await client.connect();
    await client.query(`update "user" set role = 'editor' where email = $1`, [email]);
    await client.end();

    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Studio');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
