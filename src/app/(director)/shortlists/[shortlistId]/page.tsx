import { BreadcrumbBar } from "@/components/shared/breadcrumb-bar";
import { CaptionLabel } from "@/components/shared/caption-label";
import { DdayBadge } from "@/components/shared/dday-badge";
import {
  RemindButton,
  ResultsTable,
} from "@/components/shortlist/results-table";
import { StackBar } from "@/components/shortlist/stack-bar";
import { TokenCopyBox } from "@/components/shortlist/token-copy-box";
import { getShortlistDetail } from "@/lib/data";

export default async function ShortlistResultPage({
  params,
}: {
  params: Promise<{ shortlistId: string }>;
}) {
  const { shortlistId } = await params;
  const { shortlist, role, project, items } =
    await getShortlistDetail(shortlistId);

  const counts = { like: 0, hold: 0, pass: 0, none: 0 };
  for (const { review } of items) {
    if (!review) counts.none += 1;
    else counts[review.verdict] += 1;
  }
  const responded = items.length - counts.none;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-card">
      <BreadcrumbBar
        parentHref="/shortlists"
        parentLabel="숏리스트"
        current={shortlist.title}
      />

      <div className="border-b border-border px-[30px] pb-[22px] pt-[26px]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="m-0 text-2xl font-extrabold tracking-[-.02em] text-foreground">
              {shortlist.title}
            </h2>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-[12.5px] text-muted-foreground">
                {project.title} · {role.name} · 후보 {items.length}명
              </span>
              <DdayBadge deadline={shortlist.deadline} variant="solid" />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href={`/review/${shortlist.token}`}
              target="_blank"
              rel="noreferrer"
              className="text-[12px] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              감독 화면 미리보기
            </a>
            <TokenCopyBox token={shortlist.token} />
            <RemindButton count={counts.none} />
          </div>
        </div>

        {/* 응답 요약 — 큰 숫자 + 판정 스택바 */}
        <div className="mt-[22px] flex items-center gap-7">
          <div className="shrink-0">
            <CaptionLabel className="tracking-[.1em]">감독 응답</CaptionLabel>
            <div className="num-display mt-1.5 text-[28px] text-foreground">
              {responded}/{items.length}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <StackBar counts={counts} />
            <div className="mt-[11px] flex gap-[18px] text-xs">
              <span className="text-[#6b6b6b]">
                <b className="text-foreground">좋아요 {counts.like}</b>
              </span>
              <span className="text-[#6b6b6b]">보류 {counts.hold}</span>
              <span className="text-[#6b6b6b]">제외 {counts.pass}</span>
              <span className="text-[#b0b0b0]">미응답 {counts.none}</span>
            </div>
          </div>
        </div>
      </div>

      <ResultsTable items={items} />
    </div>
  );
}
