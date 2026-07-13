import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testIgnore: "pages.spec.ts",
  fullyParallel: true,
  retries: 0,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:4325/",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "cross-env TEST_BASE=root npx astro build && http-server dist -a 127.0.0.1 -p 4325 -c-1",
    url: "http://127.0.0.1:4325/",
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
  ],
});
