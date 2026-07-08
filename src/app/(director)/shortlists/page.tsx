import Link from "next/link";

import { CaptionLabel } from "@/components/shared/caption-label";
import { DdayBadge } from "@/components/shared/dday-badge";
import { EmptyBlock } from "@/components/shared/empty-block";
import { StackBar } from "@/components/shortlist/stack-bar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getAllShortlists } from "@/lib/data";
import { formatRelativeDays } from "@/lib/format";

/* 전체 숏리스트 인덱스 — 디자인에 없는 화면. 화면 05의 사이드바 "공유 중" 행 패턴을 확장한 행 리스트. */
export default async function ShortlistsIndexPage() {
  const shortlists = await getAllShortlists();

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-card">
      <div className="border-b border-border px-[30px] pb-[18px] pt-[26px]">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <CaptionLabel className="tracking-[.16em]">Shortlists</CaptionLabel>
        </div>
        <div className="mt-2 flex items-baseline gap-3">
          <h2 className="title-page m-0 text-foreground">숏리스트</h2>
          <span className="text-[13px] text-[#9a9a9a]">
            공유 중 {shortlists.length}건
          </span>
        </div>
      </div>

      {shortlists.length === 0 ? (
        <div className="px-[30px] py-10">
          <EmptyBlock
            title="Empty"
            description="아직 공유 중인 숏리스트가 없습니다. 선별 보드에서 관심 후보로 만들어보세요."
          />
        </div>
      ) : (
        <div className="flex flex-col">
          {shortlists.map((sl) => {
            const noneCount = sl.itemCount - sl.reviewedCount;
            return (
              <Link
                key={sl.id}
                href={`/shortlists/${sl.id}`}
                className="group grid grid-cols-[2.2fr_1.6fr_120px_64px_88px] items-center gap-4 border-b border-hairline px-[30px] py-4 transition-colors hover:bg-panel"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-foreground">
                    {sl.title}
                  </div>
                  <div className="mt-1 truncate text-[11.5px] text-[#9a9a9a]">
                    {sl.role.name} · {sl.project.title} · 후보 {sl.itemCount} ·
                    생성 {formatRelativeDays(sl.createdAt)}
                  </div>
                </div>
                <div className="min-w-0">
                  <StackBar
                    className="h-1.5"
                    counts={{
                      like: sl.likeCount,
                      hold: 0,
                      pass: sl.reviewedCount - sl.likeCount,
                      none: noneCount,
                    }}
                  />
                </div>
                <div className="font-mono text-[12.5px] text-secondary-foreground">
                  응답 {sl.reviewedCount}/{sl.itemCount}
                </div>
                <div>
                  <DdayBadge deadline={sl.deadline} />
                </div>
                <div className="text-right text-[12.5px] font-bold text-foreground opacity-60 transition-opacity group-hover:opacity-100">
                  결과 →
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
