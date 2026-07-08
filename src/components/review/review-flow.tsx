"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { ActionTriad } from "@/components/shared/action-triad";
import { ActorReviewCard } from "@/components/review/actor-review-card";
import type { ShortlistDetailItem } from "@/lib/data";
import { formatDeadlineLabel } from "@/lib/format";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/** l=좋아요(like) / h=보류(hold) / p=제외(pass) */
export type VerdictLetter = "l" | "h" | "p";

const VERDICT_OPTIONS = [
  { value: "l", label: "좋아요" },
  { value: "h", label: "보류" },
  { value: "p", label: "제외" },
] as const;

interface ReviewFlowProps {
  items: ShortlistDetailItem[];
  token: string;
  roleName: string;
  project: Project;
  deadline: string;
}

export function ReviewFlow({
  items,
  token,
  roleName,
  project,
  deadline,
}: ReviewFlowProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [verdicts, setVerdicts] = useState<(VerdictLetter | undefined)[]>(
    () => Array.from({ length: items.length }, () => undefined),
  );

  const total = items.length;
  const current = items[index];

  function vote(v: VerdictLetter) {
    const next = [...verdicts];
    next[index] = v;
    setVerdicts(next);
    if (index === total - 1) {
      router.push(`/review/${token}/done?r=${next.join(",")}`);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <div className="flex h-dvh flex-col">
      {/* 헤더 — 배역 + 진행 + 세그먼트 프로그레스 */}
      <div className="flex-none border-b border-hairline px-[22px] pb-4 pt-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            {index > 0 ? (
              <button
                type="button"
                aria-label="이전 후보"
                onClick={() => setIndex(index - 1)}
                className="-ml-1.5 cursor-pointer rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="size-4" />
              </button>
            ) : null}
            <span className="truncate text-base font-extrabold tracking-[-.01em] text-foreground">
              {roleName} 후보
            </span>
          </div>
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
            {index + 1} / {total}
          </span>
        </div>
        <div className="mt-[5px] text-[11.5px] text-[#9a9a9a]">
          {project.title} · {project.production} · {formatDeadlineLabel(deadline)}
        </div>
        <div className="mt-3 flex gap-1">
          {items.map((it, i) => (
            <span
              key={it.item.id}
              className={cn(
                "h-[3px] flex-1 rounded-[2px]",
                i <= index ? "bg-primary" : "bg-[#e4e4e4]",
              )}
            />
          ))}
        </div>
      </div>

      <div
        key={index}
        className="flex-1 overflow-y-auto animate-in fade-in slide-in-from-right-8 duration-300"
      >
        <ActorReviewCard
          application={current.application}
          actor={current.actor}
        />
      </div>

      <div className="flex-none border-t border-hairline bg-card px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-1.5">
        <ActionTriad
          size="mobile"
          options={VERDICT_OPTIONS}
          value={verdicts[index] ?? null}
          onSelect={vote}
        />
      </div>
    </div>
  );
}
