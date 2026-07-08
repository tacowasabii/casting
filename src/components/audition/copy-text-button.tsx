"use client";

import { toast } from "sonner";

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
    <button
      type="button"
      onClick={handleCopy}
      className="w-full cursor-pointer rounded bg-primary py-2.5 text-[12.5px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
    >
      안내 문자 복사
    </button>
  );
}
