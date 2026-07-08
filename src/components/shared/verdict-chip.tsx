import { Chip, type ChipVariant } from "@/components/shared/chip";
import type { Verdict } from "@/lib/types";

const LABEL: Record<Verdict, string> = {
  like: "좋아요",
  hold: "보류",
  pass: "제외",
};

const VARIANT: Record<Verdict, ChipVariant> = {
  like: "solid",
  hold: "ink-outline",
  pass: "ghost",
};

/** 감독 판정 칩 — null은 "미응답" */
export function VerdictChip({
  verdict,
  className,
}: {
  verdict: Verdict | null;
  className?: string;
}) {
  if (verdict === null) {
    return (
      <Chip variant="muted" className={className}>
        미응답
      </Chip>
    );
  }
  return (
    <Chip variant={VARIANT[verdict]} className={className}>
      {LABEL[verdict]}
    </Chip>
  );
}
