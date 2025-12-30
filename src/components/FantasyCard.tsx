import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FantasyCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export const FantasyCard = ({ children, className, glow = true }: FantasyCardProps) => {
  return (
    <div
      className={cn(
        "fantasy-border rounded-lg p-6 bg-card/80 backdrop-blur-sm",
        glow && "card-glow",
        className
      )}
    >
      {children}
    </div>
  );
};

export const FantasyCardHeader = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mb-4", className)}>{children}</div>
);

export const FantasyCardTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h3 className={cn("font-cinzel text-xl text-gold-gradient font-semibold", className)}>{children}</h3>
);

export const FantasyCardContent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("text-foreground/80", className)}>{children}</div>
);
