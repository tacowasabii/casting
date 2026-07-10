"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { CaptionLabel } from "@/components/shared/caption-label";
import { CopyLinkButton } from "@/components/roles/copy-link-button";
import { ApplicantDetail } from "@/components/triage/applicant-detail";
import { ApplicantList } from "@/components/triage/applicant-list";
import { CreateShortlistDialog } from "@/components/triage/create-shortlist-dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { ApplicationWithActor, RoleWithStats } from "@/lib/data";
import { conditionLine } from "@/lib/format";
import type { Project, Triage } from "@/lib/types";
import { ageOf } from "@/lib/types";

const TRIAGE_FILTERS = ["전체", "미분류", "관심", "보류", "제외"] as const;
export type TriageFilter = (typeof TRIAGE_FILTERS)[number];

const SORT_KEYS = ["지원일", "나이", "키"] as const;
export type SortKey = (typeof SORT_KEYS)[number];

export function TriageBoard({
  role,
  project,
  applications,
}: {
  role: RoleWithStats;
  project: Project;
  applications: ApplicationWithActor[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    applications[0]?.id ?? null,
  );
  const [overrides, setOverrides] = useState<Record<string, Triage>>({});
  const [filter, setFilter] = useState<TriageFilter>("전체");
  const [sort, setSort] = useState<SortKey>("지원일");

  const triageMap = useMemo(() => {
    const map: Record<string, Triage> = {};
    for (const app of applications) {
      map[app.id] = app.id in overrides ? overrides[app.id] : app.triage;
    }
    return map;
  }, [applications, overrides]);

  const counts = useMemo(() => {
    const c = { 관심: 0, 보류: 0, 제외: 0, 미분류: 0 };
    for (const app of applications) {
      const t = triageMap[app.id];
      c[t ?? "미분류"] += 1;
    }
    return c;
  }, [applications, triageMap]);

  const visible = useMemo(() => {
    const filtered = applications.filter((app) => {
      if (filter === "전체") return true;
      if (filter === "미분류") return triageMap[app.id] === null;
      return triageMap[app.id] === filter;
    });
    return [...filtered].sort((a, b) => {
      if (sort === "나이")
        return ageOf(a.actor.birthYear) - ageOf(b.actor.birthYear);
      if (sort === "키") return b.actor.height - a.actor.height;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [applications, triageMap, filter, sort]);

  const selected = applications.find((a) => a.id === selectedId) ?? null;

  function handleTriage(value: Triage) {
    if (!selected) return;
    setOverrides((prev) => ({ ...prev, [selected.id]: value }));
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-card">
      {/* 헤더 — 작품 캡션 + 배역명 + 조건 + 트리아지 카운트 + 액션 */}
      <div className="flex flex-none flex-wrap items-center justify-between gap-4 border-b border-border px-[30px] py-[22px]">
        <div className="flex min-w-0 items-start gap-2">
          <SidebarTrigger className="mt-1 md:hidden" />
          <div className="min-w-0">
            <CaptionLabel className="text-[10.5px]">
              {project.title} · 선별
            </CaptionLabel>
            <div className="mt-[7px] flex items-baseline gap-3">
              <h2 className="m-0 truncate text-2xl font-extrabold tracking-[-.015em] text-foreground">
                {role.name}
              </h2>
              <span className="hidden whitespace-nowrap text-xs text-muted-foreground lg:inline">
                {conditionLine(role)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-[18px]">
          <div className="flex gap-4 text-xs text-muted-foreground">
            {(["관심", "보류", "제외", "미분류"] as const).map((key) => (
              <span key={key}>
                {key} <b className="text-foreground">{counts[key]}</b>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <CopyLinkButton path={`/apply/${role.id}`} label="지원 폼 링크" />
            <Link
              href={`/roles/${role.id}/audition`}
              className="whitespace-nowrap rounded border border-input bg-card px-3 py-2 text-[12px] font-medium text-secondary-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              오디션 안내
            </Link>
            <CreateShortlistDialog roleName={role.name} count={counts.관심} />
          </div>
        </div>
      </div>

      {/* 좌 리스트 + 우 상세 */}
      <div className="flex min-h-0 flex-1">
        <ApplicantList
          applications={visible}
          totalCount={applications.length}
          triageMap={triageMap}
          selectedId={selectedId}
          onSelect={setSelectedId}
          filter={filter}
          onFilterChange={setFilter}
          filters={TRIAGE_FILTERS}
          sort={sort}
          onSortChange={() => {
            const next =
              SORT_KEYS[(SORT_KEYS.indexOf(sort) + 1) % SORT_KEYS.length];
            setSort(next);
          }}
        />
        <ApplicantDetail
          application={selected}
          triage={selected ? triageMap[selected.id] : null}
          onTriageChange={handleTriage}
        />
      </div>
    </div>
  );
}
