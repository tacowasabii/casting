"use client";

import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { EmptyBlock } from "@/components/shared/empty-block";
import { TriageChip } from "@/components/shared/triage-chip";
import type { ApplicationWithActor } from "@/lib/data";
import type { ApplicationSource, Triage } from "@/lib/types";
import { ageOf } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { SortKey, TriageFilter } from "@/components/triage/triage-board";

const SOURCE_LABEL: Record<ApplicationSource, string> = {
  form: "폼 지원",
  email: "이메일 접수",
  manual: "수동 등록",
};

/* 행의 한 줄 메모 — 디렉터 메모 → 자기소개 → 지원 경로 순 폴백 */
function noteLine(app: ApplicationWithActor): string {
  return app.note ?? app.intro ?? SOURCE_LABEL[app.source];
}

export function ApplicantList({
  applications,
  totalCount,
  triageMap,
  selectedId,
  onSelect,
  filter,
  onFilterChange,
  filters,
  sort,
  onSortChange,
}: {
  applications: ApplicationWithActor[];
  totalCount: number;
  triageMap: Record<string, Triage>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  filter: TriageFilter;
  onFilterChange: (filter: TriageFilter) => void;
  filters: readonly TriageFilter[];
  sort: SortKey;
  onSortChange: () => void;
}) {
  return (
    <div className="flex min-h-0 w-full shrink-0 flex-col border-r border-border bg-panel md:w-[400px]">
      {/* 필터 행 — 목업의 정적 조건 칩 자리에 트리아지 필터를 실은 의도적 편차
          (배역 조건은 이미 헤더에 노출되므로 이 칩들엔 기능을 싣는다) */}
      <div className="flex flex-none items-center gap-1.5 overflow-x-auto border-b border-hairline px-5 py-[13px] no-scrollbar">
        <span className="caption-sm mr-1 shrink-0 tracking-[.1em]">필터</span>
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(f)}
            className={cn(
              "shrink-0 cursor-pointer whitespace-nowrap rounded-sm px-[9px] py-[3px] text-[11px] transition-colors",
              filter === f
                ? "bg-primary font-semibold text-primary-foreground"
                : "border border-input bg-card text-secondary-foreground hover:border-primary",
            )}
          >
            {f}
          </button>
        ))}
        <button
          type="button"
          onClick={onSortChange}
          className="ml-auto shrink-0 cursor-pointer whitespace-nowrap font-mono text-[10px] text-[#b0b0b0] transition-colors hover:text-foreground"
        >
          {sort} ↓
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {totalCount === 0 ? (
          <EmptyBlock
            className="m-5"
            title="No Applicants"
            description="아직 지원자가 없습니다. 지원 폼 링크를 공유하면 이곳에 쌓입니다."
          />
        ) : applications.length === 0 ? (
          <p className="px-4 py-10 text-center text-xs text-muted-foreground">
            조건에 맞는 지원자가 없습니다
          </p>
        ) : (
          applications.map((app) => {
            const active = selectedId === app.id;
            return (
              <div
                key={app.id}
                onClick={() => onSelect(app.id)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border-b border-hairline px-5 py-3 transition-colors",
                  active
                    ? "border-l-2 border-l-primary bg-card"
                    : "border-l-2 border-l-transparent hover:bg-accent",
                )}
              >
                <AvatarPlaceholder
                  name={app.actor.name}
                  photo={app.actor.photo}
                  variant="photo"
                  stripe={5}
                  className="h-[58px] w-[46px] text-lg"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="truncate text-sm font-bold text-foreground">
                      {app.actor.name}
                    </span>
                    <span className="shrink-0 font-mono text-[10.5px] text-faint">
                      {ageOf(app.actor.birthYear)}세·{app.actor.height}cm
                    </span>
                  </div>
                  <div className="mt-[5px] truncate text-[11px] text-[#9a9a9a]">
                    {noteLine(app)}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-[7px]">
                  <TriageChip triage={triageMap[app.id] ?? null} />
                  <span className="whitespace-nowrap font-mono text-[10px] text-[#b0b0b0]">
                    {app.videoDuration ?? "영상 없음"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
