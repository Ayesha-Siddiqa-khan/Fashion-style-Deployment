"use client";

import { cn } from "@/lib/utils";

interface BackgroundGlowProps {
  children: React.ReactNode;
  className?: string;
}

export function BackgroundGlow({ children, className }: BackgroundGlowProps) {
  return (
    <div className={cn("min-h-screen w-full bg-[#0A0A0A] relative overflow-hidden", className)}>
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
          radial-gradient(circle at center, #fde047 0%, transparent 70%)
        `,
          opacity: 0.15,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default BackgroundGlow;