import { cn } from "@/lib/utils";

interface SunnyBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function SunnyBackground({ children, className }: SunnyBackgroundProps) {
  return (
    <div className={cn("min-h-screen w-full relative overflow-hidden bg-[#0A0A0A]", className)}>
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #D4B483 0%, transparent 70%)
          `,
          opacity: 0.15,
        }}
      />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}