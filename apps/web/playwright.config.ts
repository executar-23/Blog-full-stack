import { defineConfig, devices } from '@playwright/test';

const port = 3100;
const executablePath = process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE'];

export default defineConfig({
  testDir: './e2e',
  forbidOnly: Boolean(process.env['CI']),
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `next start -p ${port}`,
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: !process.env['CI'],
  },
});
