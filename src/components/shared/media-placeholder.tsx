import { cn } from "@/lib/utils";

const PLAY_SIZE = { sm: 36, md: 54, lg: 60 } as const;

interface MediaPlaceholderProps {
  kind: "video" | "pdf" | "photo";
  /** pdf: 파일명 / video: 좌하단 mono uppercase 라벨 */
  label?: string;
  /** video 우하단 mono 길이 (예: "1:24") */
  duration?: string;
  /** video 재생 버튼 크기 */
  playSize?: keyof typeof PLAY_SIZE;
  className?: string;
}

/** 사진/영상/PDF 공용 placeholder — 셸은 실제 미디어를 렌더하지 않는다 */
export function MediaPlaceholder({
  kind,
  label,
  duration,
  playSize = "md",
  className,
}: MediaPlaceholderProps) {
  if (kind === "video") {
    const size = PLAY_SIZE[playSize];
    return (
      <div
        className={cn(
          "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-sm bg-[#161616]",
          className,
        )}
      >
        <span
          className="flex items-center justify-center rounded-full border-[1.5px] border-white/90 pl-[3px] text-white"
          style={{ width: size, height: size, fontSize: size * 0.3 }}
        >
          ▶
        </span>
        {label ? (
          <span className="absolute bottom-3 left-3.5 max-w-[65%] truncate font-mono text-[10.5px] uppercase tracking-[.08em] text-[#cfcfcf]">
            {label}
          </span>
        ) : null}
        {duration ? (
          <span className="absolute bottom-3 right-3.5 font-mono text-[10.5px] text-[#cfcfcf]">
            {duration}
          </span>
        ) : null}
      </div>
    );
  }

  if (kind === "pdf") {
    return (
      <div
        className={cn(
          "flex aspect-[16/10] items-center justify-center rounded-sm border border-border bg-secondary",
          className,
        )}
      >
        <span className="max-w-[85%] truncate font-mono text-[10.5px] text-muted-foreground">
          {label ?? "파일.pdf"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn("rounded-sm", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #e6e6e6, #e6e6e6 6px, #efefef 6px, #efefef 12px)",
      }}
    />
  );
}
