import { cn } from "@/lib/utils";

/** 아이콘 없는 빈 상태 — 점선 헤어라인 박스 + mono 캡션 */
export function EmptyBlock({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded border border-dashed border-[#d0d0d0] px-6 py-10 text-center",
        className,
      )}
    >
      <div className="caption">{title}</div>
      {description ? (
        <p className="m-0 text-[13px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
