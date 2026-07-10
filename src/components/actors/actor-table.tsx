"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { CaptionLabel } from "@/components/shared/caption-label";
import { Chip } from "@/components/shared/chip";
import { EmptyBlock } from "@/components/shared/empty-block";
import { GridTable, GridTableRow } from "@/components/shared/grid-table";
import { SearchField } from "@/components/shared/search-field";
import { TriageChip } from "@/components/shared/triage-chip";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { ActorWithSummary } from "@/lib/data";
import { ageOf } from "@/lib/types";
import { cn } from "@/lib/utils";

type QuickFilter = "전체" | "관심 이력" | "소속사 있음";

export function ActorLibrary({ actors }: { actors: ActorWithSummary[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [quick, setQuick] = useState<QuickFilter>("전체");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(
    () => [...new Set(actors.flatMap((a) => a.tags))],
    [actors],
  );
  const interestTotal = useMemo(
    () => actors.filter((a) => a.interestCount > 0).length,
    [actors],
  );
  const agencyTotal = useMemo(
    () => actors.filter((a) => a.agency !== null).length,
    [actors],
  );

  const filtered = useMemo(() => {
    const q = query.trim();
    return actors
      .filter((actor) => {
        const queryMatch =
          q === "" ||
          actor.name.includes(q) ||
          actor.tags.some((t) => t.includes(q)) ||
          (actor.agency ?? "").includes(q);
        const quickMatch =
          quick === "전체" ||
          (quick === "관심 이력" && actor.interestCount > 0) ||
          (quick === "소속사 있음" && actor.agency !== null);
        const tagMatch = selectedTags.every((tag) => actor.tags.includes(tag));
        return queryMatch && quickMatch && tagMatch;
      })
      .sort((a, b) =>
        (b.lastAppliedAt ?? "").localeCompare(a.lastAppliedAt ?? ""),
      );
  }, [actors, query, quick, selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-card">
      {/* 페이지 헤더 */}
      <div className="border-b border-border px-[30px] pb-[18px] pt-[26px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <CaptionLabel className="text-[10.5px] tracking-[.16em]">
                Library
              </CaptionLabel>
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <h2 className="title-page m-0 text-foreground">배우 라이브러리</h2>
              <span className="text-[13px] text-muted-foreground">
                총 {actors.length}명
              </span>
            </div>
          </div>
          <SearchField
            placeholder="이름 · 태그 · 조건 검색"
            value={query}
            onChange={setQuery}
            className="w-[300px] max-w-full"
          />
        </div>

        {/* 필터 칩 행 */}
        <div className="mt-[18px] flex flex-wrap items-center gap-2">
          <FilterChip
            active={quick === "전체" && selectedTags.length === 0}
            onClick={() => {
              setQuick("전체");
              setSelectedTags([]);
            }}
          >
            전체 {actors.length}
          </FilterChip>
          <FilterChip
            active={quick === "관심 이력"}
            onClick={() => setQuick(quick === "관심 이력" ? "전체" : "관심 이력")}
          >
            &lsquo;관심&rsquo; 이력 {interestTotal}
          </FilterChip>
          <FilterChip
            active={quick === "소속사 있음"}
            onClick={() =>
              setQuick(quick === "소속사 있음" ? "전체" : "소속사 있음")
            }
          >
            소속사 있음 {agencyTotal}
          </FilterChip>
          {allTags.map((tag) => (
            <FilterChip
              key={tag}
              active={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </FilterChip>
          ))}
          <span className="ml-auto font-mono text-[11px] text-faint">
            최근 지원 ↓
          </span>
        </div>
      </div>

      {/* 테이블 */}
      {filtered.length === 0 ? (
        <div className="px-[30px] py-8">
          <EmptyBlock
            title="No Match"
            description="조건에 맞는 배우가 없습니다. 검색어나 필터를 조정해 보세요."
          />
        </div>
      ) : (
        <GridTable
          columns="2.2fr 52px 52px 1.1fr 1.6fr 64px 88px"
          headers={[
            { label: "배우" },
            { label: "나이" },
            { label: "키" },
            { label: "소속사" },
            { label: "태그" },
            { label: "지원", align: "right" },
            { label: "최근 결과", align: "right" },
          ]}
        >
          {filtered.map((actor) => (
            <GridTableRow
              key={actor.id}
              className="cursor-pointer transition-colors hover:bg-panel"
              onClick={() => router.push(`/actors/${actor.id}`)}
            >
              <div className="flex min-w-0 items-center gap-3">
                <AvatarPlaceholder
                  name={actor.name}
                  photo={actor.photo}
                  className="size-9 text-sm"
                />
                <span className="truncate text-sm font-bold text-foreground">
                  {actor.name}
                </span>
              </div>
              <span className="font-mono text-[12.5px] text-secondary-foreground">
                {ageOf(actor.birthYear)}
              </span>
              <span className="font-mono text-[12.5px] text-secondary-foreground">
                {actor.height}
              </span>
              <span className="truncate text-[12.5px] text-secondary-foreground">
                {actor.agency ?? "—"}
              </span>
              <div className="flex min-w-0 gap-1.5 overflow-hidden">
                {actor.tags.slice(0, 2).map((tag) => (
                  <Chip
                    key={tag}
                    variant="outline"
                    className="shrink-0 px-[9px] text-[10.5px] font-normal"
                  >
                    {tag}
                  </Chip>
                ))}
                {actor.tags.length > 2 ? (
                  <span className="shrink-0 self-center font-mono text-[10px] text-faint">
                    +{actor.tags.length - 2}
                  </span>
                ) : null}
              </div>
              <span className="text-right font-mono text-[13px] font-bold text-foreground">
                {actor.applicationCount}
              </span>
              <div className="flex justify-end">
                <TriageChip triage={actor.lastTriage} />
              </div>
            </GridTableRow>
          ))}
        </GridTable>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer whitespace-nowrap rounded-sm px-3 py-[5px] text-[11.5px] transition-colors",
        active
          ? "bg-primary font-semibold text-primary-foreground"
          : "border border-border bg-secondary text-secondary-foreground hover:border-primary",
      )}
    >
      {children}
    </button>
  );
}
