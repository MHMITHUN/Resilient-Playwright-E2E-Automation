import { defineConfig, devices } from '@playwright/test';

/**
 * Enterprise-grade Playwright Configuration
 * Supports Cross-Browser Matrix, CI/CD, Parallel Execution, and Anti-Bot Stealth
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Sequential to prevent rate limiting / bot flags
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // 1 worker ensures Cloudflare sessions aren't bombarded concurrently
  timeout: 60000,
  expect: {
    timeout: 15000,
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/test-results.json' }],
  ],

  use: {
    baseURL: 'https://automationexercise.com',
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    launchOptions: {
      args: ['--disable-blink-features=AutomationControlled'],
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
      },
    },
  ],
});
