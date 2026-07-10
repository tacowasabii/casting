"use client";

import { toast } from "sonner";

import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { GridTable, GridTableRow } from "@/components/shared/grid-table";
import { VerdictChip } from "@/components/shared/verdict-chip";
import type { ShortlistDetailItem } from "@/lib/data";
import { formatSeconds, parseDurationToSeconds } from "@/lib/format";
import { ageOf } from "@/lib/types";

export function RemindButton({ count }: { count: number }) {
  return (
    <button
      type="button"
      onClick={() => toast("리마인드를 보냈습니다 (데모)")}
      className="cursor-pointer whitespace-nowrap rounded bg-primary px-4 py-2.5 text-[12.5px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-default disabled:opacity-40"
      disabled={count === 0}
    >
      미응답 {count}명 리마인드
    </button>
  );
}

export function ResultsTable({ items }: { items: ShortlistDetailItem[] }) {
  return (
    <GridTable
      columns="2fr 104px 1.5fr 2fr"
      gap={16}
      headers={[
        { label: "후보" },
        { label: "감독 반응" },
        { label: "영상 시청" },
        { label: "코멘트" },
      ]}
    >
      {items.map(({ item, application, actor, review }) => {
        const durationSeconds = application.videoDuration
          ? parseDurationToSeconds(application.videoDuration)
          : null;
        const watchRatio =
          review && durationSeconds
            ? Math.min(1, review.watchSeconds / durationSeconds)
            : 0;
        return (
          <GridTableRow key={item.id} className="py-[15px]">
            <div className="flex min-w-0 items-center gap-3">
              <AvatarPlaceholder
                name={actor.name}
                photo={actor.photo}
                className="size-[38px] text-[15px]"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-foreground">
                  {actor.name}
                </div>
                <div className="mt-[3px] font-mono text-[10.5px] text-faint">
                  {ageOf(actor.birthYear)}세 · {actor.height}cm
                </div>
              </div>
            </div>
            <div>
              <VerdictChip verdict={review?.verdict ?? null} />
            </div>
            <div className="min-w-0">
              {application.videoDuration ? (
                <>
                  <div className="font-mono text-[11.5px] text-secondary-foreground">
                    {review ? formatSeconds(review.watchSeconds) : "0:00"}{" "}
                    <span className="text-icon-mute">
                      / {application.videoDuration}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-[2px] bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${watchRatio * 100}%` }}
                    />
                  </div>
                </>
              ) : (
                <span className="font-mono text-[11px] text-faint">
                  영상 없음
                </span>
              )}
            </div>
            <div className="min-w-0 text-[12.5px] leading-normal text-secondary-foreground">
              {review?.comment ?? "—"}
            </div>
          </GridTableRow>
        );
      })}
    </GridTable>
  );
}
