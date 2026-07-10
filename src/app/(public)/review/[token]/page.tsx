import Link from "next/link";

import { CaptionLabel } from "@/components/shared/caption-label";
import { getShortlistDetail } from "@/lib/data";
import { MOCK_USER } from "@/lib/types";

function formatDeadline(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, "0")}`;
}

const GUIDE_ITEMS = [
  "후보별 좋아요 · 보류 · 제외를 선택해 주세요",
  "약 3분이면 충분합니다",
  "배우 연락처는 표시되지 않습니다",
] as const;

export default async function ReviewLandingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const { shortlist, role, project, items } = await getShortlistDetail(token);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-7 py-10 text-center">
        <CaptionLabel className="tracking-[.18em]">감독 리뷰</CaptionLabel>
        <p className="m-0 mt-5 text-[13px] text-muted-foreground">
          {MOCK_USER.name} {MOCK_USER.role}님이 후보 검토를 요청했습니다
        </p>
        <p className="m-0 mt-7 text-[13px] text-muted-foreground">
          〈{project.title}〉
        </p>
        <h1 className="m-0 mt-2 text-2xl font-extrabold tracking-[-.02em] text-foreground">
          {role.name}
        </h1>
        <p className="m-0 mt-3 font-mono text-xs text-muted-foreground">
          후보 {items.length}명 · {formatDeadline(shortlist.deadline)}까지
        </p>

        <ul className="mt-10 w-full list-none p-0">
          {GUIDE_ITEMS.map((text) => (
            <li
              key={text}
              className="border-t border-hairline py-3 text-[13px] text-muted-foreground last:border-b"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky bottom-0 border-t border-hairline bg-card p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <Link
          href={`/review/${token}/cards`}
          className="block w-full rounded-lg bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          검토 시작
        </Link>
      </div>
    </div>
  );
}
