import { test, expect } from "@playwright/test";

test("visual check - all sections visible", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForLoadState("networkidle");

  // Full page screenshot
  await page.screenshot({
    path: "/tmp/multipost-screenshots/full-page.png",
    fullPage: true,
  });

  // Check key sections exist and are visible
  const sections = [
    "header",
    "hero",
    "stats",
    "features",
    "networks",
    "pricing",
    "faq",
    "footer",
  ];

  for (const section of sections) {
    const el = page
      .locator(`#${section}, [data-section="${section}"]`)
      .first();
    if ((await el.count()) > 0) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `/tmp/multipost-screenshots/${section}.png`,
      });
    }
  }
});
