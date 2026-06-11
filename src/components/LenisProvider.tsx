"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let lenis: Lenis | null = null;
    const raf = (time: number) => {
      if (lenis) lenis.raf(time * 1000);
    };

    // Smooth scroll isn't needed for the first paint and its setup is a heavy
    // main-thread task. Defer it past the LCP window (idle / short timeout) so
    // it doesn't block painting the hero.
    const init = () => {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenisRef.current = lenis;
      // Expose globally so any component can call smooth scrollTo
      (window as any).__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    };

    const ric =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(init, { timeout: 800 })
        : window.setTimeout(init, 300);

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(ric as number);
      } else {
        clearTimeout(ric as number);
      }
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
