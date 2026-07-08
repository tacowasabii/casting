"use client";

import { toast } from "sonner";

export function AddToShortlistButton({ actorName }: { actorName: string }) {
  return (
    <button
      type="button"
      onClick={() => toast(`${actorName} 님을 숏리스트 후보에 추가했습니다 (데모)`)}
      className="w-full cursor-pointer rounded bg-primary py-3 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
    >
      ＋ 숏리스트에 추가
    </button>
  );
}
