"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Wave {
  id: number;
  x: number;
  y: number;
  isHeld: boolean;
}

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [waves, setWaves] = useState<Wave[]>([]);

  // Referência para o intervalo de emissão contínua de ondas (click-segura)
  const waveInterval = useRef<NodeJS.Timeout | null>(null);

  // Posição exata do mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Efeito de 'spring' (suavidade) para a bolinha seguir o mouse
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const addWave = (x: number, y: number, isHeld = false) => {
    const id = Date.now() + Math.random();
    setWaves((prev) => [...prev, { id, x, y, isHeld }]);
    // Remove wave after animation duration
    setTimeout(() => {
      setWaves((prev) => prev.filter((w) => w.id !== id));
    }, 2000);
  };

  useEffect(() => {
    // Apenas ativa o cursor customizado se for dispositivo com ponteiro preciso (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Spawn primeira wave de clique com pingo espalhando na água (menor expansão)
      addWave(e.clientX, e.clientY, false);

      // Inicia spawn contínuo enquanto estiver pressionado (maior expansão)
      if (waveInterval.current) clearInterval(waveInterval.current);
      waveInterval.current = setInterval(() => {
        addWave(mouseX.get(), mouseY.get(), true);
      }, 350); // Emana uma nova onda a cada 350ms
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      if (waveInterval.current) {
        clearInterval(waveInterval.current);
      }
    };

    // Detecção de Hover em botões e links
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      if (waveInterval.current) clearInterval(waveInterval.current);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Ondas emitidas pelos cliques (Ripple/Waves) */}
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            className="absolute rounded-full"
            style={{
              left: wave.x,
              top: wave.y,
              x: "-50%",
              y: "-50%",
              boxShadow: "0 0 20px 8px rgba(205, 39, 42, 0.5)", // Espessura e blur de sombra ajustados para o novo tamanho
              border: "3px solid rgba(205, 39, 42, 0.8)", // Borda ligeiramente mais espessa
            }}
            initial={{ width: 10, height: 10, opacity: 0.9 }}
            animate={{ 
              width: wave.isHeld ? 150 : 100, // Cerca de 300% do cursor (32px)
              height: wave.isHeld ? 150 : 100, 
              opacity: 0 
            }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
        ))}
      </div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Camada 2: Mix Blend Difference (Borda externa + Ponto interno brancos normais) */}
        <div className="absolute inset-0 flex items-center justify-center mix-blend-difference text-white">
          <motion.div
            className="absolute rounded-full border-[1.5px] border-current"
            animate={{
              width: isHovering ? 64 : 32,
              height: isHovering ? 64 : 32,
              opacity: isHovering ? 0.3 : 0.8,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />

          <motion.div
            className="absolute rounded-full bg-current"
            animate={{
              width: isHovering ? 4 : 6,
              height: isHovering ? 4 : 6,
              opacity: 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </div>
      </motion.div>
    </>
  );
}
