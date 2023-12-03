import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // testDir: './tests',
  testMatch: ['tests/CampgroundSearch.tests.ts'],
  reporter: [
    ['dot'],
    ['html', {
      outputFolder: 'reports',
      open: 'on-failure'
    }]
  ],
  use: {
    headless: false,
    screenshot: 'on',
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
