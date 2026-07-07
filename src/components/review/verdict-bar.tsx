"use client";

import { HeartIcon, MinusIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** l=좋아요(like) / h=보류(hold) / p=제외(pass) */
export type VerdictLetter = "l" | "h" | "p";

const OPTIONS = [
  {
    value: "p",
    label: "제외",
    icon: XIcon,
    idle: "text-muted-foreground",
    active: "bg-muted text-foreground ring-2 ring-neutral-400",
  },
  {
    value: "h",
    label: "보류",
    icon: MinusIcon,
    idle: "text-amber-600",
    active: "bg-amber-50 text-amber-700 ring-2 ring-amber-400",
  },
  {
    value: "l",
    label: "좋아요",
    icon: HeartIcon,
    idle: "text-emerald-600",
    active: "bg-emerald-50 text-emerald-700 ring-2 ring-emerald-400",
  },
] as const;

export function VerdictBar({
  current,
  onVote,
}: {
  current: VerdictLetter | undefined;
  onVote: (v: VerdictLetter) => void;
}) {
  return (
    <div className="grid flex-none grid-cols-3 gap-2 border-t bg-background p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      {OPTIONS.map((opt) => (
        <Button
          key={opt.value}
          variant="outline"
          onClick={() => onVote(opt.value)}
          className={cn(
            "h-14 flex-col gap-1 [&_svg:not([class*='size-'])]:size-5",
            current === opt.value ? opt.active : opt.idle,
          )}
        >
          <opt.icon
            className={cn(
              opt.value === "l" && current === "l" && "fill-current",
            )}
          />
          <span className="text-xs font-medium">{opt.label}</span>
        </Button>
      ))}
    </div>
  );
}
