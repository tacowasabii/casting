import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function ddayOf(deadline: string): number {
  const ms = new Date(deadline).getTime() - Date.now();
  return Math.ceil(ms / 86_400_000);
}

export function DdayBadge({
  deadline,
  className,
}: {
  deadline: string;
  className?: string;
}) {
  const d = ddayOf(deadline);
  const label = d > 0 ? `D-${d}` : d === 0 ? "D-day" : "마감";
  return (
    <Badge
      variant="outline"
      className={cn(
        d < 0
          ? "border-border bg-chip/60 text-muted-foreground"
          : d <= 3
            ? "border-red-cta/40 bg-red-cta/15 text-primary"
            : "border-border bg-chip/60 text-foreground/70",
        className,
      )}
    >
      {label}
    </Badge>
  );
}
