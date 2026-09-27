import { defineConfig, devices } from '@playwright/test';

const port = 3101;
const executablePath = process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE'];

export default defineConfig({
  testDir: './e2e',
  forbidOnly: Boolean(process.env['CI']),
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `next start -p ${port}`,
    url: `http://127.0.0.1:${port}/robots.txt`,
    reuseExistingServer: !process.env['CI'],
    env: { BETTER_AUTH_URL: `http://127.0.0.1:${port}` },
  },
});
