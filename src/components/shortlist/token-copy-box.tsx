"use client";

import { toast } from "sonner";

/** 공유 토큰 박스 — mono 토큰 + 복사 (클립보드엔 전체 리뷰 URL) */
export function TokenCopyBox({ token }: { token: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(
          `${window.location.origin}/review/${token}`,
        );
        toast("감독 리뷰 링크가 복사되었습니다");
      }}
      className="flex cursor-pointer items-center gap-2 rounded border border-border bg-secondary px-3.5 py-[9px] transition-colors hover:border-primary"
    >
      <span className="font-mono text-[11.5px] text-secondary-foreground">{token}</span>
      <span className="text-[11px] font-semibold text-foreground">복사</span>
    </button>
  );
}
