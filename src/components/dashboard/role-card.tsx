import Link from "next/link";

import { DdayBadge } from "@/components/shared/dday-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import type { RoleWithStats } from "@/lib/data";
import { conditionLine } from "@/lib/format";

/* 카드 푸터 좌측 mono 메타 — 신규 지원 우선, 없으면 촬영 일정 */
function extraLabel(role: RoleWithStats): string {
  if (role.newApplications > 0) return `신규 ${role.newApplications}`;
  if (role.shootDate) return `촬영 ${role.shootDate}`;
  return "";
}

export function RoleCard({ role }: { role: RoleWithStats }) {
  return (
    <Link
      href={`/roles/${role.id}`}
      className="flex flex-col rounded border border-border bg-card px-[17px] pb-[13px] pt-[15px] transition-colors hover:border-primary"
    >
      <div className="flex items-center justify-between">
        <StatusBadge status={role.status} />
        <DdayBadge deadline={role.deadline} />
      </div>
      <div className="mt-[13px] flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="m-0 truncate text-base font-extrabold tracking-[-.01em] text-foreground">
            {role.name}
          </h4>
          <div className="mt-[5px] text-[11.5px] leading-normal text-muted-foreground">
            {conditionLine(role)}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="num-display text-[22px] text-foreground">
            {role.totalApplications}
          </div>
          <div className="mt-[3px] text-[10.5px] text-[#9a9a9a]">지원</div>
        </div>
      </div>
      <div className="mt-[13px] flex items-center justify-between border-t border-hairline pt-[11px]">
        <span className="font-mono text-[11px] text-[#9a9a9a]">
          {extraLabel(role)}
        </span>
        <span className="text-[12.5px] font-bold text-foreground">
          선별 보드 →
        </span>
      </div>
    </Link>
  );
}
