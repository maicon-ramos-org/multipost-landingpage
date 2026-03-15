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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Container scale-in
      gsap.from(sectionRef.current!, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Individual stat items
      const items = containerRef.current!.children;
      gsap.from(items, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={sectionRef}
          className="glass gradient-border rounded-3xl px-6 py-12 sm:px-12 sm:py-16"
        >
          <div
            ref={containerRef}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
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
                <p className="mt-2 text-sm text-gray-400 sm:text-base">
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
