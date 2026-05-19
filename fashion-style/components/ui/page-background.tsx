import { cn } from "@/lib/utils";

interface PageBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function PageBackground({ children, className }: PageBackgroundProps) {
  return (
    <div className={cn("min-h-screen w-full relative bg-neutral-50", className)}>
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #FFF991 0%, transparent 70%)
          `,
          opacity: 0.4,
          mixBlendMode: "multiply",
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}