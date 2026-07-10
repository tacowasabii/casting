import { cn } from "@/lib/utils";

/* 판정 분포 가로 스택바 — 좋아요 잉크 / 보류 회색 / 제외 연회색 / 미응답 헤어라인 (차트 토큰 램프, 테마 연동) */
const SEGMENTS = [
  { key: "like", color: "var(--chart-1)" },
  { key: "hold", color: "var(--chart-3)" },
  { key: "pass", color: "var(--chart-4)" },
  { key: "none", color: "var(--chart-5)" },
] as const;

export interface VerdictCounts {
  like: number;
  hold: number;
  pass: number;
  none: number;
}

export function StackBar({
  counts,
  className,
}: {
  counts: VerdictCounts;
  className?: string;
}) {
  const total = counts.like + counts.hold + counts.pass + counts.none;
  if (total === 0) return null;
  return (
    <div
      className={cn("flex h-2 gap-[3px] overflow-hidden rounded-[2px]", className)}
    >
      {SEGMENTS.filter((s) => counts[s.key] > 0).map((s) => (
        <span
          key={s.key}
          style={{ flexGrow: counts[s.key], background: s.color }}
        />
      ))}
    </div>
  );
}
