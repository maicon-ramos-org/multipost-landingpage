"use client";

import { Component, type ReactNode } from "react";
import { GradFlow } from "gradflow";

class GradFlowErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function GradFlowBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black pointer-events-none">
      <GradFlowErrorBoundary>
        <GradFlow
          config={{
            color1: { r: 106, g: 1, b: 3 },
            color2: { r: 0, g: 0, b: 0 },
            color3: { r: 61, g: 0, b: 1 },
            speed: 0.6,
            scale: 1,
            type: 'animated',
            noise: 0.18
          }}
        />
      </GradFlowErrorBoundary>
    </div>
  );
}
