"use client";

import type { PointerEvent, ReactNode } from "react";

interface FloatingArtProps {
  children: ReactNode;
  className?: string;
}

export function FloatingArt({ children, className = "" }: FloatingArtProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--tilt-x", `${-y * 12}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 12}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div
      className={`floating-art ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="floating-art__tilt">{children}</div>
    </div>
  );
}
