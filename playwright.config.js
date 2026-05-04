const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90000, // 90 seconds per test
  fullyParallel: false,
  workers: 1, // Crucial for demo site stability
  retries: 2,
  reporter: 'html',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    actionTimeout: 20000,
    navigationTimeout: 40000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
