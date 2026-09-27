import { defineConfig, devices } from '@playwright/test';

const port = 6007;
const executablePath = process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE'];

export default defineConfig({
  testDir: './e2e',
  forbidOnly: Boolean(process.env['CI']),
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `blog-static-server storybook-static ${port}`,
    url: `http://127.0.0.1:${port}/index.json`,
    reuseExistingServer: !process.env['CI'],
  },
});
