"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const animate = useCallback(() => {
    const dx = posRef.current.x - currentRef.current.x;
    const dy = posRef.current.y - currentRef.current.y;
    currentRef.current.x += dx * 0.15;
    currentRef.current.y += dy * 0.15;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button")
      );
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, animate]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <div
        className="rounded-full border-[1.5px] border-white transition-all duration-200"
        style={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          opacity: isHovering ? 0.3 : 0.8,
          marginLeft: isHovering ? -16 : 0,
          marginTop: isHovering ? -16 : 0,
        }}
      />
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: isHovering ? 4 : 6,
          height: isHovering ? 4 : 6,
          top: isHovering ? 30 : 13,
          left: isHovering ? 30 : 13,
          transition: "all 0.2s",
        }}
      />
    </div>
  );
}
