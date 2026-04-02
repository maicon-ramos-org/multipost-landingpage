---
name: build-premium-landing-page
description: Use this skill whenever the user asks to create, design, or build a new landing page, promotional website, or single-page web app. This ensures the inclusion of high-end UI/UX elements like custom physics-based cursors, continuous click wave effects, and performant animated backgrounds.
---

# Build Premium Landing Page

A skill for creating high-conversion, visually stunning, and immersive landing pages with Next.js, Framer Motion, and Tailwind CSS. The principles here are inspired by premium, award-winning references (e.g., meetsansara.com).

## 1. Architectural Foundation
- **Stack:** Utilize Next.js (App Router), Tailwind CSS for styling, and `framer-motion` for complex physics-based animations.
- **Global Layout:** Inject global UI UI overlays (like cursors and backgrounds) at the root layout (`layout.tsx`) level to guarantee they persist across route changes seamlessly.

## 2. Core UI Components

### Custom Cursor (Immersive UX)
**NEVER** leave the default OS cursor on desktop devices for a premium landing page.
- **Implementation:** Create a `CustomCursor.tsx` component that tracks `clientX`/`clientY` using `useMotionValue` and dampens movement with `useSpring` from `framer-motion`.
- **Design:** It must have a central core (dot) and an outer ring. Map both to `mix-blend-mode: difference` so they dynamically contrast with any background color.
- **Hover Magnetism:** When hovering over clickable elements (`<a>`, `<button>`), the outer ring should expand smoothly to signify interactivity.
- **Click Wave Pattern:** Instead of a simple UI state change, clicks must emit luminous expanding waves (ripples). 
  - A quick click emits a small wave (ping).
  - A long press (hold) emits continuous expanding wave rings every ~350ms.
- **Mobile Fallback:** Always disable the custom cursor on devices without a fine pointer (`window.matchMedia("(pointer: fine)")`), failing back to default touch semantics to preserve UX.

### Animated Background
**NEVER** use static, solid color backgrounds for the primary hero/page environment.
- **Implementation:** Use WebGL-powered libraries like `gradflow` for high-fidelity, performant animated gradients. 
- **Architectural Requirement:** WebGL components often use React hooks (`useRef`, `useEffect`). In Next.js App Router, **always** wrap these in a separate Client Component (using `"use client"`) before importing them into server-side pages to avoid hydration or runtime errors.
- **Design:** Prefer styles like `animated`, `wave`, or `smoke`. Use a configuration that aligns with the brand colors (e.g., specific RGB/Hex values) and adjust `speed` (~0.4-0.6) and `scale` to maintain legibility of foreground text.
- **Fallback & Performance:** 
  - Wrap the background component in a `div` with `fixed inset-0 z-[-1] pointer-events-none`.
  - Always provide a solid background color (e.g., `bg-black`) on the wrapper `div` to act as a fallback if WebGL fails to initialize or is unsupported on the device.

## 3. Writing Style & Code Quality
- Keep components small and focused. 
- Avoid mixing heavy logical processing with complex animation render cycles.
- Manage animation unmounts properly (clear intervals and timeouts for intervals/waves in `useEffect` cleanup to avoid memory leaks).

## 4. Output Checklist for the Assistant
When applying this skill to generate a landing page, ensure you provide:
1. The global `globals.css` with necessary structural resets (e.g., hiding default cursor on desktop).
2. The interactive UI component (`CustomCursor.tsx`) with brand-matching colors.
3. The background environment component (`GradFlowBackground.tsx` or similar WebGL/CSS alternative) with a solid color fallback.
4. Instructions on how to inject them into the main layout or specific pages.
