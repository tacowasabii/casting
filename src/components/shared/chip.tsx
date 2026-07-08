import { cn } from "@/lib/utils";

export type ChipVariant = "solid" | "outline" | "ink-outline" | "muted" | "ghost";

const VARIANTS: Record<ChipVariant, string> = {
  /* 검정 반전 — 화면당 한두 개만 허용되는 유일한 강조 */
  solid: "bg-primary text-primary-foreground",
  outline: "border border-input bg-secondary text-secondary-foreground",
  "ink-outline": "border border-primary bg-card text-foreground",
  muted: "bg-muted text-[#7a7a7a]",
  ghost: "border border-[#e0e0e0] bg-card text-[#a8a8a8]",
};

/** 3a 모노크롬 칩 프리미티브 — 상태·트리아지·판정·필터·태그 칩의 공통 기반 */
export function Chip({
  variant = "outline",
  className,
  children,
}: {
  variant?: ChipVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-sm px-2.5 py-[3px] text-[11px] font-semibold",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
