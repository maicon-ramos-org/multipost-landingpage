import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  retries: 1,
  projects: [
    {
      name: "desktop",
      use: {
        baseURL: "http://localhost:3000",
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      use: {
        baseURL: "http://localhost:3000",
        ...devices["iPhone 14"],
      },
    },
  ],
});
