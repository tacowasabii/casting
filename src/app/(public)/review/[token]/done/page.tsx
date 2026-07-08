import { CommentPanel } from "@/components/review/comment-panel";
import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { CaptionLabel } from "@/components/shared/caption-label";
import { Chip } from "@/components/shared/chip";
import { getShortlistDetail } from "@/lib/data";
import { ageOf } from "@/lib/types";
import type { Verdict } from "@/lib/types";

const LETTER_TO_VERDICT: Record<string, Verdict> = {
  l: "like",
  h: "hold",
  p: "pass",
};

export default async function ReviewDonePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token } = await params;
  const sp = await searchParams;
  const r = typeof sp.r === "string" ? sp.r : undefined;
  const { shortlist, items } = await getShortlistDetail(token);

  // 쿼리 r("l,h,p,...")을 인덱스로 매칭 — 없으면 목데이터 review로 폴백
  const letters = r ? r.split(",") : [];
  const verdicts: (Verdict | null)[] = items.map(
    (it, i) => LETTER_TO_VERDICT[letters[i]] ?? it.review?.verdict ?? null,
  );

  const count = (v: Verdict) => verdicts.filter((x) => x === v).length;
  const liked = items.filter((_, i) => verdicts[i] === "like");

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 px-7 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <CaptionLabel className="tracking-[.18em]">
            Review Complete
          </CaptionLabel>
          <h1 className="m-0 text-xl font-extrabold tracking-[-.015em] text-foreground">
            검토가 완료되었습니다
          </h1>
          <div className="flex items-center gap-1.5">
            <Chip variant="solid">좋아요 {count("like")}</Chip>
            <Chip variant="ink-outline">보류 {count("hold")}</Chip>
            <Chip variant="ghost">제외 {count("pass")}</Chip>
          </div>
        </div>

        {liked.length > 0 ? (
          <section className="mt-10">
            <CaptionLabel size="sm">좋아요한 후보</CaptionLabel>
            <ul className="m-0 mt-2 list-none p-0">
              {liked.map(({ item, actor }) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 border-b border-hairline py-3"
                >
                  <AvatarPlaceholder
                    name={actor.name}
                    photo={actor.photo}
                    className="size-9 text-sm"
                  />
                  <span className="text-sm font-bold text-foreground">
                    {actor.name}
                  </span>
                  <span className="font-mono text-[10.5px] text-faint">
                    {ageOf(actor.birthYear)}세
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {shortlist.allowComment ? <CommentPanel /> : null}
      </div>

      <footer className="px-5 py-3 text-center text-[10px] text-faint">
        Powered by 캐스트보드
      </footer>
    </div>
  );
}
