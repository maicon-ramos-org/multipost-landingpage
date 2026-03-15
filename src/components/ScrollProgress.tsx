"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        if (barRef.current) {
          gsap.set(barRef.current, { scaleX: self.progress });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-accent will-change-transform"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
