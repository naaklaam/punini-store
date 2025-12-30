import { cn } from "@/lib/utils";

interface OrnamentDividerProps {
  className?: string;
  symbol?: string;
}

export const OrnamentDivider = ({ className, symbol = "◆" }: OrnamentDividerProps) => {
  return (
    <div className={cn("ornament-divider", className)}>
      <span className="text-primary text-lg">{symbol}</span>
    </div>
  );
};
