"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({
  target,
  suffix = "",
  triggerRef,
}: {
  target: number;
  suffix?: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef({ val: 0 });

  useEffect(() => {
    if (!triggerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(countRef.current, {
          val: target,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => {
            setCount(Math.floor(countRef.current.val));
          },
        });
      },
    });

    return () => trigger.kill();
  }, [target, triggerRef]);

  return (
    <span>
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 33, suffix: "+", label: "Canais Suportados" },
  { value: 27000, suffix: "+", label: "Stars no GitHub" },
  { value: 0, suffix: "R$", label: "Mensalidade", displayValue: "R$0" },
  { value: 100, suffix: "%", label: "Self-Hosted" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !itemsRef.current) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current!.children;
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" data-section="stats" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={sectionRef}>
          <div
            ref={itemsRef}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/[0.06]"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:px-8">
                <div className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  {stat.displayValue ? (
                    stat.displayValue
                  ) : (
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      triggerRef={sectionRef}
                    />
                  )}
                </div>
                <p className="mt-2 text-sm text-[#666] sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
