import { cn } from "@/lib/utils";

/** mono uppercase 캡션 — 페이지 아이캐처·필드 라벨·테이블 헤더의 공통 위계 장치 */
export function CaptionLabel({
  size = "md",
  className,
  children,
}: {
  /** md 11px / sm 10px */
  size?: "md" | "sm";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(size === "md" ? "caption" : "caption-sm", className)}>
      {children}
    </div>
  );
}
