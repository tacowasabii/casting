import { CheckCircle2 } from "lucide-react";

import { CommentPanel } from "@/components/review/comment-panel";
import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";
import { Badge } from "@/components/ui/badge";
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
      <div className="flex-1 px-6 py-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2
            className="size-16 text-emerald-400"
            strokeWidth={1.5}
          />
          <h1 className="text-xl font-semibold tracking-tight">
            검토가 완료되었습니다
          </h1>
          <div className="flex items-center gap-1.5">
            <Badge
              variant="outline"
              className="border-red-cta/40 bg-red-cta/15 text-primary"
            >
              좋아요 {count("like")}
            </Badge>
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/15 text-amber-400"
            >
              보류 {count("hold")}
            </Badge>
            <Badge
              variant="outline"
              className="border-border bg-chip/60 text-muted-foreground"
            >
              제외 {count("pass")}
            </Badge>
          </div>
        </div>

        {liked.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-sm font-medium text-muted-foreground">
              좋아요한 후보
            </h2>
            <ul className="mt-3 space-y-2">
              {liked.map(({ item, actor }) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border px-3 py-2.5"
                >
                  <AvatarPlaceholder
                    name={actor.name}
                    photo={actor.photo}
                    className="size-9"
                  />
                  <span className="text-sm font-medium">{actor.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {ageOf(actor.birthYear)}세
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {shortlist.allowComment ? <CommentPanel /> : null}
      </div>

      <footer className="px-5 py-3 text-center text-[10px] text-muted-foreground/70">
        Powered by 캐스트보드
      </footer>
    </div>
  );
}
