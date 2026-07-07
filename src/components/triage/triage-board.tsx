"use client";

import { useMemo, useState } from "react";

import { ApplicantDetail } from "@/components/triage/applicant-detail";
import { ApplicantList } from "@/components/triage/applicant-list";
import { CreateShortlistDialog } from "@/components/triage/create-shortlist-dialog";
import { ShortcutBar } from "@/components/triage/shortcut-bar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ApplicationWithActor } from "@/lib/data";
import type { Triage } from "@/lib/types";
import { ageOf } from "@/lib/types";
import { cn } from "@/lib/utils";

const TRIAGE_FILTERS = ["전체", "미분류", "관심", "보류", "제외"] as const;
type TriageFilter = (typeof TRIAGE_FILTERS)[number];

const SORT_KEYS = ["지원일", "나이", "키"] as const;
type SortKey = (typeof SORT_KEYS)[number];

const CHIP_DOTS: { key: Exclude<Triage, null> | "미분류"; dot: string }[] = [
  { key: "관심", dot: "bg-emerald-500" },
  { key: "보류", dot: "bg-amber-500" },
  { key: "제외", dot: "bg-neutral-400" },
  { key: "미분류", dot: "border border-muted-foreground/40 bg-transparent" },
];

export function TriageBoard({
  roleName,
  applications,
}: {
  roleName: string;
  applications: ApplicationWithActor[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    applications[0]?.id ?? null,
  );
  const [overrides, setOverrides] = useState<Record<string, Triage>>({});
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
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
      if (sort === "나이") return ageOf(a.actor.birthYear) - ageOf(b.actor.birthYear);
      if (sort === "키") return b.actor.height - a.actor.height;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [applications, triageMap, filter, sort]);

  const selected = applications.find((a) => a.id === selectedId) ?? null;

  function toggleChecked(id: string, checked: boolean) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function handleTriage(value: Triage) {
    if (!selected) return;
    setOverrides((prev) => ({ ...prev, [selected.id]: value }));
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* 필터 바 */}
      <div className="flex flex-none flex-wrap items-center gap-2 border-b px-4 py-2.5">
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as TriageFilter)}
        >
          <SelectTrigger size="sm" aria-label="분류 상태 필터">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TRIAGE_FILTERS.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger size="sm" aria-label="정렬 기준">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_KEYS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}순
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1.5">
          {CHIP_DOTS.map(({ key, dot }) => (
            <Badge key={key} variant="outline" className="gap-1.5">
              <span className={cn("size-1.5 rounded-full", dot)} />
              {key} {counts[key]}
            </Badge>
          ))}
        </div>

        <div className="ml-auto">
          <CreateShortlistDialog roleName={roleName} count={checkedIds.size} />
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
          checkedIds={checkedIds}
          onCheckedChange={toggleChecked}
        />
        <ApplicantDetail
          application={selected}
          triage={selected ? triageMap[selected.id] : null}
          onTriageChange={handleTriage}
        />
      </div>

      <ShortcutBar />
    </div>
  );
}
