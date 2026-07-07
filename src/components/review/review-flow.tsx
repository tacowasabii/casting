"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { ActorReviewCard } from "@/components/review/actor-review-card";
import {
  VerdictBar,
  type VerdictLetter,
} from "@/components/review/verdict-bar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { ShortlistDetailItem } from "@/lib/data";

interface ReviewFlowProps {
  items: ShortlistDetailItem[];
  token: string;
  allowComment: boolean;
  roleName: string;
}

export function ReviewFlow({ items, token, roleName }: ReviewFlowProps) {
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
      <div className="flex-none border-b px-4 pt-3 pb-3">
        <div className="flex items-center gap-1">
          {index > 0 ? (
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="이전 후보"
              onClick={() => setIndex(index - 1)}
            >
              <ChevronLeft />
            </Button>
          ) : (
            <span className="size-7" aria-hidden />
          )}
          <span className="text-sm font-medium">{roleName}</span>
          <span className="ml-auto text-xs tabular-nums text-muted-foreground">
            {index + 1}/{total}
          </span>
        </div>
        <Progress value={((index + 1) / total) * 100} className="mt-2.5" />
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

      <VerdictBar current={verdicts[index]} onVote={vote} />
    </div>
  );
}
