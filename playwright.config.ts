import { defineConfig, devices } from "@playwright/test";

const PORT = 3200;
const executablePath = process.env.PW_CHROMIUM || (process.env.CI ? undefined : "/opt/pw-browsers/chromium");

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], browserName: "chromium" }, testIgnore: [/api\.spec/, /unit\.spec/, /seo\.spec/] },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { LEAD_DRY_RUN: "1", LEAD_RATE_LIMIT: "30", NEXT_PUBLIC_SITE_URL: "https://www.ere-habitat.com" },
  },
});
