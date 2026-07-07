"use client";

import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function CopyTextButton({ text }: { text: string }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      toast("안내 문자가 복사되었습니다");
    } catch {
      toast.error("복사에 실패했습니다. 텍스트를 직접 선택해 주세요.");
    }
  }

  return (
    <Button onClick={handleCopy} className="w-full">
      <CopyIcon data-icon="inline-start" />
      안내 문자 복사
    </Button>
  );
}
