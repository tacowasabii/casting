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
          ? "bg-neutral-100 text-neutral-500 border-neutral-200"
          : d <= 3
            ? "bg-red-100 text-red-700 border-red-200"
            : "bg-neutral-100 text-neutral-600 border-neutral-200",
        className,
      )}
    >
      {label}
    </Badge>
  );
}
