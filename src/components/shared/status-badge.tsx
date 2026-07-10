import { Chip, type ChipVariant } from "@/components/shared/chip";
import type { RoleStatus } from "@/lib/types";

/* 모노크롬 위계: 모집중만 검정 반전, 진행 단계는 아웃라인, 확정은 검정 보더, 종료는 뮤트 */
const VARIANT: Record<RoleStatus, ChipVariant> = {
  모집중: "solid",
  검토중: "outline",
  감독컨펌: "outline",
  오디션: "outline",
  확정: "ink-outline",
  종료: "muted",
};

/* 테마 CSS 훅용 영문 키 — themes.css의 [data-status="…"] 선택자와 대응 (4E 상태별 색) */
const STATUS_KEY: Record<RoleStatus, string> = {
  모집중: "open",
  검토중: "review",
  감독컨펌: "confirm",
  오디션: "audition",
  확정: "cast",
  종료: "closed",
};

export function StatusBadge({
  status,
  className,
}: {
  status: RoleStatus;
  className?: string;
}) {
  return (
    <Chip
      variant={VARIANT[status]}
      className={className}
      data-status={STATUS_KEY[status]}
    >
      {status}
    </Chip>
  );
}
