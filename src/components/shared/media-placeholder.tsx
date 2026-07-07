import { FileText, ImageIcon, Play } from "lucide-react";

import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  kind: "video" | "pdf" | "photo";
  /** pdf: 파일명 / video: 부가 라벨 */
  label?: string;
  /** video 우하단 길이 칩 (예: "1:24") */
  duration?: string;
  className?: string;
}

/** 사진/영상/PDF 공용 placeholder — 셸은 실제 미디어를 렌더하지 않는다 */
export function MediaPlaceholder({
  kind,
  label,
  duration,
  className,
}: MediaPlaceholderProps) {
  if (kind === "video") {
    return (
      <div
        className={cn(
          "relative flex aspect-video w-full items-center justify-center rounded-lg bg-neutral-900",
          className,
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <Play className="size-5 fill-white text-white" />
        </div>
        {label ? (
          <span className="absolute bottom-2 left-2 max-w-[70%] truncate text-xs text-white/70">
            {label}
          </span>
        ) : null}
        {duration ? (
          <span className="absolute right-2 bottom-2 rounded bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white">
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
          "flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2.5",
          className,
        )}
      >
        <FileText className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate text-sm text-foreground/80">
          {label ?? "파일.pdf"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-muted",
        className,
      )}
    >
      <ImageIcon className="size-6 text-muted-foreground/50" />
    </div>
  );
}
