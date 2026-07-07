"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CommentPanel() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mt-8 space-y-2">
      <Label htmlFor="review-comment">의견 남기기 (선택)</Label>
      <Textarea
        id="review-comment"
        rows={3}
        className="min-h-20"
        placeholder="후보들에 대한 의견을 남겨 주세요"
        disabled={sent}
      />
      <Button
        className="w-full"
        variant={sent ? "secondary" : "default"}
        disabled={sent}
        onClick={() => setSent(true)}
      >
        {sent ? (
          <>
            <CheckIcon data-icon="inline-start" />
            전송되었습니다
          </>
        ) : (
          "의견 전송"
        )}
      </Button>
    </section>
  );
}
