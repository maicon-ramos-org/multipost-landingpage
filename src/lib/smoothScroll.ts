/**
 * Smoothly scrolls to an anchor target using Lenis (if available) or native fallback.
 * @param target - CSS selector or element (e.g. "#preco")
 * @param offset - Optional offset in pixels (e.g. -80 for fixed header)
 */
export function smoothScrollTo(target: string | HTMLElement, offset = -80) {
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
