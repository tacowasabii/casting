"use client";

import { useState } from "react";

import { CaptionLabel } from "@/components/shared/caption-label";
import { Textarea } from "@/components/ui/textarea";

export function CommentPanel() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mt-10">
      <CaptionLabel size="sm" className="mb-2">
        의견 남기기 (선택)
      </CaptionLabel>
      <Textarea
        id="review-comment"
        rows={3}
        className="min-h-20"
        placeholder="후보들에 대한 의견을 남겨 주세요"
        disabled={sent}
      />
      <button
        type="button"
        disabled={sent}
        onClick={() => setSent(true)}
        className="mt-2.5 w-full cursor-pointer rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-default disabled:bg-muted disabled:text-muted-foreground"
      >
        {sent ? "전송되었습니다" : "의견 전송"}
      </button>
    </section>
  );
}
