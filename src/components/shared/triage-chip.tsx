import { Chip, type ChipVariant } from "@/components/shared/chip";
import type { Triage } from "@/lib/types";

const VARIANT: Record<Exclude<Triage, null>, ChipVariant> = {
  관심: "solid",
  보류: "ink-outline",
  제외: "ghost",
};

/** 트리아지 상태 칩 — null은 "미분류" */
export function TriageChip({
  triage,
  className,
}: {
  triage: Triage;
  className?: string;
}) {
  if (triage === null) {
    return (
      <Chip variant="muted" className={className}>
        미분류
      </Chip>
    );
  }
  return (
    <Chip variant={VARIANT[triage]} className={className}>
      {triage}
    </Chip>
  );
}
