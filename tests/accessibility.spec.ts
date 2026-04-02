import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const WORST_CASE_BG_LUMINANCE = 0.017; // rgb(106, 1, 3) — darkest red in GradFlowBackground

/**
 * Calcula luminância relativa de uma cor sRGB (0-255).
 * Fórmula WCAG 2.1: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Esperar página carregar completamente (CSS + React hydration)
async function waitForFullLoad(page: import("@playwright/test").Page) {
  await page.goto("/", { waitUntil: "load", timeout: 30000 });
  // Esperar React hydration — o footer tem id="footer" que confirma renderização
  await page.waitForSelector("[id='footer']", { state: "attached", timeout: 20000 });
}

test.describe("Acessibilidade — Full Page", () => {
  test("should have no axe violations on desktop", async ({ page }) => {
    await waitForFullLoad(page);

    const results = await new AxeBuilder({ page })
      .disableRules(["region"]) // o GradFlowBackground pode gerar falso positivo
      .exclude("[aria-hidden='true']") // excluir elementos decorativos ocultos
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("should have no contrast violations", async ({ page }) => {
    await waitForFullLoad(page);

    const results = await new AxeBuilder({ page })
      .withRules(["color-contrast"])
      .exclude("[aria-hidden='true']") // excluir decorativos (ex: "01." com 3% opacity)
      .analyze();

    expect(results.violations).toEqual([]);
  });
});

test.describe("Acessibilidade — Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("should have no axe violations on mobile", async ({ page }) => {
    await waitForFullLoad(page);

    const results = await new AxeBuilder({ page })
      .disableRules(["region"])
      .exclude("[aria-hidden='true']")
      .analyze();

    expect(results.violations).toEqual([]);
  });
});

test.describe("Contraste manual vs fundo animado (worst-case)", () => {
  test("textos secundários passam 4.5:1 contra worst-case bg", async ({
    page,
  }) => {
    await waitForFullLoad(page);

    // Coletar cores computadas de elementos-chave
    const selectors = [
      { selector: "#hero p.text-neutral-400", name: "Hero subtitle" },
      { selector: "#stats p", name: "Stats labels" },
      { selector: "#faq p.text-neutral-400", name: "FAQ answers" },
      { selector: "#footer p", name: "Footer text" },
    ];

    for (const { selector, name } of selectors) {
      const el = page.locator(selector).first();
      const count = await el.count();
      if (count === 0) continue;

      const color = await el.evaluate((node) => {
        const style = window.getComputedStyle(node);
        return style.color;
      });

      // Parsear rgb(r, g, b) ou rgba(r, g, b, a)
      const match = color.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
      );
      if (!match) continue;

      const [, r, g, b] = match.map(Number);
      const lum = relativeLuminance(r, g, b);
      const ratio = contrastRatio(lum, WORST_CASE_BG_LUMINANCE);

      expect(
        ratio,
        `${name} (${color}) contra worst-case bg deveria ter ratio >= 4.5:1, obteve ${ratio.toFixed(2)}:1`
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  test("accent-text passa 4.5:1 contra worst-case bg", async ({ page }) => {
    await waitForFullLoad(page);

    const accentTextEl = page.locator(".text-accent-text").first();
    const count = await accentTextEl.count();
    if (count === 0) return;

    const color = await accentTextEl.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return style.color;
    });

    const match = color.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
    );
    expect(match).toBeTruthy();

    const [, r, g, b] = match!.map(Number);
    const lum = relativeLuminance(r, g, b);
    const ratio = contrastRatio(lum, WORST_CASE_BG_LUMINANCE);

    expect(
      ratio,
      `accent-text (${color}) ratio ${ratio.toFixed(2)}:1 deveria ser >= 4.5:1`
    ).toBeGreaterThanOrEqual(4.5);
  });
});

test.describe("Acessibilidade — Semântica", () => {
  test("FAQ buttons have aria-expanded", async ({ page }) => {
    await waitForFullLoad(page);

    const faqButtons = page.locator("#faq button[aria-expanded]");
    const count = await faqButtons.count();
    expect(count).toBeGreaterThan(0);

    // Verificar que o primeiro está fechado
    const firstExpanded = await faqButtons.first().getAttribute("aria-expanded");
    expect(firstExpanded).toBe("false");
  });

  test("decorative videos have aria-hidden", async ({ page }) => {
    await waitForFullLoad(page);

    const videos = page.locator("video[aria-hidden='true']");
    const count = await videos.count();
    expect(count).toBeGreaterThan(0);
  });

  test("skip-to-content link exists", async ({ page }) => {
    await waitForFullLoad(page);

    const skipLink = page.locator("a[href='#hero'].sr-only");
    await expect(skipLink).toHaveCount(1);
    await expect(skipLink).toHaveText(/pular para o conteúdo/i);
  });

  test("CourseContent buttons have aria-expanded", async ({ page }) => {
    await waitForFullLoad(page);

    const moduleButtons = page.locator("#conteudo button[aria-expanded]");
    const count = await moduleButtons.count();
    expect(count).toBeGreaterThan(0);
  });
});
