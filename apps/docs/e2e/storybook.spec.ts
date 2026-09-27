import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

interface IndexEntry {
  id: string;
  type: 'story' | 'docs';
  title: string;
}

const index = JSON.parse(
  readFileSync(join(import.meta.dirname, '..', 'storybook-static', 'index.json'), 'utf8'),
) as { entries: Record<string, IndexEntry> };
const stories = Object.values(index.entries).filter((e) => e.type === 'story');

test('the catalogue contains foundations and components', () => {
  const titles = new Set(stories.map((s) => s.title));
  expect(titles).toContain('Foundations/Identity');
  expect(titles).toContain('Components/CodeChip');
});

for (const story of stories) {
  test(`${story.id} renders without serious accessibility violations`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    await page.locator('#storybook-root > *').first().waitFor();
    const results = await new AxeBuilder({ page }).include('#storybook-root').analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('CodeChip copies and announces the confirmation', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/iframe.html?id=components-codechip--default&viewMode=story');
  await page.getByRole('button', { name: 'Copiar código' }).click();
  await expect(page.getByRole('status')).toHaveText('Copiado');
});
