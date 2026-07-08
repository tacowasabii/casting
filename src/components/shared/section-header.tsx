import { cn } from "@/lib/utils";

/** 하단 1.5px 검정 보더 섹션 헤더 — 작품 섹션·지원 이력·누적 자료 */
export function SectionHeader({
  title,
  sub,
  meta,
  className,
}: {
  title: React.ReactNode;
  /** 제목 옆 보조 텍스트 (작품 메타 등) */
  sub?: React.ReactNode;
  /** 우측 mono 메타 ("배역 2", "3건 · 2작품") */
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-end justify-between border-b-[1.5px] border-border-strong pb-[11px]",
        className,
      )}
    >
      <div className="flex items-baseline gap-3.5 min-w-0">
        <h3 className="title-section m-0 text-foreground">{title}</h3>
        {sub ? (
          <span className="truncate text-xs text-muted-foreground">{sub}</span>
        ) : null}
      </div>
      {meta ? (
        <span className="shrink-0 font-mono text-[11px] tracking-[.08em] text-muted-foreground">
          {meta}
        </span>
      ) : null}
    </div>
  );
}
