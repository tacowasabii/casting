import { cn } from "@/lib/utils";

function ddayOf(deadline: string): number {
  const ms = new Date(deadline).getTime() - Date.now();
  return Math.ceil(ms / 86_400_000);
}

export function DdayBadge({
  deadline,
  variant = "auto",
  className,
}: {
  deadline: string;
  /** solid: 잔여일과 무관하게 항상 검정 칩 (숏리스트 헤더) */
  variant?: "auto" | "solid";
  className?: string;
}) {
  const d = ddayOf(deadline);
  const label = d > 0 ? `D-${d}` : d === 0 ? "D-day" : "마감";
  const solid = variant === "solid" || (d >= 0 && d <= 3);
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-sm px-[9px] py-[3px] font-mono text-[11px] font-bold",
        d < 0 && variant !== "solid"
          ? "bg-muted text-[#a8a8a8]"
          : solid
            ? "bg-primary text-primary-foreground"
            : "border border-input bg-card text-secondary-foreground",
        className,
      )}
    >
      {label}
    </span>
  );
}
